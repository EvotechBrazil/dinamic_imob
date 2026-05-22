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
      {/* Watermark da marca — logo oficial centralizada atrás do conteúdo,
          opacity baixa com fade radial nas bordas pra fundir no gradient. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center"
        style={{
          WebkitMaskImage:
            "radial-gradient(ellipse 60% 70% at 50% 50%, black 0%, transparent 75%)",
          maskImage:
            "radial-gradient(ellipse 60% 70% at 50% 50%, black 0%, transparent 75%)",
        }}
      >
        <div className="relative h-[80%] w-[90%] max-w-[1100px]">
          <Image
            src="/logo-dinamic.png"
            alt=""
            fill
            sizes="1100px"
            priority
            className="object-contain opacity-[0.06]"
          />
        </div>
      </div>

      <div className="section-container relative z-10 py-16 sm:py-24">
        <div className="max-w-3xl">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <Badge variant="muted">Demo Executiva · 2026-05-22</Badge>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-amber-700">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
              Feito sob medida
            </span>
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
            Toda a Dinamic em{" "}
            <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-600 bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(180,120,20,0.15)]">
              um só lugar.
            </span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            IA atendendo 24/7, catálogo de imóveis vivo, financeiro auditável e
            CRM com funil que captura cada lead.{" "}
            <span className="font-medium text-ink">
              Sob medida pra Dinamic
            </span>{" "}
            — dados, marca e operação no seu controle.
          </p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <a href="#omnichannel">Explorar a plataforma</a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#dashboards">Ver indicadores</a>
            </Button>
            <span className="ml-1 text-sm text-muted">
              ou abra o{" "}
              <span className="font-medium text-primary">
                chat no canto inferior direito
              </span>{" "}
              pra falar com a IA agora
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
