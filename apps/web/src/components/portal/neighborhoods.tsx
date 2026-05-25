"use client";

import * as React from "react";
import { TextReveal } from "./text-reveal";
import { ArapongasMap } from "./arapongas-map";

export function Neighborhoods() {
  return (
    <section id="bairros" className="bg-noir-bg px-6 md:px-[8vw] py-[18vh] md:py-[20vh]">
      <div className="mb-[8vh] md:mb-[10vh]">
        <TextReveal
          text="ARAPONGAS EM 4 BAIRROS"
          as="h2"
          className="font-display-noir font-bold text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight m-0 text-noir-text"
        />
      </div>

      <div>
        <ArapongasMap />
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-body-noir text-[11px] uppercase tracking-[0.22em] text-noir-text-mute">
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-noir-amber" aria-hidden />
            Imóveis ativos
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-noir-indigo" aria-hidden />
            Sede Dinamic
          </span>
          <span className="ml-auto text-noir-text-subtle normal-case tracking-normal text-[12px]">
            628 imóveis · 4 bairros · Arapongas-PR
          </span>
        </div>
      </div>
    </section>
  );
}
