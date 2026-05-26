"use client";

import * as React from "react";
import Image from "next/image";
import { ImovelPin } from "./imovel-pin";
import { ImovelPopup } from "./imovel-popup";
import { PORTAL_IMOVEIS_MAP } from "@/lib/portal/portal-imoveis-coords";
import {
  dispatchPortalConversationSeed,
  scrollToId,
} from "@/lib/portal/portal-utils";
import type { Property } from "@/lib/mock-types";

interface BairroLabel {
  name: string;
  top: string;
  left: string;
  right?: boolean;
}

const BAIRRO_LABELS: ReadonlyArray<BairroLabel> = [
  { name: "Centro", top: "62%", left: "50%" },
  { name: "Jd Tropical", top: "32%", left: "22%" },
  { name: "Industrial", top: "68%", left: "65%", right: true },
  { name: "Aeroporto", top: "28%", left: "80%", right: true },
];

const TIPO_LABEL: Record<Property["tipo"], string> = {
  apartamento: "Apartamento",
  casa: "Casa",
  terreno: "Terreno",
  comercial: "Sala comercial",
};

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

function buildSeedPrompt(
  property: Property,
  intent: "agendar" | "ver_detalhes",
): string {
  const preco =
    property.finalidade === "aluguel"
      ? `${fmtBRL(property.preco)}/mês`
      : fmtBRL(property.preco);
  const tipoStr = TIPO_LABEL[property.tipo];
  if (intent === "agendar") {
    return `Quero agendar uma visita no imóvel [${property.id}] — ${tipoStr} no ${property.bairro} · ${preco}. Quando tem horário disponível?`;
  }
  return `Me conta mais sobre o imóvel [${property.id}] — ${tipoStr} no ${property.bairro} · ${preco}. Quais diferenciais? Tem mais fotos?`;
}

export function ArapongasMap() {
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const closeTimerRef = React.useRef<number | null>(null);

  const cancelClose = React.useCallback(() => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const openPin = React.useCallback(
    (id: string) => {
      cancelClose();
      setActiveId(id);
    },
    [cancelClose],
  );

  const scheduleClose = React.useCallback(() => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setActiveId(null);
      closeTimerRef.current = null;
    }, 180);
  }, [cancelClose]);

  React.useEffect(() => () => cancelClose(), [cancelClose]);

  React.useEffect(() => {
    if (!activeId) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setActiveId(null);
    }
    function handleOutside(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-portal-popup]")) return;
      if (target.closest("[data-portal-pin]")) return;
      setActiveId(null);
    }
    window.addEventListener("keydown", handleKey);
    window.addEventListener("mousedown", handleOutside);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("mousedown", handleOutside);
    };
  }, [activeId]);

  const activePin = activeId
    ? PORTAL_IMOVEIS_MAP.find((p) => p.property.id === activeId) ?? null
    : null;

  const fireSeed = (property: Property, intent: "agendar" | "ver_detalhes") => {
    cancelClose();
    setActiveId(null);
    scrollToId("conversa-ia");
    window.setTimeout(() => {
      dispatchPortalConversationSeed(buildSeedPrompt(property, intent));
    }, 450);
  };

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-noir-border bg-[#0B0B14]">
        {/* Mapa real de Arapongas — Google Maps em B&W via filter
            (calibrado pra legibilidade igual em mobile e desktop) */}
        <Image
          src="/portal/mapa-arapongas.png"
          alt="Mapa de Arapongas"
          fill
          priority
          sizes="(min-width: 1024px) 80vw, 100vw"
          className="object-cover select-none [filter:grayscale(1)_invert(1)_brightness(1.05)_contrast(1)_hue-rotate(180deg)]"
          draggable={false}
        />

        {/* Tint noir leve por cima da imagem pra integrar com tema */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none mix-blend-multiply bg-[rgba(15,23,41,0.28)]"
        />

        {/* Vinheta radial suave pra escurecer só as bordas */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_50%,_rgba(11,11,20,0.45)_95%)]"
        />

        {/* Marker da sede Dinamic no centro */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[5] pointer-events-none"
        >
          <div className="relative grid place-items-center h-11 w-11">
            <div className="absolute inset-0 rounded-full border border-noir-indigo/70 border-dashed" />
            <div className="grid place-items-center h-5 w-5 rounded-sm bg-noir-indigo text-white font-display-noir font-bold text-[11px] leading-none">
              D
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          {BAIRRO_LABELS.map((b) => (
            <div
              key={b.name}
              className={`portal-map-label ${b.right ? "is-right" : ""}`}
              style={{
                top: b.top,
                left: b.left,
                transform: b.name === "Centro" ? "translate(-50%, 0)" : undefined,
                cursor: "default",
                pointerEvents: "none",
              }}
              aria-hidden
            >
              {b.name.toUpperCase()}
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-0 z-10">
        {PORTAL_IMOVEIS_MAP.map(({ property, cx, cy }) => {
          const cxPct = (cx / 1920) * 100;
          const cyPct = (cy / 1080) * 100;
          const ariaLabel = `Imóvel ${property.titulo} no bairro ${property.bairro}`;
          return (
            <div key={property.id} data-portal-pin className="contents">
              <ImovelPin
                cxPercent={cxPct}
                cyPercent={cyPct}
                isActive={activeId === property.id}
                onClick={() =>
                  setActiveId((curr) => (curr === property.id ? null : property.id))
                }
                onMouseEnter={() => openPin(property.id)}
                onMouseLeave={scheduleClose}
                onFocus={() => openPin(property.id)}
                onBlur={scheduleClose}
                // Touch: abre IMEDIATAMENTE no pointerdown (sem esperar o ciclo
                // touchend→click, que cancela se o dedo move 1px). Mouse passa
                // pelo onMouseEnter normal.
                onPointerDown={(e) => {
                  if (e.pointerType === "touch") {
                    openPin(property.id);
                  }
                }}
                ariaLabel={ariaLabel}
              />
            </div>
          );
        })}
      </div>

      {activePin && (
        <div data-portal-popup className="absolute inset-0 z-20 pointer-events-none">
          <div
            className="pointer-events-auto"
            onMouseEnter={cancelClose}
            onMouseLeave={scheduleClose}
          >
            <ImovelPopup
              property={activePin.property}
              cxPercent={(activePin.cx / 1920) * 100}
              cyPercent={(activePin.cy / 1080) * 100}
              onClose={() => setActiveId(null)}
              onAgendar={() => fireSeed(activePin.property, "agendar")}
              onVerDetalhes={() => fireSeed(activePin.property, "ver_detalhes")}
            />
          </div>
        </div>
      )}
    </div>
  );
}
