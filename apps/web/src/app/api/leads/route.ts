/**
 * GET /api/leads — retorna todos os leads do store in-memory.
 * Inicializado a partir do KANBAN_LEADS mock; cresce a cada agendamento confirmado pela IA.
 */
import { NextResponse } from "next/server";
import { listLeads } from "@/lib/lead-store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ leads: listLeads() });
}
