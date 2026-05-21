"use client";

import * as React from "react";
import { Send, StopCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (msg: string) => void;
  onStop: () => void;
  isStreaming: boolean;
  disabled?: boolean;
}

export function ChatInput({
  onSend,
  onStop,
  isStreaming,
  disabled,
}: ChatInputProps) {
  const [value, setValue] = React.useState("");
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [value]);

  function submit() {
    if (isStreaming || !value.trim()) return;
    onSend(value);
    setValue("");
    requestAnimationFrame(() => textareaRef.current?.focus());
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t border-border bg-white px-3 py-3">
      <div className="flex items-end gap-2 rounded-xl border border-border bg-app px-3 py-2 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onKeyDown}
          rows={1}
          disabled={disabled}
          placeholder="Pergunte sobre imóveis, locação, agendar visita…"
          className="thin-scroll max-h-[120px] flex-1 resize-none bg-transparent text-sm leading-relaxed text-ink placeholder:text-slate-400 focus:outline-none"
        />
        {isStreaming ? (
          <button
            onClick={onStop}
            type="button"
            aria-label="Parar"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-slate-200 text-slate-700 transition hover:bg-slate-300"
          >
            <StopCircle className="h-4 w-4" />
          </button>
        ) : (
          <button
            onClick={submit}
            type="button"
            disabled={!value.trim() || disabled}
            aria-label="Enviar"
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-lg transition",
              value.trim()
                ? "bg-primary text-white hover:bg-primary-dark"
                : "bg-slate-200 text-slate-400"
            )}
          >
            <Send className="h-4 w-4" />
          </button>
        )}
      </div>
      <p className="mt-1.5 text-[11px] text-muted">
        IA em demo · custo típico ~R$ 0,02 por interação
      </p>
    </div>
  );
}
