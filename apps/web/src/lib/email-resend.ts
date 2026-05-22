/**
 * Email transport via Resend (apenas testes).
 * Em produção será substituído pelo adapter Evolution/Meta WhatsApp.
 *
 * ENV: RESEND_API_KEY (obrigatório), RESEND_FROM (opcional, default abaixo)
 */
import { Resend } from "resend";

const FROM_DEFAULT = "Dinamic IA <onboarding@resend.dev>"; // domínio de sandbox do Resend
// Em sandbox do Resend só consegue enviar pro email da conta que criou a key.
// Pra mandar pros emails reais do time, verifique um domínio em resend.com/domains
// e adicione-os via env RESEND_TO="email1@x.com,email2@y.com".
const TO_DEFAULT = ["tiagosantini87@gmail.com"];

function getRecipients(): string[] {
  const raw = process.env.RESEND_TO?.trim();
  if (!raw) return TO_DEFAULT;
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export interface AgendamentoPayload {
  nome: string;
  whatsapp: string;
  imovelId: string;
  periodo: string; // "manhã" | "tarde" | "qualquer" — string livre
  imovelTitulo?: string; // pode vir do catálogo no chamador
  imovelEndereco?: string;
  imovelBairro?: string;
  imovelPreco?: string; // já formatado em BRL
  imovelFotoUrl?: string;
  setor?: "vendas" | "locacao";
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error(
      "RESEND_API_KEY ausente — configure no .env.local da raiz do monorepo.",
    );
  }
  return new Resend(key);
}

function sanitizeWhatsappForLink(raw: string): string {
  let digits = raw.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    digits = digits.replace(/^0+/, "");
  }
  if (!digits.startsWith("55")) {
    digits = `55${digits}`;
  }
  return digits;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildHtml(p: AgendamentoPayload): string {
  const setorLabel = p.setor === "vendas" ? "Vendas" : "Locação";
  const waDigits = sanitizeWhatsappForLink(p.whatsapp);
  const waHref = `https://wa.me/${waDigits}`;
  const titulo = p.imovelTitulo ?? p.imovelId;
  const enderecoParts = [p.imovelEndereco, p.imovelBairro]
    .filter((x): x is string => Boolean(x && x.trim().length))
    .map(escapeHtml)
    .join(", ");

  const fotoBlock = p.imovelFotoUrl
    ? `<img src="${escapeHtml(p.imovelFotoUrl)}" alt="${escapeHtml(titulo)}" style="width:100%; max-height:200px; object-fit:cover; border-radius:8px; margin-top:12px" />`
    : "";

  const precoRow = p.imovelPreco
    ? `<tr><td style="padding:6px 0; color:#64748b; width:140px;">Valor</td><td style="padding:6px 0; color:#0f172a; font-weight:600;">${escapeHtml(p.imovelPreco)}</td></tr>`
    : "";

  const enderecoRow = enderecoParts
    ? `<tr><td style="padding:6px 0; color:#64748b; width:140px;">Endereço</td><td style="padding:6px 0; color:#0f172a;">${enderecoParts}</td></tr>`
    : "";

  return `<!doctype html>
<html lang="pt-BR">
  <body style="margin:0; padding:24px; background:#f1f5f9;">
    <div style="font-family: Inter, Arial, sans-serif; max-width: 560px; margin: 0 auto; background:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(15,23,42,0.08);">
      <div style="background:#4F46E5; padding:20px 24px;">
        <div style="color:#ffffff; font-size:18px; font-weight:700; line-height:1.3;">Novo agendamento de visita</div>
        <div style="color:#c7d2fe; font-size:13px; margin-top:4px;">Dinamic Imobiliária · IA</div>
      </div>
      <div style="padding:24px;">
        <table style="width:100%; border-collapse:collapse; font-size:14px;">
          <tbody>
            <tr>
              <td style="padding:6px 0; color:#64748b; width:140px;">Cliente</td>
              <td style="padding:6px 0; color:#0f172a; font-weight:600;">${escapeHtml(p.nome)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#64748b;">WhatsApp</td>
              <td style="padding:6px 0;"><a href="${waHref}" style="color:#4F46E5; text-decoration:none; font-weight:600;">${escapeHtml(p.whatsapp)}</a></td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#64748b;">Imóvel</td>
              <td style="padding:6px 0; color:#0f172a;">${escapeHtml(titulo)} <span style="color:#94a3b8;">(${escapeHtml(p.imovelId)})</span></td>
            </tr>
            ${enderecoRow}
            ${precoRow}
            <tr>
              <td style="padding:6px 0; color:#64748b;">Período preferido</td>
              <td style="padding:6px 0; color:#0f172a;">${escapeHtml(p.periodo)}</td>
            </tr>
            <tr>
              <td style="padding:6px 0; color:#64748b;">Setor</td>
              <td style="padding:6px 0;"><span style="display:inline-block; padding:2px 10px; background:#eef2ff; color:#4338ca; border-radius:999px; font-size:12px; font-weight:600;">${setorLabel}</span></td>
            </tr>
          </tbody>
        </table>
        ${fotoBlock}
      </div>
      <div style="padding:14px 24px; background:#f8fafc; border-top:1px solid #e2e8f0; color:#94a3b8; font-size:12px; line-height:1.5;">
        Disparado automaticamente pela IA Dinamic — confirme o agendamento pelo WhatsApp do cliente.
        <br />
        <span style="color:#cbd5e1;">agendamento.dinamic.demo</span>
      </div>
    </div>
  </body>
</html>`;
}

function buildText(p: AgendamentoPayload): string {
  const setorLabel = p.setor === "vendas" ? "Vendas" : "Locação";
  const waDigits = sanitizeWhatsappForLink(p.whatsapp);
  const titulo = p.imovelTitulo ?? p.imovelId;
  const endereco = [p.imovelEndereco, p.imovelBairro]
    .filter((x): x is string => Boolean(x && x.trim().length))
    .join(", ");

  const lines = [
    "Novo agendamento de visita — Dinamic Imobiliária · IA",
    "",
    `Cliente: ${p.nome}`,
    `WhatsApp: ${p.whatsapp} (https://wa.me/${waDigits})`,
    `Imóvel: ${titulo} (${p.imovelId})`,
  ];

  if (endereco) lines.push(`Endereço: ${endereco}`);
  if (p.imovelPreco) lines.push(`Valor: ${p.imovelPreco}`);
  lines.push(`Período preferido: ${p.periodo}`);
  lines.push(`Setor: ${setorLabel}`);
  lines.push("");
  lines.push(
    "Disparado automaticamente pela IA Dinamic — confirme o agendamento pelo WhatsApp do cliente.",
  );
  lines.push("agendamento.dinamic.demo");

  return lines.join("\n");
}

export async function sendAgendamentoEmail(payload: AgendamentoPayload) {
  const resend = getResend();
  const setorLabel = payload.setor === "vendas" ? "Vendas" : "Locação";
  const subject = `[Dinamic IA] Novo agendamento — ${payload.nome} · ${payload.imovelTitulo ?? payload.imovelId} · ${setorLabel}`;
  const html = buildHtml(payload);
  const text = buildText(payload);

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM ?? FROM_DEFAULT,
    to: getRecipients(),
    subject,
    html,
    text,
  });

  if (error) {
    throw new Error(`Resend error: ${JSON.stringify(error)}`);
  }
}
