import { NextRequest } from "next/server";
import { appendMessage, getConversation } from "@/lib/conversation-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface Body {
  content?: string;
  agentName?: string;
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const id = params.id;
  if (!id) {
    return new Response(JSON.stringify({ error: "id required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const conv = getConversation(id);
  if (!conv) {
    return new Response(JSON.stringify({ error: "conversation not found" }), {
      status: 404,
      headers: { "content-type": "application/json" },
    });
  }
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return new Response(JSON.stringify({ error: "invalid json" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const content = String(body.content ?? "").trim();
  if (!content) {
    return new Response(JSON.stringify({ error: "content required" }), {
      status: 400,
      headers: { "content-type": "application/json" },
    });
  }
  const msg = appendMessage(id, {
    direction: "outbound",
    sender: "corretor",
    content,
    nome: body.agentName ?? "Corretor Dinamic",
  });
  return new Response(JSON.stringify({ message: msg }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
