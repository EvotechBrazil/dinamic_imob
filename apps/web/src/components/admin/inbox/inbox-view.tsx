"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import type { ConversationSummary, StoredConversation } from "@/lib/conversation-types";
import { ConversationList } from "./conversation-list";
import { ConversationThread } from "./conversation-thread";
import { ConversationInfo } from "./conversation-info";

const POLL_INTERVAL_MS = 3000;

export function InboxView() {
  const searchParams = useSearchParams();
  const initialId = searchParams?.get("c") ?? null;

  const [conversations, setConversations] = React.useState<ConversationSummary[]>([]);
  const [selectedId, setSelectedId] = React.useState<string | null>(initialId);
  const [selected, setSelected] = React.useState<StoredConversation | null>(null);
  const [listLoading, setListLoading] = React.useState(true);

  // Polling lista
  React.useEffect(() => {
    let mounted = true;
    const fetchList = async () => {
      try {
        const res = await fetch("/api/conversations", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { conversations: ConversationSummary[] };
        if (!mounted) return;
        setConversations(data.conversations);
        if (listLoading) setListLoading(false);
      } catch {}
    };
    void fetchList();
    const id = window.setInterval(fetchList, POLL_INTERVAL_MS);
    return () => { mounted = false; window.clearInterval(id); };
  }, [listLoading]);

  // Auto-select primeira conv se nada selecionado
  React.useEffect(() => {
    if (!selectedId && conversations.length > 0) {
      setSelectedId(conversations[0].id);
    }
  }, [conversations, selectedId]);

  // Polling detalhe
  React.useEffect(() => {
    if (!selectedId) { setSelected(null); return; }
    let mounted = true;
    const fetchDetail = async () => {
      try {
        const res = await fetch(`/api/conversations/${selectedId}`, { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { conversation: StoredConversation };
        if (mounted) setSelected(data.conversation);
      } catch {}
    };
    void fetchDetail();
    const id = window.setInterval(fetchDetail, POLL_INTERVAL_MS);
    return () => { mounted = false; window.clearInterval(id); };
  }, [selectedId]);

  return (
    <div className="grid h-[calc(100vh-57px)] grid-cols-1 md:grid-cols-[320px_1fr] lg:grid-cols-[320px_1fr_320px] divide-x divide-border bg-app">
      <ConversationList
        conversations={conversations}
        selectedId={selectedId}
        onSelect={setSelectedId}
        loading={listLoading}
      />
      <ConversationThread conversation={selected} />
      <div className="hidden lg:block">
        <ConversationInfo conversation={selected} />
      </div>
    </div>
  );
}
