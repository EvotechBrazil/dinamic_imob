"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Clock4,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SectionHeader } from "@/components/layout";
import { cn } from "@/lib/utils";
import type { AgentRun, ChatMessage, KPI } from "@/lib/mock-types";
import {
  ACTIVE_CONVERSATION_ID,
  CONVERSATIONS,
  MESSAGES_BY_CONVERSATION,
  OMNICHANNEL_KPIS,
  RUNS_BY_CONVERSATION,
} from "./mock";
import { AgentRunsSidebar } from "./agent-runs-sidebar";
import { ChatPanel } from "./chat-panel";
import { ConversationList, type ChannelFilter } from "./conversation-list";

const KPI_ICONS: Record<string, LucideIcon> = {
  "Conversas abertas": MessageSquare,
  "Atendidas hoje": CheckCircle2,
  "Tempo médio resposta": Clock4,
  "Resolução IA": Sparkles,
};

export function OmnichannelSection() {
  const [activeId, setActiveId] = useState(ACTIVE_CONVERSATION_ID);
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");

  const activeConversation = useMemo(
    () =>
      CONVERSATIONS.find((c) => c.id === activeId) ??
      CONVERSATIONS.find((c) => c.id === ACTIVE_CONVERSATION_ID)!,
    [activeId]
  );

  /**
   * Thread completa de mensagens + runs IA por conversa, com fallback
   * pra uma única bubble inbound caso o mock não tenha entrada (defensivo).
   */
  const messages: ChatMessage[] = useMemo(() => {
    const fromMap = MESSAGES_BY_CONVERSATION[activeConversation.id];
    if (fromMap && fromMap.length > 0) return fromMap;
    return [
      {
        id: `${activeConversation.id}-preview`,
        conversationId: activeConversation.id,
        direction: "inbound",
        sender: "lead",
        nome: activeConversation.nome,
        content: activeConversation.ultimaMsg,
        ts: new Date().toISOString(),
      },
    ];
  }, [activeConversation]);

  const runs: AgentRun[] = useMemo(
    () => RUNS_BY_CONVERSATION[activeConversation.id] ?? [],
    [activeConversation]
  );

  return (
    <section
      id="omnichannel"
      className="scroll-mt-28 border-t border-border bg-app py-20"
    >
      <div className="section-container">
        <SectionHeader
          eyebrow="Dinamic Channel comercial"
          title="Tudo numa só inbox"
          subtitle="WhatsApp, Instagram e Facebook num só lugar, com a IA classificando, respondendo e direcionando pro corretor certo."
        />

        {/* KPIs row */}
        <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {OMNICHANNEL_KPIS.map((kpi) => (
            <KpiCard key={kpi.label} kpi={kpi} />
          ))}
        </div>

        {/* Inbox 3-column grid */}
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-[0_10px_30px_-8px_rgba(15,23,42,0.12)]">
          <div className="grid h-[640px] grid-cols-1 md:grid-cols-[280px_1fr_320px]">
            <ConversationList
              conversations={CONVERSATIONS}
              activeId={activeConversation.id}
              onSelect={setActiveId}
              channelFilter={channelFilter}
              onChangeFilter={setChannelFilter}
            />
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`chat-${activeConversation.id}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="h-full min-h-0"
              >
                <ChatPanel
                  conversation={activeConversation}
                  messages={messages}
                />
              </motion.div>
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`runs-${activeConversation.id}`}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="h-full min-h-0"
              >
                <AgentRunsSidebar runs={runs} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Caption + selo Powered by */}
        <div className="mt-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
          <p className="text-xs text-muted">
            Mock realista — em produção conecta via Evolution API (WhatsApp) e
            Meta Graph (Instagram/Facebook), com event bus e round-robin por
            setor.
          </p>
          <span className="text-xs text-muted">
            Powered by{" "}
            <span className="font-mono font-medium text-ink/70">
              chat-bullq
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}

function KpiCard({ kpi }: { kpi: KPI }) {
  const Icon = KPI_ICONS[kpi.label] ?? MessageSquare;
  const deltaPositive =
    kpi.deltaType === "increase" || kpi.deltaType === "moderateIncrease";
  const deltaNegative =
    kpi.deltaType === "decrease" || kpi.deltaType === "moderateDecrease";
  // "Tempo médio resposta" caindo é bom → inverte cor manualmente.
  const isResponseTime = kpi.label === "Tempo médio resposta";
  const goodDelta = isResponseTime ? deltaNegative : deltaPositive;

  return (
    <div className="rounded-xl border border-border bg-surface p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
          {kpi.label}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/10 text-primary">
          <Icon className="h-3.5 w-3.5" />
        </span>
      </div>
      <p className="mt-2 font-display text-2xl font-bold text-ink">
        {kpi.prefix}
        {kpi.value}
        {kpi.suffix}
      </p>
      {typeof kpi.delta === "number" && (
        <div className="mt-1 flex items-center gap-1.5">
          <span
            className={cn(
              "inline-flex items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold",
              goodDelta && "bg-emerald-100 text-emerald-700",
              !goodDelta && "bg-amber-100 text-amber-700"
            )}
          >
            {kpi.delta > 0 ? "+" : ""}
            {kpi.delta}%
          </span>
          {kpi.helper && (
            <span className="text-[10px] text-muted">{kpi.helper}</span>
          )}
        </div>
      )}
    </div>
  );
}
