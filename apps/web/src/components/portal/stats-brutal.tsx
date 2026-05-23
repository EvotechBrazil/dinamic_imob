"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STATS = [
  { num: "12", suffix: "", label: "Anos no mercado", amber: false },
  { num: "628", suffix: "", label: "Imóveis ativos", amber: true },
  { num: "97", suffix: "%", label: "Satisfação clientes", amber: false },
];

export function StatsBrutal() {
  const ref = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.querySelectorAll<HTMLElement>("[data-brutal-num]").forEach((node) => {
      const final = node.textContent ?? "";
      const numMatch = final.match(/\d+/);
      if (!numMatch) return;
      const finalNum = parseInt(numMatch[0], 10);
      const suffix = final.replace(numMatch[0], "");
      ScrollTrigger.create({
        trigger: node,
        start: "top 75%",
        once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: finalNum,
            duration: 2.5,
            ease: "power3.out",
            onUpdate: () => {
              node.textContent = Math.round(obj.val).toString() + suffix;
            },
            onComplete: () => {
              node.textContent = final;
            },
          });
        },
      });
    });
  }, []);

  return (
    <section ref={ref} className="bg-noir-bg px-6 md:px-[6vw] py-[30vh] text-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[4vw] items-end">
        {STATS.map((s) => (
          <div key={s.label} className="text-center">
            <div
              data-brutal-num
              className={`font-display-noir font-bold leading-[0.85] tracking-[-0.05em] ${
                s.amber ? "text-noir-amber" : "text-noir-text"
              }`}
              style={{ fontSize: "clamp(120px, 18vw, 240px)" }}
            >
              {s.num}
              {s.suffix}
            </div>
            <div className="font-body-noir text-xs uppercase tracking-[0.35em] text-noir-text-mute mt-6">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
