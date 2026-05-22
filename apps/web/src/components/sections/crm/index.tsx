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

import { SectionHeader } from "@/components/layout";
import { Kanban } from "./kanban";

export function CRMSection() {
  return (
    <section
      id="crm"
      className="scroll-mt-28 border-t border-border bg-app py-16"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="04 · CRM"
          title="Funil + ficha do lead em um clique."
          subtitle={`Do primeiro "oi" no WhatsApp à proposta assinada — arraste o card e a etapa atualiza em tempo real.`}
        />

        <Kanban />
      </div>
    </section>
  );
}
