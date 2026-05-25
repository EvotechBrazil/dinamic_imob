import { NextRequest } from "next/server";
import { getConversation, markConversationRead } from "@/lib/conversation-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
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
  // Auto-marcar como lida no GET (demo: admin abriu = zera unread)
  markConversationRead(id);
  return new Response(JSON.stringify({ conversation: conv }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
