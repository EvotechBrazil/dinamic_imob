/**
 * OpenRouter client — wrapper sobre @openrouter/sdk com streaming.
 * USO RESTRITO AO SERVER (a key OPENROUTER_API_KEY nunca pode ir pro browser).
 *
 * Inspirado em scripts/test-openrouter.mjs.
 */
import { OpenRouter } from "@openrouter/sdk";

export interface OpenRouterMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface StreamUsage {
  promptTokens?: number;
  completionTokens?: number;
  reasoningTokens?: number;
  totalTokens?: number;
  cost?: number;
}

export const DINAMIC_SYSTEM_PROMPT = `Voce e a IA da Dinamic Imobiliaria, imobiliaria de Arapongas-PR.
Tom: profissional caloroso. Usa "voce", sem girias, no maximo 1 emoji por mensagem.
Como corretor experiente que escuta. Direto ao ponto mas humano.
NUNCA inventar disponibilidade de imovel. NUNCA prometer desconto sem aprovacao.
NUNCA confirmar visita sem agenda. Sempre encaminhar humano em negociacao.
Quando perguntarem sobre imoveis especificos, peca preferencias (bairro, dormitorios, orcamento)
e diga que vai conferir o catalogo com um corretor humano.`;

function getApiKey(): string {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    throw new Error(
      "OPENROUTER_API_KEY ausente — configure em .env.local na raiz do monorepo."
    );
  }
  return apiKey;
}

function getModel(premium = false): string {
  return premium
    ? process.env.OPENROUTER_PREMIUM_MODEL ?? "qwen/qwen3.7-max"
    : process.env.OPENROUTER_DEFAULT_MODEL ?? "qwen/qwen3.7-max";
}

export function getOpenRouterClient() {
  return new OpenRouter({ apiKey: getApiKey() });
}

/**
 * Stream chat completion. Retorna AsyncIterable de chunks de texto.
 * Em paralelo expoe usage no final via callback opcional.
 */
export async function* streamChat(
  messages: OpenRouterMessage[],
  options: {
    premium?: boolean;
    onUsage?: (u: StreamUsage) => void;
    signal?: AbortSignal;
  } = {}
): AsyncGenerator<string, void, unknown> {
  const client = getOpenRouterClient();
  const model = getModel(options.premium);

  const stream = await client.chat.send({
    httpReferer:
      process.env.OPENROUTER_APP_URL ?? "https://dinamicimoveis.com.br",
    appTitle: process.env.OPENROUTER_APP_NAME ?? "Dinamic Imobiliaria",
    chatRequest: {
      model,
      messages,
      stream: true,
    },
  });

  for await (const chunk of stream as AsyncIterable<{
    choices?: Array<{ delta?: { content?: string } }>;
    usage?: {
      prompt_tokens?: number;
      completion_tokens?: number;
      total_tokens?: number;
      cost?: number;
      completion_tokens_details?: { reasoning_tokens?: number };
    };
  }>) {
    if (options.signal?.aborted) return;
    const content = chunk.choices?.[0]?.delta?.content;
    if (content) yield content;
    if (chunk.usage && options.onUsage) {
      options.onUsage({
        promptTokens: chunk.usage.prompt_tokens,
        completionTokens: chunk.usage.completion_tokens,
        reasoningTokens:
          chunk.usage.completion_tokens_details?.reasoning_tokens,
        totalTokens: chunk.usage.total_tokens,
        cost: chunk.usage.cost,
      });
    }
  }
}
