"use client";

import * as React from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Link2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Boleto } from "@/lib/mock-types";
import { cn } from "@/lib/utils";

/**
 * BoletosKanban — Pipeline de boletos
 *
 * 4 colunas funcionais:
 *   - Pendente (azul)   → status="pendente" e diasAtraso > 0 (faltam > 3 dias) OU sem diasAtraso negativo próximo
 *   - Vencendo (amber)  → status="pendente" com diasAtraso entre -3 e 0 (próximo do vencimento)
 *   - Vencido  (rose)   → status="vencido"
 *   - Pago     (emerald)→ status="pago"
 *
 * Observação: o mock atual não traz diasAtraso negativos (-3..0); pra "Vencendo"
 * usamos heurística: boletos com `vencimento` contendo "em 1 dia" ou "em 2 dias"
 * ou "em 3 dias" também caem em Vencendo. Pra demo é suficiente.
 *
 * "cancelado" é filtrado e não aparece como coluna.
 */

type ColumnKey = "pendente" | "vencendo" | "vencido" | "pago";

const COLUMN_ORDER: ColumnKey[] = ["pendente", "vencendo", "vencido", "pago"];

const COLUMN_CFG: Record<
  ColumnKey,
  {
    label: string;
    dot: string;
    pill: string;
    column: string;
    overBg: string;
    badgeBoleto: string;
  }
> = {
  pendente: {
    label: "Pendente",
    dot: "bg-sky-500",
    pill: "bg-sky-100 text-sky-700",
    column: "border-sky-200",
    overBg: "bg-sky-100/60",
    badgeBoleto: "bg-sky-50 text-sky-700 border-sky-200",
  },
  vencendo: {
    label: "Vencendo",
    dot: "bg-amber-500",
    pill: "bg-amber-100 text-amber-700",
    column: "border-amber-200",
    overBg: "bg-amber-100/60",
    badgeBoleto: "bg-amber-50 text-amber-700 border-amber-200",
  },
  vencido: {
    label: "Vencido",
    dot: "bg-rose-500",
    pill: "bg-rose-100 text-rose-700",
    column: "border-rose-200 bg-rose-50/30",
    overBg: "bg-rose-100/60",
    badgeBoleto: "bg-rose-50 text-rose-700 border-rose-200",
  },
  pago: {
    label: "Pago",
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    column: "border-emerald-200 bg-emerald-50/30",
    overBg: "bg-emerald-100/60",
    badgeBoleto: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
};

type Board = Record<ColumnKey, Boleto[]>;

const formatBRL = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);

/**
 * Decide em qual coluna o boleto cai na inicialização.
 */
function classify(b: Boleto): ColumnKey | null {
  if (b.status === "cancelado") return null;
  if (b.status === "pago") return "pago";
  if (b.status === "vencido") return "vencido";

  // pendente — verifica se está "vencendo" (próximo do vencimento)
  const dias = b.diasAtraso ?? null;
  if (dias !== null && dias >= -3 && dias <= 0) return "vencendo";

  // heurística pelo texto do vencimento (mock realista BR)
  const v = b.vencimento.toLowerCase();
  if (
    v.includes("hoje") ||
    v.includes("amanhã") ||
    v.includes("em 1 dia") ||
    v.includes("em 2 dia") ||
    v.includes("em 3 dia")
  ) {
    return "vencendo";
  }

  return "pendente";
}

function groupByColumn(boletos: Boleto[]): Board {
  const out: Board = { pendente: [], vencendo: [], vencido: [], pago: [] };
  for (const b of boletos) {
    const col = classify(b);
    if (col) out[col].push(b);
  }
  return out;
}

// ============================================================
// Card de boleto
// ============================================================
function BoletoCard({ boleto, column }: { boleto: Boleto; column: ColumnKey }) {
  const cfg = COLUMN_CFG[column];
  const isVencido = column === "vencido";
  const isVencendo = column === "vencendo";
  const hasLinkedTask = isVencido || isVencendo;

  return (
    <div className="group rounded-xl border border-border bg-surface p-3 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium text-ink">
            {boleto.locatario}
          </p>
          <p className="mt-0.5 line-clamp-1 text-xs text-muted">
            {boleto.imovel}
          </p>
        </div>
        <Badge
          variant="outline"
          className={cn("shrink-0 border text-[10px] font-medium", cfg.badgeBoleto)}
        >
          {cfg.label}
        </Badge>
      </div>

      <div className="mt-2.5 flex items-end justify-between gap-2">
        <span className="font-display text-base font-semibold tabular-nums text-ink">
          {formatBRL(boleto.valor)}
        </span>
        <div
          className={cn(
            "inline-flex items-center gap-1 text-xs",
            isVencido ? "font-medium text-rose-600" : "text-muted"
          )}
        >
          <Calendar className="h-3 w-3" aria-hidden />
          <span>{boleto.vencimento}</span>
          {boleto.diasAtraso ? (
            <span className="font-medium text-rose-600">
              ({boleto.diasAtraso}d)
            </span>
          ) : null}
        </div>
      </div>

      {hasLinkedTask && (
        <div className="mt-2.5 flex items-center gap-1.5 rounded-md border border-dashed border-primary/30 bg-primary/5 px-2 py-1 text-[10px] font-medium text-primary">
          <Link2 className="h-3 w-3" aria-hidden />
          Task vinculada
        </div>
      )}
    </div>
  );
}

