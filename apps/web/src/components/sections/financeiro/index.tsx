/**
 * <FinanceiroSection />
 * Squad C — Seção "Receita, repasses, inadimplência — auditável."
 *
 * Estrutura (premium, executiva):
 *   1) KPI grid 4 cards (KpiGrid)
 *   2) Grid 2 colunas:
 *      - Esquerda (col-span-2): AreaChart Recebido vs Previsto (ReceivableChart)
 *      - Direita  (col-span-1): CTA da IA (AiCta)
 *   3) Toggle Pipeline (Kanban) ↔ Tabela detalhada — default Pipeline
 */

"use client";

import { SectionHeader } from "@/components/layout/section-header";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { AiCta } from "./ai-cta";
import { BoletosKanban } from "./boletos-kanban";
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
      className="scroll-mt-28 border-t border-border bg-surface py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="03 · Financeiro"
          title="Receita, repasses, inadimplência — auditável."
          subtitle="Todo dinheiro da Dinamic em tempo real. PIX, boleto e repasse com histórico rastreável — sem planilha, sem perde-perde no fim do mês."
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
              <AiCta
                kpis={FINANCEIRO_KPIS}
                chart={FINANCEIRO_CHART}
                boletos={PROXIMOS_BOLETOS}
              />
            </div>
          </div>

          {/* 3) Toggle Pipeline ↔ Tabela */}
          <Tabs defaultValue="pipeline">
            <TabsList>
              <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
              <TabsTrigger value="tabela">Tabela detalhada</TabsTrigger>
            </TabsList>
            <TabsContent value="pipeline" className="mt-4">
              <BoletosKanban boletos={PROXIMOS_BOLETOS} />
            </TabsContent>
            <TabsContent value="tabela" className="mt-4">
              <BoletosTable boletos={PROXIMOS_BOLETOS} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default FinanceiroSection;
