"use client";

import { BadgeDelta } from "@tremor/react";
import { motion } from "framer-motion";
import { Activity, Coins, Cpu, TrendingUp, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import { TOKENIZACAO_KPIS } from "./mock";

const ICONS: LucideIcon[] = [Coins, Activity, TrendingUp, Cpu];

/**
 * <KpiRow />
 * Grid 4 KPIs: Saldo / Consumo mês / Média dia / Tokens.
 * Stagger fade-in via framer-motion.
 */
export function KpiRow() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
      {TOKENIZACAO_KPIS.map((kpi, idx) => {
        const Icon = ICONS[idx] ?? Coins;
        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.3, delay: idx * 0.06 }}
            className="rounded-lg border border-border bg-surface p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-md",
                  idx === 0 && "bg-primary/10 text-primary",
                  idx === 1 && "bg-emerald-50 text-emerald-600",
                  idx === 2 && "bg-amber-50 text-amber-600",
                  idx === 3 && "bg-violet-50 text-violet-600",
                )}
              >
                <Icon className="h-4 w-4" />
              </div>
              {kpi.delta !== undefined && kpi.deltaType ? (
                <BadgeDelta deltaType={kpi.deltaType} size="xs">
                  {Math.abs(kpi.delta)}%
                </BadgeDelta>
              ) : null}
            </div>

            <div className="mt-3 text-xs font-medium uppercase tracking-wide text-muted">
              {kpi.label}
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-ink">
              {kpi.value}
            </div>
            {kpi.helper && (
              <div className="mt-1 text-xs text-muted">{kpi.helper}</div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
