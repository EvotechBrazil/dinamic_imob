"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  // Parallax leve do conteúdo central pra dar profundidade no scroll.
  const contentY = useTransform(scrollY, [0, 500], [0, -40]);
  const contentOpacity = useTransform(scrollY, [0, 400], [1, 0.4]);

  const HEADLINE_WORDS = ["ENCONTRE", "O", "IMÓVEL", "CERTO"] as const;

  return (
    <section
      aria-label="Hero Dinamic Imobiliária"
      className={cn(
        "relative min-h-[calc(100svh-80px)] flex items-center justify-center px-4 py-24 overflow-hidden",
        "text-[var(--noir-text)]",
      )}
    >
      <HeroBackground />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8"
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

        {/* Headline gigante — word-by-word fade+slide-up */}
        <h1
          aria-label="Encontre o imóvel certo"
          className="font-bold leading-[0.95] tracking-tight text-[var(--noir-text)] flex flex-wrap justify-center gap-x-[0.25em] gap-y-2"
          style={{
            fontFamily: "var(--font-syncopate), Manrope, ui-sans-serif, system-ui",
            fontSize: "clamp(40px, 9vw, 120px)",
          }}
        >
          {HEADLINE_WORDS.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.35 + i * 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

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

        {/* CTA pill âmbar */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 sm:mt-4"
        >
          <a
            href="#conversa-ia"
            aria-label="Falar com a IA da Dinamic — rolar até a seção de conversa"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--noir-amber)] px-7 py-4 text-sm sm:text-base font-bold uppercase tracking-[0.18em] text-[var(--noir-bg)] shadow-[0_12px_32px_rgba(245,158,11,0.35)] hover:shadow-[0_18px_42px_rgba(245,158,11,0.55)] hover:bg-[var(--noir-amber-soft)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--noir-bg)] focus-visible:ring-[var(--noir-amber)] transition-all duration-300"
            style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
          >
            <span>Falar com a IA</span>
            <ChevronDown
              className="h-4 w-4 sm:h-5 sm:w-5 transition-transform duration-300 group-hover:translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll cue absoluto */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none"
        aria-hidden="true"
      >
        <span
          className="uppercase tracking-[0.4em] text-[10px] text-[var(--noir-text-subtle)]"
          style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
        >
          Role
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--noir-border)] bg-[color:color-mix(in_oklab,var(--noir-bg)_60%,transparent)] backdrop-blur-sm"
        >
          <ChevronDown className="h-4 w-4 text-[var(--noir-text-mute)]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
