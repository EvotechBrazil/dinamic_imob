"use client";

import * as React from "react";
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

const VERTICAL_LINES = Array.from({ length: 19 }, (_, i) => 80 + i * 100);
const HORIZONTAL_LINES = Array.from({ length: 11 }, (_, i) => 80 + i * 100);

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
    setActiveId(null);
    scrollToId("conversa-ia");
    window.setTimeout(() => {
      dispatchPortalConversationSeed(buildSeedPrompt(property, intent));
    }, 450);
  };

  return (
    <div className="relative w-full aspect-[16/10] md:aspect-[16/9]">
      <div className="absolute inset-0 rounded-2xl overflow-hidden border border-noir-border bg-[#0F1729]">
      <svg
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="portalMapHaze" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#0F1729" stopOpacity="0" />
            <stop offset="100%" stopColor="#0B0B14" stopOpacity="0.85" />
          </radialGradient>
          <linearGradient id="portalMapLake" x1="0" x2="1">
            <stop offset="0" stopColor="#0F1729" />
            <stop offset="1" stopColor="#1A2540" />
          </linearGradient>
        </defs>

        <rect width="1920" height="1080" fill="#0F1729" />

        <path d="M120,160 L420,160 L460,300 L380,420 L160,440 L100,300 Z" fill="#111827" opacity="0.85" />
        <path d="M620,580 L900,560 L960,720 L820,860 L600,840 L540,700 Z" fill="#111827" opacity="0.8" />
        <path d="M1300,180 L1620,160 L1700,300 L1640,460 L1380,480 L1280,340 Z" fill="#111827" opacity="0.85" />
        <path d="M1500,720 L1820,720 L1860,880 L1700,1000 L1480,980 L1420,860 Z" fill="#111827" opacity="0.8" />
        <path d="M40,720 L300,700 L380,860 L260,1020 L60,1000 Z" fill="#111827" opacity="0.85" />

        <ellipse cx="960" cy="440" rx="120" ry="60" fill="url(#portalMapLake)" opacity="0.9" />
        <ellipse cx="380" cy="900" rx="80" ry="40" fill="url(#portalMapLake)" opacity="0.9" />

        <g stroke="#1F2937" strokeWidth="1" fill="none">
          {VERTICAL_LINES.map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="1080" />
          ))}
          {HORIZONTAL_LINES.map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="1920" y2={y} />
          ))}
        </g>

        <g stroke="#374151" strokeWidth="2" fill="none" opacity="0.7">
          <line x1="0" y1="200" x2="1920" y2="900" />
          <line x1="0" y1="800" x2="1920" y2="300" />
          <line x1="960" y1="0" x2="960" y2="1080" strokeWidth="3" />
          <line x1="0" y1="540" x2="1920" y2="540" strokeWidth="3" />
        </g>

        <circle cx="960" cy="540" r="380" fill="none" stroke="#2D3748" strokeWidth="2" strokeDasharray="6 6" opacity="0.6" />

        <rect width="1920" height="1080" fill="url(#portalMapHaze)" />

        <g transform="translate(960,540)">
          <circle r="22" fill="none" stroke="#4F46E5" strokeWidth="2" strokeDasharray="3 3" />
          <rect x="-10" y="-10" width="20" height="20" fill="#4F46E5" rx="3" />
          <text
            x="0"
            y="4"
            textAnchor="middle"
            fontFamily="var(--font-syncopate), sans-serif"
            fontWeight="700"
            fontSize="12"
            fill="#fff"
          >
            D
          </text>
        </g>
      </svg>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(11,11,20,0.85) 90%)",
        }}
      />

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
                ariaLabel={ariaLabel}
              />
            </div>
          );
        })}
      </div>

      {activePin && (
        <div data-portal-popup className="absolute inset-0 z-20 pointer-events-none">
          <div className="pointer-events-auto">
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
