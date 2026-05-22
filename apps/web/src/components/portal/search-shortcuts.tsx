"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Home,
  Building2,
  Trees,
  Briefcase,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import {
  dispatchPortalShortcut,
  type PortalShortcutType,
} from "@/lib/portal/portal-utils";
import { cn } from "@/lib/utils";

interface ShortcutItem {
  readonly type: PortalShortcutType;
  readonly label: string;
  readonly Icon: LucideIcon;
}

const SHORTCUTS: readonly ShortcutItem[] = [
  { type: "Comprar casa", label: "Comprar casa", Icon: Home },
  { type: "Alugar apartamento", label: "Alugar apartamento", Icon: Building2 },
  { type: "Terrenos", label: "Terrenos", Icon: Trees },
  { type: "Comerciais", label: "Comerciais", Icon: Briefcase },
  { type: "Lançamentos", label: "Lançamentos", Icon: Sparkles },
] as const;

export function SearchShortcuts() {
  const [clicked, setClicked] = useState<PortalShortcutType | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleClick = useCallback((type: PortalShortcutType) => {
    dispatchPortalShortcut(type);
    setClicked(type);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setClicked(null);
      timeoutRef.current = null;
    }, 1200);
  }, []);

  return (
    <section
      role="navigation"
      aria-label="Atalhos de busca"
      className="bg-white border-y border-portal-border py-4 px-4"
    >
      <div className="max-w-7xl mx-auto">
        <div
          className="flex gap-3 px-1 overflow-x-auto sm:overflow-visible sm:flex-wrap sm:justify-center sm:px-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none" }}
        >
          {SHORTCUTS.map(({ type, label, Icon }) => {
            const isActive = clicked === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => handleClick(type)}
                aria-label={`Filtrar por ${label}`}
                aria-pressed={isActive}
                className={cn(
                  "shrink-0 inline-flex items-center gap-2 border px-5 py-2.5 rounded-full transition font-medium text-sm whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-portal-gold/30",
                  isActive
                    ? "bg-portal-gold-soft border-portal-gold text-portal-gold-dark"
                    : "bg-white border-portal-border hover:border-portal-gold hover:text-portal-gold-dark",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
