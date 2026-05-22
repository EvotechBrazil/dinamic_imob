"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  SETOR_LABELS,
  TASK_PRIORITY_LABELS,
  type Setor,
  type TaskPriority,
} from "@/lib/mock-types";

export interface TaskFilter {
  setor: Setor | "all";
  prioridade: TaskPriority | "all";
}

interface TaskFiltersProps {
  filter: TaskFilter;
  onFilterChange: (next: TaskFilter) => void;
}

const SETORES: Setor[] = [
  "vendas",
  "locacao",
  "captacao",
  "financeiro",
  "juridico",
];

const PRIORIDADES: TaskPriority[] = ["baixa", "normal", "alta", "urgente"];

function Pill({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "shrink-0 rounded-full border px-3 py-1 text-xs font-medium transition",
        active
          ? "border-primary bg-primary text-white shadow-sm"
          : "border-border bg-white text-muted hover:border-primary/40 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

export function TaskFilters({ filter, onFilterChange }: TaskFiltersProps) {
  return (
    <div className="mb-5 space-y-3">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted sm:w-20">
          Setor
        </span>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          <Pill
            active={filter.setor === "all"}
            onClick={() => onFilterChange({ ...filter, setor: "all" })}
          >
            Todos
          </Pill>
          {SETORES.map((s) => (
            <Pill
              key={s}
              active={filter.setor === s}
              onClick={() => onFilterChange({ ...filter, setor: s })}
            >
              {SETOR_LABELS[s]}
            </Pill>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted sm:w-20">
          Prioridade
        </span>
        <div className="-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          <Pill
            active={filter.prioridade === "all"}
            onClick={() => onFilterChange({ ...filter, prioridade: "all" })}
          >
            Todas
          </Pill>
          {PRIORIDADES.map((p) => (
            <Pill
              key={p}
              active={filter.prioridade === p}
              onClick={() => onFilterChange({ ...filter, prioridade: p })}
            >
              {TASK_PRIORITY_LABELS[p]}
            </Pill>
          ))}
        </div>
      </div>
    </div>
  );
}
