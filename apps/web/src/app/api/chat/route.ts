/**
 * POST /api/chat — stream de respostas da IA Dinamic via OpenRouter (Qwen3.7-max).
 * Server-only: a API key nunca sai do servidor.
 *
 * Body:
 *   { messages: Array<{ role: 'user'|'assistant', content: string }> }
 *
 * Response: text/plain streaming (chunks de tokens do modelo).
 */
import { NextRequest } from "next/server";
import {
  DINAMIC_SYSTEM_PROMPT,
  streamChat,
  type OpenRouterMessage,
} from "@/lib/openrouter-client";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  messages?: Array<{ role: "user" | "assistant"; content: string }>;
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

  const messages: OpenRouterMessage[] = [
    { role: "system", content: DINAMIC_SYSTEM_PROMPT },
    ...body.messages.map((m) => ({
      role: m.role,
      content: String(m.content ?? ""),
    })),
  ];

  const encoder = new TextEncoder();
  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        for await (const chunk of streamChat(messages, {
          signal: req.signal,
        })) {
          controller.enqueue(encoder.encode(chunk));
        }
        controller.close();
      } catch (err) {
        const msg =
          err instanceof Error ? err.message : "Erro ao chamar OpenRouter";
        controller.enqueue(
          encoder.encode(`\n\n[erro: ${msg}]`)
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-cache, no-transform",
      "x-content-type-options": "nosniff",
    },
  });
}
