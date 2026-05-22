"use client";

/**
 * <ContractsKanban />
 * Pipeline visual de contratos jurídicos — drag-and-drop entre 5 etapas.
 *
 * Visual alinhado ao task-kanban (mesma DNA): cards bem espaçados, chip de
 * stage no topo do card, título com line-clamp-2 sem truncate, valor em
 * font-display, footer com período compacto.
 *
 * Como os mocks atuais só têm 3 statuses reais ("ativo" | "vencendo" | "encerrado"),
 * "virtualizamos" 5 colunas pra demonstrar o ciclo de vida completo do contrato:
 *
 *   Minuta (sky) → Em revisão (amber) → Aguardando assinatura (violet)
 *   → Vigente (emerald) → Vencendo/Encerrado (rose)
 *
 * Distribuição inicial (heurística por id):
 *   - 2 primeiros "ativos" → Minuta
 *   - 2 seguintes "ativos" → Em revisão
 *   - 2 seguintes "ativos" → Aguardando assinatura
 *   - Restante "ativo" → Vigente
 *   - "vencendo" + "encerrado" → Vencendo/Encerrado
 *
 * Drag entre colunas atualiza apenas estado local (demo).
 */

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
import { Calendar, FileSignature, Link2 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Contract } from "@/lib/mock-types";
import { CONTRACTS } from "./mock";

// ============================================================
// Colunas virtuais
// ============================================================
type StageId =
  | "minuta"
  | "revisao"
  | "assinatura"
  | "vigente"
  | "vencendo";

const STAGE_ORDER: StageId[] = [
  "minuta",
  "revisao",
  "assinatura",
  "vigente",
  "vencendo",
];

const STAGE_LABELS: Record<StageId, string> = {
  minuta: "Minuta",
  revisao: "Em revisão",
  assinatura: "Aguardando assinatura",
  vigente: "Vigente",
  vencendo: "Vencendo / Encerrado",
};

// Chip curto pra mostrar no topo do card (precisa caber em qualquer coluna)
const STAGE_CARD_CHIP_LABEL: Record<StageId, string> = {
  minuta: "Minuta",
  revisao: "Revisão",
  assinatura: "Assinatura",
  vigente: "Vigente",
  vencendo: "Renovar",
};

const STAGE_STYLE: Record<
  StageId,
  {
    dot: string;
    pill: string; // contador no header da coluna
    column: string;
    overBg: string;
    cardChip: string; // chip de stage NO card (top)
  }
> = {
  minuta: {
    dot: "bg-sky-500",
    pill: "bg-sky-100 text-sky-700",
    column: "border-sky-200",
    overBg: "bg-sky-100/60",
    cardChip: "bg-sky-100 text-sky-700",
  },
  revisao: {
    dot: "bg-amber-500",
    pill: "bg-amber-100 text-amber-700",
    column: "border-amber-200",
    overBg: "bg-amber-100/60",
    cardChip: "bg-amber-100 text-amber-700",
  },
  assinatura: {
    dot: "bg-violet-500",
    pill: "bg-violet-100 text-violet-700",
    column: "border-violet-200",
    overBg: "bg-violet-100/60",
    cardChip: "bg-violet-100 text-violet-700",
  },
  vigente: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    column: "border-emerald-200",
    overBg: "bg-emerald-100/60",
    cardChip: "bg-emerald-100 text-emerald-700",
  },
  vencendo: {
    dot: "bg-rose-500",
    pill: "bg-rose-100 text-rose-700",
    column: "border-rose-200 bg-rose-50/30",
    overBg: "bg-rose-100/60",
    cardChip: "bg-rose-100 text-rose-700",
  },
};

type Board = Record<StageId, Contract[]>;

// ============================================================
// Distribuição inicial dos mocks → colunas virtuais
// ============================================================
function seedBoard(contracts: Contract[]): Board {
  const board: Board = {
    minuta: [],
    revisao: [],
    assinatura: [],
    vigente: [],
    vencendo: [],
  };

  const ativos = contracts.filter((c) => c.status === "ativo");
  const naoAtivos = contracts.filter((c) => c.status !== "ativo");

  ativos.forEach((c, idx) => {
    if (idx < 2) board.minuta.push(c);
    else if (idx < 4) board.revisao.push(c);
    else if (idx < 6) board.assinatura.push(c);
    else board.vigente.push(c);
  });

  naoAtivos.forEach((c) => {
    board.vencendo.push(c);
  });

  return board;
}

// ============================================================
// Formatters
// ============================================================
const fmtBRL = (v: number) =>
  v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });

/**
 * Formato compacto "mar/25" pra caber em coluna estreita.
 * Remove ponto que `toLocaleDateString` injeta em alguns runtimes ("mar.").
 */
const fmtMonthYear = new Intl.DateTimeFormat("pt-BR", {
  month: "short",
  year: "2-digit",
});

function fmtPeriodoCompacto(inicio: string, fim: string): string {
  const fmt = (iso: string) =>
    fmtMonthYear
      .format(new Date(iso))
      .replace(/\./g, "")
      .replace(/\s+de\s+/, "/")
      .replace(/\s/, "/");
  return `${fmt(inicio)} → ${fmt(fim)}`;
}

