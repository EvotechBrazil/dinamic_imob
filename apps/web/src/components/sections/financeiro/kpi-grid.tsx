"use client";

import { BadgeDelta, Card, Metric } from "@tremor/react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Building2,
  DollarSign,
  Wallet,
  type LucideIcon,
} from "lucide-react";

import type { DeltaType, KPI } from "@/lib/mock-types";
import { cn } from "@/lib/utils";

interface KpiGridProps {
  kpis: KPI[];
}

// Mapeamento label -> ícone + cor de destaque
const ICON_BY_LABEL: Record<
  string,
  { Icon: LucideIcon; tint: string; ring: string }
> = {
  "Receita do mês": {
    Icon: DollarSign,
    tint: "bg-primary/10 text-primary",
    ring: "ring-primary/15",
  },
  "A receber (próximos 30d)": {
    Icon: Wallet,
    tint: "bg-accent/10 text-accent",
    ring: "ring-accent/15",
  },
  Inadimplência: {
    Icon: AlertTriangle,
    tint: "bg-rose-100 text-rose-600",
    ring: "ring-rose-200/60",
  },
  "Repasses (proprietários)": {
    Icon: Building2,
    tint: "bg-teal-100 text-teal-700",
    ring: "ring-teal-200/60",
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

export function KpiGrid({ kpis }: KpiGridProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {kpis.map((kpi, i) => {
        const meta =
          ICON_BY_LABEL[kpi.label] ?? {
            Icon: DollarSign,
            tint: "bg-slate-100 text-slate-600",
            ring: "ring-slate-200/60",
          };
        const { Icon, tint, ring } = meta;
        const deltaText =
          kpi.delta !== undefined
            ? `${kpi.delta > 0 ? "+" : ""}${kpi.delta}${kpi.suffix === "%" ? "" : "%"}`
            : null;

        return (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
          >
            <Card
              className={cn(
                "group relative overflow-hidden rounded-xl border border-border bg-surface p-5 shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-0.5 hover:shadow-card hover:ring-1",
                ring,
              )}
              decoration=""
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg",
                    tint,
                  )}
                >
                  <Icon className="h-4 w-4" strokeWidth={2.2} />
                </div>
                {deltaText && kpi.deltaType && (
                  <BadgeDelta
                    deltaType={DELTA_MAP[kpi.deltaType]}
                    size="xs"
                    className="font-medium"
                  >
                    {deltaText}
                  </BadgeDelta>
                )}
              </div>

              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">
                {kpi.label}
              </p>
              <Metric className="mt-1 font-display text-3xl font-bold text-ink">
                {typeof kpi.value === "number"
                  ? `${kpi.prefix ?? ""}${kpi.value}${kpi.suffix ?? ""}`
                  : kpi.value}
              </Metric>
              {kpi.helper && (
                <p className="mt-1 text-xs text-muted">{kpi.helper}</p>
              )}
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
