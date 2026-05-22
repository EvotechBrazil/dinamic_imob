/**
 * Utilities compartilhadas do portal público Dinamic
 * Consumidas por hero-chat, header, ticker etc.
 */

/**
 * Retorna saudação time-aware em pt-BR.
 * Usado no hero-chat como H1 principal.
 */
export function getGreeting(now: Date = new Date()): string {
  const h = now.getHours();
  if (h < 12) return "Bom dia!";
  if (h < 18) return "Boa tarde!";
  return "Boa noite!";
}

/**
 * Formata preço em BRL pt-BR. Se finalidade=aluguel concatena "/mês".
 */
export function formatBRL(
  preco: number,
  finalidade?: "venda" | "aluguel" | "lancamento",
): string {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const base = formatter.format(preco);
  return finalidade === "aluguel" ? `${base}/mês` : base;
}

/**
 * Heurística pra detectar mensagem de IA que confirmou agendamento de visita.
 *
 * IDEAL: backend deveria expor o marker estruturado [[AGENDAMENTO]]{json}[[/AGENDAMENTO]]
 * via header X-Agendamento-Fired ou chunk sentinel.
 * Por enquanto, fallback heurístico alinhado ao system prompt da IA Dinamic.
 *
 * Markers PRIMÁRIOS dispatcham confete sozinhos (alta especificidade).
 * Markers CONTEXTUAIS exigem âncora (agend/visit/marcad) pra evitar false positive
 * em "vou encaminhar o anúncio" etc.
 *
 * Usado em: hero-chat.tsx → fireGoldConfetti.
 */
export function isAgendamentoConfirmado(content: string): boolean {
  const normalized = content.toLowerCase();

  // Markers principais (cobrem alta confiança sozinhos)
  const primaryMarkers = [
    "agendamento confirmado",
    "visita confirmada",
    "visita marcada",
    "confirmado a visita",
    "confirmada sua visita",
    "está confirmada", // novo: cobre "sua visita ao apto X está confirmada"
    "agendei pra",
    "agendei para",
    "agendar a visita", // marker canônico do system prompt da IA
  ];
  if (primaryMarkers.some((m) => normalized.includes(m))) return true;

  // Markers contextuais: só dispara confete se vier acompanhado de palavra-âncora
  const contextualMarkers = [
    "vou encaminhar",
    "vou repassar",
    "tá agendado",
    "está agendado",
    "agendado pra",
    "agendado para",
    "te vejo lá",
  ];
  const hasContextual = contextualMarkers.some((m) => normalized.includes(m));
  if (!hasContextual) return false;

  // Âncora: a frase precisa mencionar agendar, visita ou marcada
  return /(agend|visit|marcad)/i.test(normalized);
}

/**
 * Helper de scroll-to com smooth behavior.
 */
export function scrollToId(id: string): void {
  if (typeof window === "undefined") return;
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

/**
 * Custom event types pro portal (cross-component communication sem store).
 */
export type PortalShortcutType =
  | "Comprar casa"
  | "Alugar apartamento"
  | "Terrenos"
  | "Comerciais"
  | "Lançamentos";

export interface PortalShortcutDetail {
  type: PortalShortcutType;
}

export interface OpenChatWidgetDetail {
  prompt: string;
}

/**
 * Dispatcher pro evento global de shortcut (Squad A → Squad B listener).
 */
export function dispatchPortalShortcut(type: PortalShortcutType): void {
  if (typeof window === "undefined") return;
  const ev = new CustomEvent<PortalShortcutDetail>("dinamic:portal-shortcut", {
    detail: { type },
  });
  window.dispatchEvent(ev);
}

/**
 * Dispatcher pro evento global "abre chat widget tradicional" (Squad C floating
 * action e cards de imóvel da Squad B).
 */
export function dispatchOpenChatWidget(prompt: string): void {
  if (typeof window === "undefined") return;
  const ev = new CustomEvent<OpenChatWidgetDetail>(
    "dinamic:open-chat-widget",
    {
      detail: { prompt },
    },
  );
  window.dispatchEvent(ev);
}
