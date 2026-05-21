"use client";

import { Plus, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatBRL } from "@/lib/utils";

import { CONSUMO_MES, SALDO_ATUAL, SALDO_INICIAL_MES } from "./mock";

/**
 * <BalanceCard />
 * Card de destaque com saldo atual (gradient indigo).
 * Mostra saldo grande, barra de progresso (consumido/inicial)
 * e CTA grande "Recarregar".
 */
export function BalanceCard() {
  const percentUsado = Math.min(
    100,
    Math.round((CONSUMO_MES / SALDO_INICIAL_MES) * 100),
  );

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark p-8 text-white shadow-lg">
      {/* Decoração */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 rounded-full bg-white/10 blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-16 -left-8 h-40 w-40 rounded-full bg-accent/20 blur-3xl"
      />

      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-white/70">
          <Wallet className="h-3.5 w-3.5" />
          Saldo atual
        </div>

        <div className="mt-3 font-display text-5xl font-bold tracking-tight">
          {formatBRL(SALDO_ATUAL)}
        </div>

        {/* Progress invertido — quanto foi consumido */}
        <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>Consumo do pacote</span>
            <span className="font-medium text-white">{percentUsado}%</span>
          </div>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-accent transition-all"
              style={{ width: `${percentUsado}%` }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 space-y-1 text-sm">
          <div className="flex justify-between text-white/80">
            <span>Consumido este mês</span>
            <span className="font-mono font-semibold text-white">
              {formatBRL(CONSUMO_MES)}
            </span>
          </div>
          <div className="flex justify-between text-white/80">
            <span>Saldo inicial</span>
            <span className="font-mono font-semibold text-white">
              {formatBRL(SALDO_INICIAL_MES)}
            </span>
          </div>
        </div>

        {/* CTA Recarregar */}
        <div className="mt-6">
          <Button
            variant="accent"
            size="default"
            className="w-full bg-accent text-ink hover:bg-accent/90"
          >
            <Plus className="h-4 w-4" />
            Recarregar
          </Button>
          <p className="mt-2 text-center text-xs text-white/60">
            Recargas via PIX, Cartão ou Boleto (Asaas)
          </p>
        </div>
      </div>
    </div>
  );
}
