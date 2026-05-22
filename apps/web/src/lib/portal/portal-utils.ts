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
 * Usado no hero-chat pra disparar confete dourado.
 * Match leve — false positive aceitável (recompensa visual extra > falta dela).
 */
export function isAgendamentoConfirmado(content: string): boolean {
  const normalized = content.toLowerCase();
  const markers = [
    "vou encaminhar",
    "vou repassar",
    "tá agendado",
    "está agendado",
    "agendamento confirmado",
    "visita confirmada",
    "visita marcada",
    "te vejo lá",
    "anotei aqui",
    "confirmado a visita",
    "confirmada sua visita",
    "agendei pra",
    "agendei para",
  ];
  return markers.some((m) => normalized.includes(m));
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
