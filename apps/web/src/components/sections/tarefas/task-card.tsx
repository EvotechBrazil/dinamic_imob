"use client";

import * as React from "react";
import { Calendar, Link2, Bot, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SETOR_LABELS,
  TASK_LABEL_LABELS,
  type Setor,
  type Task,
  type TaskPriority,
} from "@/lib/mock-types";

const SETOR_CHIP: Record<Setor, string> = {
  vendas: "bg-indigo-100 text-indigo-800",
  locacao: "bg-violet-100 text-violet-800",
  captacao: "bg-amber-100 text-amber-800",
  financeiro: "bg-emerald-100 text-emerald-800",
  juridico: "bg-sky-100 text-sky-800",
};

const PRIORITY_DOT: Record<TaskPriority, string> = {
  baixa: "bg-slate-400",
  normal: "bg-sky-500",
  alta: "bg-amber-500",
  urgente: "bg-rose-500",
};

const PRIORITY_RING: Record<TaskPriority, string> = {
  baixa: "ring-slate-200",
  normal: "ring-sky-200",
  alta: "ring-amber-200",
  urgente: "ring-rose-200",
};

function isPastDate(iso?: string): boolean {
  if (!iso) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return d.getTime() < today.getTime();
}

function formatPrazo(iso?: string): string {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
}

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const visibleLabels = task.labels.slice(0, 2);
  const overflow = task.labels.length - visibleLabels.length;
  const overdue =
    isPastDate(task.prazo) && task.status !== "concluida";

  return (
    <div
      className={cn(
        "relative flex flex-col gap-2 rounded-xl border border-border bg-white p-3 shadow-sm transition hover:shadow-md",
        task.status === "concluida" && "opacity-70"
      )}
    >
      {task.bloqueadaPor && (
        <div className="absolute inset-x-0 top-0 h-1 rounded-t-xl bg-rose-500" />
      )}

      {/* Topo: chip setor + prioridade dot */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            SETOR_CHIP[task.setor]
          )}
        >
          {SETOR_LABELS[task.setor]}
        </span>
        <span
          aria-label={`Prioridade ${task.prioridade}`}
          className={cn(
            "h-2.5 w-2.5 shrink-0 rounded-full ring-2",
            PRIORITY_DOT[task.prioridade],
            PRIORITY_RING[task.prioridade]
          )}
        />
      </div>

      {/* Título */}
      <h5
        className={cn(
          "font-medium leading-snug text-ink text-sm line-clamp-2",
          task.status === "concluida" && "line-through text-muted"
        )}
      >
        {task.titulo}
      </h5>

      {/* Labels */}
      {visibleLabels.length > 0 && (
        <div className="flex flex-wrap items-center gap-1">
          {visibleLabels.map((l) => (
            <span
              key={l}
              className="rounded border border-border bg-app px-1.5 py-0.5 text-[10px] text-muted"
            >
              {TASK_LABEL_LABELS[l]}
            </span>
          ))}
          {overflow > 0 && (
            <span className="rounded border border-border bg-app px-1.5 py-0.5 text-[10px] text-muted">
              +{overflow}
            </span>
          )}
        </div>
      )}

      {/* LinkedTo */}
      {task.linkedTo && (
        <div className="inline-flex items-center gap-1 rounded-md border border-dashed border-border bg-app/50 px-1.5 py-1 text-[10px] text-muted">
          <Link2 className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">{task.linkedTo.titulo}</span>
        </div>
      )}

      {/* Bloqueada por */}
      {task.bloqueadaPor && (
        <p className="text-[10px] font-medium text-rose-600">
          Bloqueada: {task.bloqueadaPor}
        </p>
      )}

      {/* Rodapé: avatar + prazo + origem */}
      <div className="mt-1 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
        <div className="flex min-w-0 items-center gap-1.5">
          {task.responsavelAvatarUrl && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={task.responsavelAvatarUrl}
              alt={task.responsavelNome ?? ""}
              className="h-5 w-5 shrink-0 rounded-full object-cover"
            />
          )}
          <span className="truncate text-[11px] text-ink/80">
            {task.responsavelNome ?? "—"}
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1.5">
          {task.origem === "ia" && (
            <span
              className="inline-flex items-center gap-0.5 rounded bg-indigo-50 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-indigo-700"
              title="Criada pela IA"
            >
              <Bot className="h-2.5 w-2.5" /> IA
            </span>
          )}
          {task.origem === "evento_sistema" && (
            <span
              className="inline-flex items-center gap-0.5 rounded bg-amber-50 px-1 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-amber-700"
              title="Criada automaticamente por evento"
            >
              <Zap className="h-2.5 w-2.5" /> Auto
            </span>
          )}
          {task.prazo && (
            <span
              className={cn(
                "inline-flex items-center gap-1 text-[11px]",
                overdue ? "font-semibold text-rose-600" : "text-muted"
              )}
            >
              <Calendar className="h-3 w-3" aria-hidden />
              {formatPrazo(task.prazo)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
