"use client";

/**
 * <KpiGrid />
 * 6 KPI cards consolidados com Tremor BadgeDelta + ícones lucide.
 * Stagger fade-in via framer-motion.
 */

import { BadgeDelta } from "@tremor/react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Calendar,
  DollarSign,
  Home,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { KPI } from "@/lib/mock-types";

import { DASHBOARD_KPIS } from "./mock";

// ============================================================
// Mapeamento label → ícone + cor de fundo do ícone
// ============================================================
const ICON_MAP: Record<string, { Icon: LucideIcon; bg: string }> = {
  "Imóveis ativos": { Icon: Home, bg: "bg-indigo-100 text-indigo-700" },
  "Leads no mês": { Icon: Users, bg: "bg-pink-100 text-pink-700" },
  "Visitas agendadas": { Icon: Calendar, bg: "bg-sky-100 text-sky-700" },
  Conversão: { Icon: TrendingUp, bg: "bg-emerald-100 text-emerald-700" },
  Receita: { Icon: DollarSign, bg: "bg-amber-100 text-amber-700" },
  Inadimplência: { Icon: AlertTriangle, bg: "bg-rose-100 text-rose-700" },
};

// KPIs em destaque (Imóveis ativos, Receita) recebem borda primary
const HIGHLIGHT_LABELS = new Set(["Imóveis ativos", "Receita"]);

/** Sufixo do delta: "pp" para campos em %, "%" para o resto. */
function deltaSuffix(kpi: KPI): string {
  return kpi.suffix === "%" ? "pp" : "%";
}

export function KpiGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {DASHBOARD_KPIS.map((kpi, i) => {
        const meta = ICON_MAP[kpi.label] ?? {
          Icon: TrendingUp,
          bg: "bg-slate-100 text-slate-700",
        };
        const Icon = meta.Icon;
        const highlight = HIGHLIGHT_LABELS.has(kpi.label);

        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.05, ease: "easeOut" }}
            whileHover={{ y: -2 }}
            className={cn(
              "rounded-xl border bg-surface p-5 shadow-card transition-shadow hover:shadow-md",
              highlight
                ? "border-primary/30 bg-primary/5"
                : "border-border"
            )}
          >
            {/* Topo: ícone + delta */}
            <div className="flex items-start justify-between gap-2">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-lg",
                  meta.bg
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
              </div>
              {kpi.delta !== undefined && kpi.deltaType && (
                <BadgeDelta deltaType={kpi.deltaType} size="xs">
                  {kpi.delta > 0 ? "+" : ""}
                  {kpi.delta}
                  {deltaSuffix(kpi)}
                </BadgeDelta>
              )}
            </div>

            {/* Label */}
            <p className="mt-4 text-xs font-medium uppercase tracking-wider text-muted">
              {kpi.label}
            </p>

            {/* Valor */}
            <p className="mt-1 font-display text-2xl font-bold text-ink xl:text-3xl">
              {kpi.prefix ?? ""}
              {kpi.value}
              {kpi.suffix ?? ""}
            </p>

            {/* Helper */}
            {kpi.helper && (
              <p className="mt-1.5 text-xs text-muted">{kpi.helper}</p>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
