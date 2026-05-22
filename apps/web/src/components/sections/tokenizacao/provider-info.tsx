"use client";

import { ArrowUpRight, Cpu } from "lucide-react";

/**
 * <ProviderInfo />
 * Mini-card horizontal explicando o roteamento entre modelos de IA
 * (rápido pra queries baratas, premium pra consultas complexas).
 */
export function ProviderInfo() {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-primary/20 bg-primary/5 p-4 sm:items-center">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Cpu className="h-5 w-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-ink">
          Roteamento inteligente entre modelos de IA
        </div>
        <p className="mt-0.5 text-xs leading-relaxed text-muted">
          Queries rápidas vão pro{" "}
          <span className="font-medium text-ink">modelo rápido</span> (mais
          barato), consultas complexas pro{" "}
          <span className="font-medium text-ink">modelo premium</span>. Você
          economiza sem perder qualidade.
        </p>
      </div>

      <a
        href="#"
        className="inline-flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:text-primary-dark"
      >
        Saber mais
        <ArrowUpRight className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}
