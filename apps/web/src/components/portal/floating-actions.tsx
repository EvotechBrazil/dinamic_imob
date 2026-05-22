"use client";

import { MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "@/components/ui/brand-icons";

const WHATSAPP_HREF =
  "https://wa.me/5543988478713?text=Ol%C3%A1%2C%20vi%20o%20portal%20da%20Dinamic%20e%20gostaria%20de%20saber%20mais";

function openChatWidget() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(
    new CustomEvent("dinamic:open-chat-widget", { detail: { prompt: "" } })
  );
}

export function FloatingActions() {
  return (
    <div className="fixed bottom-4 right-4 z-40 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat IA secundário (acima) */}
      <button
        type="button"
        onClick={openChatWidget}
        aria-label="Falar com a IA"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full bg-[var(--portal-cta-black)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-12 sm:w-12"
        style={{ boxShadow: "var(--shadow-portal-card)" }}
      >
        <MessageCircle className="h-5 w-5 text-[var(--portal-gold)]" />

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--portal-cta-black)] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Falar com a IA
          <span
            className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent"
            style={{ borderLeftColor: "var(--portal-cta-black)" }}
          />
        </span>
      </button>

      {/* WhatsApp principal (abaixo, maior) */}
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar no WhatsApp"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-[var(--portal-whatsapp)] transition-transform duration-200 hover:scale-110 active:scale-95 sm:h-14 sm:w-14"
        style={{ boxShadow: "var(--shadow-portal-whatsapp)" }}
      >
        <WhatsAppIcon className="h-6 w-6 text-white" />

        {/* Badge online pulsante (uau item K) */}
        <span
          className="portal-online-pulse absolute -right-0.5 -top-0.5 h-4 w-4 rounded-full border-2 border-white bg-emerald-400"
          aria-hidden="true"
        />

        {/* Tooltip */}
        <span className="pointer-events-none absolute right-full top-1/2 mr-3 -translate-y-1/2 whitespace-nowrap rounded-lg bg-[var(--portal-cta-black)] px-3 py-1.5 text-xs font-medium text-white opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
          Online <span className="text-emerald-400">·</span> Resposta em min
          <span
            className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent"
            style={{ borderLeftColor: "var(--portal-cta-black)" }}
          />
        </span>
      </a>
    </div>
  );
}
