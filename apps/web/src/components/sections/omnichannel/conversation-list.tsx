import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  FacebookIcon,
  InstagramIcon,
  WhatsAppIcon,
} from "@/components/ui/brand-icons";
import { cn, initials } from "@/lib/utils";
import type { ChannelType, Conversation, Setor } from "@/lib/mock-types";
import { CHANNEL_LABELS, SETOR_LABELS } from "@/lib/mock-types";

export type ChannelFilter = ChannelType | "all";

/**
 * Pílula colorida do canal — fica ao lado do nome no list item.
 * WhatsApp = emerald · Instagram = pink · Facebook = blue.
 */
const channelDot: Record<ChannelType, string> = {
  whatsapp: "bg-emerald-500",
  instagram: "bg-pink-500",
  facebook: "bg-blue-600",
};

/**
 * Cores das pílulas de setor (briefing): vendas=blue, locacao=green (emerald),
 * captacao=amber, financeiro=slate. Usamos className direto pra ter o mapping
 * exato pedido — Badge default não tem variants `blue`/`emerald` puros.
 */
const setorBadgeClass: Record<Setor, string> = {
  vendas: "bg-blue-100 text-blue-700",
  locacao: "bg-emerald-100 text-emerald-700",
  captacao: "bg-amber-100 text-amber-700",
  financeiro: "bg-slate-200 text-slate-700",
  juridico: "bg-sky-100 text-sky-700",
};

interface ConversationListProps {
  conversations: Conversation[];
  activeId: string;
  onSelect?: (id: string) => void;
  channelFilter?: ChannelFilter;
  onChangeFilter?: (filter: ChannelFilter) => void;
}

export function ConversationList({
  conversations,
  activeId,
  onSelect,
  channelFilter = "all",
  onChangeFilter,
}: ConversationListProps) {
  const filtered =
    channelFilter === "all"
      ? conversations
      : conversations.filter((c) => c.canal === channelFilter);

  return (
    <div className="flex h-full w-full flex-col border-r border-border bg-surface">
      {/* Header da coluna */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-ink">Inbox unificada</h3>
          <p className="text-[11px] text-muted">
            WhatsApp · Instagram · Facebook
          </p>
        </div>
        <Badge variant="success" className="text-[10px]">
          ao vivo
        </Badge>
      </div>

      {/* Search bar fake */}
      <div className="border-b border-border px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-md border border-border bg-app px-2.5 py-1.5">
          <Search className="h-3.5 w-3.5 text-muted" />
          <span className="text-xs text-muted">Buscar conversa…</span>
        </div>
      </div>

      {/* Tabs canal */}
      <div className="border-b border-border px-3 py-2">
        <Tabs
          value={channelFilter}
          onValueChange={(v) => onChangeFilter?.(v as ChannelFilter)}
        >
          <TabsList className="grid h-8 w-full grid-cols-4 bg-app p-0.5">
            <TabsTrigger
              value="all"
              className="h-7 text-[11px] data-[state=active]:bg-surface data-[state=active]:text-primary"
            >
              Todos
            </TabsTrigger>
            <TabsTrigger
              value="whatsapp"
              className="h-7 text-emerald-600/70 data-[state=active]:bg-surface data-[state=active]:text-emerald-600"
              aria-label="WhatsApp"
              title="WhatsApp"
            >
              <WhatsAppIcon className="h-3.5 w-3.5" />
            </TabsTrigger>
            <TabsTrigger
              value="instagram"
              className="h-7 text-pink-600/70 data-[state=active]:bg-surface data-[state=active]:text-pink-600"
              aria-label="Instagram"
              title="Instagram"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </TabsTrigger>
            <TabsTrigger
              value="facebook"
              className="h-7 text-blue-600/70 data-[state=active]:bg-surface data-[state=active]:text-blue-600"
              aria-label="Facebook"
              title="Facebook"
            >
              <FacebookIcon className="h-3.5 w-3.5" />
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Lista de conversas */}
      <ScrollArea className="flex-1">
        <ul className="divide-y divide-border">
          {filtered.length === 0 && (
            <li className="px-4 py-8 text-center text-xs text-muted">
              Nenhuma conversa neste canal.
            </li>
          )}
          {filtered.map((conv) => {
            const active = conv.id === activeId;
            return (
              <li key={conv.id}>
                <button
                  type="button"
                  onClick={() => onSelect?.(conv.id)}
                  className={cn(
                    "relative flex w-full cursor-pointer items-start gap-3 px-3 py-3 text-left transition-colors hover:bg-app/60",
                    active && "bg-primary/5"
                  )}
                  aria-current={active ? "true" : undefined}
                >
                  {/* Faixa lateral indicadora da conversa ativa */}
                  {active && (
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 h-full w-0.5 bg-primary"
                    />
                  )}

                  {/* Avatar + badge do canal */}
                  <div className="relative shrink-0">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-slate-200 text-[11px] font-semibold text-slate-600">
                        {initials(conv.nome)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={cn(
                        "absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-surface",
                        channelDot[conv.canal]
                      )}
                      title={CHANNEL_LABELS[conv.canal]}
                    />
                  </div>

                  {/* Conteúdo do item */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p
                        className={cn(
                          "truncate text-sm font-semibold",
                          active ? "text-primary" : "text-ink"
                        )}
                      >
                        {conv.nome}
                      </p>
                      <span className="shrink-0 text-[10px] text-muted">
                        {conv.horaRelativa}
                      </span>
                    </div>

                    <p
                      className={cn(
                        "mt-0.5 truncate text-xs",
                        conv.naoLidas > 0 && !active
                          ? "font-medium text-ink"
                          : "text-muted"
                      )}
                    >
                      {conv.ultimaMsg}
                    </p>

                    <div className="mt-1.5 flex items-center justify-between gap-2">
                      <Badge
                        variant="outline"
                        className={cn(
                          "border-transparent px-1.5 py-0 text-[9px] font-medium uppercase tracking-wider",
                          setorBadgeClass[conv.setor]
                        )}
                      >
                        {SETOR_LABELS[conv.setor]}
                      </Badge>
                      {conv.naoLidas > 0 && (
                        <span className="inline-flex h-4 min-w-[16px] items-center justify-center rounded-full bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
                          {conv.naoLidas}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </ScrollArea>

      {/* Footer com totais */}
      <div className="border-t border-border bg-app/40 px-3 py-2 text-[10px] text-muted">
        <span className="font-semibold text-ink">{filtered.length}</span>{" "}
        conversas · roteamento round-robin ativo
      </div>
    </div>
  );
}
