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
import { Check, MoreHorizontal, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ChannelType, Lead, LeadStatus } from "@/lib/mock-types";
import { LEAD_STATUS_LABELS } from "@/lib/mock-types";
import { CONVERSATIONS } from "@/components/sections/omnichannel/mock";
import { LeadCard } from "./lead-card";
import { NewLeadDialog } from "./new-lead-dialog";

/**
 * Lead retornado pela API pode carregar timestamp de quando foi adicionado
 * (usado pra IA marcar leads recém-agendados como "fresh").
 */
type ServerLead = Lead & { addedAt?: number };

const FRESH_WINDOW_MS = 12_000;
const COLUMN_FLASH_MS = 2_000;

/**
 * Mapa nome → canal a partir das conversas do omnichannel.
 * Garante que leads que já vieram via WhatsApp/IG/FB exibam o badge de origem.
 */
const CANAL_POR_NOME: Map<string, ChannelType> = new Map(
  CONVERSATIONS.map((c) => [c.nome.toLowerCase(), c.canal])
);

function seedWithOmnichannel(leads: Lead[]): Lead[] {
  return leads.map((l) => {
    if (l.origemCanal) return l;
    const canal = CANAL_POR_NOME.get(l.nome.toLowerCase());
    return canal ? { ...l, origemCanal: canal } : l;
  });
}

const STATUS_ORDER: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "visita",
  "proposta",
  "fechado",
  "perdido",
];

const STATUS_STYLE: Record<
  LeadStatus,
  { dot: string; pill: string; column: string; overBg: string }
> = {
  novo: {
    dot: "bg-slate-500",
    pill: "bg-slate-100 text-slate-700",
    column: "border-slate-200",
    overBg: "bg-slate-100/60",
  },
  contatado: {
    dot: "bg-sky-500",
    pill: "bg-sky-100 text-sky-700",
    column: "border-sky-200",
    overBg: "bg-sky-100/60",
  },
  qualificado: {
    dot: "bg-violet-500",
    pill: "bg-violet-100 text-violet-700",
    column: "border-violet-200",
    overBg: "bg-violet-100/60",
  },
  visita: {
    dot: "bg-amber-500",
    pill: "bg-amber-100 text-amber-700",
    column: "border-amber-200",
    overBg: "bg-amber-100/60",
  },
  proposta: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    column: "border-emerald-200",
    overBg: "bg-emerald-100/60",
  },
  fechado: {
    dot: "bg-emerald-600",
    pill: "bg-emerald-200 text-emerald-800",
    column: "border-emerald-300 bg-emerald-50/40",
    overBg: "bg-emerald-200/60",
  },
  perdido: {
    dot: "bg-rose-400",
    pill: "bg-rose-100 text-rose-700",
    column: "border-rose-200 bg-rose-50/30",
    overBg: "bg-rose-100/60",
  },
};

type Board = Record<LeadStatus, Lead[]>;

interface ToastInfo {
  id: string;
  name: string;
  from: LeadStatus;
  to: LeadStatus;
}

function DraggableLead({ lead }: { lead: Lead }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: lead.id,
  });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "outline-none transition-opacity",
        isDragging && "opacity-30"
      )}
    >
      <LeadCard lead={lead} />
    </div>
  );
}

function DroppableColumn({
  status,
  isEmpty,
  children,
}: {
  status: LeadStatus;
  isEmpty: boolean;
  children: React.ReactNode;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  const style = STATUS_STYLE[status];

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "flex flex-1 flex-col gap-2 p-2 transition-colors",
        isEmpty && "min-h-[120px]",
        isOver && style.overBg
      )}
      data-droppable-status={status}
    >
      {children}
      {isOver && (
        <div
          aria-hidden
          className="rounded-lg border-2 border-dashed border-primary/40 bg-primary/5 py-3 text-center text-xs font-medium text-primary"
        >
          Solte aqui pra mover pra {LEAD_STATUS_LABELS[status]}
        </div>
      )}
    </div>
  );
}

const EMPTY_BOARD: Board = {
  novo: [],
  contatado: [],
  qualificado: [],
  visita: [],
  proposta: [],
  fechado: [],
  perdido: [],
};

function groupByStatus(leads: Lead[]): Board {
  const out: Board = { novo: [], contatado: [], qualificado: [], visita: [], proposta: [], fechado: [], perdido: [] };
  for (const l of leads) {
    if (STATUS_ORDER.includes(l.status)) {
      out[l.status].push(l);
    }
  }
  return out;
}

