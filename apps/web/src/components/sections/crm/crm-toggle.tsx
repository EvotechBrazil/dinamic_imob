"use client";

import { cn } from "@/lib/utils";

export type CrmFilter = "todos" | "venda" | "aluguel";

interface CrmToggleProps {
  value: CrmFilter;
  onChange: (next: CrmFilter) => void;
  count: number;
}

const OPTIONS: { value: CrmFilter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "venda", label: "Venda" },
  { value: "aluguel", label: "Locação" },
];

export function CrmToggle({ value, onChange, count }: CrmToggleProps) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h3 className="font-display text-lg font-semibold text-ink">
          Galeria de imóveis{" "}
          <span className="font-mono text-sm text-muted">({count})</span>
        </h3>
        <p className="mt-0.5 text-sm text-muted">
          Catálogo conectado ao CRM — fotos, valores e disponibilidade em tempo
          real.
        </p>
      </div>

      <div
        role="tablist"
        aria-label="Filtrar por finalidade"
        className="inline-flex items-center rounded-lg border border-border bg-surface p-1 shadow-sm"
      >
        {OPTIONS.map((opt) => {
          const active = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => onChange(opt.value)}
              className={cn(
                "rounded-md px-3.5 py-1.5 text-xs font-medium transition",
                active
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted hover:text-ink"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
