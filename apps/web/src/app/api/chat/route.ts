/**
 * POST /api/chat — stream de respostas da IA Dinamic via OpenRouter (Qwen3.7-max).
 * Server-only: a API key nunca sai do servidor.
 *
 * Body:
 *   { messages: Array<{ role: 'user'|'assistant', content: string }> }
 *
 * Response: text/plain streaming (chunks de tokens do modelo).
 *
 * Side-effect: se a IA emitir [[AGENDAMENTO]]{...}[[/AGENDAMENTO]] no fim da
 * resposta, o backend extrai o payload, REMOVE o bloco do stream (cliente nunca
 * vê) e dispara email pra equipe via Resend.
 */
import { NextRequest } from "next/server";
import {
  DINAMIC_SYSTEM_PROMPT,
  streamChat,
  type OpenRouterMessage,
} from "@/lib/openrouter-client";
import { buildCatalogContext } from "@/lib/catalog-context";
import {
  extractAgendamentoMarker,
  type AgendamentoMarker,
} from "@/lib/agendamento-parser";
import { sendAgendamentoEmail } from "@/lib/email-resend";
import { addLead } from "@/lib/lead-store";
import { PROPERTIES } from "@/components/sections/crm/mock";
import {
  createConversation,
  appendMessage,
  bindLeadToConversation,
  markConversationHasBooking,
  getConversation,
} from "@/lib/conversation-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const OPEN_TAG = "[[AGENDAMENTO]]";
const CLOSE_TAG = "[[/AGENDAMENTO]]";
const HOLDBACK = OPEN_TAG.length - 1;

// Dedup in-memory de agendamentos disparados — evita reenviar email se a IA
// emitir o marker em múltiplas mensagens consecutivas confirmando o mesmo lead.
// Em produção isso vai pro Redis/DB; aqui Map é suficiente pra demo.
const DEDUP_TTL_MS = 10 * 60 * 1000; // 10 minutos
const dedupRegistry = new Map<string, number>();

function dedupKey(m: AgendamentoMarker): string {
  const phone = m.whatsapp.replace(/\D/g, "");
  return `${m.nome.trim().toLowerCase()}|${phone}|${m.imovelId.trim().toLowerCase()}`;
}

function alreadyDispatched(m: AgendamentoMarker): boolean {
  const k = dedupKey(m);
  const last = dedupRegistry.get(k);
  const now = Date.now();
  // Limpeza preguiçosa
  for (const [key, ts] of dedupRegistry) {
    if (now - ts > DEDUP_TTL_MS) dedupRegistry.delete(key);
  }
  if (last && now - last < DEDUP_TTL_MS) return true;
  dedupRegistry.set(k, now);
  return false;
}

interface Body {
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
  context?: string;
  conversationId?: string;
  sessionId?: string;
}

