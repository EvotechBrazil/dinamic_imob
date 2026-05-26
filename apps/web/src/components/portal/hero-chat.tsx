"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { HeroBackground } from "@/components/portal/hero-background";
import { cn } from "@/lib/utils";

/**
 * HeroChat — Editorial Noir hero "puro".
 *
 * Refatorado: o painel lovable de chat (input + chips + proofs) migrou pro
 * componente `ConversationSection` lá no fim da página. Aqui o hero virou
 * apenas:
 *  - background cinematic dia→noite (HeroBackground inalterado)
 *  - eyebrow brutalist (cidade + marca)
 *  - headline gigante Syncopate
 *  - subtítulo Manrope
 *  - CTA pill âmbar que rola pra #conversa-ia
 *  - scroll cue animado no rodapé
 *
 * Nome do arquivo e export `HeroChat` mantidos pra não quebrar imports.
 *
 * Squad Editorial Noir · refator hero puro.
 */
export function HeroChat() {
  const { scrollY } = useScroll();
  // "Amanhecer" do conteúdo: começa fade + leve subida, ganha luz nos
  // primeiros ~280px de scroll e depois desbota saindo. Dá protagonismo
  // ao vídeo no topo e revela o headline conforme a tela rola.
  const contentY = useTransform(scrollY, [0, 280, 700], [40, 0, -60]);
  const contentOpacity = useTransform(
    scrollY,
    [0, 280, 700],
    [0.45, 1, 0.25],
  );

  return (
    <section
      aria-label="Hero Dinamic Imobiliária"
      className={cn(
        "relative min-h-[calc(100svh-80px)] flex items-end justify-center px-4 pt-24 pb-[14vh] md:pb-[10vh] overflow-hidden",
        "text-[var(--noir-text)]",
      )}
    >
      <HeroBackground />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-4 sm:gap-6"
      >
        {/* Eyebrow brutalist */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="uppercase tracking-[0.4em] text-[10px] sm:text-xs text-[var(--noir-amber)]"
          style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
        >
          Dinamic Imobiliária <span aria-hidden="true">·</span> Arapongas-PR
        </motion.p>

        {/* Subtítulo */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base sm:text-lg md:text-xl text-[var(--noir-text-mute)] max-w-2xl leading-relaxed"
          style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
        >
          Atendimento humano + IA 24/7. Em segundos.
        </motion.p>
      </motion.div>
    </section>
  );
}
