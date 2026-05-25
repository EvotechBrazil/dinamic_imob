"use client";

import * as React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, Youtube } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";

export function PortalFooterSitemap() {
  return (
    <section className="relative bg-noir-bg">
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
  );
}
