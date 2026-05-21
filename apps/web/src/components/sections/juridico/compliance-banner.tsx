"use client";

/**
 * <ComplianceBanner />
 * Faixa horizontal "LGPD compliant" full width.
 */

import {
  Calendar,
  Check,
  ChevronRight,
  Download,
  FileText,
  ScrollText,
  ShieldCheck,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

import { POLITICAS_VERSIONADAS } from "./mock";

const MICRO_STATS: { Icon: typeof ScrollText; label: string; value: string }[] = [
  {
    Icon: ScrollText,
    label: "Política",
    value: `Versão ${POLITICAS_VERSIONADAS}`,
  },
  {
    Icon: Calendar,
    label: "Auditoria",
    value: "Mensal",
  },
  {
    Icon: User,
    label: "DPO",
    value: "Definido",
  },
];

const LINKS: { Icon: typeof FileText; label: string }[] = [
  { Icon: FileText, label: "Ver política completa" },
  { Icon: Download, label: "Solicitar exportação" },
  { Icon: ScrollText, label: "Baixar termo de consentimento" },
];

export function ComplianceBanner() {
  return (
    <div className="rounded-xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-white to-indigo-50 p-6 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Esquerda: badge + texto */}
        <div className="flex items-start gap-4">
          <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <Badge
              variant="outline"
              className="mb-2 border-emerald-300 bg-emerald-100 text-[11px] font-semibold uppercase tracking-wider text-emerald-800"
            >
              <Check className="mr-1 h-3 w-3" />
              LGPD compliant
            </Badge>
            <p className="font-display text-base font-semibold leading-snug text-ink sm:text-lg">
              Seus dados — e os dos seus clientes — sob política versionada.
            </p>
            <p className="mt-1 text-xs text-muted">
              Audit log, encryption-at-rest, RBAC e direitos do titular já integrados.
            </p>
          </div>
        </div>

        {/* Direita: micro-stats */}
        <div className="flex flex-wrap items-center gap-4 lg:gap-6">
          {MICRO_STATS.map(({ Icon, label, value }, i) => (
            <div key={label} className="flex items-center gap-3">
              {i > 0 && (
                <Separator
                  orientation="vertical"
                  className="hidden h-8 bg-emerald-200/70 lg:block"
                />
              )}
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-emerald-700" />
                <div className="leading-tight">
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-muted">
                    {label}
                  </div>
                  <div className="text-sm font-semibold text-ink">{value}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer: links */}
      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-emerald-200/60 pt-4">
        {LINKS.map(({ Icon, label }, i) => (
          <Button
            key={label}
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 gap-1.5 px-3 text-xs text-primary hover:bg-primary/5 hover:text-primary",
              i === 0 && "font-semibold"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
            <ChevronRight className="ml-0.5 h-3 w-3" />
          </Button>
        ))}
      </div>
    </div>
  );
}
