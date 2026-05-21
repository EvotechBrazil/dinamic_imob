"use client";

import { MessageCircle, X } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ChatButtonProps {
  open: boolean;
  onToggle: () => void;
}

export function ChatButton({ open, onToggle }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      aria-label={open ? "Fechar chat" : "Abrir chat"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "fixed bottom-6 right-6 z-[60] grid h-14 w-14 place-items-center rounded-full shadow-xl ring-4 ring-primary/15 transition-colors sm:right-8",
        open
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "bg-primary text-white hover:bg-primary-dark"
      )}
      style={{ zIndex: "var(--z-chat)" as unknown as number }}
    >
      {!open && (
        <span className="absolute -top-1 -right-1 grid h-3 w-3 place-items-center rounded-full bg-accent ring-2 ring-white">
          <span className="absolute h-3 w-3 animate-ping rounded-full bg-accent opacity-75" />
        </span>
      )}
      {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
    </motion.button>
  );
}
