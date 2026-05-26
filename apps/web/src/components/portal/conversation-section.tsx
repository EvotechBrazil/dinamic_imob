"use client";

import * as React from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUp, Check } from "lucide-react";
import Image from "next/image";
import { useChat } from "@/components/chat-widget/use-chat";
import { ChatMessageBubble } from "@/components/chat-widget/chat-message";
import {
  getGreeting,
  isAgendamentoConfirmado,
} from "@/lib/portal/portal-utils";
import { fireGoldConfetti } from "@/lib/portal/fire-gold-confetti";
import { useDemoAutoplay } from "@/lib/portal/use-demo-autoplay";
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

// Editorial Noir tokens (CSS vars vivem em portal-day-night.css).
// Usar arbitrary values garante que funciona mesmo sem registro no
// tailwind.config (que o Agent 1 ainda pode estar finalizando).
const NOIR = {
  bg: "var(--noir-bg)",
  surface: "var(--noir-surface)",
  text: "var(--noir-text)",
  textMute: "var(--noir-text-mute)",
  textSubtle: "var(--noir-text-subtle)",
  indigo: "var(--noir-indigo)",
  indigoGlow: "var(--noir-indigo-glow)",
  amber: "var(--noir-amber)",
  amberSoft: "var(--noir-amber-soft)",
  border: "var(--noir-border)",
} as const;

interface DemoOverlayState {
  active: boolean;
  userMessage: string | null;
  aiMessage: string | null;
}