export function Kanban() {
  const [board, setBoard] = React.useState<Board>(EMPTY_BOARD);
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const [toast, setToast] = React.useState<ToastInfo | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [dialogStatus, setDialogStatus] = React.useState<LeadStatus>("novo");
  const [freshIds, setFreshIds] = React.useState<Set<string>>(() => new Set());
  const [flashedColumn, setFlashedColumn] = React.useState<LeadStatus | null>(null);

  // Mantém ref dos IDs atualmente no board pra diff sem causar re-criação do refetch
  const knownIdsRef = React.useRef<Set<string>>(new Set());
  const flashTimerRef = React.useRef<number | null>(null);

  const markFresh = React.useCallback((id: string) => {
    setFreshIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
    window.setTimeout(() => {
      setFreshIds((prev) => {
        if (!prev.has(id)) return prev;
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, FRESH_WINDOW_MS);
  }, []);

  const refetchLeads = React.useCallback(async () => {
    try {
      const res = await fetch("/api/leads", { cache: "no-store" });
      if (!res.ok) {
        console.error("[kanban] /api/leads falhou", res.status);
        return;
      }
      const data = (await res.json()) as { leads?: ServerLead[] };
      const rawLeads = data.leads ?? [];
      const enriched = seedWithOmnichannel(rawLeads);

      const prevIds = knownIdsRef.current;
      const newIds: ServerLead[] = [];
      const now = Date.now();

      for (const l of enriched as ServerLead[]) {
        const isNewById = !prevIds.has(l.id);
        const isRecentByTs =
          typeof l.addedAt === "number" && now - l.addedAt < FRESH_WINDOW_MS;
        if (isNewById || isRecentByTs) {
          newIds.push(l);
        }
      }

      // Merge: leads do servidor + leads criados localmente que NÃO existem no server
      setBoard((prev) => {
        const serverIds = new Set(enriched.map((l) => l.id));
        const localOnly: Lead[] = [];
        for (const s of STATUS_ORDER) {
          for (const l of prev[s]) {
            if (!serverIds.has(l.id)) localOnly.push(l);
          }
        }
        const merged = [...enriched, ...localOnly];
        const grouped = groupByStatus(merged);
        knownIdsRef.current = new Set(merged.map((l) => l.id));
        return grouped;
      });

      if (newIds.length > 0) {
        for (const nl of newIds) {
          markFresh(nl.id);
        }
        // Flash da coluna do primeiro novo lead (geralmente "visita" pra agendamentos IA)
        const targetCol = newIds[0].status;
        setFlashedColumn(targetCol);
        if (flashTimerRef.current !== null) {
          window.clearTimeout(flashTimerRef.current);
        }
        flashTimerRef.current = window.setTimeout(() => {
          setFlashedColumn(null);
          flashTimerRef.current = null;
        }, COLUMN_FLASH_MS);
      }
    } catch (err) {
      console.error("[kanban] erro ao buscar /api/leads", err);
    }
  }, [markFresh]);

  // Fetch inicial
  React.useEffect(() => {
    void refetchLeads();
  }, [refetchLeads]);

  // Listeners de eventos disparados pela IA / outros sistemas
  React.useEffect(() => {
    const handler = () => {
      void refetchLeads();
    };
    window.addEventListener("dinamic:chat-ended", handler);
    window.addEventListener("dinamic:lead-added", handler);
    return () => {
      window.removeEventListener("dinamic:chat-ended", handler);
      window.removeEventListener("dinamic:lead-added", handler);
    };
  }, [refetchLeads]);

  const openNewLead = (status: LeadStatus = "novo") => {
    setDialogStatus(status);
    setDialogOpen(true);
  };

  const handleCreate = (lead: Lead) => {
    setBoard((prev) => ({
      ...prev,
      [lead.status]: [lead, ...prev[lead.status]],
    }));
    knownIdsRef.current.add(lead.id);
    const t: ToastInfo = {
      id: `t-${Date.now()}`,
      name: lead.nome,
      from: lead.status,
      to: lead.status,
    };
    setToast(t);
    window.setTimeout(() => {
      setToast((cur) => (cur?.id === t.id ? null : cur));
    }, 3500);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const findLead = React.useCallback(
    (id: string): { lead: Lead; status: LeadStatus } | null => {
      for (const s of STATUS_ORDER) {
        const lead = board[s].find((l) => l.id === id);
        if (lead) return { lead, status: s };
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

    const result = findLead(String(active.id));
    if (!result) return;

    const newStatus = over.id as LeadStatus;
    if (!STATUS_ORDER.includes(newStatus)) return;
    if (result.status === newStatus) return;

    setBoard((prev) => ({
      ...prev,
      [result.status]: prev[result.status].filter(
        (l) => l.id !== result.lead.id
      ),
      [newStatus]: [
        { ...result.lead, status: newStatus },
        ...prev[newStatus],
      ],
    }));

    const newToast: ToastInfo = {
      id: `t-${Date.now()}`,
      name: result.lead.nome,
      from: result.status,
      to: newStatus,
    };
    setToast(newToast);
    window.setTimeout(() => {
      setToast((cur) => (cur?.id === newToast.id ? null : cur));
    }, 3500);
  };

  const totalLeads = STATUS_ORDER.reduce(
    (acc, s) => acc + board[s].length,
    0
  );
  const activeLead = activeId ? findLead(activeId)?.lead ?? null : null;

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
              Pipeline comercial
            </h3>
            <p className="mt-0.5 text-sm text-muted">
              {totalLeads} leads ativos · arraste pra mudar a etapa
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full border border-border bg-app px-3 py-1 text-xs text-muted sm:inline-flex">
              Filtro: todos os setores
            </span>
            <button
              type="button"
              onClick={() => openNewLead("novo")}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-white shadow-sm transition hover:bg-primary/90"
            >
              <Plus className="h-3.5 w-3.5" /> Novo lead
            </button>
          </div>
        </div>

        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 lg:grid lg:grid-cols-7 lg:overflow-visible">
          {STATUS_ORDER.map((status) => {
            const leads = board[status];
            const style = STATUS_STYLE[status];
            return (
              <div
                key={status}
                className={cn(
                  "flex w-72 shrink-0 flex-col rounded-xl border bg-app/40 transition-all duration-500 lg:w-auto lg:min-w-0 lg:shrink",
                  style.column,
                  flashedColumn === status &&
                    "ring-2 ring-amber-400/70 ring-offset-2 ring-offset-app shadow-lg shadow-amber-200/50"
                )}
              >
                <div className="flex items-center justify-between gap-2 border-b border-border/60 px-3 py-2.5">
                  <div className="flex items-center gap-2">
                    <span
                      className={cn("h-2 w-2 rounded-full", style.dot)}
                      aria-hidden
                    />
                    <h4 className="text-sm font-medium text-ink">
                      {LEAD_STATUS_LABELS[status]}
                    </h4>
                    <motion.span
                      key={leads.length}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        style.pill
                      )}
                    >
                      {leads.length}
                    </motion.span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <button
                      type="button"
                      aria-label="Adicionar lead nesta coluna"
                      onClick={() => openNewLead(status)}
                      className="rounded p-1 text-muted transition hover:bg-app hover:text-ink"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      type="button"
                      aria-label="Opções"
                      className="rounded p-1 text-muted transition hover:bg-app hover:text-ink"
                    >
                      <MoreHorizontal className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <DroppableColumn
                  status={status}
                  isEmpty={leads.length === 0}
                >
                  <AnimatePresence initial={false}>
                    {leads.map((lead) => {
                      const isFresh = freshIds.has(lead.id);
                      return (
                        <motion.div
                          key={lead.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={
                            isFresh
                              ? {
                                  opacity: 1,
                                  y: 0,
                                  boxShadow: [
                                    "0 0 0 0 rgba(245, 158, 11, 0.6)",
                                    "0 0 0 8px rgba(245, 158, 11, 0)",
                                    "0 0 0 0 rgba(245, 158, 11, 0.6)",
                                    "0 0 0 8px rgba(245, 158, 11, 0)",
                                    "0 0 0 0 rgba(245, 158, 11, 0)",
                                  ],
                                }
                              : { opacity: 1, y: 0 }
                          }
                          exit={{ opacity: 0, scale: 0.96 }}
                          transition={
                            isFresh
                              ? { duration: 2.4, times: [0, 0.2, 0.4, 0.7, 1] }
                              : { duration: 0.18 }
                          }
                          className={cn(
                            "rounded-xl",
                            isFresh && "ring-2 ring-amber-400/60 ring-offset-2 ring-offset-app"
                          )}
                        >
                          <DraggableLead lead={lead} />
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </DroppableColumn>

                <button
                  type="button"
                  onClick={() => openNewLead(status)}
                  className="mx-2 mb-2 mt-auto inline-flex items-center justify-center gap-1.5 rounded-md border border-dashed border-border px-2 py-2 text-xs text-muted transition hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
                >
                  <Plus className="h-3 w-3" /> Adicionar lead
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <DragOverlay dropAnimation={{ duration: 180 }}>
        {activeLead && (
          <div className="rotate-2 cursor-grabbing shadow-2xl">
            <LeadCard lead={activeLead} />
          </div>
        )}
      </DragOverlay>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="fixed bottom-28 left-1/2 z-[70] flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm text-white shadow-2xl"
            role="status"
            aria-live="polite"
          >
            <span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-500">
              <Check className="h-3 w-3" />
            </span>
            <span className="font-medium">{toast.name}</span>
            <span className="text-white/70">
              {toast.from === toast.to ? "criado em" : "movido pra"}
            </span>
            <span
              className={cn(
                "rounded px-1.5 py-0.5 text-[11px] font-semibold",
                STATUS_STYLE[toast.to].pill
              )}
            >
              {LEAD_STATUS_LABELS[toast.to]}
            </span>
            <span className="ml-1 text-[10px] uppercase tracking-wider text-emerald-400">
              · salvo
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <NewLeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        defaultStatus={dialogStatus}
        onCreate={handleCreate}
      />
    </DndContext>
  );
}
