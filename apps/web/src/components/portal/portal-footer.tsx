"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone, Youtube } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";

export function PortalFooter() {
  return (
    <footer
      id="contato"
      className="relative bg-noir-bg overflow-hidden text-noir-text"
    >
      {/* ===== HERO: VAMOS CONVERSAR ===== */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-[20vh] text-center md:px-[8vw]">
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
            style={{ fontSize: "clamp(44px, 13vw, 160px)" }}
          >
            VAMOS CONVERSAR
          </h2>
          <p className="mx-auto mb-16 mt-12 max-w-2xl font-body-noir text-xl font-light text-noir-text-mute">
            Atendemos por WhatsApp, chat IA ou pessoalmente na nossa sede
            na Avenida Arapongas. Resposta humana em até 30 minutos.
          </p>

          <div className="mb-20 flex flex-col justify-center gap-8 md:flex-row md:gap-12">
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

      {/* ===== FAIXA SECUNDÁRIA: sitemap + contato + legal ===== */}
      <section className="relative border-t border-noir-border bg-noir-bg/95">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {/* COL 1 — Marca */}
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-baseline gap-2">
                <span className="font-display-noir text-3xl font-extrabold tracking-tight text-noir-text">
                  Dinamic
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-noir-amber">
                  Imobiliária
                </span>
              </div>
              <p className="mt-3 max-w-xs font-body-noir text-sm leading-relaxed text-noir-text-mute">
                Imobiliária local de Arapongas-PR. Atendimento humano, IA pra
                acelerar sua busca, contratos seguros desde 2006.
              </p>
              <div className="mt-6 flex items-center gap-2">
                <a
                  href="https://instagram.com/dinamicimoveis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-noir-surface transition hover:bg-noir-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir-bg"
                >
                  <InstagramIcon className="h-4 w-4 text-noir-text" />
                </a>
                <a
                  href="https://facebook.com/dinamicimoveis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-noir-surface transition hover:bg-noir-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir-bg"
                >
                  <FacebookIcon className="h-4 w-4 text-noir-text" />
                </a>
                <a
                  href="https://youtube.com/@dinamicimoveis"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-noir-surface transition hover:bg-noir-amber/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir-bg"
                >
                  <Youtube className="h-4 w-4 text-noir-text" />
                </a>
              </div>
            </div>

            {/* COL 2 — Institucional */}
            <div>
              <h4 className="mb-4 font-body-noir text-xs font-semibold uppercase tracking-[0.2em] text-noir-text">
                Institucional
              </h4>
              <ul className="space-y-2.5 font-body-noir text-sm">
                <li>
                  <Link
                    href="#sobre"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Sobre nós
                  </Link>
                </li>
                <li>
                  <Link
                    href="#equipe"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Equipe
                  </Link>
                </li>
                <li>
                  <Link
                    href="#creci"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    CRECI
                  </Link>
                </li>
                <li>
                  <Link
                    href="#lgpd"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Política LGPD
                  </Link>
                </li>
                <li>
                  <Link
                    href="#termos"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Termos de uso
                  </Link>
                </li>
              </ul>
            </div>

            {/* COL 3 — Imóveis */}
            <div>
              <h4 className="mb-4 font-body-noir text-xs font-semibold uppercase tracking-[0.2em] text-noir-text">
                Imóveis
              </h4>
              <ul className="space-y-2.5 font-body-noir text-sm">
                <li>
                  <Link
                    href="#comprar"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Comprar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#alugar"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Alugar
                  </Link>
                </li>
                <li>
                  <Link
                    href="#lancamentos"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Lançamentos
                  </Link>
                </li>
                <li>
                  <Link
                    href="#bairros"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Bairros
                  </Link>
                </li>
                <li>
                  <Link
                    href="#anuncie"
                    className="text-noir-text-mute transition hover:text-noir-amber focus-visible:rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-noir-amber"
                  >
                    Anuncie seu imóvel
                  </Link>
                </li>
              </ul>
            </div>

            {/* COL 4 — Contato */}
            <div className="col-span-2 lg:col-span-1">
              <h4 className="mb-4 font-body-noir text-xs font-semibold uppercase tracking-[0.2em] text-noir-text">
                Contato
              </h4>
              <ul className="space-y-3 font-body-noir text-sm text-noir-text-mute">
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-noir-amber" />
                  <span>
                    (43) 98847-8713{" "}
                    <span className="text-noir-text-mute/60">·</span> Vendas
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-noir-amber" />
                  <span>
                    (43) 98847-8670{" "}
                    <span className="text-noir-text-mute/60">·</span> Locação
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-noir-amber" />
                  <span className="break-all">
                    contato@dinamicimobiliaria.com.br
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-noir-amber" />
                  <span>
                    Av. Maracanã, 123
                    <br />
                    Centro · Arapongas-PR
                  </span>
                </li>
              </ul>
            </div>
          </div>

          {/* Faixa final */}
          <div className="mt-12 flex flex-col items-center gap-3 border-t border-noir-border pt-8 sm:flex-row sm:justify-between">
            <p className="font-body-noir text-sm text-noir-text-mute">
              © 2026 Dinamic Imobiliária{" "}
              <span className="text-noir-text-mute/60">·</span> CRECI J-04567-PR
            </p>
            <p className="font-body-noir text-xs text-noir-text-mute/80">
              Desenvolvido pela Evotech Brasil
            </p>
          </div>
        </div>
      </section>
    </footer>
  );
}
