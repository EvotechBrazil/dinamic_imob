"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Bed, Bath, Car, Square, MapPin, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Property, TipoImovel } from "@/lib/mock-types";

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);

const TIPO_LABEL: Record<TipoImovel, string> = {
  apartamento: "Apto",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
};

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const isAluguel = property.finalidade === "aluguel";
  const banheiros = property.banheiros ?? 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl border border-border bg-surface shadow-sm",
        "transition-shadow hover:shadow-lg"
      )}
    >
      {/* Foto + badges */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-app">
        <Image
          src={property.fotos[0]}
          alt={property.titulo}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />

        {/* Badge destaque */}
        {property.destaque && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-accent px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white shadow-sm">
            <Star className="h-3 w-3 fill-white" aria-hidden /> Destaque
          </span>
        )}

        {/* Badge tipo */}
        <span className="absolute right-3 top-3 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-ink shadow-sm backdrop-blur">
          {TIPO_LABEL[property.tipo]}
        </span>

        {/* Botão heart */}
        <button
          type="button"
          aria-label="Favoritar imóvel"
          className="absolute bottom-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-muted shadow-sm backdrop-blur transition hover:text-rose-500"
        >
          <Heart className="h-4 w-4" />
        </button>

        {/* Pill finalidade canto inferior esquerdo */}
        <span
          className={cn(
            "absolute bottom-3 left-3 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider shadow-sm",
            isAluguel ? "bg-teal-500 text-white" : "bg-primary text-white"
          )}
        >
          {isAluguel ? "Aluguel" : "Venda"}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-1 flex-col gap-2.5 p-4">
        {/* Preço */}
        <div className="flex items-baseline gap-1">
          <span className="font-display text-xl font-bold text-ink">
            {formatBRL(property.preco)}
          </span>
          {isAluguel && <span className="text-xs text-muted">/ mês</span>}
        </div>

        {/* Título */}
        <h4 className="line-clamp-2 min-h-[2.5rem] text-sm font-medium leading-snug text-ink">
          {property.titulo}
        </h4>

        {/* Bairro */}
        <div className="flex items-center gap-1 text-xs text-muted">
          <MapPin className="h-3 w-3 shrink-0" aria-hidden />
          <span className="truncate">
            {property.bairro}
            {property.endereco ? ` · ${property.endereco}` : ""}
          </span>
        </div>

        {/* Specs */}
        <div className="mt-auto flex items-center justify-between border-t border-border/60 pt-3 text-xs text-muted">
          <Spec
            icon={<Bed className="h-3.5 w-3.5" />}
            value={property.dormitorios}
            label="dorm"
          />
          <Spec
            icon={<Bath className="h-3.5 w-3.5" />}
            value={banheiros}
            label="ban"
          />
          <Spec
            icon={<Car className="h-3.5 w-3.5" />}
            value={property.vagas}
            label="vaga"
          />
          <Spec
            icon={<Square className="h-3.5 w-3.5" />}
            value={`${property.area}`}
            label="m²"
          />
        </div>
      </div>
    </motion.article>
  );
}

interface SpecProps {
  icon: React.ReactNode;
  value: number | string;
  label: string;
}

function Spec({ icon, value, label }: SpecProps) {
  return (
    <div className="flex items-center gap-1" title={`${value} ${label}`}>
      <span aria-hidden className="text-muted">
        {icon}
      </span>
      <span className="font-medium text-ink">{value}</span>
      <span className="text-[10px] uppercase tracking-wide">{label}</span>
    </div>
  );
}
