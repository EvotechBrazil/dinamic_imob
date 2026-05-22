"use client";

import * as React from "react";
import { ChatButton } from "./chat-button";
import { ChatPanel, type PendingPrompt } from "./chat-panel";

interface OpenChatEventDetail {
  prompt?: string;
  context?: string;
}

interface ChatWidgetProps {
  hideButton?: boolean;
}

export function ChatWidget({ hideButton = false }: ChatWidgetProps = {}) {
  const [open, setOpen] = React.useState(false);
  const [pending, setPending] = React.useState<PendingPrompt | null>(null);

  React.useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OpenChatEventDetail>).detail ?? {};
      const prompt = (detail.prompt ?? "").trim();
      setOpen(true);
      if (prompt) {
        setPending({
          id:
            typeof crypto !== "undefined" && "randomUUID" in crypto
              ? crypto.randomUUID()
              : `p-${Date.now()}-${Math.random()}`,
          prompt,
          context: detail.context ?? null,
        });
      }
    };

    window.addEventListener("dinamic:open-chat-widget", handler as EventListener);
    return () =>
      window.removeEventListener(
        "dinamic:open-chat-widget",
        handler as EventListener
      );
  }, []);

  return (
    <>
      {!hideButton && (
        <ChatButton open={open} onToggle={() => setOpen((o) => !o)} />
      )}
      <ChatPanel
        open={open}
        onClose={() => setOpen(false)}
        pendingPrompt={pending}
        onPendingHandled={() => setPending(null)}
      />
    </>
  );
}
