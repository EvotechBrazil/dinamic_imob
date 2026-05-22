"use client";

import { MessageCircle, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Boleto, ChartPoint, KPI } from "@/lib/mock-types";

interface AiCtaProps {
  kpis: KPI[];
  chart: ChartPoint[];
  boletos: Boleto[];
}

const SAMPLE_QUESTIONS: string[] = [
  "Quanto entrou de aluguel do Centro nos últimos 30 dias?",
  "Quem está com mais de 3 dias de atraso?",
  "Qual a previsão de receita pra junho?",
];

const DEFAULT_PROMPT = "Me mostra um resumo do financeiro do mês";

function formatBRL(n: number): string {
  return n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

function buildFinanceiroContext(
  kpis: KPI[],
  chart: ChartPoint[],
  boletos: Boleto[]
): string {
  const kpiBlock = kpis
    .map((k) => {
      const delta =
        k.delta !== undefined
          ? ` (variação ${k.delta > 0 ? "+" : ""}${k.delta}${k.suffix ?? "%"} vs mês anterior)`
          : "";
      return `- ${k.label}: ${k.value}${delta}${k.helper ? ` — ${k.helper}` : ""}`;
    })
    .join("\n");

  const chartBlock = chart
    .map(
      (p) =>
        `- ${p.label}: recebido ${formatBRL(p.valor)} / previsto ${formatBRL(p.valor2 ?? 0)}`
    )
    .join("\n");

  const boletosBlock = boletos
    .map((b) => {
      const atraso =
        b.diasAtraso !== undefined ? ` (${b.diasAtraso}d de atraso)` : "";
      return `- ${b.locatario} — ${b.imovel} (${b.bairro}) — ${formatBRL(b.valor)} — ${b.vencimento} — status: ${b.status}${atraso}`;
    })
    .join("\n");

  return [
    "CONTEXTO: O usuário está vendo o painel FINANCEIRO da Dinamic (mês de Maio/2026).",
    "Responda em PT-BR, direto e conciso, usando exatamente estes números:",
    "",
    "KPIs do mês:",
    kpiBlock,
    "",
    "Série Recebido vs Previsto (últimos 6 meses):",
    chartBlock,
    "",
    "Próximos vencimentos (boletos representativos):",
    boletosBlock,
    "",
    "Quando o usuário perguntar sobre receita, atraso, repasses, previsões ou bairros, use estes dados como verdade. Se a pergunta exigir dado não presente acima, diga educadamente que precisa puxar do sistema e ofereça consultar.",
  ].join("\n");
}

export function AiCta({ kpis, chart, boletos }: AiCtaProps) {
  const handleOpenChat = (prompt: string = DEFAULT_PROMPT) => {
    if (typeof window === "undefined") return;
    const context = buildFinanceiroContext(kpis, chart, boletos);
    window.dispatchEvent(
      new CustomEvent("dinamic:open-chat-widget", {
        detail: { prompt, context },
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
            Powered by Qwen via OpenRouter · resposta em &lt;3s
          </p>
        </div>
      </div>
    </Card>
  );
}
