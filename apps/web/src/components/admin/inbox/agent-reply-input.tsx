"use client";

import * as React from "react";
import { Send } from "lucide-react";

interface Props {
  conversationId: string;
}

export function AgentReplyInput({ conversationId }: Props) {
  const [content, setContent] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [err, setErr] = React.useState<string | null>(null);

  React.useEffect(() => {
    setContent("");
    setErr(null);
  }, [conversationId]);

  const send = async () => {
    const text = content.trim();
    if (!text || sending) return;
    setSending(true);
    setErr(null);
    try {
      const res = await fetch(`/api/conversations/${conversationId}/messages`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setContent("");
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Erro ao enviar");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="border-t border-border bg-surface px-4 py-3">
      <div className="flex items-end gap-2 rounded-xl border border-border bg-app/40 px-3 py-2">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              void send();
            }
          }}
          placeholder="Responder como corretor… (Enter envia · Shift+Enter quebra linha)"
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm leading-relaxed text-ink placeholder:text-muted focus:outline-none"
        />
        <button
          type="button"
          onClick={() => void send()}
          disabled={!content.trim() || sending}
          aria-label="Enviar resposta"
          className="inline-flex items-center justify-center rounded-lg bg-primary px-3 py-1.5 text-primary-foreground transition hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Send className="h-3.5 w-3.5" />
        </button>
      </div>
      {err && <p className="mt-1 text-[10px] text-rose-600">{err}</p>}
    </div>
  );
}
