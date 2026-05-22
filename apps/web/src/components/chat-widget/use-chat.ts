"use client";

import * as React from "react";

export interface UIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  ts: number;
}

interface State {
  messages: UIChatMessage[];
  isStreaming: boolean;
  error: string | null;
  context: string | null;
}

export function useChat() {
  const [state, setState] = React.useState<State>({
    messages: [],
    isStreaming: false,
    error: null,
    context: null,
  });

  const abortRef = React.useRef<AbortController | null>(null);

  const reset = React.useCallback(() => {
    abortRef.current?.abort();
    setState({ messages: [], isStreaming: false, error: null, context: null });
  }, []);

  const stop = React.useCallback(() => {
    abortRef.current?.abort();
    setState((s) => ({ ...s, isStreaming: false }));
  }, []);

  const setContext = React.useCallback((ctx: string | null) => {
    setState((s) => ({ ...s, context: ctx }));
  }, []);

  const send = React.useCallback(
    async (input: string, overrideContext?: string | null) => {
      const text = input.trim();
      if (!text) return;

      const userMsg: UIChatMessage = {
        id: `u-${Date.now()}`,
        role: "user",
        content: text,
        ts: Date.now(),
      };
      const aiId = `a-${Date.now()}`;
      const aiMsg: UIChatMessage = {
        id: aiId,
        role: "assistant",
        content: "",
        ts: Date.now(),
      };

      const effectiveContext =
        overrideContext !== undefined ? overrideContext : state.context;

      setState((s) => ({
        ...s,
        messages: [...s.messages, userMsg, aiMsg],
        isStreaming: true,
        error: null,
        context:
          overrideContext !== undefined ? overrideContext : s.context,
      }));

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const history = [...state.messages, userMsg].map((m) => ({
          role: m.role,
          content: m.content,
        }));

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            messages: history,
            context: effectiveContext ?? undefined,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          const chunk = decoder.decode(value, { stream: true });
          setState((s) => ({
            ...s,
            messages: s.messages.map((m) =>
              m.id === aiId ? { ...m, content: m.content + chunk } : m
            ),
          }));
        }

        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("dinamic:chat-ended"));
        }
      } catch (err) {
        if ((err as Error)?.name === "AbortError") {
          // cancelado pelo usuário, mantém o conteúdo parcial
        } else {
          const msg =
            err instanceof Error ? err.message : "Erro ao conversar com a IA";
          setState((s) => ({ ...s, error: msg }));
        }
      } finally {
        setState((s) => ({ ...s, isStreaming: false }));
        abortRef.current = null;
      }
    },
    [state.messages, state.context]
  );

  return {
    messages: state.messages,
    isStreaming: state.isStreaming,
    error: state.error,
    context: state.context,
    send,
    setContext,
    stop,
    reset,
  };
}
