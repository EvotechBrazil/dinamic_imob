"use client";

import { MapPin, GripVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { Lead } from "@/lib/mock-types";
import { SETOR_LABELS } from "@/lib/mock-types";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

interface LeadCardProps {
  lead: Lead;
}

export function LeadCard({ lead }: LeadCardProps) {
  const intencaoStyle =
    lead.intencao === "compra"
      ? "bg-accent/10 text-amber-700 border-accent/30"
      : "bg-teal-100 text-teal-700 border-teal-300";

  return (
    <div
      className={cn(
        "group relative rounded-lg border border-border bg-surface p-3 transition",
        "hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md",
        "cursor-grab active:cursor-grabbing"
      )}
    >
      <GripVertical
        aria-hidden
        className="absolute right-1 top-1 h-3.5 w-3.5 text-muted opacity-0 transition group-hover:opacity-60"
      />

      {/* Linha 1: avatar + nome + setor */}
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 shrink-0">
          <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
          <AvatarFallback className="text-[10px]">
            {initials(lead.nome)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">{lead.nome}</p>
          <p className="text-[10px] uppercase tracking-wider text-muted">
            {SETOR_LABELS[lead.setor]}
          </p>
        </div>
      </div>

      {/* Linha 2: bairro + ultima interação */}
      <div className="mt-2 flex items-center gap-1 text-xs text-muted">
        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{lead.bairro}</span>
        <span aria-hidden>·</span>
        <span className="shrink-0">{lead.ultimaInteracao}</span>
      </div>

      {/* Linha 3: orçamento + intenção pill */}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="font-mono text-sm font-semibold text-primary">
          {formatBRL(lead.orcamento)}
        </span>
        <span
          className={cn(
            "rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize",
            intencaoStyle
          )}
        >
          {lead.intencao}
        </span>
      </div>
    </div>
  );
}
