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
  conversationId: string | null;
  sessionId: string;
  /**
   * Quando a IA confirma agendamento ([[AGENDAMENTO]] disparado server-side),
   * guardamos o convId aqui pra disparar o toast "Ver na Inbox →" no widget.
   * Cliente limpa via dismissBookingToast() ou no próximo reset.
   */
  bookingConfirmedConvId: string | null;
}

export function useChat() {
  const [state, setState] = React.useState<State>(() => {
    if (typeof window === "undefined") {
      return {
        messages: [],
        isStreaming: false,
        error: null,
        context: null,
        conversationId: null,
        sessionId: "",
        bookingConfirmedConvId: null,
      };
    }
    let sessionId = window.localStorage.getItem("dinamic_session_id");
    if (!sessionId) {
      sessionId =
        typeof crypto !== "undefined" && "randomUUID" in crypto
          ? crypto.randomUUID()
          : `s-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
      window.localStorage.setItem("dinamic_session_id", sessionId);
    }
    const conversationId = window.localStorage.getItem("dinamic_chat_conv_id");
    return {
      messages: [],
      isStreaming: false,
      error: null,
      context: null,
      conversationId,
      sessionId,
      bookingConfirmedConvId: null,
    };
  });

  const abortRef = React.useRef<AbortController | null>(null);

  const reset = React.useCallback(() => {
    abortRef.current?.abort();
    if (typeof window !== "undefined") {
      window.localStorage.removeItem("dinamic_chat_conv_id");
    }
    setState((s) => ({
      ...s,
      messages: [],
      isStreaming: false,
      error: null,
      context: null,
      conversationId: null,
      bookingConfirmedConvId: null,
    }));
  }, []);

  const dismissBookingToast = React.useCallback(() => {
    setState((s) => ({ ...s, bookingConfirmedConvId: null }));
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
            conversationId: state.conversationId ?? undefined,
            sessionId: state.sessionId,
          }),
          signal: controller.signal,
        });

        if (!res.ok || !res.body) {
          throw new Error(`HTTP ${res.status}`);
        }

        const returnedConvId = res.headers.get("x-conversation-id");
        if (returnedConvId && returnedConvId !== state.conversationId) {
          if (typeof window !== "undefined") {
            window.localStorage.setItem("dinamic_chat_conv_id", returnedConvId);
          }
          setState((s) => ({ ...s, conversationId: returnedConvId }));
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

        // Pós-stream: checar se o backend marcou agendamento. Se sim, dispara
        // o toast "Ver na Inbox →" no widget. Usa o convId retornado no header
        // (mais recente) com fallback pro state.
        const finalConvId = returnedConvId ?? state.conversationId;
        if (finalConvId) {
          try {
            const detail = await fetch(`/api/conversations/${finalConvId}`, {
              cache: "no-store",
            });
            if (detail.ok) {
              const data = (await detail.json()) as {
                conversation?: { hasBooking?: boolean };
              };
              if (data.conversation?.hasBooking) {
                setState((s) =>
                  s.bookingConfirmedConvId === finalConvId
                    ? s
                    : { ...s, bookingConfirmedConvId: finalConvId }
                );
              }
            }
          } catch {
            // network falhou — silencioso, o toast só não aparece
          }
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
    conversationId: state.conversationId,
    bookingConfirmedConvId: state.bookingConfirmedConvId,
    send,
    setContext,
    stop,
    reset,
    dismissBookingToast,
  };
}
