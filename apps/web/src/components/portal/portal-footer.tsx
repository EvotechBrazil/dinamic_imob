import Link from "next/link";
import { Mail, MapPin, Phone, Youtube } from "lucide-react";
import { FacebookIcon, InstagramIcon } from "@/components/ui/brand-icons";

export function PortalFooter() {
  return (
    <footer className="bg-[var(--portal-cta-black)] text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {/* COL 1 — Marca */}
          <div className="col-span-2 lg:col-span-1">
            <div className="flex items-baseline gap-2">
              <span className="font-portal-display text-3xl font-extrabold tracking-tight text-white">
                Dinamic
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--portal-gold)]">
                Imobiliária
              </span>
            </div>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
              Imobiliária local de Arapongas-PR. Atendimento humano, IA pra
              acelerar sua busca, contratos seguros desde 2006.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <a
                href="https://instagram.com/dinamicimoveis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--portal-cta-black)]"
              >
                <InstagramIcon className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://facebook.com/dinamicimoveis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--portal-cta-black)]"
              >
                <FacebookIcon className="h-4 w-4 text-white" />
              </a>
              <a
                href="https://youtube.com/@dinamicimoveis"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--portal-cta-black)]"
              >
                <Youtube className="h-4 w-4 text-white" />
              </a>
            </div>
          </div>

          {/* COL 2 — Institucional */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Institucional
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#sobre"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Sobre nós
                </Link>
              </li>
              <li>
                <Link
                  href="#equipe"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Equipe
                </Link>
              </li>
              <li>
                <Link
                  href="#creci"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  CRECI
                </Link>
              </li>
              <li>
                <Link
                  href="#lgpd"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Política LGPD
                </Link>
              </li>
              <li>
                <Link
                  href="#termos"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Termos de uso
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 3 — Imóveis */}
          <div>
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Imóveis
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="#comprar"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Comprar
                </Link>
              </li>
              <li>
                <Link
                  href="#alugar"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Alugar
                </Link>
              </li>
              <li>
                <Link
                  href="#lancamentos"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Lançamentos
                </Link>
              </li>
              <li>
                <Link
                  href="#bairros"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Bairros
                </Link>
              </li>
              <li>
                <Link
                  href="#anuncie"
                  className="text-white/70 transition hover:text-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--portal-gold)] focus-visible:rounded"
                >
                  Anuncie seu imóvel
                </Link>
              </li>
            </ul>
          </div>

          {/* COL 4 — Contato */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white">
              Contato
            </h4>
            <ul className="space-y-3 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--portal-gold)]" />
                <span>
                  (43) 98847-8713{" "}
                  <span className="text-white/50">·</span> Vendas
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[var(--portal-gold)]" />
                <span>
                  (43) 98847-8670{" "}
                  <span className="text-white/50">·</span> Locação
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[var(--portal-gold)]" />
                <span className="break-all">
                  contato@dinamicimobiliaria.com.br
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[var(--portal-gold)]" />
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
        <div className="mt-12 flex flex-col items-center gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between">
          <p className="text-sm text-white/60">
            © 2026 Dinamic Imobiliária{" "}
            <span className="text-white/30">·</span> CRECI J-04567-PR
          </p>
          <p className="text-xs text-white/50">
            Desenvolvido pela Evotech Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
