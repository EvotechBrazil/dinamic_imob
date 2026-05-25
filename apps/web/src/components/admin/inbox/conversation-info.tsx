"use client";

import Link from "next/link";
import { CalendarCheck, ExternalLink, Mail, MessageSquare, Phone, Sparkles, UserCircle } from "lucide-react";
import { CHANNEL_LABELS, SETOR_LABELS } from "@/lib/mock-types";
import type { StoredConversation } from "@/lib/conversation-types";

interface Props {
  conversation: StoredConversation | null;
}

function fmtDateTime(ms: number) {
  return new Date(ms).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function ConversationInfo({ conversation }: Props) {
  if (!conversation) return <aside className="bg-surface" aria-hidden />;
  return (
    <aside className="flex h-full flex-col overflow-y-auto bg-surface">
      <header className="border-b border-border px-4 py-3">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
          <UserCircle className="h-4 w-4 text-primary" /> Detalhes do contato
        </h3>
      </header>
      <div className="flex-1 space-y-5 px-4 py-4 text-sm">
        <section>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Contato</h4>
          <p className="font-semibold text-ink">{conversation.nome}</p>
          {conversation.contactPhone && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Phone className="h-3 w-3" /> {conversation.contactPhone}
            </p>
          )}
          {conversation.contactEmail && (
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <Mail className="h-3 w-3" /> {conversation.contactEmail}
            </p>
          )}
        </section>

        <section>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Origem</h4>
          <p className="text-xs text-ink">Canal: <span className="font-medium">{CHANNEL_LABELS[conversation.canal]}</span></p>
          <p className="mt-0.5 text-xs text-ink">Setor: <span className="font-medium">{SETOR_LABELS[conversation.setor]}</span></p>
          {conversation.bairroInteresse && (
            <p className="mt-0.5 text-xs text-ink">Interesse: <span className="font-medium">{conversation.bairroInteresse}</span></p>
          )}
        </section>

        {conversation.hasBooking && (
          <section className="rounded-lg border border-amber-200 bg-amber-50/60 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-amber-800">
              <CalendarCheck className="h-3.5 w-3.5" /> Visita agendada via IA
            </p>
            {conversation.leadId && (
              <Link
                href={`/?dest=kanban#${conversation.leadId}`}
                className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-amber-700 hover:underline"
              >
                Ver lead no Kanban <ExternalLink className="h-3 w-3" />
              </Link>
            )}
          </section>
        )}

        <section>
          <h4 className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted">Atividade</h4>
          <ul className="space-y-1.5 text-xs text-muted">
            <li className="flex items-center gap-1.5">
              <MessageSquare className="h-3 w-3" /> {conversation.messages.length} mensagens
            </li>
            <li>Iniciada em {fmtDateTime(conversation.createdAt)}</li>
            <li>Última atividade {fmtDateTime(conversation.lastMessageAt)}</li>
          </ul>
        </section>

        {conversation.canal === "web" && (
          <section className="rounded-lg border border-amber-200/60 bg-amber-50/40 p-3 text-[11px] text-amber-800">
            <p className="flex items-center gap-1.5 font-semibold">
              <Sparkles className="h-3 w-3" /> Atendido pela IA
            </p>
            <p className="mt-1">Conversa iniciada via chat IA do site. Corretor entra em handoff manual.</p>
          </section>
        )}
      </div>
    </aside>
  );
}
