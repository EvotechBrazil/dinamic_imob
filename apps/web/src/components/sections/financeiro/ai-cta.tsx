"use client";

import { MessageCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const SAMPLE_QUESTIONS: string[] = [
  "Quanto entrou de aluguel do Centro nos últimos 30 dias?",
  "Quem está com mais de 3 dias de atraso?",
  "Qual a previsão de receita pra junho?",
];

const DEFAULT_PROMPT = "Me mostra um resumo do financeiro do mês";

export function AiCta() {
  const handleOpenChat = (prompt: string = DEFAULT_PROMPT) => {
    if (typeof window === "undefined") return;
    window.dispatchEvent(
      new CustomEvent("dinamic:open-chat-widget", {
        detail: { prompt },
      }),
    );
  };

  return (
    <Card className="relative h-full overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 via-surface to-accent/5 p-6 shadow-sm">
      {/* glow decorativo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-12 -left-12 h-32 w-32 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
          <Sparkles className="h-5 w-5" />
        </div>

        <h3 className="mt-4 font-display text-xl font-bold text-ink">
          Pergunte à IA sobre este financeiro
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Sua equipe ganha um analista 24/7. A IA cruza dados de contratos,
          boletos e repasses pra responder em segundos — sem planilha.
        </p>

        <ul className="mt-5 space-y-2.5">
          {SAMPLE_QUESTIONS.map((q) => (
            <li key={q}>
              <button
                type="button"
                onClick={() => handleOpenChat(q)}
                className="group flex w-full items-start gap-2 rounded-lg border border-border bg-surface/70 px-3 py-2 text-left text-xs text-ink transition-all hover:border-primary/40 hover:bg-primary/5"
              >
                <MessageCircle className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-primary transition-transform group-hover:scale-110" />
                <span className="leading-snug">{q}</span>
              </button>
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-5">
          <Button
            onClick={() => handleOpenChat()}
            className="w-full bg-primary text-white shadow-sm hover:bg-primary/90"
            size="lg"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Conversar agora
          </Button>
          <p className="mt-2 text-center text-[11px] text-muted">
            Powered by Claude 4.6 · resposta em &lt;3s
          </p>
        </div>
      </div>
    </Card>
  );
}
