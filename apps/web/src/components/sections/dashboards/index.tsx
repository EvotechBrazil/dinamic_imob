"use client";

/**
 * <DashboardsSection />
 * Squad Dashboards — Seção "Visão consolidada num só olhar"
 *
 * Estrutura:
 *   A) <KpiGrid />                — 6 KPI cards (Imóveis, Leads, Visitas,
 *                                    Conversão, Receita, Inadimplência)
 *   B) <LeadsByOriginDonut /> + <TrendAreaChart />
 *      grid lg:grid-cols-3 → 1 col donut + 2 cols area chart
 *   C) <SetorDistribution /> + <TopCorretores />
 *      grid lg:grid-cols-2
 *
 * Fechamento da landing demo — "BI executivo" da Dinamic.
 */

import { SectionHeader } from "@/components/layout";

import { KpiGrid } from "./kpi-grid";
import { LeadsByOriginDonut } from "./leads-by-origin-donut";
import { SetorDistribution } from "./setor-distribution";
import { TopCorretores } from "./top-corretores";
import { TrendAreaChart } from "./trend-chart";

export function DashboardsSection() {
  return (
    <section
      id="dashboards"
      className="scroll-mt-20 border-t border-border bg-surface py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="06 · Dashboards"
          title="Visão consolidada num só olhar."
          subtitle="6 KPIs vivos, 2 charts respirando — o sócio sabe da Dinamic em 30 segundos pela manhã."
        />

        {/* Parte A — KPI Grid 6 cards */}
        <KpiGrid />

        {/* Parte B — Donut leads/origem + Area chart 30d */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <LeadsByOriginDonut />
          </div>
          <div className="lg:col-span-2">
            <TrendAreaChart />
          </div>
        </div>

        {/* Parte C — Setor + Top corretores */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SetorDistribution />
          <TopCorretores />
        </div>
      </div>
    </section>
  );
}
