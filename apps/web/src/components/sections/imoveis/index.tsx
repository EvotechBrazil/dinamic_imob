"use client";

import * as React from "react";
import { ArrowRight, Home, Key, Star } from "lucide-react";
import { motion } from "framer-motion";
import { SectionHeader } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/sections/crm/property-card";
import { PROPERTIES } from "@/components/sections/crm/mock";
import { cn } from "@/lib/utils";

/**
 * Abre o ChatWidget com um prompt pré-preenchido via custom event.
 * O ChatWidget escuta `dinamic:open-chat-widget`.
 */
function openChatWith(prompt: string) {
  return () => {
    window.dispatchEvent(
      new CustomEvent("dinamic:open-chat-widget", {
        detail: { prompt },
      })
    );
  };
}

type Filter = "destaques" | "venda" | "aluguel" | "todos";

const FILTERS: { id: Filter; label: string; icon: React.ReactNode }[] = [
  { id: "destaques", label: "Destaques", icon: <Star className="h-3.5 w-3.5" /> },
  { id: "venda", label: "Para comprar", icon: <Home className="h-3.5 w-3.5" /> },
  { id: "aluguel", label: "Para alugar", icon: <Key className="h-3.5 w-3.5" /> },
  { id: "todos", label: "Todos", icon: null },
];

export function ImoveisSection() {
  const [filter, setFilter] = React.useState<Filter>("destaques");

  const filtered = React.useMemo(() => {
    if (filter === "destaques") return PROPERTIES.filter((p) => p.destaque);
    if (filter === "todos") return PROPERTIES;
    return PROPERTIES.filter((p) => p.finalidade === filter);
  }, [filter]);

  const visible = filtered.slice(0, 6);

  return (
    <section
      id="imoveis"
      className="scroll-mt-28 border-t border-border bg-app py-16"
    >
      <div className="section-container">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeader
            eyebrow="01 · Imóveis"
            title="O catálogo da Dinamic, sempre atualizado."
            subtitle="628 imóveis ativos em Arapongas-PR — apartamentos, casas, terrenos e comerciais. Pra comprar ou alugar, a IA encontra o seu match em segundos."
          />

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={openChatWith("Me mostra todos os imóveis disponíveis")}
            className="inline-flex shrink-0 items-center gap-1.5"
          >
            Ver todos os 628
            <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>

        {/* Filter pills */}
        <div className="mb-8 flex flex-wrap items-center gap-2" role="tablist">
          {FILTERS.map((f) => {
            const isActive = filter === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isActive}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all",
                  isActive
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-surface text-muted hover:border-primary/40 hover:text-ink"
                )}
              >
                {f.icon}
                {f.label}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-muted">
            mostrando{" "}
            <span className="font-semibold text-ink">{visible.length}</span> de{" "}
            <span className="font-semibold text-ink">{filtered.length}</span>
          </span>
        </div>

        {/* Grid de imóveis */}
        <motion.div
          key={filter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {visible.map((property, i) => (
            <PropertyCard key={property.id} property={property} index={i} />
          ))}
        </motion.div>

        {/* Faixa CTA inferior — IA */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 rounded-2xl border border-border bg-gradient-to-r from-primary/5 via-app to-accent/5 p-6 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
              <Star className="h-5 w-5" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-ink">
                Procurando algo específico?
              </p>
              <p className="mt-0.5 text-sm text-muted">
                Conte pra IA o bairro, dormitórios e orçamento — ela filtra o
                catálogo todo em segundos.
              </p>
            </div>
          </div>
          <Button
            type="button"
            size="sm"
            onClick={openChatWith(
              "Estou procurando um imóvel — pode me ajudar a filtrar pelo bairro, dormitórios e orçamento?"
            )}
          >
            Falar com a IA
          </Button>
        </div>
      </div>
    </section>
  );
}
