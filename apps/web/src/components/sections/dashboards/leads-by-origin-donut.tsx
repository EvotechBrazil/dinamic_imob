"use client";

/**
 * <LeadsByOriginDonut />
 * Donut Tremor com 5 fatias + legenda lateral customizada com bolinha colorida,
 * nome, count e percentage. Total centralizado.
 */

import { DonutChart } from "@tremor/react";
import { Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { LEADS_BY_ORIGIN, ORIGIN_TOTAL } from "./mock";

// Cores Tremor (string) → classe utilitária Tailwind do dot da legenda
const DOT_CLASS: Record<string, string> = {
  indigo: "bg-indigo-500",
  pink: "bg-pink-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
};

export function LeadsByOriginDonut() {
  const data = LEADS_BY_ORIGIN.map((o) => ({ name: o.name, value: o.value }));
  const colors = LEADS_BY_ORIGIN.map((o) => o.color);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-accent" />
          Leads por origem
        </CardTitle>
        <CardDescription>
          Distribuição dos {ORIGIN_TOTAL} leads ativos no mês
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Donut com total no centro */}
        <div className="relative mx-auto flex h-44 max-w-[200px] items-center justify-center">
          <DonutChart
            className="h-44 w-44"
            data={data}
            category="value"
            index="name"
            colors={colors}
            valueFormatter={(v) => `${v} leads`}
            showAnimation
            showLabel={false}
          />
          {/* Total centralizado */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-2xl font-bold text-ink">
              {ORIGIN_TOTAL}
            </span>
            <span className="text-xs uppercase tracking-wider text-muted">
              leads
            </span>
          </div>
        </div>

        {/* Legenda lateral */}
        <ul role="list" className="mt-5 space-y-2.5">
          {LEADS_BY_ORIGIN.map((o) => {
            const pct = Math.round((o.value / ORIGIN_TOTAL) * 100);
            return (
              <li
                key={o.name}
                className="flex items-center justify-between gap-3 text-sm"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "h-2.5 w-2.5 flex-shrink-0 rounded-full",
                      DOT_CLASS[o.color] ?? "bg-slate-400"
                    )}
                    aria-hidden="true"
                  />
                  <span className="truncate font-medium text-ink">
                    {o.name}
                  </span>
                </div>
                <div className="flex items-baseline gap-2 text-xs">
                  <span className="font-semibold text-ink">{o.value}</span>
                  <span className="text-muted">({pct}%)</span>
                </div>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
}
