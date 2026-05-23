"use client";

import * as React from "react";
import { TextReveal } from "./text-reveal";

interface Bairro {
  name: string;
  imoveis: number;
  ticket: string;
}

const BAIRROS: ReadonlyArray<Bairro> = [
  { name: "Centro", imoveis: 187, ticket: "R$ 680.000" },
  { name: "Jd Tropical", imoveis: 142, ticket: "R$ 540.000" },
  { name: "Industrial", imoveis: 96, ticket: "R$ 420.000" },
  { name: "Aeroporto", imoveis: 73, ticket: "R$ 380.000" },
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
    <section id="bairros" className="bg-noir-bg px-6 md:px-[8vw] py-[20vh]">
      <div className="grid md:grid-cols-2 gap-12 md:gap-[6vw] mb-[12vh] items-end">
        <TextReveal
          text="ARAPONGAS EM 4 BAIRROS"
          as="h2"
          className="font-display-noir font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight m-0 text-noir-text"
        />
        <p className="font-body-noir font-light text-lg leading-relaxed text-noir-text-mute max-w-md">
          Cobertura completa nos bairros que pulsam Arapongas. De casas residenciais
          a salas comerciais — nosso radar mapeia o mercado em tempo real.
        </p>
      </div>
      <div className="grid md:grid-cols-2">
        {BAIRROS.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => handleClick(b.name)}
            aria-label={`Ver imóveis no bairro ${b.name}`}
            className={`group py-12 border-t border-noir-amber relative overflow-hidden cursor-pointer text-left transition-[padding] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] hover:pl-6 md:hover:pl-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-noir-amber ${
              i % 2 === 1 ? "md:border-l md:border-noir-amber md:pl-[4vw]" : "md:pr-[4vw]"
            }`}
          >
            <div className="font-display-noir font-bold text-4xl md:text-5xl lg:text-6xl leading-none tracking-tight text-noir-text-mute group-hover:text-noir-text transition-colors duration-500">
              {b.name}
            </div>
            <div className="font-body-noir text-[13px] uppercase tracking-[0.2em] text-noir-text-mute mt-4 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {b.imoveis} imóveis · ticket médio {b.ticket}
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}
