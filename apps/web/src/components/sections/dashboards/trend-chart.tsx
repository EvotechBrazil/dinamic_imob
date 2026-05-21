"use client";

/**
 * <TrendAreaChart />
 * Card grande (col-span-2) com AreaChart Tremor — tendência de leads diários
 * nos últimos 30 dias. Header mostra total e média; footer micro-stats com
 * total, pico e média.
 */

import { AreaChart } from "@tremor/react";
import { TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  TREND_30D,
  TREND_AVG,
  TREND_PEAK,
  TREND_PEAK_LABEL,
  TREND_TOTAL,
} from "./mock";

export function TrendAreaChart() {
  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Leads diários (30 dias)
            </CardTitle>
            <CardDescription>
              Tendência crescente · maio/2026
            </CardDescription>
          </div>
          <div className="flex items-baseline gap-4 text-right">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">
                Total
              </p>
              <p className="font-display text-xl font-bold text-ink">
                {TREND_TOTAL}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted">
                Média
              </p>
              <p className="font-display text-xl font-bold text-ink">
                {TREND_AVG}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="mt-2 h-80"
          data={TREND_30D}
          index="label"
          categories={["valor"]}
          colors={["indigo"]}
          valueFormatter={(v) => `${v} leads`}
          yAxisWidth={40}
          showLegend={false}
          showGridLines
          showGradient
          curveType="monotone"
        />

        {/* Footer micro-stats */}
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border pt-3 text-xs text-muted">
          <span>
            Total: <strong className="text-ink">{TREND_TOTAL}</strong>
          </span>
          <span className="text-border">·</span>
          <span>
            Pico:{" "}
            <strong className="text-ink">{TREND_PEAK}</strong>{" "}
            (em {TREND_PEAK_LABEL})
          </span>
          <span className="text-border">·</span>
          <span>
            Média: <strong className="text-ink">{TREND_AVG}/dia</strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
