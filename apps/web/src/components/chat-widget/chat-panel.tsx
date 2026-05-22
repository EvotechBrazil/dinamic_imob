"use client";

import * as React from "react";
import Image from "next/image";
import { X, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ChatMessageBubble } from "./chat-message";
import { ChatInput } from "./chat-input";
import { useChat } from "./use-chat";

interface ChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const SUGGESTIONS = [
  "Quero alugar apto 3 dorm no Jardim Tropical até R$ 2.500",
  "Quais imóveis vocês têm pra venda no Centro?",
  "Como agendo uma visita?",
];

export function ChatPanel({ open, onClose }: ChatPanelProps) {
  const { messages, isStreaming, error, send, stop, reset } = useChat();
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.97 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="fixed bottom-24 right-6 z-[60] flex h-[560px] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl sm:right-8"
          style={{ zIndex: "var(--z-chat)" as unknown as number }}
        >
          {/* header */}
          <div className="flex items-center justify-between border-b border-border bg-gradient-to-r from-primary to-primary-dark px-4 py-3 text-white">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-white shadow-sm ring-1 ring-white/30">
                <Image
                  src="/logo-dinamic.png"
                  alt="Dinamic"
                  width={48}
                  height={32}
                  className="h-6 w-auto"
                />
              </div>
              <div>
                <p className="text-sm font-semibold leading-tight">
                  Fale com a Dinamic
                </p>
                <p className="flex items-center gap-1 text-[11px] leading-tight text-white/80">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Atendimento IA · online agora
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={reset}
                  aria-label="Nova conversa"
                  className="grid h-7 w-7 place-items-center rounded-md text-white/80 transition hover:bg-white/15 hover:text-white"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={onClose}
                aria-label="Fechar"
                className="grid h-7 w-7 place-items-center rounded-md text-white/80 transition hover:bg-white/15 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* messages */}
          <div
            ref={scrollRef}
            className="thin-scroll flex-1 overflow-y-auto bg-app px-3 py-4"
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center px-4 text-center">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="h-5 w-5" />
                </div>
                <h3 className="mt-3 font-display text-base font-semibold text-ink">
                  Olá! Em que posso ajudar?
                </h3>
                <p className="mt-1 text-xs text-muted">
                  Sou a IA da Dinamic. Posso falar sobre nossos imóveis e
                  encaminhar você a um corretor humano quando precisar.
                </p>
                <div className="mt-5 flex w-full flex-col gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-lg border border-border bg-white px-3 py-2 text-left text-xs text-ink shadow-sm transition hover:border-primary hover:bg-primary/5"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {messages.map((m, i) => (
                  <ChatMessageBubble
                    key={m.id}
                    role={m.role}
                    content={m.content}
                    streaming={
                      isStreaming &&
                      i === messages.length - 1 &&
                      m.role === "assistant"
                    }
                  />
                ))}
                {error && (
                  <p className="rounded-md bg-red-50 px-3 py-2 text-xs text-red-700">
                    {error}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* input */}
          <ChatInput onSend={send} onStop={stop} isStreaming={isStreaming} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
