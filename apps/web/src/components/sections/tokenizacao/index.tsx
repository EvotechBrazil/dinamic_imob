"use client";

/**
 * <TokenizacaoSection />
 * Seção 04 da landing demo — Central de Tokenização IA.
 *
 * Layout:
 *  ┌────────────────────────────────────────────────┐
 *  │ SectionHeader                                  │
 *  ├──────────────┬─────────────────────────────────┤
 *  │ BalanceCard  │  ConsumptionChart (col-span 2)  │
 *  ├──────────────┴─────────────────────────────────┤
 *  │ KpiRow (4 KPIs)                                │
 *  ├────────────────────────────────────────────────┤
 *  │ HistoryTable                                   │
 *  ├────────────────────────────────────────────────┤
 *  │ ProviderInfo                                   │
 *  └────────────────────────────────────────────────┘
 */

import { SectionHeader } from "@/components/layout";

import { BalanceCard } from "./balance-card";
import { ConsumptionChart } from "./consumption-chart";
import { HistoryTable } from "./history-table";
import { KpiRow } from "./kpi-row";
import { ProviderInfo } from "./provider-info";

export function TokenizacaoSection() {
  return (
    <section
      id="tokenizacao"
      className="scroll-mt-20 border-t border-border bg-surface py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="04 · Central de Tokenização IA"
          title="Você paga só o que usa de IA."
          subtitle="Modelo: Qwen3.7-max via OpenRouter. Cada token contabilizado em R$ — sem surpresa no fim do mês."
        />

        {/* Top: BalanceCard + ConsumptionChart */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <BalanceCard />
          </div>
          <div className="lg:col-span-2">
            <ConsumptionChart />
          </div>
        </div>

        {/* KPIs */}
        <div className="mt-6">
          <KpiRow />
        </div>

        {/* Tabela histórico */}
        <div className="mt-6">
          <HistoryTable />
        </div>

        {/* Provider info */}
        <div className="mt-6">
          <ProviderInfo />
        </div>
      </div>
    </section>
  );
}
