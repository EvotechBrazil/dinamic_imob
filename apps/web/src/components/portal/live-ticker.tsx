"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const MESSAGES: readonly string[] = [
  "\u{1F916} 3 visitas agendadas pela IA nas últimas 24h",
  "\u{1F50D} 1.247 imóveis pesquisados essa semana",
  "⚡ Tempo médio pra encontrar: 47 segundos",
] as const;

const ROTATION_MS = 4000;

export function LiveTicker(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isPaused) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % MESSAGES.length);
    }, ROTATION_MS);

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPaused]);

  const currentMessage = MESSAGES[currentIndex] ?? MESSAGES[0];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Atividade ao vivo da plataforma"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative z-50 bg-portal-cta-black py-2 px-4 text-xs text-white sm:text-sm"
    >
      <div className="mx-auto flex min-h-[32px] max-w-7xl items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={currentIndex}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="block truncate text-center font-medium tracking-wide"
          >
            {currentMessage}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
