"use client";

/**
 * <JuridicoKpiRow />
 * 4 KPI cards: Contratos ativos · Vencendo (30d) · Pendentes LGPD · Consentimentos
 */

import { BadgeDelta } from "@tremor/react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  FileText,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

import { cn, formatNumberBR } from "@/lib/utils";
import type { DeltaType, KPI } from "@/lib/mock-types";

import { JURIDICO_KPIS } from "./mock";

interface KpiMeta {
  Icon: LucideIcon;
  tint: string;
  ring: string;
  highlight?: (value: number) => string;
}

const KPI_META: Record<string, KpiMeta> = {
  "Contratos ativos": {
    Icon: FileText,
    tint: "bg-primary/10 text-primary",
    ring: "ring-primary/15",
  },
  "Vencendo (30d)": {
    Icon: Calendar,
    tint: "bg-amber-100 text-amber-700",
    ring: "ring-amber-200/60",
    highlight: (v) => (v > 0 ? "bg-amber-50/60" : ""),
  },
  "Solicitações LGPD pendentes": {
    Icon: AlertCircle,
    tint: "bg-rose-100 text-rose-700",
    ring: "ring-rose-200/60",
    highlight: (v) => (v > 0 ? "bg-rose-50/60" : ""),
  },
  "Consentimentos ativos": {
    Icon: ShieldCheck,
    tint: "bg-emerald-100 text-emerald-700",
    ring: "ring-emerald-200/60",
  },
};

const DELTA_MAP: Record<
  DeltaType,
  "increase" | "moderateIncrease" | "unchanged" | "moderateDecrease" | "decrease"
> = {
  increase: "increase",
  decrease: "decrease",
  moderateIncrease: "moderateIncrease",
  moderateDecrease: "moderateDecrease",
  unchanged: "unchanged",
};

export function JuridicoKpiRow() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {JURIDICO_KPIS.map((kpi: KPI, i) => {
        const meta = KPI_META[kpi.label] ?? {
          Icon: FileText,
          tint: "bg-slate-100 text-slate-600",
          ring: "ring-slate-200/60",
        };
        const numericValue =
          typeof kpi.value === "number" ? kpi.value : Number(kpi.value);
        const { Icon, tint, ring, highlight } = meta;
        const highlightBg = highlight?.(numericValue) ?? "";

        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
            className={cn(
              "group rounded-lg border border-border bg-surface p-4 ring-1 transition-shadow hover:shadow-md",
              ring,
              highlightBg
            )}
          >
            <div className="flex items-start justify-between">
              <span
                className={cn(
                  "inline-flex h-9 w-9 items-center justify-center rounded-md",
                  tint
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              {kpi.delta !== undefined && kpi.deltaType && (
                <BadgeDelta
                  deltaType={DELTA_MAP[kpi.deltaType]}
                  size="xs"
                  isIncreasePositive
                >
                  {kpi.delta > 0 ? "+" : ""}
                  {kpi.delta}%
                </BadgeDelta>
              )}
            </div>
            <div className="mt-3 text-xs font-medium uppercase tracking-wider text-muted">
              {kpi.label}
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-ink">
              {typeof kpi.value === "number"
                ? formatNumberBR(kpi.value)
                : kpi.value}
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
