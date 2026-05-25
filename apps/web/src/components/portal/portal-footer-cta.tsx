"use client";

import * as React from "react";
import Image from "next/image";
import { ConversationSection } from "./conversation-section";

export function PortalFooterCTA() {
  return (
    <section
      id="contato"
      className="relative flex flex-col items-center justify-center overflow-hidden bg-noir-bg px-6 py-[10vh] text-center text-noir-text md:px-[8vw]"
    >
      {/* Imagem de fundo */}
      <Image
        src="/portal/imoveis/imovel-5.webp"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="-z-10 object-cover opacity-[0.15]"
      />

      {/* Gradiente fade-in/out */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, var(--noir-bg) 0%, transparent 30%, transparent 70%, var(--noir-bg) 100%)",
        }}
      />

      {/* Logo D gigante semi-transparente atrás */}
      <div className="absolute left-1/2 top-1/2 -z-10 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full bg-noir-surface opacity-[0.05]">
        <Image
          src="/logo-dinamic.png"
          alt=""
          aria-hidden="true"
          width={1200}
          height={1200}
          className="absolute left-[-32%] top-1/2 w-[290%] max-w-none -translate-y-1/2"
        />
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 w-full max-w-7xl">
        <div className="mb-8 font-body-noir text-[11px] font-bold uppercase tracking-[0.4em] text-noir-amber">
          Disponíveis agora
        </div>
        <h2
          className="m-0 break-words font-display-noir font-bold leading-[0.88] tracking-[-0.03em] text-noir-text"
          style={{ fontSize: "clamp(36px, 8vw, 96px)" }}
        >
          VAMOS CONVERSAR
        </h2>
        <p className="mx-auto mb-10 mt-8 max-w-2xl font-body-noir text-lg font-light text-noir-text-mute">
          Atendemos por WhatsApp, chat IA ou pessoalmente na nossa sede
          na Avenida Arapongas. Resposta humana em até 30 minutos.
        </p>

        {/* Painel lovable de chat IA — integrado dentro da section "VAMOS CONVERSAR". */}
        <ConversationSection />

        <div className="mb-12 mt-12 flex flex-col justify-center gap-8 md:flex-row md:gap-12">
          <a
            href="https://wa.me/5543988478713"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Vendas (43) 98847-8713"
            className="group inline-flex flex-col items-center border-b-4 border-noir-amber pb-3 font-body-noir font-bold text-noir-text transition-all duration-300 hover:-translate-y-1 hover:text-noir-amber md:items-start"
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
          >
            <small className="mb-1.5 font-body-noir text-[11px] font-normal uppercase tracking-[0.3em] text-noir-text-mute">
              Vendas
            </small>
            (43) 98847-8713
          </a>
          <a
            href="https://wa.me/5543988478670"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Locações (43) 98847-8670"
            className="group inline-flex flex-col items-center border-b-4 border-noir-amber pb-3 font-body-noir font-bold text-noir-text transition-all duration-300 hover:-translate-y-1 hover:text-noir-amber md:items-start"
            style={{ fontSize: "clamp(20px, 2vw, 28px)" }}
          >
            <small className="mb-1.5 font-body-noir text-[11px] font-normal uppercase tracking-[0.3em] text-noir-text-mute">
              Locações
            </small>
            (43) 98847-8670
          </a>
        </div>

        <div className="flex justify-center gap-8 border-t border-noir-border pt-12">
          <a
            href="https://instagram.com/dinamicimoveis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="font-body-noir text-[11px] font-bold uppercase tracking-[0.3em] text-noir-text-mute transition hover:text-noir-amber"
          >
            Instagram
          </a>
          <a
            href="https://facebook.com/dinamicimoveis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="font-body-noir text-[11px] font-bold uppercase tracking-[0.3em] text-noir-text-mute transition hover:text-noir-amber"
          >
            Facebook
          </a>
          <a
            href="https://youtube.com/@dinamicimoveis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="font-body-noir text-[11px] font-bold uppercase tracking-[0.3em] text-noir-text-mute transition hover:text-noir-amber"
          >
            YouTube
          </a>
          <a
            href="#linkedin"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="font-body-noir text-[11px] font-bold uppercase tracking-[0.3em] text-noir-text-mute transition hover:text-noir-amber"
          >
            LinkedIn
          </a>
        </div>

        <div className="mt-16 font-body-noir text-[10px] uppercase tracking-[0.3em] text-noir-text-mute">
          Dinamic Imobiliária · Arapongas-PR · CRECI J-04567-PR
        </div>
      </div>
    </section>
  );
}
