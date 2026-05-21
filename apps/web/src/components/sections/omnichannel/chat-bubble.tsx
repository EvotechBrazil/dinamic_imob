"use client";

import { Bot, CheckCheck, User, UserRound } from "lucide-react";
import { motion } from "framer-motion";

import type { ChatMessage } from "@/lib/mock-types";
import { cn, relativeTime } from "@/lib/utils";

interface ChatBubbleProps {
  message: ChatMessage;
  showAvatar?: boolean;
}

/**
 * Bolha de mensagem reaproveitável. Três variantes:
 * - inbound (lead) → esquerda, fundo surface + borda
 * - outbound + ai → direita, gradiente primary
 * - outbound + corretor → direita, accent sólido
 *
 * Inclui fade-in suave via framer-motion (duração curta).
 */
export function ChatBubble({ message, showAvatar = true }: ChatBubbleProps) {
  const isInbound = message.direction === "inbound";
  const isAI = message.sender === "ai";
  const isCorretor = message.sender === "corretor";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className={cn(
        "flex max-w-[78%] items-end gap-2",
        isInbound ? "self-start" : "self-end flex-row-reverse"
      )}
    >
      {/* Avatar pequeno + ícone do sender */}
      {showAvatar && (
        <div
          className={cn(
            "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold",
            isAI && "bg-primary/10 text-primary",
            isCorretor && "bg-accent/15 text-accent",
            isInbound && "bg-slate-200 text-slate-600"
          )}
          aria-hidden
        >
          {isAI ? (
            <Bot className="h-3.5 w-3.5" />
          ) : isCorretor ? (
            <UserRound className="h-3.5 w-3.5" />
          ) : (
            <User className="h-3.5 w-3.5" />
          )}
        </div>
      )}

      <div
        className={cn(
          "flex flex-col gap-1",
          isInbound ? "items-start" : "items-end"
        )}
      >
        {/* Nome + tag */}
        {message.nome && (
          <div className="flex items-center gap-1.5 px-1 text-[10px]">
            <span
              className={cn(
                "font-semibold",
                isAI && "text-primary",
                isCorretor && "text-accent",
                isInbound && "text-muted"
              )}
            >
              {message.nome}
            </span>
            {isAI && (
              <span className="rounded-sm bg-primary/10 px-1 py-0 text-[9px] font-medium uppercase tracking-wider text-primary">
                IA
              </span>
            )}
            {isCorretor && (
              <span className="rounded-sm bg-accent/15 px-1 py-0 text-[9px] font-medium uppercase tracking-wider text-accent">
                corretor
              </span>
            )}
          </div>
        )}

        {/* Bubble */}
        <div
          className={cn(
            "rounded-2xl px-3.5 py-2 text-sm leading-relaxed shadow-sm",
            isInbound &&
              "rounded-bl-sm border border-border bg-surface text-ink",
            !isInbound &&
              isAI &&
              "rounded-br-sm bg-gradient-to-br from-primary to-primary-dark text-primary-foreground",
            !isInbound &&
              isCorretor &&
              "rounded-br-sm bg-accent text-accent-foreground"
          )}
        >
          {message.content}
        </div>

        {/* Timestamp + read status */}
        <div
          className={cn(
            "flex items-center gap-1 px-1 text-[10px] text-muted",
            !isInbound && "flex-row-reverse"
          )}
        >
          <span>{relativeTime(message.ts)}</span>
          {!isInbound && message.status && (
            <CheckCheck
              className={cn(
                "h-3 w-3",
                message.status === "read" ? "text-sky-500" : "text-muted"
              )}
              aria-label={message.status}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
