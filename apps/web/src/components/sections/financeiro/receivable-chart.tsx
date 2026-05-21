"use client";

import { AreaChart, Card } from "@tremor/react";
import { BarChart3 } from "lucide-react";
import { useMemo } from "react";

import type { ChartPoint } from "@/lib/mock-types";

interface ReceivableChartProps {
  data: ChartPoint[];
}

const formatBRLCompact = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

export function ReceivableChart({ data }: ReceivableChartProps) {
  // Tremor espera { Recebido, Previsto } no payload
  const chartData = useMemo(
    () =>
      data.map((p) => ({
        mes: p.label,
        Recebido: p.valor,
        Previsto: p.valor2 ?? 0,
      })),
    [data],
  );

  const totalRecebido = data.reduce((acc, p) => acc + p.valor, 0);
  const totalPrevisto = data.reduce((acc, p) => acc + (p.valor2 ?? 0), 0);
  const cobertura = totalPrevisto
    ? Math.round((totalRecebido / totalPrevisto) * 100)
    : 0;

  return (
    <Card
      className="h-full rounded-xl border border-border bg-surface p-6 shadow-sm"
      decoration=""
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-muted">
            <BarChart3 className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Performance financeira
            </span>
          </div>
          <h3 className="mt-1 font-display text-xl font-bold text-ink">
            Recebido vs Previsto
          </h3>
          <p className="mt-0.5 text-sm text-muted">Últimos 6 meses</p>
        </div>
        <div className="rounded-lg bg-primary/5 px-3 py-2 text-right">
          <p className="text-xs uppercase tracking-wider text-muted">
            Cobertura
          </p>
          <p className="font-display text-lg font-bold text-primary">
            {cobertura}%
          </p>
        </div>
      </div>

      <div className="mt-6 flex items-center gap-5 text-xs">
        <LegendDot color="bg-primary" label="Recebido" />
        <LegendDot color="bg-accent" label="Previsto" dashed />
      </div>

      <AreaChart
        className="mt-3 h-72"
        data={chartData}
        index="mes"
        categories={["Recebido", "Previsto"]}
        colors={["indigo", "amber"]}
        valueFormatter={formatBRLCompact}
        showLegend={false}
        showAnimation
        curveType="monotone"
        yAxisWidth={56}
        customTooltip={({ payload, active, label }) => {
          if (!active || !payload?.length) return null;
          return (
            <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-card">
              <p className="text-xs font-semibold text-muted">{label}</p>
              {payload.map((p) => (
                <div
                  key={p.dataKey as string}
                  className="mt-1 flex items-center gap-2 text-xs"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: p.color }}
                  />
                  <span className="text-muted">{p.dataKey}:</span>
                  <span className="font-semibold text-ink">
                    {formatBRL(Number(p.value))}
                  </span>
                </div>
              ))}
            </div>
          );
        }}
      />
    </Card>
  );
}

function LegendDot({
  color,
  label,
  dashed,
}: {
  color: string;
  label: string;
  dashed?: boolean;
}) {
  return (
    <div className="flex items-center gap-2 text-muted">
      <span
        className={`inline-block h-2.5 w-2.5 rounded-full ${color} ${
          dashed ? "ring-2 ring-offset-1 ring-accent/40" : ""
        }`}
      />
      <span className="font-medium text-ink">{label}</span>
    </div>
  );
}
