/**
 * GET /api/test-email — dispara um email de teste pelo Resend pra validar a integração.
 * Server-only. Não precisa de body, não precisa de IA.
 *
 * Uso: abra http://localhost:3000/api/test-email no navegador.
 * Retorna JSON { ok: true, id } se mandou, ou { ok: false, error } se falhou.
 */
import { NextResponse } from "next/server";
import { sendAgendamentoEmail } from "@/lib/email-resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await sendAgendamentoEmail({
      nome: "Cliente Teste (não é lead real)",
      whatsapp: "(43) 99999-9999",
      imovelId: "im-008",
      periodo: "tarde",
      imovelTitulo: "Casa 3 dorm c/ edícula e quintal grande",
      imovelEndereco: "R. das Hortênsias, 33",
      imovelBairro: "Vila Industrial",
      imovelPreco: "R$ 540.000",
      imovelFotoUrl:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&q=80&auto=format&fit=crop",
      setor: "vendas",
    });
    return NextResponse.json({
      ok: true,
      msg: "Email de teste enviado. Cheque o inbox (default: tiagosantini87@gmail.com — conta Resend). Pra mandar pra outros emails, verifique um domínio em resend.com/domains e configure RESEND_TO no .env.local.",
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
