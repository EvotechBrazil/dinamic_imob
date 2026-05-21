"use client";

import { Plus, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import type { LeadStatus } from "@/lib/mock-types";
import { LEAD_STATUS_LABELS } from "@/lib/mock-types";
import { LeadCard } from "./lead-card";
import { KANBAN_LEADS } from "./mock";

const STATUS_ORDER: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "visita",
  "proposta",
];

const STATUS_STYLE: Record<
  LeadStatus,
  { dot: string; pill: string; column: string }
> = {
  novo: {
    dot: "bg-slate-500",
    pill: "bg-slate-100 text-slate-700",
    column: "border-slate-200",
  },
  contatado: {
    dot: "bg-sky-500",
    pill: "bg-sky-100 text-sky-700",
    column: "border-sky-200",
  },
  qualificado: {
    dot: "bg-violet-500",
    pill: "bg-violet-100 text-violet-700",
    column: "border-violet-200",
  },
  visita: {
    dot: "bg-amber-500",
    pill: "bg-amber-100 text-amber-700",
    column: "border-amber-200",
  },
  proposta: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    column: "border-emerald-200",
  },
};

export function Kanban() {
  const totalLeads = STATUS_ORDER.reduce(
    (acc, s) => acc + KANBAN_LEADS[s].length,
    0
  );

  return (
    <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
      {/* Header da seção */}
      <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink">
            Pipeline comercial
          </h3>
          <p className="mt-0.5 text-sm text-muted">
            {totalLeads} leads ativos · atribuição round-robin por setor
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="hidden rounded-full border border-border bg-app px-3 py-1 text-xs text-muted sm:inline-flex">
            Filtro: todos os setores
          </span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-primary/90"
          >
            <Plus className="h-3.5 w-3.5" /> Novo lead
          </button>
        </div>
      </div>

      {/* Colunas */}
      <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2">
        {STATUS_ORDER.map((status) => {
          const leads = KANBAN_LEADS[status];
          const style = STATUS_STYLE[status];
          return (
            <div
              key={status}
              className={cn(
                "flex w-72 shrink-0 flex-col rounded-xl border bg-app/40",
                style.column
              )}
            >
              {/* Header coluna */}
              <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("h-2 w-2 rounded-full", style.dot)}
                    aria-hidden
                  />
                  <h4 className="text-sm font-medium text-ink">
                    {LEAD_STATUS_LABELS[status]}
                  </h4>
                  <span
                    className={cn(
                      "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                      style.pill
                    )}
                  >
                    {leads.length}
                  </span>
                </div>
                <div className="flex items-center gap-0.5">
                  <button
                    type="button"
                    aria-label="Adicionar lead nesta coluna"
                    className="rounded p-1 text-muted transition hover:bg-app hover:text-ink"
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label="Opções"
                    className="rounded p-1 text-muted transition hover:bg-app hover:text-ink"
                  >
                    <MoreHorizontal className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Lista de cards */}
              <div className="flex flex-col gap-2 p-2">
                {leads.map((lead) => (
                  <LeadCard key={lead.id} lead={lead} />
                ))}
              </div>

              {/* Footer da coluna */}
              <button
                type="button"
                className="mx-2 mb-2 mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2 py-2 text-xs text-muted transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
              >
                <Plus className="h-3 w-3" /> Adicionar lead
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
