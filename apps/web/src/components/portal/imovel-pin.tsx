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
  ariaLabel,
}: ImovelPinProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-pressed={isActive}
      className={[
        "group absolute z-10 cursor-pointer",
        "h-[14px] w-[14px] rounded-full",
        "bg-noir-amber border-2 border-white",
        "shadow-[0_2px_8px_rgba(0,0,0,0.45)]",
        "transition-all duration-200 ease-out",
        "hover:scale-110 hover:shadow-[0_0_18px_rgba(245,158,11,0.65)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber focus-visible:ring-offset-2 focus-visible:ring-offset-noir-bg",
        isActive
          ? "scale-125 ring-2 ring-noir-indigo ring-offset-2 ring-offset-noir-bg shadow-[0_0_22px_rgba(79,70,229,0.7)]"
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
