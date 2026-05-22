"use client";

/**
 * <ContractsTable />
 * Tabela 10 contratos com filtro por status (Tabs).
 */

import { useMemo, useState } from "react";
import {
  ChevronRight,
  Download,
  Eye,
  FileSignature,
  MessageCircle,
  Plus,
  RefreshCw,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn, formatBRL, initials } from "@/lib/utils";
import type { Contract, ContractStatus } from "@/lib/mock-types";

import { CONTRACTS } from "./mock";

// ============================================================
// Helpers locais
// ============================================================
const MES_ABREV = [
  "Jan",
  "Fev",
  "Mar",
  "Abr",
  "Mai",
  "Jun",
  "Jul",
  "Ago",
  "Set",
  "Out",
  "Nov",
  "Dez",
];

function formatPeriodo(inicio: string, fim: string): string {
  const di = new Date(inicio);
  const df = new Date(fim);
  const a = `${MES_ABREV[di.getMonth()]}/${String(di.getFullYear()).slice(-2)}`;
  const b = `${MES_ABREV[df.getMonth()]}/${String(df.getFullYear()).slice(-2)}`;
  return `${a} → ${b}`;
}

const STATUS_STYLES: Record<ContractStatus, string> = {
  ativo: "bg-emerald-100 text-emerald-700 border-emerald-200",
  vencendo: "bg-amber-100 text-amber-800 border-amber-200",
  encerrado: "bg-slate-100 text-slate-600 border-slate-200",
};

const STATUS_LABELS: Record<ContractStatus, string> = {
  ativo: "Ativo",
  vencendo: "Vencendo",
  encerrado: "Encerrado",
};

type Filter = "todos" | ContractStatus;

// ============================================================
// Chat IA bridge
// ============================================================
function openChatWith(prompt: string, context?: string) {
  return () => {
    window.dispatchEvent(
      new CustomEvent("dinamic:open-chat-widget", {
        detail: { prompt, context },
      })
    );
  };
}

function buildPrompt(c: Contract): string {
  switch (c.status) {
    case "ativo":
      return `Me mostra os detalhes do contrato de ${c.locatario} — ${c.imovel}. Quando termina?`;
    case "vencendo":
      return `O contrato de ${c.locatario} (${c.imovel}) tá vencendo. Qual o próximo passo — renovação ou notificação?`;
    case "encerrado":
      return `Me lembra os detalhes do contrato encerrado de ${c.locatario}: período e fechamento`;
  }
}

function buildContext(c: Contract): string {
  return JSON.stringify({
    tipo: "contrato",
    inquilino: c.locatario,
    imovel: c.imovel,
    status: c.status,
    inicio: c.periodoInicio,
    fim: c.periodoFim,
    valorMensal: c.valor,
  });
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "todos", label: "Todos" },
  { value: "ativo", label: "Ativos" },
  { value: "vencendo", label: "Vencendo" },
  { value: "encerrado", label: "Encerrados" },
];

// ============================================================
// Component
// ============================================================
export function ContractsTable() {
  const [filter, setFilter] = useState<Filter>("todos");

  const filtered = useMemo<Contract[]>(() => {
    if (filter === "todos") return CONTRACTS;
    return CONTRACTS.filter((c) => c.status === filter);
  }, [filter]);

  return (
    <Card className="lg:col-span-2">
      <CardHeader className="flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2 text-lg">
            <FileSignature className="h-5 w-5 text-primary" />
            Contratos de locação
          </CardTitle>
          <p className="mt-1 text-xs text-muted">
            10 contratos exibidos de um total de 142.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList>
              {FILTERS.map((f) => (
                <TabsTrigger key={f.value} value={f.value} className="text-xs">
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <Button size="sm" className="gap-1.5">
            <Plus className="h-4 w-4" />
            Novo contrato
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-slate-50/60 text-left text-xs uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3 font-medium">Locatário</th>
                <th className="px-4 py-3 font-medium">Imóvel</th>
                <th className="px-4 py-3 font-medium">Período</th>
                <th className="px-4 py-3 text-right font-medium">Valor</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-10 text-center text-sm text-muted"
                  >
                    Nenhum contrato neste filtro.
                  </td>
                </tr>
              )}
              {filtered.map((c) => {
                const handleOpenChat = openChatWith(
                  buildPrompt(c),
                  buildContext(c)
                );
                return (
                <tr
                  key={c.id}
                  role="button"
                  tabIndex={0}
                  onClick={handleOpenChat}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpenChat();
                    }
                  }}
                  className={cn(
                    "group cursor-pointer border-b border-border/60 last:border-b-0 transition-colors hover:bg-primary/5 focus:bg-primary/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
                    c.status === "vencendo" && "bg-amber-50/50"
                  )}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-xs font-medium text-primary">
                          {initials(c.locatario)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <div className="truncate font-medium text-ink">
                          {c.locatario}
                        </div>
                        <div className="truncate text-xs text-muted">
                          {c.bairro}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ink">
                    <span className="line-clamp-1">{c.imovel}</span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {formatPeriodo(c.periodoInicio, c.periodoFim)}
                  </td>
                  <td className="px-4 py-3 text-right font-mono text-ink">
                    {formatBRL(c.valor)}
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      variant="outline"
                      className={cn(
                        "border text-[11px] font-medium",
                        STATUS_STYLES[c.status]
                      )}
                    >
                      {STATUS_LABELS[c.status]}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <MessageCircle
                        aria-hidden
                        className="h-3.5 w-3.5 text-primary opacity-0 transition-opacity group-hover:opacity-100 group-focus:opacity-100"
                      />
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => e.stopPropagation()}
                            onKeyDown={(e) => e.stopPropagation()}
                            className="h-7 gap-1 px-2 text-xs text-muted hover:text-primary"
                          >
                            Ações
                            <ChevronRight className="h-3 w-3" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="w-40 p-1 text-sm"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-slate-100"
                          >
                            <Eye className="h-3.5 w-3.5 text-muted" />
                            Ver
                          </button>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-slate-100"
                          >
                            <RefreshCw className="h-3.5 w-3.5 text-muted" />
                            Renovar
                          </button>
                          <button
                            type="button"
                            onClick={(e) => e.stopPropagation()}
                            className="flex w-full items-center gap-2 rounded-sm px-2 py-1.5 text-left hover:bg-slate-100"
                          >
                            <Download className="h-3.5 w-3.5 text-muted" />
                            Baixar PDF
                          </button>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-border bg-slate-50/40 px-4 py-3 text-xs text-muted">
          <span>
            Mostrando <span className="font-semibold text-ink">{filtered.length}</span> de{" "}
            <span className="font-semibold text-ink">142</span> contratos
          </span>
          <Button variant="ghost" size="sm" className="h-6 gap-1 px-2 text-xs">
            Ver todos
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
