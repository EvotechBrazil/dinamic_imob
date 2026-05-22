"use client";

/**
 * <AnimatedNumber />
 *
 * Count-up animation que dispara quando o elemento entra no viewport.
 * Usa framer-motion `useInView` + `animate()` (tween) com easing premium
 * `cubic-bezier(0.22, 1, 0.36, 1)` (easeOutExpo-ish).
 *
 * - `value` é SEMPRE o valor final numérico (ex: 1250, 23, 2.8, 48200).
 * - `format` recebe o número intermediário e devolve a string exibida
 *   (ex: BRL, percentual, com prefixo/sufixo).
 * - `decimals` controla quantas casas o valor intermediário mantém durante
 *   a animação (útil pra 2.8% → 2.8 com 1 casa). Default = 0 (inteiro).
 * - `duration` em segundos (default 1.5).
 *
 * Acessibilidade: respeita `prefers-reduced-motion` — se o usuário pediu
 * pra reduzir movimento, mostra o valor final imediatamente sem animar.
 */

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export interface AnimatedNumberProps {
  /** Valor final pra onde o count-up converge. */
  value: number;
  /** Formatter chamado a cada frame; recebe o número intermediário. */
  format?: (n: number) => string;
  /** Duração total da animação em segundos. Default 1.5. */
  duration?: number;
  /** Casas decimais preservadas no valor intermediário. Default 0. */
  decimals?: number;
  /** Classe opcional pro <span>. */
  className?: string;
}

/** Arredonda mantendo `decimals` casas. */
function roundTo(value: number, decimals: number): number {
  if (decimals <= 0) return Math.round(value);
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function AnimatedNumber({
  value,
  format = (n) => n.toString(),
  duration = 1.5,
  decimals = 0,
  className,
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const prefersReducedMotion = useReducedMotion();
  const [display, setDisplay] = useState<number>(
    prefersReducedMotion ? value : 0
  );

  useEffect(() => {
    if (!inView) return;

    // Respeita prefers-reduced-motion: salta direto pro valor final.
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }

    // Anima de 0 (ou do estado atual) até o valor final. Usamos sempre 0
    // como ponto de partida pra dar o efeito "count-up" premium.
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(roundTo(v, decimals)),
    });

    return () => controls.stop();
  }, [inView, value, duration, decimals, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {format(display)}
    </span>
  );
}
