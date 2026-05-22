import Image from "next/image";
import Link from "next/link";
import { MessageCircle, MapPin, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-white">
      <div className="section-container py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          {/* Coluna marca */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/logo-dinamic.png"
                alt="Dinamic Imóveis"
                width={240}
                height={160}
                className="h-14 w-auto"
              />
              <span className="rounded-md border border-border bg-app/60 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
                CRECI-J 03226
              </span>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">
              Imobiliária independente de Arapongas-PR, agora com plataforma
              própria — IA, CRM e financeiro de locação trabalhando juntos pra
              entregar mais imóvel com menos tempo gasto em planilha.
            </p>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-muted">
              <MapPin className="h-3.5 w-3.5" aria-hidden />
              Arapongas · Paraná · Brasil
            </div>
          </div>

          {/* Atendimento */}
          <div className="lg:col-span-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">
              Fale com a Dinamic
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <a
                  href="https://wa.me/5543988478713"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-muted transition hover:text-ink"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">
                      Vendas
                    </span>
                    <span className="font-medium text-ink">
                      (43) 98847-8713
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/5543988478670"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-muted transition hover:text-ink"
                >
                  <span className="grid h-7 w-7 place-items-center rounded-md bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-100">
                    <MessageCircle className="h-3.5 w-3.5" />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-wider text-muted">
                      Locação
                    </span>
                    <span className="font-medium text-ink">
                      (43) 98847-8670
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>

          {/* Plataforma */}
          <div className="lg:col-span-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-ink">
              Plataforma
            </p>
            <ul className="mt-4 space-y-2 text-sm text-muted">
              <li>
                <Link href="#imoveis" className="transition hover:text-ink">
                  Imóveis
                </Link>
              </li>
              <li>
                <Link
                  href="#omnichannel"
                  className="transition hover:text-ink"
                >
                  Dinamic Channel
                </Link>
              </li>
              <li>
                <Link href="#crm" className="transition hover:text-ink">
                  CRM com IA
                </Link>
              </li>
              <li>
                <Link href="#financeiro" className="transition hover:text-ink">
                  Financeiro
                </Link>
              </li>
              <li>
                <Link href="#juridico" className="transition hover:text-ink">
                  Jurídico & LGPD
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col-reverse items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} Dinamic Imóveis · Todos os direitos
            reservados.
          </p>
          <Link
            href="#juridico"
            className="inline-flex items-center gap-1.5 transition hover:text-ink"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
            Dados tratados conforme LGPD · Lei 13.709/2018
          </Link>
        </div>
      </div>
    </footer>
  );
}
