"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, LayoutGrid, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import { SETOR_LABELS, type Setor, type Task } from "@/lib/mock-types";

interface TaskKpisProps {
  tasks: Task[];
}

const SETOR_BAR: Record<Setor, string> = {
  vendas: "bg-indigo-500",
  locacao: "bg-violet-500",
  captacao: "bg-amber-500",
  financeiro: "bg-emerald-500",
  juridico: "bg-sky-500",
};

const SETORES: Setor[] = [
  "vendas",
  "locacao",
  "captacao",
  "financeiro",
  "juridico",
];

function isToday(iso?: string): boolean {
  if (!iso) return false;
  const d = new Date(iso);
  const t = new Date();
  return (
    d.getFullYear() === t.getFullYear() &&
    d.getMonth() === t.getMonth() &&
    d.getDate() === t.getDate()
  );
}

function isPast(iso?: string): boolean {
  if (!iso) return false;
  const t = new Date();
  t.setHours(0, 0, 0, 0);
  const d = new Date(iso);
  d.setHours(0, 0, 0, 0);
  return d.getTime() < t.getTime();
}

interface KpiCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  helper?: string;
  accent?: string;
}

function KpiCard({ icon, label, value, helper, accent }: KpiCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.35 }}
      className="rounded-2xl border border-border bg-white p-4 shadow-sm"
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "grid h-8 w-8 place-items-center rounded-lg",
            accent ?? "bg-primary/10 text-primary"
          )}
        >
          {icon}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          {label}
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-bold leading-none text-ink">
        {value}
      </p>
      {helper && <p className="mt-1.5 text-xs text-muted">{helper}</p>}
    </motion.div>
  );
}

export function TaskKpis({ tasks }: TaskKpisProps) {
  const ativas = tasks.filter((t) => t.status !== "concluida").length;
  const atrasadas = tasks.filter(
    (t) => t.status !== "concluida" && isPast(t.prazo)
  ).length;
  const concluidasHoje = tasks.filter(
    (t) => t.status === "concluida" && isToday(t.atualizadaEm)
  ).length;

  const porSetor: Record<Setor, number> = {
    vendas: 0,
    locacao: 0,
    captacao: 0,
    financeiro: 0,
    juridico: 0,
  };
  for (const t of tasks) {
    if (t.status !== "concluida") porSetor[t.setor] += 1;
  }
  const total = ativas || 1;

  return (
    <div className="mb-5 grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KpiCard
        icon={<ListTodo className="h-4 w-4" />}
        label="Ativas"
        value={ativas}
        helper="Em todas as colunas"
      />
      <KpiCard
        icon={<AlertCircle className="h-4 w-4" />}
        label="Atrasadas"
        value={atrasadas}
        helper={atrasadas > 0 ? "Precisam de ação" : "Tudo em dia"}
        accent="bg-rose-100 text-rose-700"
      />
      <KpiCard
        icon={<CheckCircle2 className="h-4 w-4" />}
        label="Concluídas hoje"
        value={concluidasHoje}
        helper="Atualizado em tempo real"
        accent="bg-emerald-100 text-emerald-700"
      />

      {/* Card por setor (stacked bar) */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="col-span-2 rounded-2xl border border-border bg-white p-4 shadow-sm lg:col-span-1"
      >
        <div className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 text-primary">
            <LayoutGrid className="h-4 w-4" />
          </span>
          <span className="text-xs font-medium uppercase tracking-wider text-muted">
            Por setor
          </span>
        </div>
        <div className="mt-3 flex h-2 w-full overflow-hidden rounded-full bg-app">
          {SETORES.map((s) => {
            const pct = (porSetor[s] / total) * 100;
            if (pct === 0) return null;
            return (
              <div
                key={s}
                className={cn("h-full", SETOR_BAR[s])}
                style={{ width: `${pct}%` }}
                title={`${SETOR_LABELS[s]}: ${porSetor[s]}`}
              />
            );
          })}
        </div>
        <ul className="mt-3 grid grid-cols-2 gap-x-2 gap-y-1 text-[11px] text-muted">
          {SETORES.map((s) => (
            <li key={s} className="flex items-center gap-1.5">
              <span
                className={cn("h-1.5 w-1.5 rounded-full", SETOR_BAR[s])}
                aria-hidden
              />
              <span>
                {SETOR_LABELS[s]}{" "}
                <span className="font-semibold text-ink">{porSetor[s]}</span>
              </span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