function fmtBRL(n: number) {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

async function dispatchAgendamento(marker: AgendamentoMarker, convId: string) {
  const imovel = PROPERTIES.find((p) => p.id === marker.imovelId);
  const setor: "vendas" | "locacao" =
    imovel?.finalidade === "aluguel" ? "locacao" : "vendas";

  // 1) Cria o lead no store (vai aparecer na coluna 'visita' do Kanban)
  if (imovel) {
    const lead = addLead({
      nome: marker.nome,
      whatsapp: marker.whatsapp,
      imovelId: marker.imovelId,
      bairro: imovel.bairro,
      preco: imovel.preco,
      finalidade: imovel.finalidade,
      conversationId: convId,
    });
    console.log("[lead-store] lead criado:", lead.id, lead.nome, "→ visita");
    bindLeadToConversation(convId, lead.id);
    markConversationHasBooking(convId);
  }

  try {
    await sendAgendamentoEmail({
      nome: marker.nome,
      whatsapp: marker.whatsapp,
      imovelId: marker.imovelId,
      periodo: marker.periodo,
      imovelTitulo: imovel?.titulo,
      imovelEndereco: imovel?.endereco,
      imovelBairro: imovel?.bairro,
      imovelPreco: imovel
        ? imovel.finalidade === "aluguel"
          ? `${fmtBRL(imovel.preco)}/mês`
          : fmtBRL(imovel.preco)
        : undefined,
      imovelFotoUrl: imovel?.fotos[0],
      setor,
    });
    console.log(
      "[agendamento] email enviado com sucesso pro setor=%s imovel=%s",
      setor,
      marker.imovelId
    );
  } catch (err) {
    console.error(
      "[agendamento] falha ao disparar email:",
      err instanceof Error ? err.message : err
    );
  }
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  if (!Array.isArray(body.messages) || body.messages.length === 0) {
    return new Response(JSON.stringify({ error: "messages requerido" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }

  // Resolve conversa: usa convId existente se válido, senão cria uma nova.
  let convId = body.conversationId;
  if (!convId || !getConversation(convId)) {
    const newConv = createConversation({
      channel: "web",
      sessionId: body.sessionId,
    });
    convId = newConv.id;
  }
  // Captura imutável pro closure do stream.
  const finalConvId: string = convId;

  // Persiste a última mensagem do usuário antes do stream.
  const lastUserMsg = body.messages.filter((m) => m.role === "user").at(-1);
  if (lastUserMsg) {
    appendMessage(finalConvId, {
      direction: "inbound",
      sender: "lead",
      content: String(lastUserMsg.content ?? ""),
      nome: "Visitante",
    });
  }

  const catalogContext = buildCatalogContext();
  const systemContent = body.context
    ? `${DINAMIC_SYSTEM_PROMPT}\n\n---\n${catalogContext}\n\n---\nCONTEXTO DA TELA ATUAL: ${body.context}`
    : `${DINAMIC_SYSTEM_PROMPT}\n\n---\n${catalogContext}`;

  const messages: OpenRouterMessage[] = [
    { role: "system", content: systemContent },
    ...body.messages.map((m) => ({
      role: m.role,
      content: String(m.content ?? ""),
    })),
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      let buffer = "";
      let capturing = false;
      let fullText = "";

      const emit = (text: string) => {
        if (!text) return;
        controller.enqueue(encoder.encode(text));
      };

      try {
        for await (const chunk of streamChat(messages, { signal: req.signal })) {
          fullText += chunk;
          buffer += chunk;

          // Loop de drenagem do buffer — pode haver transição
          // passthrough → capturing → passthrough na mesma iteração.
          let madeProgress = true;
          while (madeProgress) {
            madeProgress = false;

            if (!capturing) {
              const openIdx = buffer.indexOf(OPEN_TAG);
              if (openIdx !== -1) {
                // Emite tudo antes da tag, descarta a tag, entra em capturing.
                emit(buffer.slice(0, openIdx));
                buffer = buffer.slice(openIdx + OPEN_TAG.length);
                capturing = true;
                madeProgress = true;
              } else {
                // Sem tag à vista: emite tudo menos os últimos HOLDBACK chars
                // (proteção contra tag parcial no final do chunk).
                if (buffer.length > HOLDBACK) {
                  emit(buffer.slice(0, buffer.length - HOLDBACK));
                  buffer = buffer.slice(buffer.length - HOLDBACK);
                }
              }
            } else {
              const closeIdx = buffer.indexOf(CLOSE_TAG);
              if (closeIdx !== -1) {
                // Bloco completo: descarta tudo até e incluindo a tag de fecho.
                buffer = buffer.slice(closeIdx + CLOSE_TAG.length);
                capturing = false;
                madeProgress = true;
              }
              // Senão, continua bufferizando até achar o fecho.
            }
          }
        }

        // Stream do modelo terminou. Drena resto do buffer.
        if (!capturing && buffer.length > 0) {
          emit(buffer);
        }
        // Se ainda em capturing aqui = modelo nunca fechou a tag. Descarta.

        // Tenta extrair marker do texto completo (incluindo o que foi descartado).
        const { marker } = extractAgendamentoMarker(fullText);
        console.log(
          "[chat] stream finalizado. tamanho=%d marker=%s",
          fullText.length,
          marker ? "DETECTADO" : "ausente"
        );
        if (marker) {
          if (alreadyDispatched(marker)) {
            console.log(
              "[agendamento] DUPLICADO ignorado (mesmo lead nos últimos 10min):",
              dedupKey(marker)
            );
          } else {
            console.log("[agendamento] disparando email:", marker);
            // Fire-and-forget: não bloqueia o fechamento do stream.
            void dispatchAgendamento(marker, finalConvId);
          }
        } else if (
          fullText.toLowerCase().includes("vou encaminhar") ||
          fullText.toLowerCase().includes("agendar a visita")
        ) {
          console.warn(
            "[agendamento] IA disse que ia encaminhar mas NÃO emitiu o marker [[AGENDAMENTO]]. Texto completo abaixo (revisar prompt):"
          );
          console.warn(fullText);
        }

        // Persiste a resposta da IA na conversa (sem o marker, que o user nunca vê).
        const cleanReply = fullText
          .replace(/\[\[AGENDAMENTO\]\][\s\S]*?\[\[\/AGENDAMENTO\]\]/g, "")
          .trim();
        if (cleanReply) {
          appendMessage(finalConvId, {
            direction: "outbound",
            sender: "ai",
            content: cleanReply,
            nome: "IA Dinamic",
          });
        }

        controller.close();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Erro ao chamar OpenRouter";
        controller.enqueue(encoder.encode(`\n\n[erro: ${msg}]`));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-content-type-options": "nosniff",
      "x-conversation-id": finalConvId,
      "access-control-expose-headers": "x-conversation-id",
    },
  });
}
