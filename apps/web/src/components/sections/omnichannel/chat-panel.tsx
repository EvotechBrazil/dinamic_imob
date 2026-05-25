import {
  MoreHorizontal,
  Paperclip,
  PanelRightClose,
  PanelRightOpen,
  Phone,
  Send,
  Smile,
  Sparkles,
  Video,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, initials } from "@/lib/utils";
import type { ChatMessage, Conversation } from "@/lib/mock-types";
import { CHANNEL_LABELS, SETOR_LABELS } from "@/lib/mock-types";
import { ChatBubble } from "./chat-bubble";

const channelDot: Record<Conversation["canal"], string> = {
  whatsapp: "bg-emerald-500",
  instagram: "bg-pink-500",
  facebook: "bg-blue-600",
  web: "bg-amber-500",
};

interface ChatPanelProps {
  conversation: Conversation;
  messages: ChatMessage[];
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export function ChatPanel({
  conversation,
  messages,
  sidebarOpen = true,
  onToggleSidebar,
}: ChatPanelProps) {
  return (
    <div className="flex h-full flex-col bg-surface">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-slate-200 text-[12px] font-semibold text-slate-600">
                {initials(conversation.nome)}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface",
                channelDot[conversation.canal]
              )}
              title={CHANNEL_LABELS[conversation.canal]}
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-ink">
                {conversation.nome}
              </h3>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                online
              </span>
            </div>
            <p className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted">
              <span>{CHANNEL_LABELS[conversation.canal]}</span>
              <span aria-hidden>·</span>
              <span>Setor {SETOR_LABELS[conversation.setor]}</span>
              {conversation.bairroInteresse && (
                <>
                  <span aria-hidden>·</span>
                  <span>Interesse: {conversation.bairroInteresse}</span>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Badge variant="success" className="hidden text-[10px] sm:inline-flex">
            <Sparkles className="mr-1 h-3 w-3" />
            IA ativa
          </Badge>
          <button
            type="button"
            disabled
            className="rounded-md p-1.5 text-muted hover:bg-app disabled:cursor-not-allowed"
            aria-label="Ligar"
          >
            <Phone className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled
            className="rounded-md p-1.5 text-muted hover:bg-app disabled:cursor-not-allowed"
            aria-label="Vídeo"
          >
            <Video className="h-4 w-4" />
          </button>
          {onToggleSidebar && (
            <button
              type="button"
              onClick={onToggleSidebar}
              className="rounded-md p-1.5 text-muted hover:bg-app hover:text-ink"
              aria-label={sidebarOpen ? "Esconder runs IA" : "Mostrar runs IA"}
              title={sidebarOpen ? "Esconder runs IA" : "Mostrar runs IA"}
            >
              {sidebarOpen ? (
                <PanelRightClose className="h-4 w-4" />
              ) : (
                <PanelRightOpen className="h-4 w-4" />
              )}
            </button>
          )}
          <button
            type="button"
            disabled
            className="rounded-md p-1.5 text-muted hover:bg-app disabled:cursor-not-allowed"
            aria-label="Mais"
          >
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mensagens */}
      <ScrollArea className="flex-1 bg-app/30">
        <div className="flex flex-col gap-3 px-5 py-5">
          <DayDivider label="Hoje" />
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} />
          ))}
        </div>
      </ScrollArea>

      {/* Footer / input fake */}
      <div className="border-t border-border bg-surface px-4 py-3">
        <div className="flex items-center gap-2 rounded-xl border border-border bg-app/40 px-3 py-2">
          <button
            type="button"
            disabled
            className="text-muted disabled:cursor-not-allowed"
            aria-label="Anexar"
          >
            <Paperclip className="h-4 w-4" />
          </button>
          <input
            disabled
            placeholder="Digite uma mensagem…"
            className="flex-1 bg-transparent text-sm text-ink placeholder:text-muted focus:outline-none disabled:cursor-not-allowed"
          />
          <button
            type="button"
            disabled
            className="text-muted disabled:cursor-not-allowed"
            aria-label="Emoji"
          >
            <Smile className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-primary-foreground disabled:cursor-not-allowed disabled:opacity-70"
            aria-label="Enviar"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
        <p className="mt-2 flex items-center gap-1.5 text-[10px] text-muted">
          <Sparkles className="h-3 w-3 text-primary" />
          IA responde primeiro · corretor entra em handoff automático
        </p>
      </div>
    </div>
  );
}

function DayDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center">
      <span className="rounded-full bg-surface px-3 py-0.5 text-[10px] font-medium uppercase tracking-wider text-muted shadow-sm">
        {label}
      </span>
    </div>
  );
}

