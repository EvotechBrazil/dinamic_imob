"use client";

import { motion } from "framer-motion";

/**
 * HeroBackground — camada decorativa atrás do <HeroChat />.
 *
 * 3 blobs dourados em blur-3xl que se movem MUITO devagar (28-36s loop)
 * sobre um gradient mesh estático suave. Tudo aria-hidden + pointer-events-none
 * pra não atrapalhar leitor de tela nem cliques.
 *
 * Squad A · Agent 6 · uau item F.
 */
export function HeroBackground() {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {/* Camada base — gradient mesh estático, premium leve */}
      <div className="absolute inset-0 bg-gradient-to-br from-portal-gold-soft/20 via-transparent to-portal-bg/40" />

      {/* Blob 1 — canto superior esquerdo, gold principal */}
      <motion.div
        className="absolute -top-32 -left-32 h-[480px] w-[480px] rounded-full bg-portal-gold/20 blur-3xl"
        animate={{
          x: [0, 60, -20, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blob 2 — centro-direita, amber mais quente */}
      <motion.div
        className="absolute top-1/3 -right-24 h-[420px] w-[420px] rounded-full bg-amber-300/25 blur-3xl"
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 50, -20, 0],
          scale: [1, 0.92, 1.06, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
      />

      {/* Blob 3 — canto inferior central, gold-dark mais sutil */}
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[380px] w-[380px] rounded-full bg-portal-gold-dark/15 blur-3xl"
        animate={{
          x: [0, 40, -60, 0],
          y: [0, -30, 20, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{
          duration: 36,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 8,
        }}
      />

      {/* Grain noise sutil — SVG pattern de pontos pra dar textura premium */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.04] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="hero-noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.85"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#hero-noise)" />
      </svg>
    </div>
  );
}
