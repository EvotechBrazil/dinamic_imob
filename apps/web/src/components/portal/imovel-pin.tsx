"use client";

import * as React from "react";

interface ImovelPinProps {
  /** posição horizontal do pin como % do container (0-100) */
  cxPercent: number;
  /** posição vertical do pin como % do container (0-100) */
  cyPercent: number;
  /** se este pin está com popup aberto */
  isActive?: boolean;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  onPointerDown?: (e: React.PointerEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
}

/**
 * ImovelPin — botão pin amber estilo Airbnb posicionado absolutamente
 * por cima do SVG do ArapongasMap. Estado normal exibe halo pulse;
 * estado ativo destaca com ring indigo e remove o pulse.
 *
 * Posicionamento via porcentagens do container pai (que deve ser `relative`).
 */
export function ImovelPin({
  cxPercent,
  cyPercent,
  isActive = false,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onPointerDown,
  ariaLabel,
}: ImovelPinProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onFocus={onFocus}
      onBlur={onBlur}
      onPointerDown={onPointerDown}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={[
        "group absolute z-10 cursor-pointer touch-manipulation",
        // Tamanho visual 14px em todos os devices; hit area generosa via
        // pseudo-elemento garante tap fácil no mobile.
        "h-[14px] w-[14px] rounded-full",
        "before:content-[''] before:absolute before:-inset-3.5 md:before:-inset-2",
        "bg-noir-amber border-2 border-white",
        "shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
        "transition-transform duration-150 ease-out",
        // Hover só em desktop (pointer fine) — evita hover sticky no iOS
        "md:hover:scale-110 md:hover:shadow-[0_0_18px_rgba(245,158,11,0.65)]",
        // Active state (touch + click) dá feedback imediato
        "active:scale-110 active:shadow-[0_0_18px_rgba(245,158,11,0.7)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir-bg",
        isActive
          ? "scale-110 ring-2 ring-noir-indigo ring-offset-2 ring-offset-noir-bg shadow-[0_0_22px_rgba(79,70,229,0.7)]"
          : "",
      ].join(" ")}
      style={{
        left: `${cxPercent}%`,
        top: `${cyPercent}%`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Halo pulse atrás — só quando NÃO está ativo */}
      {!isActive && (
        <span
          aria-hidden="true"
          className="portal-map-pulse pointer-events-none absolute inset-0 rounded-full bg-[rgba(245,158,11,0.55)]"
        />
      )}
      {/* Núcleo do dot — span vazio garante z-index acima do halo */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-noir-amber"
      />
    </button>
  );
}
