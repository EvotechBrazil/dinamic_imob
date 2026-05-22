"use client";

/**
 * Hero conversacional — demo auto-play (uau item A)
 *
 * Quando enabled=true e idleDelayMs (default 6000ms) passa sem reset, dispara
 * uma conversa-demo: onUserMessage (t=0) -> onAiMessage (t=1800ms) -> onEnd (t=8000ms).
 *
 * - enabled=false (durante OU antes do demo) cancela tudo e NÃO chama onEnd.
 * - cancel() faz o mesmo cleanup do enabled=false.
 * - Demo natural ao final NÃO reagenda; só reinicia se enabled passar false→true.
 * - callbackRef pattern garante que callbacks novas (não-memoizadas) não reiniciem o timer.
 */

import * as React from "react";

export interface UseDemoAutoplayOptions {
  enabled: boolean;
  idleDelayMs?: number;
  onStart?: () => void;
  onUserMessage?: (content: string) => void;
  onAiMessage?: (content: string) => void;
  onEnd?: () => void;
}

const DEMO_USER_MESSAGE = "Procuro apartamento 2 dorms no Centro até R$ 2.500";

const DEMO_AI_MESSAGE =
  "Encontrei 4 opções pra você no Centro. Top 3 com base no melhor custo:\n\n" +
  "1. **Apartamento 3 dorm com sacada gourmet** — R$ 2.450/mês — Centro · 78m² · 2 vagas\n" +
  "2. **Apto 2 dorm reformado andar alto** — R$ 2.500/mês — Centro · 65m² · 1 vaga\n" +
  "3. **Apto mobiliado pra estudante** — R$ 1.850/mês — Jd Universitário · 52m² · 1 vaga\n\n" +
  "Quer agendar visita em algum? 🏠";

const USER_MESSAGE_DELAY_MS = 0;
const AI_MESSAGE_DELAY_MS = 1800;
const END_DELAY_MS = 8000;

type TimerRef = React.MutableRefObject<ReturnType<typeof setTimeout> | null>;

export function useDemoAutoplay(options: UseDemoAutoplayOptions): {
  isPlaying: boolean;
  cancel: () => void;
} {
  const { enabled, idleDelayMs = 6000 } = options;

  const [isPlaying, setIsPlaying] = React.useState(false);

  // callbackRef pattern: callbacks novas a cada render não reiniciam o effect
  const callbacksRef = React.useRef(options);
  React.useEffect(() => {
    callbacksRef.current = options;
  });

  // Timers refs — um pra cada estágio
  const idleTimerRef: TimerRef = React.useRef(null);
  const userMsgTimerRef: TimerRef = React.useRef(null);
  const aiMsgTimerRef: TimerRef = React.useRef(null);
  const endTimerRef: TimerRef = React.useRef(null);

  const clearAllTimers = React.useCallback(() => {
    if (idleTimerRef.current !== null) {
      clearTimeout(idleTimerRef.current);
      idleTimerRef.current = null;
    }
    if (userMsgTimerRef.current !== null) {
      clearTimeout(userMsgTimerRef.current);
      userMsgTimerRef.current = null;
    }
    if (aiMsgTimerRef.current !== null) {
      clearTimeout(aiMsgTimerRef.current);
      aiMsgTimerRef.current = null;
    }
    if (endTimerRef.current !== null) {
      clearTimeout(endTimerRef.current);
      endTimerRef.current = null;
    }
  }, []);

  const cancel = React.useCallback(() => {
    clearAllTimers();
    setIsPlaying(false);
  }, [clearAllTimers]);

  React.useEffect(() => {
    if (!enabled) {
      clearAllTimers();
      setIsPlaying(false);
      return;
    }

    idleTimerRef.current = setTimeout(() => {
      idleTimerRef.current = null;
      setIsPlaying(true);
      callbacksRef.current.onStart?.();

      userMsgTimerRef.current = setTimeout(() => {
        userMsgTimerRef.current = null;
        callbacksRef.current.onUserMessage?.(DEMO_USER_MESSAGE);
      }, USER_MESSAGE_DELAY_MS);

      aiMsgTimerRef.current = setTimeout(() => {
        aiMsgTimerRef.current = null;
        callbacksRef.current.onAiMessage?.(DEMO_AI_MESSAGE);
      }, AI_MESSAGE_DELAY_MS);

      endTimerRef.current = setTimeout(() => {
        endTimerRef.current = null;
        setIsPlaying(false);
        callbacksRef.current.onEnd?.();
      }, END_DELAY_MS);
    }, idleDelayMs);

    return () => {
      clearAllTimers();
    };
  }, [enabled, idleDelayMs, clearAllTimers]);

  return { isPlaying, cancel };
}
