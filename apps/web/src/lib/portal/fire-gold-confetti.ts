/**
 * Confete dourado CSS-only (sem dep nova).
 * Cria N divs absolutas + classe .portal-confetti-piece (animação em portal-tokens.css)
 * e limpa após o ciclo.
 *
 * Uso: import { fireGoldConfetti } from "@/lib/portal/fire-gold-confetti";
 * fireGoldConfetti();
 */

const GOLD_PALETTE = [
  "#d79a27",
  "#b07f1e",
  "#fbf3de",
  "#ffd166",
  "#f5b400",
  "#e8a72e",
];

interface FireGoldConfettiOptions {
  /** Quantos confetes disparar (default 80) */
  pieces?: number;
  /** Duração total em ms antes de limpar do DOM (default 2000) */
  duration?: number;
}

export function fireGoldConfetti(options: FireGoldConfettiOptions = {}): void {
  if (typeof window === "undefined" || typeof document === "undefined") return;

  const { pieces = 80, duration = 2000 } = options;

  const container = document.createElement("div");
  container.setAttribute("data-portal-confetti", "");
  container.style.cssText = [
    "position:fixed",
    "inset:0",
    "pointer-events:none",
    "z-index:9999",
    "overflow:hidden",
  ].join(";");
  document.body.appendChild(container);

  for (let i = 0; i < pieces; i++) {
    const piece = document.createElement("span");
    piece.className = "portal-confetti-piece";

    const color = GOLD_PALETTE[i % GOLD_PALETTE.length];
    const leftPct = Math.random() * 100;
    const delayMs = Math.random() * 400;
    const durationMs = 1200 + Math.random() * 600;
    const scale = 0.6 + Math.random() * 0.8;
    const rotate = Math.random() * 360;
    const shape = Math.random() > 0.5 ? "50%" : "2px";

    piece.style.cssText = [
      `left:${leftPct}%`,
      `background:${color}`,
      `border-radius:${shape}`,
      `transform:rotate(${rotate}deg) scale(${scale})`,
      `animation-delay:${delayMs}ms`,
      `animation-duration:${durationMs}ms`,
    ].join(";");

    container.appendChild(piece);
  }

  window.setTimeout(() => {
    container.remove();
  }, duration);
}
