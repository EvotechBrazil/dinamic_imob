"use client";

import {
  ArrowUpRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
import { useMemo } from "react";

import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Boleto, BoletoStatus } from "@/lib/mock-types";
import { cn } from "@/lib/utils";

interface BoletosTableProps {
  boletos: Boleto[];
}

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(value);

const STATUS_CFG: Record<
  BoletoStatus,
  {
    label: string;
    badge: string;
    row: string;
    icon: typeof CheckCircle2;
  }
> = {
  pago: {
    label: "Pago",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    row: "",
    icon: CheckCircle2,
  },
  pendente: {
    label: "Pendente",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    row: "",
    icon: Clock,
  },
  vencido: {
    label: "Vencido",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    row: "bg-rose-50/40",
    icon: XCircle,
  },
  cancelado: {
    label: "Cancelado",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    row: "",
    icon: XCircle,
  },
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

const AVATAR_GRADIENTS = [
  "from-indigo-500 to-violet-500",
  "from-amber-500 to-orange-500",
  "from-teal-500 to-emerald-500",
  "from-rose-500 to-pink-500",
  "from-sky-500 to-cyan-500",
];

export function BoletosTable({ boletos }: BoletosTableProps) {
  const totalPendentes = useMemo(
    () =>
      boletos
        .filter((b) => b.status === "pendente" || b.status === "vencido")
        .reduce((acc, b) => acc + b.valor, 0),
    [boletos],
  );
  const countPendentes = boletos.filter(
    (b) => b.status === "pendente" || b.status === "vencido",
  ).length;

  return (
    <Card className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
      <div className="flex items-center justify-between border-b border-border px-6 py-4">
        <div>
          <h3 className="font-display text-lg font-bold text-ink">
            Próximos vencimentos
          </h3>
          <p className="text-xs text-muted">
            Boletos do mês corrente — visão executiva
          </p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-primary hover:bg-primary/5"
        >
          Ver todos
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-app/60 text-xs uppercase tracking-wider text-muted">
            <tr>
              <th className="px-6 py-3 text-left font-semibold">Locatário</th>
              <th className="px-6 py-3 text-left font-semibold">Imóvel</th>
              <th className="px-6 py-3 text-right font-semibold">Valor</th>
              <th className="px-6 py-3 text-left font-semibold">Vencimento</th>
              <th className="px-6 py-3 text-left font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {boletos.map((b, i) => {
              const cfg = STATUS_CFG[b.status];
              const Icon = cfg.icon;
              const gradient =
                AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length] ??
                AVATAR_GRADIENTS[0];

              return (
                <tr
                  key={b.id}
                  className={cn(
                    "transition-colors hover:bg-app/60",
                    cfg.row,
                  )}
                >
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-3">
                      <Avatar
                        className={cn(
                          "h-9 w-9 bg-gradient-to-br text-white",
                          gradient,
                        )}
                      >
                        <span className="flex h-full w-full items-center justify-center text-xs font-semibold">
                          {getInitials(b.locatario)}
                        </span>
                      </Avatar>
                      <div>
                        <p className="font-medium text-ink">{b.locatario}</p>
                        <p className="text-xs text-muted">{b.bairro}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-ink">{b.imovel}</td>
                  <td className="px-6 py-3.5 text-right font-display font-semibold tabular-nums text-ink">
                    {formatBRL(b.valor)}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="text-ink">{b.vencimento}</span>
                    {b.diasAtraso ? (
                      <span className="ml-1 text-xs font-medium text-rose-600">
                        ({b.diasAtraso}d)
                      </span>
                    ) : null}
                  </td>
                  <td className="px-6 py-3.5">
                    <Badge
                      variant="outline"
                      className={cn(
                        "gap-1 border font-medium",
                        cfg.badge,
                      )}
                    >
                      <Icon className="h-3 w-3" />
                      {cfg.label}
                    </Badge>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border bg-app/60 px-6 py-3">
        <p className="text-xs text-muted">
          <span className="font-semibold text-ink">{countPendentes}</span>{" "}
          boletos em aberto
        </p>
        <p className="text-sm text-muted">
          Total pendente:{" "}
          <span className="font-display text-base font-bold text-ink tabular-nums">
            {formatBRL(totalPendentes)}
          </span>
        </p>
      </div>
    </Card>
  );
}
