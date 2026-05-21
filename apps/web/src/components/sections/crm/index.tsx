"use client";

/**
 * <CRMSection />
 * Seção 03 — CRM (funil + galeria de imóveis)
 *
 * Estrutura:
 *   A) Kanban funil (5 colunas: Novo · Contatado · Qualificado · Visita · Proposta)
 *   B) Toggle Venda/Locação
 *   C) Grid de imóveis filtrável (12 fichas)
 */

import { useMemo, useState } from "react";
import { SectionHeader } from "@/components/layout";
import { Kanban } from "./kanban";
import { CrmToggle, type CrmFilter } from "./crm-toggle";
import { PropertiesGrid } from "./properties-grid";
import { PROPERTIES } from "./mock";

export function CRMSection() {
  const [filter, setFilter] = useState<CrmFilter>("todos");

  const visibleCount = useMemo(() => {
    if (filter === "todos") return PROPERTIES.length;
    return PROPERTIES.filter((p) => p.finalidade === filter).length;
  }, [filter]);

  return (
    <section
      id="crm"
      className="scroll-mt-20 border-t border-border bg-app py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="03 · CRM"
          title="Funil + ficha do lead em um clique."
          subtitle={`Do primeiro "oi" no WhatsApp à proposta assinada — um único fluxo.`}
        />

        {/* A) Kanban */}
        <Kanban />

        {/* Divider */}
        <div className="my-12 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        {/* B) Toggle */}
        <CrmToggle value={filter} onChange={setFilter} count={visibleCount} />

        {/* C) Grid */}
        <PropertiesGrid properties={PROPERTIES} filter={filter} />
      </div>
    </section>
  );
}
