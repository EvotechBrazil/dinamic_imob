"use client";

/**
 * <JuridicoSection />
 * Squad sub-agente Jurídico + LGPD — Seção 5 da landing demo.
 *
 * Estrutura (pós-polimento):
 *   A) <JuridicoKpiRow /> — 4 KPIs (contratos ativos · vencendo · LGPD · consentimentos)
 *   B) <Tabs> full-width:
 *      - Pipeline: <ContractsKanban /> (5 colunas)
 *      - Tabela detalhada: <ContractsTable />
 *   C) <LgpdPanel /> full-width abaixo (já adaptado internamente pra layout horizontal)
 *   D) <ComplianceBanner /> — faixa horizontal "LGPD compliant"
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
      className="scroll-mt-28 border-t border-border bg-app py-16 lg:py-24"
    >
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="06 · Jurídico + LGPD"
          title="Contratos e privacidade sob controle."
          subtitle="Cada contrato versionado, cada dado pessoal sob política LGPD auditável. A Dinamic guarda só o necessário — e prova quando perguntarem."
        />

        <div className="space-y-8">
          <JuridicoKpiRow />

          <Tabs defaultValue="pipeline" className="w-full">
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

          <LgpdPanel />

          <ComplianceBanner />
        </div>
      </div>
    </section>
  );
}