// ============================================================
// Card individual — DNA do task-card
// ============================================================
function ContractCard({
  contract,
  stage,
}: {
  contract: Contract;
  stage: StageId;
}) {
  const style = STAGE_STYLE[stage];
  const showAssinaturaChip = stage === "assinatura";
  const showRenovacaoChip =
    stage === "vencendo" && contract.status === "vencendo";
  const showTaskVinculada =
    stage === "vencendo" && contract.status === "vencendo";

  return (
    <div className="relative flex flex-col gap-2 rounded-xl border border-border bg-white p-3 shadow-sm transition hover:shadow-md">
      {/* Topo: chip de stage + valor */}
      <div className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
            style.cardChip
          )}
        >
          {STAGE_CARD_CHIP_LABEL[stage]}
        </span>
        <span className="font-display text-base font-semibold text-ink">
          {fmtBRL(contract.valor)}
        </span>
      </div>

      {/* Título: locatário (sem truncate, line-clamp pra segurança) */}
      <h5 className="break-words text-sm font-medium leading-snug text-ink line-clamp-2">
        {contract.locatario}
      </h5>

      {/* Subtítulo: imóvel + bairro */}
      <p className="line-clamp-1 text-xs text-muted">
        {contract.imovel}
        <span className="text-muted/60"> · </span>
        <span className="text-muted">{contract.bairro}</span>
      </p>

      {/* Chips de ação (situacionais) */}
      {(showAssinaturaChip || showRenovacaoChip) && (
        <div className="flex flex-wrap items-center gap-1">
          {showAssinaturaChip && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-medium text-rose-700">
              <FileSignature className="h-3 w-3 shrink-0" aria-hidden />
              Recolher assinatura
            </span>
          )}
          {showRenovacaoChip && (
            <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-1.5 py-0.5 text-[10px] font-medium text-rose-700">
              Renovação
            </span>
          )}
        </div>
      )}

      {/* Task vinculada badge */}
      {showTaskVinculada && (
        <div className="inline-flex w-fit items-center gap-1 rounded-md border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700">
          <Link2 className="h-3 w-3 shrink-0" aria-hidden />
          Task vinculada
        </div>
      )}

      {/* Rodapé: período compacto */}
      <div className="mt-1 flex items-center gap-1.5 border-t border-border/60 pt-2 text-[11px] text-muted">
        <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden />
        <span className="truncate">
          {fmtPeriodoCompacto(contract.periodoInicio, contract.periodoFim)}
        </span>
      </div>
    </div>
  );
}

// ============================================================
// Drag wrappers
// ============================================================
function DraggableContract({
  contract,
  stage,
}: {
  contract: Contract;
  stage: StageId;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: contract.id,
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
      <ContractCard contract={contract} stage={stage} />
    </div>
  );
}

function DroppableColumn({
  stage,
  isEmpty,
  children,
}: {
  stage: StageId;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage });
  const style = STAGE_STYLE[stage];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-1 flex-col gap-2 p-2 transition-colors",
        isEmpty && "min-h-[120px]",
        isOver && style.overBg
      )}
      data-stage={stage}
    >
      {children}
      {isOver && (
        <div
          aria-hidden
          className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 py-3 text-center text-xs font-medium text-primary"
        >
          Solte aqui pra mover pra {STAGE_LABELS[stage]}
        </div>
      )}
    </div>
  );
}

// ============================================================
// Componente principal
// ============================================================
export function ContractsKanban() {
  const [board, setBoard] = React.useState<Board>(() => seedBoard(CONTRACTS));
  const [activeId, setActiveId] = React.useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const findContract = React.useCallback(
    (id: string): { contract: Contract; stage: StageId } | null => {
      for (const s of STAGE_ORDER) {
        const c = board[s].find((c) => c.id === id);
        if (c) return { contract: c, stage: s };
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

    const result = findContract(String(active.id));
    if (!result) return;

    const newStage = over.id as StageId;
    if (!STAGE_ORDER.includes(newStage)) return;
    if (result.stage === newStage) return;

    setBoard((prev) => ({
      ...prev,
      [result.stage]: prev[result.stage].filter(
        (c) => c.id !== result.contract.id
      ),
      [newStage]: [result.contract, ...prev[newStage]],
    }));
  };

  const totalContratos = STAGE_ORDER.reduce(
    (acc, s) => acc + board[s].length,
    0
  );
  const activeContract = activeId
    ? findContract(activeId)?.contract ?? null
    : null;
  const activeStage = activeId ? findContract(activeId)?.stage ?? null : null;

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
              Pipeline de contratos
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {totalContratos} contratos · arraste pra mudar a etapa
            </p>
          </div>
          <span className="hidden rounded-full border border-border bg-app px-3 py-1 text-xs text-muted sm:inline-flex">
            Demo · estado local
          </span>
        </div>

        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 lg:grid lg:grid-cols-5 lg:overflow-visible">
          {STAGE_ORDER.map((stage) => {
            const contratos = board[stage];
            const style = STAGE_STYLE[stage];
            return (
              <div
                key={stage}
                className={cn(
                  "flex w-72 shrink-0 flex-col rounded-xl border bg-app/40 transition-all lg:w-auto lg:min-w-0 lg:shrink",
                  style.column
                )}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("h-2 w-2 rounded-full", style.dot)}
                      aria-hidden
                    />
                    <h4 className="text-sm font-medium text-ink">
                      {STAGE_LABELS[stage]}
                    </h4>
                    <motion.span
                      key={contratos.length}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        style.pill
                      )}
                    >
                      {contratos.length}
                    </motion.span>
                  </div>
                </div>

                <DroppableColumn
                  stage={stage}
                  isEmpty={contratos.length === 0}
                >
                  <AnimatePresence initial={false}>
                    {contratos.map((contract) => (
                      <motion.div
                        key={contract.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                      >
                        <DraggableContract
                          contract={contract}
                          stage={stage}
                        />
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
        {activeContract && activeStage && (
          <div className="rotate-2 cursor-grabbing shadow-2xl">
            <ContractCard contract={activeContract} stage={activeStage} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
