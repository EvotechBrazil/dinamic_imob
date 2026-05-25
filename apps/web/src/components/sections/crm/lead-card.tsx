"use client";

import Link from "next/link";
import { MapPin, GripVertical, MessageCircle, Instagram, Facebook, Globe, Clock } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import type { ChannelType, Lead } from "@/lib/mock-types";
import { CHANNEL_LABELS, SETOR_LABELS } from "@/lib/mock-types";

const CHANNEL_ICONS: Record<ChannelType, React.ComponentType<{ className?: string }>> = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  web: Globe,
};

const CHANNEL_OVERLAY_STYLE: Record<ChannelType, string> = {
  whatsapp: "text-emerald-600",
  instagram: "text-pink-600",
  facebook: "text-sky-600",
  web: "text-amber-600",
};

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

      {/* Linha 0: setor (chip) */}
      <div className="flex items-center justify-between gap-2 pr-4">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted">
          {SETOR_LABELS[lead.setor]}
        </span>
      </div>

      {/* Linha 1: avatar (com overlay de canal) + nome */}
      <div className="mt-2 flex items-start gap-2.5">
        <div className="relative shrink-0">
          <Avatar className="h-9 w-9">
            <AvatarImage src={lead.avatarUrl} alt={lead.nome} />
            <AvatarFallback className="text-[10px]">
              {initials(lead.nome)}
            </AvatarFallback>
          </Avatar>
          {lead.origemCanal && (() => {
            const Icon = CHANNEL_ICONS[lead.origemCanal];
            return (
              <span
                title={`Veio via ${CHANNEL_LABELS[lead.origemCanal]}`}
                className={cn(
                  "absolute -bottom-0.5 -right-0.5 inline-flex h-4 w-4 items-center justify-center rounded-full border border-border bg-white shadow-sm",
                  CHANNEL_OVERLAY_STYLE[lead.origemCanal]
                )}
              >
                <Icon className="h-2.5 w-2.5" />
              </span>
            );
          })()}
        </div>
        <div className="min-w-0 flex-1 pt-0.5">
          <p className="line-clamp-2 text-sm font-medium leading-snug text-ink">
            {lead.nome}
          </p>
        </div>
      </div>

      {/* Linha 2: bairro */}
      <div className="mt-2 flex items-center gap-1 text-xs text-muted">
        <MapPin className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{lead.bairro}</span>
      </div>

      {/* Linha 3: orçamento + intenção pill */}
      <div className="mt-2.5 flex items-center justify-between gap-2">
        <span className="font-display text-sm font-semibold text-primary">
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

      {/* Rodapé: última interação */}
      <div className="mt-2 flex items-center gap-1 border-t border-border/60 pt-2 text-[10px] text-muted">
        <Clock className="h-3 w-3 shrink-0" aria-hidden />
        <span className="truncate">{lead.ultimaInteracao}</span>
      </div>

      {lead.conversationId && (
        <Link
          href={`/admin/inbox?c=${lead.conversationId}`}
          onClick={(e) => e.stopPropagation()}
          className="mt-2 inline-flex items-center gap-1 text-[10px] font-medium text-primary hover:underline"
        >
          Ver conversa →
        </Link>
      )}
    </div>
  );
}
