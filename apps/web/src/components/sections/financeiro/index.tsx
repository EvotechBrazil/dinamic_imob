/**
 * <FinanceiroSection />
 * Squad C — Seção "Receita, repasses, inadimplência — auditável."
 *
 * Estrutura (premium, executiva):
 *   1) KPI grid 4 cards (KpiGrid)
 *   2) Grid 2 colunas:
 *      - Esquerda (col-span-2): AreaChart Recebido vs Previsto (ReceivableChart)
 *      - Direita  (col-span-1): CTA da IA (AiCta)
 *   3) Tabela completa de próximos vencimentos (BoletosTable) — full width
 */

import { SectionHeader } from "@/components/layout/section-header";

import { AiCta } from "./ai-cta";
import { BoletosTable } from "./boletos-table";
import { KpiGrid } from "./kpi-grid";
import {
  FINANCEIRO_CHART,
  FINANCEIRO_KPIS,
  PROXIMOS_BOLETOS,
} from "./mock";
import { ReceivableChart } from "./receivable-chart";

export function FinanceiroSection() {
  return (
    <section
      id="financeiro"
      className="scroll-mt-20 border-t border-border bg-surface py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="02 · Financeiro"
          title="Receita, repasses, inadimplência — auditável."
          subtitle="Todo dinheiro da Dinamic em tempo real. PIX, boleto, repasse — sem planilha."
        />

        <div className="mt-10 space-y-6">
          {/* 1) KPIs */}
          <KpiGrid kpis={FINANCEIRO_KPIS} />

          {/* 2) Chart + CTA IA */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ReceivableChart data={FINANCEIRO_CHART} />
            </div>
            <div className="lg:col-span-1">
              <AiCta />
            </div>
          </div>

          {/* 3) Tabela de boletos */}
          <BoletosTable boletos={PROXIMOS_BOLETOS} />
        </div>
      </div>
    </section>
  );
}

export default FinanceiroSection;
