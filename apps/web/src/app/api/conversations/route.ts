import { NextRequest } from "next/server";
import { listConversations } from "@/lib/conversation-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest) {
  const conversations = listConversations();
  return new Response(JSON.stringify({ conversations }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}
