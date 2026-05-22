"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, MapPin, BedDouble, Bath, Car, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property } from "@/lib/mock-types";

const formatPrice = (value: number, finalidade: "venda" | "aluguel"): string => {
  const formatted = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
  return finalidade === "aluguel" ? `${formatted}/mês` : formatted;
};

interface PropertyCardPremiumProps {
  property: Property;
}

export function PropertyCardPremium({ property }: PropertyCardPremiumProps) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, isTilting: false });
  const cardRef = useRef<HTMLElement>(null);
  const galleryTimerRef = useRef<number | null>(null);

  const fotos =
    property.fotos && property.fotos.length > 0
      ? property.fotos
      : [
          `https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=600&h=450&fit=crop`,
        ];

  const isAluguel = property.finalidade === "aluguel";
  const isLancamento =
    property.tipo === "apartamento" &&
    property.finalidade === "venda" &&
    property.preco >= 500000;

  // Galeria rotate on hover (1s/foto) — only if > 1 foto
  const handleMouseEnter = () => {
    if (fotos.length <= 1) return;
    if (galleryTimerRef.current !== null) {
      window.clearInterval(galleryTimerRef.current);
    }
    galleryTimerRef.current = window.setInterval(() => {
      setPhotoIdx((idx) => (idx + 1) % fotos.length);
    }, 1000);
  };

  // Mobile: tap cycles to next photo (no hover support on touch devices)
  const handleTouchEnd = () => {
    if (fotos.length <= 1) return;
    setPhotoIdx((idx) => (idx + 1) % fotos.length);
  };

  const handleMouseLeave = () => {
    if (galleryTimerRef.current !== null) {
      window.clearInterval(galleryTimerRef.current);
      galleryTimerRef.current = null;
    }
    setPhotoIdx(0);
    setTilt({ rx: 0, ry: 0, isTilting: false });
  };

  // 3D tilt — desktop only, max 5deg
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!cardRef.current) return;
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ rx: -yPct * 5, ry: xPct * 5, isTilting: true });
  };

  useEffect(() => {
    return () => {
      if (galleryTimerRef.current !== null)
        window.clearInterval(galleryTimerRef.current);
    };
  }, []);

  const precoM2 =
    property.area > 0 ? Math.round(property.preco / property.area) : 0;

  const finalidadeBadge = isLancamento
    ? { label: "LANÇAMENTO", className: "bg-[var(--portal-gold)]" }
    : isAluguel
      ? { label: "ALUGUEL", className: "bg-emerald-500" }
      : { label: "VENDA", className: "bg-blue-500" };

  return (
    <article
      ref={cardRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
        transition: tilt.isTilting
          ? "transform 80ms ease-out"
          : "transform 300ms ease",
        boxShadow: "var(--shadow-portal-card)",
        willChange: "transform",
      }}
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-white",
        "duration-300 hover:-translate-y-1 hover:scale-[1.02]",
        "transition-[box-shadow,translate,scale]",
        "hover:[box-shadow:var(--shadow-portal-card-hover)]"
      )}
    >
      {/* Imagem com gallery hover + badges + favorito */}
      <div
        onTouchEnd={handleTouchEnd}
        className="relative aspect-[4/3] overflow-hidden bg-[var(--portal-bg)]"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={fotos[photoIdx]}
          alt={property.titulo}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {property.destaque && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-[var(--portal-gold)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md">
            <span aria-hidden="true">⭐</span> Destaque
          </span>
        )}

        <span
          className={cn(
            "absolute right-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-md",
            finalidadeBadge.className
          )}
        >
          {finalidadeBadge.label}
        </span>

        <button
          type="button"
          aria-label={isFavorited ? "Remover dos favoritos" : "Favoritar imóvel"}
          aria-pressed={isFavorited}
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorited((v) => !v);
          }}
          className="absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
        >
          <Heart
            className={cn(
              "h-5 w-5 transition",
              isFavorited
                ? "fill-rose-500 stroke-rose-500"
                : "fill-none stroke-[var(--portal-text-muted)]"
            )}
          />
        </button>

        {fotos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
            {fotos.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-1 w-4 rounded-full transition",
                  idx === photoIdx ? "bg-white" : "bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col gap-1 p-5">
        <div className="flex items-baseline justify-between gap-2">
          <span
            className="text-2xl font-bold text-[var(--portal-text)]"
            style={{
              fontFamily: "var(--font-portal-display), Montserrat, sans-serif",
            }}
          >
            {formatPrice(property.preco, property.finalidade)}
          </span>
          {precoM2 > 0 && (
            <span className="whitespace-nowrap text-xs text-[var(--portal-text-muted)]">
              R$ {precoM2.toLocaleString("pt-BR")}/m²
            </span>
          )}
        </div>

        <h3 className="mt-1 line-clamp-1 text-lg font-semibold text-[var(--portal-text)]">
          {property.titulo}
        </h3>

        <p className="mt-0.5 flex items-center gap-1 text-sm text-[var(--portal-text-muted)]">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
          <span className="truncate">{property.bairro} · Arapongas-PR</span>
        </p>

        <div className="mt-3 flex items-center gap-4 border-t border-[var(--portal-border)] pt-3 text-sm text-[var(--portal-text-muted)]">
          <span
            className="flex items-center gap-1"
            title={`${property.dormitorios} dormitórios`}
          >
            <BedDouble className="h-4 w-4" aria-hidden /> {property.dormitorios}
          </span>
          {property.banheiros !== undefined && property.banheiros > 0 && (
            <span
              className="flex items-center gap-1"
              title={`${property.banheiros} banheiros`}
            >
              <Bath className="h-4 w-4" aria-hidden /> {property.banheiros}
            </span>
          )}
          <span
            className="flex items-center gap-1"
            title={`${property.vagas} vagas`}
          >
            <Car className="h-4 w-4" aria-hidden /> {property.vagas}
          </span>
          <span
            className="ml-auto flex items-center gap-1"
            title={`${property.area} m²`}
          >
            <Maximize className="h-4 w-4" aria-hidden /> {property.area}m²
          </span>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-xl bg-[var(--portal-cta-black)] py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--portal-cta-black-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
          >
            Ver detalhes
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              window.dispatchEvent(
                new CustomEvent("dinamic:open-chat-widget", {
                  detail: {
                    prompt: `Quero saber mais sobre o imóvel ${property.titulo}`,
                  },
                })
              );
            }}
            className="flex h-11 items-center gap-1.5 rounded-xl border border-[var(--portal-border)] bg-white px-4 text-sm font-medium text-[var(--portal-text)] transition hover:border-[var(--portal-gold)] hover:text-[var(--portal-gold-dark)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--portal-gold)] focus-visible:ring-offset-2"
          >
            <span aria-hidden="true">💬</span> Saber mais
          </button>
        </div>
      </div>
    </article>
  );
}
