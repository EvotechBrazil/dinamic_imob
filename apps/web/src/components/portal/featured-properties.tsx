"use client";

import { useEffect, useMemo, useState } from "react";
import { PropertyCardPremium } from "./property-card-premium";
import { PROPERTIES } from "@/components/sections/crm/mock";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/mock-types";

type FilterKey = "destaques" | "comprar" | "alugar" | "lancamentos" | "todos";

interface FilterPill {
  key: FilterKey;
  label: string;
  match: (p: Property) => boolean;
}

const FILTERS: FilterPill[] = [
  { key: "destaques", label: "Destaques", match: (p) => Boolean(p.destaque) },
  { key: "comprar", label: "Comprar", match: (p) => p.finalidade === "venda" },
  { key: "alugar", label: "Alugar", match: (p) => p.finalidade === "aluguel" },
  {
    key: "lancamentos",
    label: "Lançamentos",
    match: (p) =>
      p.tipo === "apartamento" &&
      p.finalidade === "venda" &&
      p.preco >= 500000,
  },
  { key: "todos", label: "Todos", match: () => true },
];

const SHORTCUT_TO_FILTER: Record<string, FilterKey> = {
  "Comprar casa": "comprar",
  "Alugar apartamento": "alugar",
  "Terrenos": "comprar",
  "Comerciais": "comprar",
  "Lançamentos": "lancamentos",
};

interface PortalShortcutDetail {
  type?: string;
  bairro?: string;
}

const INITIAL_VISIBLE = 6;
const LOAD_INCREMENT = 6;

export function FeaturedProperties() {
  const [active, setActive] = useState<FilterKey>("destaques");
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE);
  const [bairroFilter, setBairroFilter] = useState<string | null>(null);

  const counts = useMemo(() => {
    const obj: Record<FilterKey, number> = {
      destaques: 0,
      comprar: 0,
      alugar: 0,
      lancamentos: 0,
      todos: PROPERTIES.length,
    };
    PROPERTIES.forEach((p) => {
      FILTERS.forEach((f) => {
        if (f.key !== "todos" && f.match(p)) obj[f.key] += 1;
      });
    });
    return obj;
  }, []);

  const filtered = useMemo(() => {
    const matcher = FILTERS.find((f) => f.key === active);
    let list = matcher ? PROPERTIES.filter(matcher.match) : PROPERTIES;
    if (bairroFilter) {
      const needle = bairroFilter.toLowerCase();
      list = list.filter((p) => {
        const haystack = p.bairro.toLowerCase();
        return (
          haystack === needle ||
          haystack.includes(needle) ||
          needle.includes(haystack)
        );
      });
    }
    return list;
  }, [active, bairroFilter]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = filtered.length > visibleCount;

  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE);
  }, [active, bairroFilter]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<PortalShortcutDetail>).detail || {};
      if (detail.bairro) {
        setBairroFilter(detail.bairro);
        setActive("todos");
      } else if (detail.type && SHORTCUT_TO_FILTER[detail.type]) {
        setActive(SHORTCUT_TO_FILTER[detail.type]);
        setBairroFilter(null);
      }
      // Scroll into view
      const section = document.getElementById("portal-featured");
      if (section) {
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };
    window.addEventListener("dinamic:portal-shortcut", handler);
    return () => window.removeEventListener("dinamic:portal-shortcut", handler);
  }, []);

  return (
    <section
      id="portal-featured"
      className="bg-[var(--portal-bg)] py-16 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <header className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-wider text-[var(--portal-gold-dark)]">
            Catálogo
          </p>
          <h2
            className="mt-2 text-3xl font-bold tracking-tight text-[var(--portal-text)] lg:text-4xl"
            style={{ fontFamily: "var(--font-portal-display), Montserrat, sans-serif" }}
          >
            Imóveis em destaque
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-[var(--portal-text-muted)] lg:mx-0 mx-auto">
            Selecionados a dedo. Atualizados todo dia. 628 oportunidades em Arapongas.
          </p>
        </header>

        {/* Filter pills */}
        <div
          className="mt-8 flex flex-wrap justify-center gap-2 lg:justify-start"
          role="tablist"
          aria-label="Filtros de imóveis"
        >
          {FILTERS.map((f) => {
            const isActive = active === f.key;
            return (
              <button
                key={f.key}
                role="tab"
                aria-selected={isActive}
                aria-controls="portal-featured-panel"
                type="button"
                onClick={() => {
                  setActive(f.key);
                  setBairroFilter(null);
                }}
                className={cn(
                  "rounded-full px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2",
                  isActive
                    ? "bg-[var(--portal-cta-black)] text-white shadow-md"
                    : "border border-[var(--portal-border)] bg-white text-[var(--portal-text)] hover:border-[var(--portal-gold)] hover:text-[var(--portal-gold-dark)]"
                )}
              >
                {f.label}
                <span
                  className={cn(
                    "ml-1.5 text-xs",
                    isActive ? "text-white/70" : "text-[var(--portal-text-subtle)]"
                  )}
                >
                  ({counts[f.key]})
                </span>
              </button>
            );
          })}
        </div>

        {/* Bairro filter pill (mostra quando ativo via evento) */}
        {bairroFilter && (
          <div className="mt-4 flex items-center justify-center lg:justify-start gap-2 text-sm">
            <span className="text-[var(--portal-text-muted)]">Bairro:</span>
            <button
              type="button"
              aria-label={`Remover filtro de bairro: ${bairroFilter}`}
              onClick={() => setBairroFilter(null)}
              className="inline-flex items-center gap-2 rounded-full bg-[var(--portal-gold-soft)] px-3 py-1 font-medium text-[var(--portal-gold-darker)] hover:bg-[var(--portal-gold)]/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
            >
              {bairroFilter}
              <span aria-hidden className="text-base leading-none">×</span>
            </button>
          </div>
        )}

        {/* Grid */}
        {visible.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-[var(--portal-border)] bg-white p-12 text-center">
            <p className="text-[var(--portal-text-muted)]">
              Nenhum imóvel encontrado com esses filtros.
            </p>
            <button
              type="button"
              onClick={() => {
                setActive("todos");
                setBairroFilter(null);
              }}
              className="mt-4 rounded text-sm font-medium text-[var(--portal-gold-dark)] hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
            >
              Limpar filtros
            </button>
          </div>
        ) : (
          <div
            id="portal-featured-panel"
            role="tabpanel"
            aria-label="Imóveis filtrados"
            className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {visible.map((p) => (
              <PropertyCardPremium key={p.id} property={p} />
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && (
          <div className="mt-10 text-center">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + LOAD_INCREMENT)}
              className="rounded-xl border border-[var(--portal-border)] bg-white px-8 py-3 text-sm font-medium text-[var(--portal-text)] transition hover:border-[var(--portal-gold)] hover:text-[var(--portal-gold-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
            >
              Ver mais {Math.min(LOAD_INCREMENT, filtered.length - visibleCount)} imóveis
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
