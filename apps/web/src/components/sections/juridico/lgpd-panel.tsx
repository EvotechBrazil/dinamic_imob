"use client";

/**
 * <LgpdPanel />
 * Painel lateral LGPD — mini-stats + lista de solicitações abertas.
 */

import {
  ChevronRight,
  Download,
  Lock,
  RefreshCw,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, formatNumberBR } from "@/lib/utils";
import type { LGPDRequestStatus, LGPDRequestType } from "@/lib/mock-types";

import {
  CONSENTIMENTOS_ATIVOS,
  LGPD_REQUESTS,
  POLITICAS_VERSIONADAS,
} from "./mock";

// ============================================================
// Helpers
// ============================================================
const TYPE_META: Record<
  LGPDRequestType,
  { label: string; Icon: typeof Download; tint: string }
> = {
  export: {
    label: "Exportação",
    Icon: Download,
    tint: "text-primary",
  },
  delete: {
    label: "Exclusão",
    Icon: Trash2,
    tint: "text-rose-600",
  },
  consent_revoke: {
    label: "Revogação",
    Icon: RefreshCw,
    tint: "text-amber-600",
  },
};

const STATUS_DOT: Record<LGPDRequestStatus, string> = {
  pendente: "bg-rose-500",
  concluido: "bg-emerald-500",
};

const STATUS_BADGE: Record<LGPDRequestStatus, string> = {
  pendente: "bg-rose-100 text-rose-700 border-rose-200",
  concluido: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

function relativeFromOpening(iso: string): string {
  const date = new Date(iso);
  const diffMs = Date.now() - date.getTime();
  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (days <= 0) return "hoje";
  if (days === 1) return "há 1 dia";
  if (days < 30) return `há ${days} dias`;
  const months = Math.floor(days / 30);
  return months === 1 ? "há 1 mês" : `há ${months} meses`;
}

// Pré-cálculo dos mini-stats
function countByTipoStatus(tipo: LGPDRequestType, status: LGPDRequestStatus) {
  return LGPD_REQUESTS.filter((r) => r.tipo === tipo && r.status === status)
    .length;
}

// ============================================================
// Component
// ============================================================
export function LgpdPanel() {
  const exportsPendentes = countByTipoStatus("export", "pendente");
  const exportsConcluidos = countByTipoStatus("export", "concluido");
  const deletesPendentes = countByTipoStatus("delete", "pendente");
  const deletesConcluidos = countByTipoStatus("delete", "concluido");

  const abertas = LGPD_REQUESTS.filter((r) => r.status === "pendente");

  return (
    <Card>
      <CardHeader className="border-b border-border pb-4">
        <CardTitle className="flex items-center gap-2 text-lg">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <ShieldCheck className="h-4 w-4" />
          </span>
          LGPD em dia
        </CardTitle>
        <p className="mt-1 text-xs text-muted">
          Direitos do titular sob política versionada.
        </p>
      </CardHeader>

      <CardContent className="space-y-5 p-5">
        {/* Mini-stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted">
              <Download className="h-3.5 w-3.5 text-primary" />
              <span>Solicitações de export</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">
                {exportsPendentes} pendente{exportsPendentes !== 1 && "s"}
              </span>
              <span className="text-xs text-muted">
                · {exportsConcluidos} concluída
                {exportsConcluidos !== 1 && "s"}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-muted">
              <Trash2 className="h-3.5 w-3.5 text-rose-600" />
              <span>Pedidos de exclusão</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-ink">
                {deletesPendentes} pendente{deletesPendentes !== 1 && "s"}
              </span>
              <span className="text-xs text-muted">
                · {deletesConcluidos} concluído
                {deletesConcluidos !== 1 && "s"}
              </span>
            </div>
          </div>

          <div className="rounded-md border border-emerald-200 bg-emerald-50/60 p-3">
            <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-emerald-700">
              <Lock className="h-3 w-3" />
              Consentimentos ativos
            </div>
            <div className="mt-1 font-display text-2xl font-bold text-emerald-900">
              {formatNumberBR(CONSENTIMENTOS_ATIVOS)}
            </div>
            <div className="text-xs text-emerald-700/80">
              ao longo de {POLITICAS_VERSIONADAS} versões da política
            </div>
          </div>
        </div>

        <Separator />

        {/* Lista de solicitações abertas */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink">
              Solicitações abertas
            </h4>
            <Badge
              variant="outline"
              className="border-rose-200 bg-rose-50 text-[10px] font-medium text-rose-700"
            >
              {abertas.length} pendente{abertas.length !== 1 && "s"}
            </Badge>
          </div>

          <ul className="space-y-2">
            {abertas.map((req) => {
              const meta = TYPE_META[req.tipo];
              const { Icon, label, tint } = meta;
              return (
                <li
                  key={req.id}
                  className="flex items-start gap-2.5 rounded-md border border-border/60 bg-slate-50/50 p-2.5 transition-colors hover:bg-slate-100/60"
                >
                  <span
                    className={cn(
                      "mt-1.5 inline-block h-2 w-2 shrink-0 rounded-full",
                      STATUS_DOT[req.status]
                    )}
                    aria-hidden
                  />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 text-xs">
                      <Icon className={cn("h-3 w-3", tint)} />
                      <span className="font-medium text-ink">{label}</span>
                      <span className="text-muted">·</span>
                      <span className="truncate text-muted">{req.titular}</span>
                    </div>
                    <div className="mt-0.5 text-[11px] text-muted">
                      Aberto {relativeFromOpening(req.dataAbertura)}
                    </div>
                  </div>
                  <Badge
                    variant="outline"
                    className={cn(
                      "border text-[10px] font-medium",
                      STATUS_BADGE[req.status]
                    )}
                  >
                    {req.status === "pendente" ? "Pendente" : "OK"}
                  </Badge>
                </li>
              );
            })}
          </ul>
        </div>

        <Separator />

        <Button
          variant="ghost"
          size="sm"
          className="h-8 w-full justify-between gap-1 px-2 text-sm text-primary hover:bg-primary/5 hover:text-primary"
        >
          Ver política completa
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}
