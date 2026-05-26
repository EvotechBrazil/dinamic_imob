"use client";

import * as React from "react";
import { TextReveal } from "./text-reveal";
import { cn } from "@/lib/utils";

interface Stat {
  num: string;
  label: string;
}

const STATS: ReadonlyArray<Stat> = [
  { num: "12", label: "Imóveis ativos" },
  { num: "12", label: "Anos no mercado" },
  { num: "8472-F", label: "CRECI" },
];

export function IntroSection() {
  const statsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const nums = Array.from(
      el.querySelectorAll<HTMLElement>("[data-stat-num]"),
    );
    const started = new WeakSet<HTMLElement>();

    function runCountUp(node: HTMLElement) {
      if (started.has(node)) return;
      started.add(node);
      const finalText = node.textContent ?? "";
      const finalNum = parseInt(finalText.replace(/[^0-9]/g, ""), 10);
      if (!Number.isFinite(finalNum)) return;
      const start = performance.now();
      const duration = 2200;
      function tick(now: number) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        node.textContent = Math.round(finalNum * eased).toString();
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          node.textContent = finalText;
        }
      }
      requestAnimationFrame(tick);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const node = entry.target as HTMLElement;
          observer.unobserve(node);
          runCountUp(node);
        });
      },
      { threshold: 0.35 },
    );
    nums.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-noir-bg text-noir-text px-6 md:px-[8vw] py-[8vh] md:py-[12vh] grid md:grid-cols-2 gap-8 md:gap-[6vw] items-start">
      <TextReveal
        text="ENCONTRE O IMÓVEL CERTO"
        as="h1"
        className="font-display-noir font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight m-0"
      />
      <div>
        <p className="font-body-noir font-light text-lg md:text-xl leading-relaxed text-noir-text-mute">
          Há 12 anos servindo Arapongas com olho técnico e atendimento humano.
          Nossa IA atende em 30 segundos, dia ou noite, e passa o bastão pra
          um corretor especialista quando você quer agendar visita.
        </p>
        <div ref={statsRef} className="mt-10 md:mt-14 grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-noir-amber">
          {STATS.map((s, i) => {
            const isCreci = s.label === "CRECI";
            return (
              <div
                key={s.label}
                className={i === STATS.length - 1 ? "col-span-2 sm:col-span-1" : undefined}
              >
                <div
                  data-stat-num
                  className={cn(
                    "font-display-noir font-bold text-noir-text leading-none mb-3 whitespace-nowrap",
                    isCreci
                      ? "text-xl sm:text-3xl md:text-4xl lg:text-5xl"
                      : "text-[28px] sm:text-4xl md:text-5xl lg:text-6xl"
                  )}
                >
                  {s.num}
                </div>
                <div className="font-body-noir text-[11px] uppercase tracking-[0.25em] text-noir-text-mute">
                  {s.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
