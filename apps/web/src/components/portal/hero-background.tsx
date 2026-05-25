"use client";

import Image from "next/image";

/**
 * HeroBackground — Editorial Noir dark cinematic.
 *
 * 4 camadas empilhadas:
 *  1. Foto da imobiliária com filter animation `portal-hero-img-cycle` (40s
 *     loop dia→entardecer→noite).
 *  2. Overlay céu (`portal-hero-sky`) sincronizado com o ciclo.
 *  3. Vinheta radial + gradient vertical pra escurecer bordas e legibilizar
 *     o painel central.
 *  4. 25 estrelas (`portal-stars` / `portal-star`) visíveis só no trecho
 *     "noite" do keyframe (CSS controla opacity).
 *
 * Tudo aria-hidden + pointer-events-none. CSS-only animations vivem em
 * `apps/web/src/styles/portal-day-night.css` (Agent 1).
 *
 * Squad Editorial Noir · Agent 2.
 */
export function HeroBackground() {
  const stars = [
    { top: "8%", left: "12%", delay: "0s" },
    { top: "15%", left: "88%", delay: "0.5s" },
    { top: "22%", left: "25%", delay: "1.2s" },
    { top: "18%", left: "67%", delay: "0.8s" },
    { top: "32%", left: "42%", delay: "2s" },
    { top: "9%", left: "55%", delay: "1.5s" },
    { top: "28%", left: "8%", delay: "0.3s" },
    { top: "35%", left: "78%", delay: "2.5s" },
    { top: "12%", left: "38%", delay: "1.8s" },
    { top: "25%", left: "92%", delay: "0.6s" },
    { top: "40%", left: "15%", delay: "1.1s" },
    { top: "7%", left: "72%", delay: "2.2s" },
    { top: "19%", left: "48%", delay: "0.4s" },
    { top: "30%", left: "60%", delay: "1.7s" },
    { top: "14%", left: "5%", delay: "2.4s" },
    { top: "38%", left: "35%", delay: "0.9s" },
    { top: "21%", left: "82%", delay: "1.4s" },
    { top: "6%", left: "28%", delay: "0.7s" },
    { top: "33%", left: "95%", delay: "2.6s" },
    { top: "16%", left: "18%", delay: "1.9s" },
    { top: "27%", left: "50%", delay: "1s" },
    { top: "11%", left: "62%", delay: "0.2s" },
    { top: "36%", left: "24%", delay: "2.3s" },
    { top: "23%", left: "70%", delay: "1.6s" },
    { top: "5%", left: "45%", delay: "2.1s" },
  ];

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
    >
      {/* Camada 1 — foto da imobiliária com ciclo dia→noite */}
      <div className="absolute -inset-[10%] portal-hero-img-cycle">
        <Image
          src="/portal/frente-imob.webp"
          alt=""
          fill
          priority
          quality={95}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Camada 2 — overlay céu animado */}
      <div className="portal-hero-sky absolute inset-0" />

      {/* Camada 3 — vinheta dark sobre tudo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(11, 11, 20, 0.5) 60%, rgba(11, 11, 20, 0.95) 100%), linear-gradient(180deg, rgba(11,11,20,0.4) 0%, transparent 30%, transparent 70%, rgba(11,11,20,0.9) 100%)",
        }}
      />

      {/* Camada 4 — estrelas (só visíveis à noite via keyframe sync) */}
      <div className="portal-stars absolute inset-0">
        {stars.map((s, i) => (
          <span
            key={i}
            className="portal-star"
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>
    </div>
  );
}
