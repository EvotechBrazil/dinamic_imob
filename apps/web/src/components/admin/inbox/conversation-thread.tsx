"use client";

import * as React from "react";
import { Sparkles } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn, initials } from "@/lib/utils";
import { CHANNEL_LABELS, SETOR_LABELS, type ChannelType } from "@/lib/mock-types";
import type { StoredConversation } from "@/lib/conversation-types";
import { ChatBubble } from "@/components/sections/omnichannel/chat-bubble";
import { AgentReplyInput } from "./agent-reply-input";

const CHANNEL_DOT: Record<ChannelType, string> = {
  whatsapp: "bg-emerald-500",
  instagram: "bg-pink-500",
  facebook: "bg-blue-600",
  web: "bg-amber-500",
};

interface Props {
  conversation: StoredConversation | null;
}

export function ConversationThread({ conversation }: Props) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [conversation?.messages.length, conversation?.id]);

  if (!conversation) {
    return (
      <div className="flex h-full items-center justify-center bg-app/30">
        <div className="text-center text-sm text-muted">
          <p>Selecione uma conversa à esquerda</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-slate-200 text-[12px] font-semibold text-slate-600">
                {initials(conversation.nome)}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 h-4 w-4 rounded-full border-2 border-surface",
                CHANNEL_DOT[conversation.canal]
              )}
              title={CHANNEL_LABELS[conversation.canal]}
            />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-ink">{conversation.nome}</h3>
            <p className="mt-0.5 text-[11px] text-muted">
              {CHANNEL_LABELS[conversation.canal]} · Setor {SETOR_LABELS[conversation.setor]}
              {conversation.bairroInteresse && ` · ${conversation.bairroInteresse}`}
            </p>
          </div>
        </div>
        {conversation.hasBooking && (
          <Badge variant="outline" className="border-amber-300 bg-amber-50 text-[10px] text-amber-700">
            <Sparkles className="mr-1 h-3 w-3" /> Visita agendada
          </Badge>
        )}
      </div>

      {/* Mensagens */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto bg-app/30 px-5 py-4">
        <div className="flex flex-col gap-3">
          {conversation.messages.length === 0 && (
            <p className="text-center text-xs text-muted">Sem mensagens ainda.</p>
          )}
          {conversation.messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
        </div>
      </div>

      {/* Input agente */}
      <AgentReplyInput conversationId={conversation.id} />
    </div>
  );
}
