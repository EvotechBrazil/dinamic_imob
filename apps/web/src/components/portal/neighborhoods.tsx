"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface Neighborhood {
  slug: string;
  nome: string;
  count: number;
  unsplashId: string;
}

const NEIGHBORHOODS: Neighborhood[] = [
  { slug: "centro", nome: "Centro", count: 47, unsplashId: "1502672260266-1c1ef2d93688" },
  { slug: "jardim-tropical", nome: "Jardim Tropical", count: 32, unsplashId: "1568605114967-8130f3a36994" },
  { slug: "vale-do-sol", nome: "Vale do Sol", count: 28, unsplashId: "1564013799919-ab600027ffc6" },
  { slug: "jardim-universitario", nome: "Jardim Universitário", count: 24, unsplashId: "1518780664697-55e3ad937233" },
  { slug: "vila-industrial", nome: "Vila Industrial", count: 19, unsplashId: "1572120360610-d971b9d7767c" },
  { slug: "aeroporto", nome: "Aeroporto", count: 15, unsplashId: "1605276374104-dee2a0ed3cd6" },
];

export function Neighborhoods() {
  const handleClick = (bairro: string) => {
    window.dispatchEvent(
      new CustomEvent("dinamic:portal-shortcut", {
        detail: { bairro },
      })
    );
  };

  return (
    <section className="border-y border-[var(--portal-border)] bg-white py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--portal-gold-dark)]">
            Localização
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[var(--portal-text)] lg:text-4xl"
            style={{ fontFamily: "var(--font-portal-display), Montserrat, sans-serif" }}
          >
            Bairros que a Dinamic conhece como ninguém
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-[var(--portal-text-muted)]">
            6 bairros com imóveis disponíveis hoje em Arapongas-PR
          </p>
        </header>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-3">
          {NEIGHBORHOODS.map((n) => (
            <button
              key={n.slug}
              type="button"
              onClick={() => handleClick(n.nome)}
              aria-label={`Ver imóveis no bairro ${n.nome}`}
              className={cn(
                "group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl text-left",
                "transition-shadow hover:shadow-lg",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
              )}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://images.unsplash.com/photo-${n.unsplashId}?w=600&h=450&fit=crop&auto=format`}
                alt={`Bairro ${n.nome} em Arapongas-PR`}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              {/* Pin marker — sempre visível em mobile, hover-only em desktop */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                <span className="absolute h-12 w-12 animate-ping rounded-full bg-[var(--portal-gold)]/60" />
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--portal-gold)] shadow-lg">
                  <MapPin className="h-5 w-5 text-white" aria-hidden />
                </span>
              </div>

              {/* Mini badge "Explorar" — sempre visível em mobile, hover-only em desktop */}
              <span className="pointer-events-none absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white opacity-100 backdrop-blur transition sm:opacity-0 sm:group-hover:opacity-100">
                <ArrowUpRight className="h-3 w-3" aria-hidden /> Explorar
              </span>

              {/* Textos */}
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <h3
                  className="text-lg font-bold leading-tight sm:text-2xl lg:text-3xl"
                  style={{ fontFamily: "var(--font-portal-display), Montserrat, sans-serif" }}
                >
                  {n.nome}
                </h3>
                <p className="mt-1 text-sm text-white/90">{n.count} imóveis disponíveis</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
