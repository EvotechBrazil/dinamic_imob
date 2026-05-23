"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "./text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface Stat {
  num: string;
  label: string;
}

const STATS: ReadonlyArray<Stat> = [
  { num: "628", label: "Imóveis ativos" },
  { num: "12", label: "Anos no mercado" },
  { num: "8472-F", label: "CRECI" },
];

export function IntroSection() {
  const statsRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const nums = el.querySelectorAll<HTMLElement>("[data-stat-num]");
    nums.forEach((node) => {
      const finalText = node.textContent ?? "";
      const finalNum = parseInt(finalText.replace(/[^0-9]/g, ""), 10);
      if (!Number.isFinite(finalNum) || finalNum > 99999) return;
      ScrollTrigger.create({
        trigger: node,
        start: "top 80%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: finalNum,
            duration: 2,
            ease: "power3.out",
            onUpdate: () => {
              node.textContent = Math.round(obj.val).toString();
            },
            onComplete: () => {
              node.textContent = finalText;
            },
          });
        },
      });
    });
  }, []);

  return (
    <section className="bg-noir-bg text-noir-text min-h-screen px-6 md:px-[8vw] py-[20vh] grid md:grid-cols-2 gap-12 md:gap-[8vw] items-start">
      <TextReveal
        text="IMOBILIÁRIA LOCAL, IA 24/7"
        as="h2"
        className="font-display-noir font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight m-0"
      />
      <div>
        <p className="font-body-noir font-light text-lg md:text-xl leading-relaxed text-noir-text-mute">
          Há 12 anos servindo Arapongas com olho técnico e atendimento humano.
          Nossa IA atende em 30 segundos, dia ou noite, e passa o bastão pra
          um corretor especialista quando você quer agendar visita.
        </p>
        <div ref={statsRef} className="mt-20 grid grid-cols-3 gap-6 pt-8 border-t border-noir-amber">
          {STATS.map((s) => (
            <div key={s.label}>
              <div
                data-stat-num
                className="font-display-noir font-bold text-4xl md:text-5xl lg:text-6xl text-noir-text leading-none mb-3"
              >
                {s.num}
              </div>
              <div className="font-body-noir text-[11px] uppercase tracking-[0.25em] text-noir-text-mute">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
