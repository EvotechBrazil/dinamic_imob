"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Sparkles, ArrowUp, Check } from "lucide-react";
import { useChat } from "@/components/chat-widget/use-chat";
import { ChatMessageBubble } from "@/components/chat-widget/chat-message";
import {
  getGreeting,
  isAgendamentoConfirmado,
} from "@/lib/portal/portal-utils";
import { fireGoldConfetti } from "@/lib/portal/fire-gold-confetti";
import { useDemoAutoplay } from "@/lib/portal/use-demo-autoplay";
import { HeroBackground } from "@/components/portal/hero-background";
import { cn } from "@/lib/utils";

const PLACEHOLDERS: readonly string[] = [
  "Procuro apartamento 2 dorms no Centro até R$ 2.500...",
  "Casa pra alugar até R$ 3.000 com quintal...",
  "Quero comprar terreno em Arapongas...",
  "Apartamento mobiliado pra estudante...",
];

const SUGGESTIONS: readonly string[] = [
  "Apto 2 dorms no Centro até R$ 2.500",
  "Casa pra alugar até R$ 3.000",
  "Lançamentos em Arapongas",
  "Imóveis com piscina e quintal",
];

const PROOF_POINTS: readonly string[] = [
  "Atendimento humano local",
  "Imóveis verificados CRECI",
  "Resposta em segundos",
];

interface DemoOverlayState {
  active: boolean;
  userMessage: string | null;
  aiMessage: string | null;
}

