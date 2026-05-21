"use client";

/**
 * <JuridicoSection />
 * Squad sub-agente Jurídico + LGPD — Seção 5 da landing demo.
 *
 * Estrutura:
 *   A) <JuridicoKpiRow /> — 4 KPIs (contratos ativos · vencendo · LGPD · consentimentos)
 *   B) Grid lg:grid-cols-3:
 *      - <ContractsTable /> (2 cols) — 10 contratos com filtro por status
 *      - <LgpdPanel /> (1 col) — mini-stats + solicitações abertas
 *   C) <ComplianceBanner /> — faixa horizontal "LGPD compliant"
 */

import { SectionHeader } from "@/components/layout";

import { ComplianceBanner } from "./compliance-banner";
import { ContractsTable } from "./contracts-table";
import { JuridicoKpiRow } from "./juridico-kpi-row";
import { LgpdPanel } from "./lgpd-panel";

export function JuridicoSection() {
  return (
    <section
      id="juridico"
      className="scroll-mt-20 border-t border-border bg-app py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="05 · Jurídico + LGPD"
          title="Contratos e privacidade sob controle."
          subtitle="142 contratos ativos, todos versionados. Cada dado pessoal sob política LGPD auditável."
        />

        <div className="space-y-6">
          <JuridicoKpiRow />

          <div className="grid gap-6 lg:grid-cols-3">
            <ContractsTable />
            <LgpdPanel />
          </div>

          <ComplianceBanner />
        </div>
      </div>
    </section>
  );
}
