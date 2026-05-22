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

import { AnimatedNumber } from "@/components/ui/animated-number";
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

/**
 * Converte o valor do KPI (que pode vir como `number` ou como string
 * pré-formatada no padrão BR — "48.200", "1.250,50") num número finito
 * que o AnimatedNumber consiga animar. Devolve também:
 * - `decimals`: quantas casas o valor original tinha (pra animar 2.8 com 1).
 * - `useGrouping`: se a string original tinha separador de milhar (pra
 *   preservar "48.200" durante a animação).
 */
function parseKpiValue(raw: KPI["value"]): {
  numeric: number;
  decimals: number;
  useGrouping: boolean;
} {
  if (typeof raw === "number") {
    const text = raw.toString();
    const dotIdx = text.indexOf(".");
    const decimals = dotIdx === -1 ? 0 : text.length - dotIdx - 1;
    return { numeric: raw, decimals, useGrouping: false };
  }

  // String BR: ponto = milhar, vírgula = decimal.
  const trimmed = raw.trim();
  const useGrouping = trimmed.includes(".");
  const normalized = trimmed.replace(/\./g, "").replace(",", ".");
  const parsed = Number.parseFloat(normalized);

  if (!Number.isFinite(parsed)) {
    return { numeric: 0, decimals: 0, useGrouping: false };
  }

  const commaIdx = trimmed.indexOf(",");
  const decimals = commaIdx === -1 ? 0 : trimmed.length - commaIdx - 1;
  return { numeric: parsed, decimals, useGrouping };
}

/** Formatter BR para o valor intermediário do count-up. */
function formatKpi(
  n: number,
  options: { decimals: number; useGrouping: boolean }
): string {
  return n.toLocaleString("pt-BR", {
    minimumFractionDigits: options.decimals,
    maximumFractionDigits: options.decimals,
    useGrouping: options.useGrouping,
  });
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

            {/* Valor — count-up animado ao entrar no viewport */}
            <p className="mt-1 font-display text-2xl font-bold text-ink xl:text-3xl">
              {(() => {
                const { numeric, decimals, useGrouping } = parseKpiValue(
                  kpi.value
                );
                return (
                  <AnimatedNumber
                    value={numeric}
                    decimals={decimals}
                    duration={1.5}
                    format={(n) =>
                      `${kpi.prefix ?? ""}${formatKpi(n, {
                        decimals,
                        useGrouping,
                      })}${kpi.suffix ?? ""}`
                    }
                  />
                );
              })()}
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
