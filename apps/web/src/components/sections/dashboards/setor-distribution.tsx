"use client";

/**
 * <SetorDistribution />
 * Donut Tremor pequeno + lista vertical de % por setor com bar inline mostrando
 * proporção. Cores: vendas=indigo, locacao=teal, captacao=amber, financeiro=slate.
 */

import { DonutChart } from "@tremor/react";
import { PieChart } from "lucide-react";

import { AnimatedNumber } from "@/components/ui/animated-number";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

import { SETOR_DIST } from "./mock";

// Cor Tremor → classes Tailwind do dot + bar de proporção
const SETOR_COLOR: Record<string, { dot: string; bar: string }> = {
  indigo: { dot: "bg-indigo-500", bar: "bg-indigo-500" },
  teal: { dot: "bg-teal-500", bar: "bg-teal-500" },
  amber: { dot: "bg-amber-500", bar: "bg-amber-500" },
  slate: { dot: "bg-slate-400", bar: "bg-slate-400" },
};

export function SetorDistribution() {
  const data = SETOR_DIST.map((s) => ({ name: s.name, value: s.value }));
  const colors = SETOR_DIST.map((s) => s.color);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-primary" />
          Distribuição por setor
        </CardTitle>
        <CardDescription>
          Como o pipeline de leads se divide entre os times
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 items-center gap-6 sm:grid-cols-2">
          {/* Donut pequeno */}
          <div className="flex items-center justify-center">
            <DonutChart
              className="h-48 w-48"
              data={data}
              category="value"
              index="name"
              colors={colors}
              valueFormatter={(v) => `${v}%`}
              showAnimation
              variant="pie"
            />
          </div>

          {/* Lista lateral com bar inline */}
          <ul role="list" className="space-y-3">
            {SETOR_DIST.map((s) => {
              const meta = SETOR_COLOR[s.color] ?? SETOR_COLOR.slate;
              return (
                <li key={s.name}>
                  <div className="mb-1 flex items-center justify-between gap-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "h-2.5 w-2.5 rounded-full",
                          meta.dot
                        )}
                        aria-hidden="true"
                      />
                      <span className="font-medium text-ink">{s.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-ink">
                      <AnimatedNumber
                        value={s.value}
                        duration={1.2}
                        format={(n) => `${n}%`}
                      />
                    </span>
                  </div>
                  <div
                    className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100"
                    role="progressbar"
                    aria-valuenow={s.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${s.name}: ${s.value}%`}
                  >
                    <div
                      className={cn("h-full rounded-full", meta.bar)}
                      style={{ width: `${s.value}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
