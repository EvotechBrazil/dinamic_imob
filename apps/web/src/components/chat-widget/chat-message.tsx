import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
  streaming?: boolean;
}

export function ChatMessageBubble({
  role,
  content,
  streaming,
}: ChatMessageProps) {
  const isUser = role === "user";
  return (
    <div
      className={cn(
        "flex w-full items-start gap-2.5",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
          <Bot className="h-4 w-4" />
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed shadow-sm",
          isUser
            ? "rounded-br-sm bg-primary text-white"
            : "rounded-bl-sm border border-border bg-white text-ink"
        )}
      >
        {content}
        {streaming && (
          <span className="ml-0.5 inline-block h-3 w-1 animate-pulse bg-primary align-middle" />
        )}
      </div>
      {isUser && (
        <div className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-slate-200 text-slate-600">
          <User className="h-4 w-4" />
        </div>
      )}
    </div>
  );
}