function DraggableBoleto({
  boleto,
  column,
}: {
  boleto: Boleto;
  column: ColumnKey;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: boleto.id,
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "cursor-grab outline-none transition-opacity active:cursor-grabbing",
        isDragging && "opacity-30"
      )}
    >
      <BoletoCard boleto={boleto} column={column} />
    </div>
  );
}

function DroppableColumn({
  column,
  isEmpty,
  children,
}: {
  column: ColumnKey;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: column });
  const cfg = COLUMN_CFG[column];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-1 flex-col gap-2 p-2 transition-colors",
        isEmpty && "min-h-[120px]",
        isOver && cfg.overBg
      )}
      data-droppable-column={column}
    >
      {children}
      {isOver && (
        <div
          aria-hidden
          className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 py-3 text-center text-xs font-medium text-primary"
        >
          Solte aqui pra mover pra {cfg.label}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Component principal
// ============================================================
interface BoletosKanbanProps {
  boletos: Boleto[];
}

export function BoletosKanban({ boletos }: BoletosKanbanProps) {
  const [board, setBoard] = React.useState<Board>(() => groupByColumn(boletos));
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Re-sync se os boletos externos mudarem (não persistir movimentos)
  React.useEffect(() => {
    setBoard(groupByColumn(boletos));
  }, [boletos]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const findBoleto = React.useCallback(
    (id: string): { boleto: Boleto; column: ColumnKey } | null => {
      for (const c of COLUMN_ORDER) {
        const found = board[c].find((b) => b.id === id);
        if (found) return { boleto: found, column: c };
      }
      return null;
    },
    [board]
  );

  const handleDragStart = (e: DragStartEvent) => {
    setActiveId(String(e.active.id));
  };

  const handleDragEnd = (e: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = e;
    if (!over) return;

    const result = findBoleto(String(active.id));
    if (!result) return;

    const newColumn = over.id as ColumnKey;
    if (!COLUMN_ORDER.includes(newColumn)) return;
    if (result.column === newColumn) return;

    setBoard((prev) => ({
      ...prev,
      [result.column]: prev[result.column].filter(
        (b) => b.id !== result.boleto.id
      ),
      [newColumn]: [result.boleto, ...prev[newColumn]],
    }));
  };

  const activeBoleto = activeId ? findBoleto(activeId) : null;

  const totalBoletos = COLUMN_ORDER.reduce(
    (acc, c) => acc + board[c].length,
    0
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h3 className="font-display text-lg font-semibold text-ink">
              Pipeline de boletos
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {totalBoletos} boletos · arraste pra atualizar a situação
            </p>
          </div>
          <span className="hidden rounded-full border border-border bg-app px-3 py-1 text-xs text-muted sm:inline-flex">
            Visão executiva — dados ao vivo
          </span>
        </div>

        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {COLUMN_ORDER.map((col) => {
            const items = board[col];
            const cfg = COLUMN_CFG[col];
            const totalCol = items.reduce((acc, b) => acc + b.valor, 0);
            return (
              <div
                key={col}
                className={cn(
                  "flex w-72 shrink-0 flex-col rounded-xl border bg-app/40 lg:w-auto lg:min-w-0 lg:shrink",
                  cfg.column
                )}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("h-2 w-2 rounded-full", cfg.dot)}
                      aria-hidden
                    />
                    <h4 className="text-sm font-medium text-ink">
                      {cfg.label}
                    </h4>
                    <motion.span
                      key={items.length}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        cfg.pill
                      )}
                    >
                      {items.length}
                    </motion.span>
                  </div>
                  <span className="font-display text-xs font-semibold tabular-nums text-muted">
                    {formatBRL(totalCol)}
                  </span>
                </div>

                <DroppableColumn column={col} isEmpty={items.length === 0}>
                  <AnimatePresence initial={false}>
                    {items.map((b) => (
                      <motion.div
                        key={b.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="rounded-xl"
                      >
                        <DraggableBoleto boleto={b} column={col} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </DroppableColumn>
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 180 }}>
        {activeBoleto && (
          <div className="rotate-2 cursor-grabbing shadow-2xl">
            <BoletoCard
              boleto={activeBoleto.boleto}
              column={activeBoleto.column}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

export default BoletosKanban;
