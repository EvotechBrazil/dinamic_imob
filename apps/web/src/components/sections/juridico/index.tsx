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
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { ComplianceBanner } from "./compliance-banner";
import { ContractsKanban } from "./contracts-kanban";
import { ContractsTable } from "./contracts-table";
import { JuridicoKpiRow } from "./juridico-kpi-row";
import { LgpdPanel } from "./lgpd-panel";

export function JuridicoSection() {
  return (
    <section
      id="juridico"
      className="scroll-mt-28 border-t border-border bg-app py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="06 · Jurídico + LGPD"
          title="Contratos e privacidade sob controle."
          subtitle="Cada contrato versionado, cada dado pessoal sob política LGPD auditável. A Dinamic guarda só o necessário — e prova quando perguntarem."
        />

        <div className="space-y-6">
          <JuridicoKpiRow />

          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Tabs defaultValue="pipeline">
                <TabsList>
                  <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
                  <TabsTrigger value="tabela">Tabela detalhada</TabsTrigger>
                </TabsList>
                <TabsContent value="pipeline" className="mt-4">
                  <ContractsKanban />
                </TabsContent>
                <TabsContent value="tabela" className="mt-4">
                  <ContractsTable />
                </TabsContent>
              </Tabs>
            </div>
            <LgpdPanel />
          </div>

          <ComplianceBanner />
        </div>
      </div>
    </section>
  );
}
