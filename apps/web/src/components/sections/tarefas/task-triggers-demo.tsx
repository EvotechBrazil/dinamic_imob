"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, FileSignature, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

interface ToastMsg {
  id: string;
  text: string;
}

const todayISO = () => new Date().toISOString();
const futureISO = (days: number) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
};

export function TaskTriggersDemo() {
  const [pulse, setPulse] = React.useState(false);
  const [loading, setLoading] = React.useState<"contrato" | "visita" | null>(
    null
  );
  const [toast, setToast] = React.useState<ToastMsg | null>(null);

  const firePulse = () => {
    setPulse(true);
    window.setTimeout(() => setPulse(false), 1000);
  };

  const showToast = (text: string) => {
    const t: ToastMsg = { id: `t-${Date.now()}`, text };
    setToast(t);
    window.setTimeout(
      () => setToast((cur) => (cur?.id === t.id ? null : cur)),
      3500
    );
  };

  const postTask = async (body: Record<string, unknown>) => {
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } catch (err) {
      console.error("[task-triggers] erro POST /api/tasks", err);
    }
  };

  const dispatchRefresh = () => {
    window.dispatchEvent(new CustomEvent("dinamic:tasks-refresh"));
    window.dispatchEvent(new CustomEvent("dinamic:task-created"));
  };

  const simularContrato = async () => {
    setLoading("contrato");
    try {
      await Promise.all([
        postTask({
          titulo: "Revisar contrato fechado — Demo trigger",
          setor: "juridico",
          status: "a_fazer",
          prioridade: "alta",
          labels: ["contrato_revisar"],
          origem: "evento_sistema",
          criadaEm: todayISO(),
          atualizadaEm: todayISO(),
          prazo: futureISO(2),
          responsavelNome: "Dra. Patrícia Soares",
          responsavelAvatarUrl: "https://i.pravatar.cc/150?img=47",
        }),
        postTask({
          titulo: "Emitir boleto entrada — Demo trigger",
          setor: "financeiro",
          status: "a_fazer",
          prioridade: "urgente",
          labels: ["boleto_emitir"],
          origem: "evento_sistema",
          criadaEm: todayISO(),
          atualizadaEm: todayISO(),
          prazo: futureISO(1),
          responsavelNome: "Marcelo Vieira",
          responsavelAvatarUrl: "https://i.pravatar.cc/150?img=33",
        }),
      ]);
      dispatchRefresh();
      firePulse();
      showToast("Trigger executado — 2 tasks criadas (Jurídico + Financeiro)");
    } finally {
      setLoading(null);
    }
  };

  const simularVisita = async () => {
    setLoading("visita");
    try {
      await postTask({
        titulo: "Confirmar visita agendada pela IA — Demo trigger",
        setor: "captacao",
        status: "a_fazer",
        prioridade: "alta",
        labels: ["visita_confirmar"],
        origem: "ia",
        criadaEm: todayISO(),
        atualizadaEm: todayISO(),
        prazo: futureISO(1),
        responsavelNome: "Fernanda Pires",
        responsavelAvatarUrl: "https://i.pravatar.cc/150?img=44",
      });
      dispatchRefresh();
      firePulse();
      showToast("Trigger executado — 1 task criada (Captação)");
    } finally {
      setLoading(null);
    }
  };

  return (
    <motion.div
      animate={
        pulse
          ? {
              boxShadow: [
                "0 0 0 0 rgba(79, 70, 229, 0.0)",
                "0 0 0 10px rgba(79, 70, 229, 0.18)",
                "0 0 0 0 rgba(79, 70, 229, 0.0)",
              ],
              scale: [1, 1.01, 1],
            }
          : {}
      }
      transition={{ duration: 1 }}
      className={cn(
        "mb-5 rounded-2xl border border-indigo-200 bg-gradient-to-br from-indigo-50 via-white to-amber-50 p-5 shadow-sm"
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-indigo-600 text-white shadow-md shadow-indigo-200">
            <Zap className="h-5 w-5" aria-hidden />
          </span>
          <div>
            <h3 className="font-display text-base font-semibold text-ink">
              Triggers automáticos — tudo conectado
            </h3>
            <p className="mt-0.5 text-sm leading-snug text-muted">
              Quando a IA agenda visita, Captação recebe a task. Quando um
              contrato fecha, Jurídico revisa e Financeiro emite boleto. Tudo
              automaticamente.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:shrink-0">
          <button
            type="button"
            onClick={simularContrato}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-white shadow-sm transition hover:bg-primary/90 disabled:opacity-60"
          >
            <FileSignature className="h-3.5 w-3.5" />
            {loading === "contrato"
              ? "Disparando…"
              : "Simular contrato fechado"}
          </button>
          <button
            type="button"
            onClick={simularVisita}
            disabled={loading !== null}
            className="inline-flex items-center gap-1.5 rounded-md border border-primary/40 bg-white px-3 py-2 text-xs font-medium text-primary shadow-sm transition hover:bg-primary/5 disabled:opacity-60"
          >
            <Calendar className="h-3.5 w-3.5" />
            {loading === "visita" ? "Disparando…" : "Simular visita IA"}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {toast && (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
            role="status"
            aria-live="polite"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {toast.text}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
