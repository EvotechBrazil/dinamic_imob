"use client";

import { CalendarCheck, Inbox } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn, initials } from "@/lib/utils";
import { CHANNEL_LABELS, type ChannelType } from "@/lib/mock-types";
import type { ConversationSummary } from "@/lib/conversation-types";

const CHANNEL_DOT: Record<ChannelType, string> = {
  whatsapp: "bg-emerald-500",
  instagram: "bg-pink-500",
  facebook: "bg-blue-600",
  web: "bg-amber-500",
};

interface Props {
  conversations: ConversationSummary[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  loading: boolean;
}

export function ConversationList({ conversations, selectedId, onSelect, loading }: Props) {
  return (
    <aside className="flex h-full flex-col bg-surface">
      <header className="border-b border-border bg-gradient-to-br from-surface to-app/40 px-4 py-3">
        <h2 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <Inbox className="h-4 w-4 text-primary" />
          <span>Inbox <span className="text-primary">Dinamic Channel</span></span>
        </h2>
        <p className="mt-0.5 text-[11px] text-muted">
          {conversations.length} {conversations.length === 1 ? "conversa" : "conversas"} · WhatsApp · Instagram · Facebook · Chat Web
        </p>
      </header>
      <div className="flex-1 overflow-y-auto">
        {loading && <div className="p-4 text-xs text-muted">Carregando...</div>}
        {!loading && conversations.length === 0 && (
          <div className="p-6 text-center text-xs text-muted">
            Nenhuma conversa ainda. Abra o chat IA em <code className="rounded bg-app/60 px-1">/portal</code>.
          </div>
        )}
        {conversations.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => onSelect(c.id)}
              className={cn(
                "flex w-full items-start gap-3 border-b border-border/60 px-4 py-3 text-left transition",
                isSelected ? "bg-primary/5 ring-1 ring-inset ring-primary/30" : "hover:bg-app/50"
              )}
            >
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-slate-200 text-[11px] font-semibold text-slate-600">
                    {initials(c.nome)}
                  </AvatarFallback>
                </Avatar>
                <span
                  className={cn(
                    "absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface",
                    CHANNEL_DOT[c.canal]
                  )}
                  title={CHANNEL_LABELS[c.canal]}
                />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-sm font-semibold text-ink">{c.nome}</span>
                  <span className="shrink-0 text-[10px] text-muted">{c.horaRelativa}</span>
                </div>
                <p className="mt-0.5 truncate text-xs text-muted">{c.preview}</p>
                <div className="mt-1 flex items-center gap-1.5">
                  <span className="rounded bg-app px-1.5 py-0.5 text-[9px] font-medium uppercase tracking-wider text-muted">
                    {CHANNEL_LABELS[c.canal]}
                  </span>
                  {c.hasBooking && (
                    <span className="inline-flex items-center gap-0.5 rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-medium text-amber-700">
                      <CalendarCheck className="h-2.5 w-2.5" /> Visita
                    </span>
                  )}
                  {c.naoLidas > 0 && (
                    <span className="ml-auto inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-600 px-1 text-[9px] font-bold text-white">
                      {c.naoLidas}
                    </span>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
