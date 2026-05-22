import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MINI_KPIS = [
  { label: "Imóveis ativos", value: "628" },
  { label: "Conversas/dia", value: "142" },
  { label: "Contratos", value: "187" },
  { label: "Custo IA/conversa", value: "R$ 0,02" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-hero-gradient">
      {/* Watermark da marca — logo oficial em opacity baixa com fade radial.
          Posicionado fora do flow, atrás do conteúdo (z-0). */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-8 hidden h-[560px] w-[820px] select-none md:block lg:-right-24 lg:h-[640px] lg:w-[1000px]"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)",
          maskImage:
            "radial-gradient(ellipse at 70% 50%, black 0%, transparent 70%)",
        }}
      >
        <Image
          src="/logo-dinamic.png"
          alt=""
          fill
          sizes="1000px"
          priority
          className="object-contain object-right opacity-[0.07]"
        />
      </div>

      <div className="section-container relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl">
          <Badge variant="muted" className="mb-4">
            Demo Executiva · 2026-05-22
          </Badge>
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            A plataforma da Dinamic em{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              6 frentes.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Omnichannel comercial, financeiro de locação, CRM com IA, jurídico
            LGPD-nativo e dashboards consolidados — tudo num produto só, feito
            sob medida para a Dinamic Imobiliária de Arapongas-PR.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#omnichannel">Explorar a plataforma</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#dashboards">Ver indicadores</a>
            </Button>
            <span className="ml-1 text-sm text-muted">
              ou{" "}
              <span className="font-medium text-primary">
                clique no chat ao lado
              </span>{" "}
              para falar com a IA
            </span>
          </div>
        </div>

        <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {MINI_KPIS.map((k) => (
            <div
              key={k.label}
              className="rounded-xl border border-border bg-surface p-4 shadow-sm"
            >
              <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                {k.label}
              </dt>
              <dd className="mt-1 font-display text-2xl font-bold text-ink">
                {k.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