export function HeroChat() {
  const { messages, isStreaming, send, reset } = useChat();

  const [input, setInput] = React.useState("");
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [greeting, setGreeting] = React.useState<string>("Olá!");
  const [demoOverlay, setDemoOverlay] = React.useState<DemoOverlayState>({
    active: false,
    userMessage: null,
    aiMessage: null,
  });

  const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);
  const scrollRef = React.useRef<HTMLDivElement | null>(null);
  const confettiFiredRef = React.useRef<Set<string>>(new Set());

  const { scrollY } = useScroll();
  const iconY = useTransform(scrollY, [0, 500], [0, -30]);

  const isIdle = messages.length === 0 && !isStreaming;

  // Refresh greeting on mount (avoid SSR/CSR mismatch — initial is fine,
  // but if user keeps the tab open across hour boundary, re-evaluate).
  React.useEffect(() => {
    setGreeting(getGreeting());
  }, []);

  // Rotative placeholder — pausa quando user está digitando.
  React.useEffect(() => {
    if (input.length > 0) return;
    const id = window.setInterval(() => {
      setPlaceholderIndex((i) => (i + 1) % PLACEHOLDERS.length);
    }, 4000);
    return () => {
      window.clearInterval(id);
    };
  }, [input.length]);

  // Auto-resize textarea conforme conteúdo.
  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    const next = Math.min(el.scrollHeight, 200);
    el.style.height = `${next}px`;
  }, [input]);

  // Auto-scroll para o fim da conversa quando msgs mudam.
  React.useEffect(() => {
    const node = scrollRef.current;
    if (!node) return;
    node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
  }, [messages, isStreaming]);

  // Cancela demo overlay quando user começa a digitar.
  React.useEffect(() => {
    if (input.length > 0 && demoOverlay.active) {
      setDemoOverlay({ active: false, userMessage: null, aiMessage: null });
    }
  }, [input.length, demoOverlay.active]);

  // Confete dourado quando IA confirma agendamento (dedup por id).
  React.useEffect(() => {
    if (messages.length === 0) return;
    const last = messages[messages.length - 1];
    if (!last || last.role !== "assistant") return;
    if (isStreaming) return; // só dispara quando terminou de stremar
    if (confettiFiredRef.current.has(last.id)) return;
    if (isAgendamentoConfirmado(last.content)) {
      confettiFiredRef.current.add(last.id);
      fireGoldConfetti();
    }
  }, [messages, isStreaming]);

  const handleSend = React.useCallback(async () => {
    const text = input.trim();
    if (!text) return;
    if (isStreaming) return;
    setInput("");
    await send(text);
  }, [input, isStreaming, send]);

  const handleSuggestion = React.useCallback(
    async (text: string) => {
      if (isStreaming) return;
      setInput("");
      await send(text);
    },
    [isStreaming, send],
  );

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        void handleSend();
      }
    },
    [handleSend],
  );

  // Demo auto-play wiring (uau item A).
  useDemoAutoplay({
    enabled: isIdle && input.length === 0,
    idleDelayMs: 6000,
    onStart: () => {
      setDemoOverlay({ active: true, userMessage: null, aiMessage: null });
    },
    onUserMessage: (content: string) => {
      setDemoOverlay({ active: true, userMessage: content, aiMessage: null });
    },
    onAiMessage: (content: string) => {
      setDemoOverlay((s) => ({ ...s, active: true, aiMessage: content }));
    },
    onEnd: () => {
      setDemoOverlay({ active: false, userMessage: null, aiMessage: null });
    },
  });

  return (
    <section
      className={cn(
        "relative min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-16 lg:py-24 overflow-hidden",
        "bg-gradient-to-b from-white via-portal-gold-soft/30 to-portal-bg",
      )}
    >
      <HeroBackground />

      <div className="relative z-10 w-full max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          {isIdle ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Ícone gold com parallax */}
              <motion.div
                initial={{ scale: 0, rotate: -10, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                  delay: 0.1,
                }}
                style={{ y: iconY }}
                className="mx-auto h-20 w-20 lg:h-24 lg:w-24 rounded-3xl bg-gradient-to-br from-amber-400 via-portal-gold to-portal-gold-dark shadow-portal-cta flex items-center justify-center"
              >
                <Sparkles
                  className="h-10 w-10 lg:h-12 lg:w-12 text-white"
                  strokeWidth={2.5}
                />
              </motion.div>

              {/* Greeting H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-portal-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-portal-text mt-8 text-center"
              >
                {greeting}
              </motion.h1>

              {/* Subtítulo */}
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-lg lg:text-xl text-portal-text-muted max-w-2xl mx-auto mt-4 leading-relaxed text-center"
              >
                Sou a IA da Dinamic — me conta o que você procura que eu mostro
                as melhores opções de Arapongas.
              </motion.p>

              {/* Input grande */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-2xl mx-auto mt-10 relative"
              >
                <div className="bg-white border border-portal-border rounded-2xl shadow-portal-card focus-within:ring-2 focus-within:ring-portal-gold focus-within:border-portal-gold transition p-4 pr-16">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDERS[placeholderIndex]}
                    aria-label="Conte pra IA o que você procura"
                    className="min-h-[60px] max-h-[200px] resize-none w-full outline-none text-base placeholder:text-portal-text-subtle font-medium bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!input.trim() || isStreaming}
                    aria-disabled={!input.trim() || isStreaming}
                    aria-label="Enviar mensagem"
                    className="absolute bottom-3 right-3 h-11 w-11 rounded-xl bg-portal-gold text-white shadow-portal-cta hover:shadow-lg disabled:bg-portal-text-subtle disabled:shadow-none disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-portal-text-subtle text-center mt-2">
                  Enter pra enviar · Shift+Enter pra quebrar linha
                </p>

                {/* Demo overlay (uau item A) */}
                <AnimatePresence>
                  {demoOverlay.active &&
                    (demoOverlay.userMessage || demoOverlay.aiMessage) && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.25 }}
                        className="absolute -bottom-4 left-0 right-0 translate-y-full pt-6 pointer-events-none"
                      >
                        <div className="bg-white/95 backdrop-blur border border-portal-border rounded-2xl shadow-portal-card p-4 max-w-xl mx-auto flex flex-col gap-3">
                          <div className="flex items-center gap-2 text-xs uppercase tracking-wide text-portal-text-subtle">
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-portal-gold animate-pulse" />
                            Veja como a IA atende
                          </div>
                          {demoOverlay.userMessage && (
                            <ChatMessageBubble
                              role="user"
                              content={demoOverlay.userMessage}
                            />
                          )}
                          {demoOverlay.aiMessage && (
                            <ChatMessageBubble
                              role="assistant"
                              content={demoOverlay.aiMessage}
                              streaming={false}
                            />
                          )}
                        </div>
                      </motion.div>
                    )}
                </AnimatePresence>
              </motion.div>

              {/* Chips sugeridos */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap justify-center gap-2 mt-6 max-w-3xl mx-auto px-4"
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void handleSuggestion(s)}
                    disabled={isStreaming}
                    className="rounded-full bg-white border border-portal-border px-4 py-2.5 text-sm font-medium text-portal-text hover:border-portal-gold hover:bg-portal-gold-soft transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>

              {/* Linha de prova */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="flex items-center justify-center gap-4 sm:gap-6 mt-8 flex-wrap"
              >
                {PROOF_POINTS.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-2 text-sm text-portal-text-muted"
                  >
                    <Check className="h-3.5 w-3.5 text-portal-success" />
                    {p}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="conversation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <div className="max-w-3xl mx-auto bg-white border border-portal-border rounded-2xl shadow-portal-card mt-8">
                <div className="p-4 border-b border-portal-border flex items-center justify-between">
                  <h2 className="font-semibold text-portal-text">
                    Conversa com a IA Dinamic
                  </h2>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm text-portal-text-muted hover:text-portal-gold-dark transition"
                  >
                    Nova conversa
                  </button>
                </div>

                <div
                  ref={scrollRef}
                  className="portal-thin-scroll max-h-[50vh] sm:max-h-[60vh] overflow-y-auto p-4 flex flex-col gap-3"
                >
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

                  {isStreaming && (
                    <div className="flex items-center gap-1.5 text-xs text-portal-text-subtle pl-2 pt-1">
                      <span>IA está digitando</span>
                      <motion.span
                        className="inline-flex gap-0.5"
                        aria-hidden="true"
                      >
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="inline-block h-1 w-1 rounded-full bg-portal-gold"
                            animate={{ opacity: [0.2, 1, 0.2] }}
                            transition={{
                              duration: 1.1,
                              repeat: Infinity,
                              delay: d * 0.18,
                            }}
                          />
                        ))}
                      </motion.span>
                    </div>
                  )}
                </div>
              </div>

              {/* Input continua visível abaixo do card */}
              <div className="max-w-2xl mx-auto mt-6 relative">
                <div className="bg-white border border-portal-border rounded-2xl shadow-portal-card focus-within:ring-2 focus-within:ring-portal-gold focus-within:border-portal-gold transition p-4 pr-16">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDERS[placeholderIndex]}
                    aria-label="Continue a conversa"
                    className="min-h-[60px] max-h-[200px] resize-none w-full outline-none text-base placeholder:text-portal-text-subtle font-medium bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!input.trim() || isStreaming}
                    aria-label="Enviar mensagem"
                    className="absolute bottom-3 right-3 h-11 w-11 rounded-xl bg-portal-gold text-white shadow-portal-cta hover:shadow-lg disabled:bg-portal-text-subtle disabled:shadow-none disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-portal-text-subtle text-center mt-2">
                  Enter pra enviar · Shift+Enter pra quebrar linha
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
