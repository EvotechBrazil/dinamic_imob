"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { X, Bed, Square, Car } from "lucide-react";
import type { Property, TipoImovel } from "@/lib/mock-types";

interface ImovelPopupProps {
  property: Property;
  /** posição horizontal do pin como % do container (0-100) — popup ancora aqui */
  cxPercent: number;
  /** posição vertical do pin como % do container (0-100) */
  cyPercent: number;
  onClose: () => void;
  /** click no CTA "Agendar visita" */
  onAgendar: () => void;
  /** click no CTA "Ver detalhes" — o parent decide o que faz */
  onVerDetalhes: () => void;
}

const TIPO_LABEL: Record<TipoImovel, string> = {
  apartamento: "Apto",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Comercial",
};

const brl = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

export function ImovelPopup({
  property,
  cxPercent,
  cyPercent,
  onClose,
  onAgendar,
  onVerDetalhes,
}: ImovelPopupProps): JSX.Element {
  // Anchor inteligente por quadrante pra evitar overflow do container do mapa.
  // Horizontal: pin nos 25% esquerdos -> popup cresce pra direita (anchor left);
  //             pin nos 25% direitos  -> popup cresce pra esquerda (anchor right);
  //             centro -> popup centrado.
  // Vertical:   pin na metade de cima -> popup abre ABAIXO;
  //             pin na metade de baixo -> popup abre ACIMA.
  const translateX =
    cxPercent < 25
      ? "8px"
      : cxPercent > 75
        ? "calc(-100% - 8px)"
        : "-50%";
  const translateY =
    cyPercent < 50 ? "24px" : "calc(-100% - 24px)";

  const foto = property.fotos?.[0];
  const finalidadeLabel =
    property.finalidade === "venda" ? "VENDA" : "ALUGUEL";

  // Specs em linha — pula campos zero (terreno por ex).
  const specs: { icon: React.ReactNode; label: string }[] = [];
  if (property.dormitorios > 0) {
    specs.push({
      icon: <Bed className="h-3 w-3" strokeWidth={1.6} aria-hidden />,
      label: `${property.dormitorios} dorms`,
    });
  }
  if (property.area > 0) {
    specs.push({
      icon: <Square className="h-3 w-3" strokeWidth={1.6} aria-hidden />,
      label: `${property.area}m²`,
    });
  }
  if (property.vagas > 0) {
    specs.push({
      icon: <Car className="h-3 w-3" strokeWidth={1.6} aria-hidden />,
      label: `${property.vagas} vagas`,
    });
  }

  return (
    <div
      className="absolute z-30"
      style={{
        left: `${cxPercent}%`,
        top: `${cyPercent}%`,
        transform: `translate(${translateX}, ${translateY})`,
      }}
    >
    <motion.div
      role="dialog"
      aria-label={`Detalhes do imóvel ${property.titulo}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
      className="w-[280px] sm:w-[320px] rounded-2xl bg-noir-surface border border-noir-border shadow-2xl overflow-hidden"
    >
      {/* Botão close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar"
        className="absolute top-2 right-2 z-10 grid place-items-center h-7 w-7 rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-black/80 transition-colors"
      >
        <X className="h-4 w-4" strokeWidth={2} aria-hidden />
      </button>

      {/* Foto + badges */}
      <div className="relative aspect-[16/10] w-full bg-black/40">
        {foto ? (
          <Image
            src={foto}
            alt={property.titulo}
            fill
            sizes="320px"
            unoptimized
            className="object-cover"
          />
        ) : null}

        {/* Badge tipo top-left */}
        <span className="absolute top-2 left-2 inline-flex items-center rounded-full bg-noir-amber text-noir-bg font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
          {TIPO_LABEL[property.tipo]}
        </span>

        {/* Badge finalidade top-right (deslocado p/ não colidir com close) */}
        <span className="absolute top-2 right-11 inline-flex items-center rounded-full bg-noir-indigo text-white font-bold px-2 py-0.5 text-[10px] uppercase tracking-wider">
          {finalidadeLabel}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="p-4">
        {/* Preço */}
        <div className="font-display-noir text-2xl font-bold text-noir-text leading-tight">
          {brl.format(property.preco)}
          {property.finalidade === "aluguel" ? (
            <span className="text-xs ml-1 text-noir-text-mute font-body-noir font-normal">
              / mês
            </span>
          ) : null}
        </div>

        {/* Bairro · Endereço */}
        <p className="mt-1 font-body-noir text-[12px] text-noir-text-mute truncate">
          {property.bairro}
          {property.endereco ? ` · ${property.endereco}` : ""}
        </p>

        {/* Specs */}
        {specs.length > 0 ? (
          <div className="mt-3 flex items-center gap-3 font-body-noir text-[12px] text-noir-text-mute">
            {specs.map((s, i) => (
              <span key={i} className="inline-flex items-center gap-1">
                {s.icon}
                {s.label}
              </span>
            ))}
          </div>
        ) : null}

        {/* CTAs */}
        <div className="mt-4 flex items-center gap-2">
          <button
            type="button"
            onClick={onVerDetalhes}
            className="flex-1 rounded-full border border-noir-border text-noir-text hover:bg-white/5 transition-colors font-display-noir text-[11px] uppercase tracking-[0.18em] font-bold py-2.5"
          >
            Ver detalhes
          </button>
          <button
            type="button"
            onClick={onAgendar}
            className="flex-1 rounded-full bg-noir-amber text-noir-bg hover:brightness-110 transition-[filter] font-display-noir text-[11px] uppercase tracking-[0.18em] font-bold py-2.5"
          >
            Agendar visita
          </button>
        </div>
      </div>
    </motion.div>
    </div>
  );
}
