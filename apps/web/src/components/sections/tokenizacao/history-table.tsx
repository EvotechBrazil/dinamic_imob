"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatBRL, formatNumberBR, relativeTime } from "@/lib/utils";

import { TOKEN_HISTORICO } from "./mock";

type FilterKey = "todos" | "hoje" | "semana";

const MODELO_BADGE: Record<
  string,
  { label: string; variant: "default" | "info" | "warning" | "muted" }
> = {
  "qwen3.7-max": { label: "qwen3.7-max", variant: "default" },
  "haiku-4.5": { label: "haiku-4.5", variant: "info" },
  "sonnet-4.6": { label: "sonnet-4.6", variant: "warning" },
};

const ONE_DAY_MS = 24 * 60 * 60 * 1000;
const ONE_WEEK_MS = 7 * ONE_DAY_MS;

/**
 * <HistoryTable />
 * Tabela com 10 registros recentes.
 * Filtros: Todos / Hoje / Esta semana.
 * Footer: total exibido.
 */
export function HistoryTable() {
  const [filter, setFilter] = useState<FilterKey>("todos");

  const records = useMemo(() => {
    const now = Date.now();
    if (filter === "hoje") {
      return TOKEN_HISTORICO.filter(
        (r) => now - new Date(r.ts).getTime() <= ONE_DAY_MS,
      );
    }
    if (filter === "semana") {
      return TOKEN_HISTORICO.filter(
        (r) => now - new Date(r.ts).getTime() <= ONE_WEEK_MS,
      );
    }
    return TOKEN_HISTORICO;
  }, [filter]);

  const totalExibido = records.reduce((acc, r) => acc + r.costBRL, 0);

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>Histórico de consumo</CardTitle>
            <CardDescription>
              Cada chamada do agente IA — modelo, tokens, custo
            </CardDescription>
          </div>
          <Tabs
            value={filter}
            onValueChange={(v) => setFilter(v as FilterKey)}
          >
            <TabsList>
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="hoje">Hoje</TabsTrigger>
              <TabsTrigger value="semana">Esta semana</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="px-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-app/40 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-6 py-3 font-medium">Quando</th>
                <th className="px-6 py-3 font-medium">Conversa</th>
                <th className="px-6 py-3 font-medium">Modelo</th>
                <th className="px-6 py-3 text-right font-medium">Tokens</th>
                <th className="px-6 py-3 text-right font-medium">Custo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {records.map((r) => {
                const badge = MODELO_BADGE[r.modelo] ?? {
                  label: r.modelo,
                  variant: "muted" as const,
                };
                return (
                  <tr
                    key={r.id}
                    className="transition-colors hover:bg-app/60"
                  >
                    <td className="px-6 py-3 text-ink">
                      <div className="flex flex-col">
                        <span className="text-sm font-medium">
                          {relativeTime(r.ts)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="font-mono text-xs text-muted">
                        {r.conversa}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      <Badge variant={badge.variant}>{badge.label}</Badge>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <div className="flex items-center justify-end gap-3 font-mono text-xs">
                        <span className="inline-flex items-center gap-1 text-emerald-600">
                          <ArrowDown className="h-3 w-3" />
                          {formatNumberBR(r.tokensIn)}
                        </span>
                        <span className="inline-flex items-center gap-1 text-violet-600">
                          <ArrowUp className="h-3 w-3" />
                          {formatNumberBR(r.tokensOut)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span
                        className={cn(
                          "font-mono text-sm font-semibold text-accent",
                        )}
                      >
                        {formatBRL(r.costBRL)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-3 text-xs">
          <span className="text-muted">
            {records.length} {records.length === 1 ? "registro" : "registros"}{" "}
            exibido{records.length === 1 ? "" : "s"}
          </span>
          <span className="text-muted">
            Total exibido:{" "}
            <span className="font-mono font-semibold text-ink">
              {formatBRL(totalExibido)}
            </span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
