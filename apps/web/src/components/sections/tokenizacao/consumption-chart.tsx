"use client";

import { AreaChart } from "@tremor/react";
import { Info } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatBRL } from "@/lib/utils";

import { CONSUMO_DIARIO, MEDIA_DIA } from "./mock";

/**
 * <ConsumptionChart />
 * AreaChart do consumo diário (R$) últimos 30 dias.
 * Header mostra média/dia. Footer com hint sobre outliers.
 */
export function ConsumptionChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <CardTitle>Consumo últimos 30 dias</CardTitle>
            <CardDescription>
              Evolução do gasto diário com modelos IA
            </CardDescription>
          </div>
          <div className="rounded-lg bg-primary/5 px-3 py-1.5 text-right">
            <div className="text-[10px] font-medium uppercase tracking-wide text-muted">
              Média/dia
            </div>
            <div className="font-mono text-sm font-semibold text-primary">
              {formatBRL(MEDIA_DIA)}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <AreaChart
          className="h-[280px]"
          data={CONSUMO_DIARIO}
          index="label"
          categories={["valor"]}
          colors={["indigo"]}
          valueFormatter={(v) => formatBRL(v)}
          showLegend={false}
          showXAxis
          showYAxis
          showGridLines
          curveType="monotone"
          yAxisWidth={56}
        />

        <div className="mt-3 flex items-start gap-1.5 text-xs text-muted">
          <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary/60" />
          <span>
            Outliers em dias de alta demanda — quando a IA toma mais turnos
            antes do handoff pro corretor humano.
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