export function ConversationSection() {
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

  // Listener pro evento de seed externo (ex: popup de pin no mapa de bairros
  // dispara "dinamic:portal-conversation-seed" e a gente pré-preenche o textarea).
  React.useEffect(() => {
    function handleSeed(e: Event) {
      const detail = (e as CustomEvent<{ prompt?: string }>).detail;
      if (!detail?.prompt) return;
      setInput(detail.prompt);
      // foca após o paint pra garantir que o textarea esteja visível.
      window.requestAnimationFrame(() => {
        textareaRef.current?.focus();
        // posiciona caret no fim
        const len = detail.prompt!.length;
        try {
          textareaRef.current?.setSelectionRange(len, len);
        } catch {
          // setSelectionRange pode dar throw em alguns tipos de input — ignora silenciosamente.
        }
      });
    }
    window.addEventListener("dinamic:portal-conversation-seed", handleSeed as EventListener);
    return () => {
      window.removeEventListener("dinamic:portal-conversation-seed", handleSeed as EventListener);
    };
  }, []);

  // Placeholder atual sendo "digitado" char-by-char (efeito typewriter).
  const [typedPlaceholder, setTypedPlaceholder] = React.useState("");

  // Typewriter: digita o placeholder atual char-by-char (~30ms/char),
  // depois pausa pra leitura, depois avança pro próximo. Pausa total
  // quando o user começa a digitar.
  React.useEffect(() => {
    if (input.length > 0) {
      setTypedPlaceholder("");
      return;
    }
    const target = PLACEHOLDERS[placeholderIndex];
    setTypedPlaceholder("");
    let i = 0;
    let typingTimer: number | null = null;
    let rotateTimer: number | null = null;

    const typeNext = () => {
      if (i >= target.length) {
        // Terminou de digitar — aguarda leitura, depois rotaciona.
        rotateTimer = window.setTimeout(() => {
          setPlaceholderIndex((p) => (p + 1) % PLACEHOLDERS.length);
        }, 2800);
        return;
      }
      i += 1;
      setTypedPlaceholder(target.slice(0, i));
      typingTimer = window.setTimeout(typeNext, 65);
    };
    typingTimer = window.setTimeout(typeNext, 350);

    return () => {
      if (typingTimer !== null) window.clearTimeout(typingTimer);
      if (rotateTimer !== null) window.clearTimeout(rotateTimer);
    };
  }, [placeholderIndex, input.length]);

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

  // Demo auto-play wiring (uau item A) — desativado a pedido do cliente:
  // painel fica exposto sem instrução automática toda vez que abre.
  useDemoAutoplay({
    enabled: false,
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
    <div id="conversa-ia" className="relative w-full max-w-4xl mx-auto mt-8 mb-12 text-[var(--noir-text)]">
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
                className="mx-auto relative h-14 w-14 sm:h-20 sm:w-20 lg:h-24 lg:w-24 overflow-hidden"
                role="img"
                aria-label="Dinamic Imobiliária"
              >
                <Image
                  src="/logo-dinamic.png"
                  alt=""
                  aria-hidden="true"
                  width={375}
                  height={250}
                  priority
                  className="absolute top-1/2 left-[-32%] h-auto w-[290%] max-w-none -translate-y-1/2"
                />
              </motion.div>

              {/* Greeting H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="font-[var(--font-syncopate)] text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight text-[var(--noir-text)] mt-4 sm:mt-8 text-center"
                style={{ fontFamily: "var(--font-syncopate), Manrope, ui-sans-serif, system-ui" }}
              >
                {greeting}
              </motion.h1>

              {/* Input grande */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="max-w-3xl mx-auto mt-6 sm:mt-10 relative"
              >
                <div className="relative bg-[color:color-mix(in_oklab,var(--noir-surface)_70%,transparent)] border border-[var(--noir-border)] rounded-2xl backdrop-blur-xl shadow-2xl focus-within:ring-2 focus-within:ring-[var(--noir-amber)] focus-within:border-[var(--noir-amber)] transition p-4 pr-14 sm:p-5 sm:pr-16">
                  {input.length === 0 && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 p-4 pr-14 sm:p-5 sm:pr-16 text-base lg:text-lg leading-relaxed text-[var(--noir-text-subtle)]"
                      style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                    >
                      {typedPlaceholder}
                      <span className="inline-block w-[2px] h-[1.1em] bg-[var(--noir-amber)] align-text-bottom animate-pulse ml-[2px] translate-y-[2px]" />
                    </div>
                  )}
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    aria-label="Conte pra IA o que você procura"
                    className="relative min-h-[80px] sm:min-h-[112px] max-h-[260px] resize-none w-full outline-none text-base lg:text-lg text-[var(--noir-text)] bg-transparent leading-relaxed"
                    style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!input.trim() || isStreaming}
                    aria-disabled={!input.trim() || isStreaming}
                    aria-label="Enviar mensagem"
                    className="absolute bottom-3 right-3 h-11 w-11 rounded-xl bg-[var(--noir-amber)] text-[var(--noir-bg)] shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.5)] hover:bg-[var(--noir-amber-soft)] disabled:bg-[var(--noir-text-subtle)] disabled:shadow-none disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
                <p
                  className="text-xs text-[var(--noir-text-subtle)] text-center mt-2"
                  style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                >
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
                        <div className="bg-[color:color-mix(in_oklab,var(--noir-surface)_90%,transparent)] backdrop-blur-xl border border-[var(--noir-border)] rounded-2xl shadow-2xl p-4 max-w-xl mx-auto flex flex-col gap-3">
                          <div
                            className="flex items-center gap-2 text-xs uppercase tracking-wide text-[var(--noir-text-mute)]"
                            style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                          >
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--noir-amber)] animate-pulse" />
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
                className="flex flex-nowrap overflow-x-auto sm:flex-wrap sm:overflow-visible justify-start sm:justify-center gap-2 mt-4 sm:mt-6 max-w-3xl mx-auto px-4 portal-thin-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => void handleSuggestion(s)}
                    disabled={isStreaming}
                    className="shrink-0 sm:shrink whitespace-nowrap rounded-full bg-[color:color-mix(in_oklab,var(--noir-bg)_50%,transparent)] border border-[var(--noir-border)] px-4 py-2.5 text-sm font-medium text-[var(--noir-text)] hover:border-[var(--noir-amber)] hover:bg-[color:color-mix(in_oklab,var(--noir-amber)_10%,transparent)] hover:text-[var(--noir-amber-soft)] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
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
                className="flex items-center justify-center gap-4 sm:gap-6 mt-6 sm:mt-8 flex-wrap"
              >
                {PROOF_POINTS.map((p) => (
                  <span
                    key={p}
                    className="flex items-center gap-2 text-xs text-[var(--noir-text-mute)] uppercase tracking-wider"
                    style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                  >
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
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
              <div className="max-w-3xl mx-auto bg-[color:color-mix(in_oklab,var(--noir-surface)_70%,transparent)] border border-[var(--noir-border)] rounded-2xl backdrop-blur-xl shadow-2xl mt-8">
                <div className="p-4 border-b border-[var(--noir-border)] flex items-center justify-between">
                  <h2
                    className="font-bold text-[var(--noir-text)] tracking-wide"
                    style={{ fontFamily: "var(--font-syncopate), Manrope, ui-sans-serif, system-ui" }}
                  >
                    Conversa com a IA Dinamic
                  </h2>
                  <button
                    type="button"
                    onClick={reset}
                    className="text-sm text-[var(--noir-text-mute)] hover:text-[var(--noir-amber)] transition"
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
                    <div
                      className="flex items-center gap-1.5 text-xs text-[var(--noir-text-subtle)] pl-2 pt-1"
                      style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                    >
                      <span>IA está digitando</span>
                      <motion.span
                        className="inline-flex gap-0.5"
                        aria-hidden="true"
                      >
                        {[0, 1, 2].map((d) => (
                          <motion.span
                            key={d}
                            className="inline-block h-1 w-1 rounded-full bg-[var(--noir-amber)]"
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
              <div className="max-w-3xl mx-auto mt-6 relative">
                <div className="bg-[color:color-mix(in_oklab,var(--noir-surface)_70%,transparent)] border border-[var(--noir-border)] rounded-2xl backdrop-blur-xl shadow-2xl focus-within:ring-2 focus-within:ring-[var(--noir-amber)] focus-within:border-[var(--noir-amber)] transition p-5 pr-16">
                  <textarea
                    ref={textareaRef}
                    rows={1}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={PLACEHOLDERS[placeholderIndex]}
                    aria-label="Continue a conversa"
                    className="min-h-[112px] max-h-[260px] resize-none w-full outline-none text-base lg:text-lg placeholder:text-[var(--noir-text-subtle)] text-[var(--noir-text)] bg-transparent leading-relaxed"
                    style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                  />
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!input.trim() || isStreaming}
                    aria-label="Enviar mensagem"
                    className="absolute bottom-3 right-3 h-11 w-11 rounded-xl bg-[var(--noir-amber)] text-[var(--noir-bg)] shadow-[0_8px_24px_rgba(245,158,11,0.35)] hover:shadow-[0_12px_32px_rgba(245,158,11,0.5)] hover:bg-[var(--noir-amber-soft)] disabled:bg-[var(--noir-text-subtle)] disabled:shadow-none disabled:cursor-not-allowed transition flex items-center justify-center"
                  >
                    <ArrowUp className="h-5 w-5" />
                  </button>
                </div>
                <p
                  className="text-xs text-[var(--noir-text-subtle)] text-center mt-2"
                  style={{ fontFamily: "var(--font-manrope), ui-sans-serif, system-ui" }}
                >
                  Enter pra enviar · Shift+Enter pra quebrar linha
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
// Silencia o linter no NOIR map (mantido como referência inline; valores
// usados via arbitrary CSS values em todo o componente).
void NOIR;
