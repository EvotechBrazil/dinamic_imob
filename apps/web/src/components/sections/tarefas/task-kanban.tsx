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
import { cn } from "@/lib/utils";
import {
  TASK_STATUS_LABELS,
  type Task,
  type TaskStatus,
} from "@/lib/mock-types";
import { TaskCard } from "./task-card";

const STATUS_ORDER: TaskStatus[] = [
  "a_fazer",
  "em_andamento",
  "aguardando_terceiros",
  "em_revisao",
  "concluida",
  "bloqueada",
];

const STATUS_STYLE: Record<
  TaskStatus,
  { dot: string; pill: string; column: string; overBg: string }
> = {
  a_fazer: {
    dot: "bg-slate-500",
    pill: "bg-slate-100 text-slate-700",
    column: "border-slate-200",
    overBg: "bg-slate-100/60",
  },
  em_andamento: {
    dot: "bg-sky-500",
    pill: "bg-sky-100 text-sky-700",
    column: "border-sky-200",
    overBg: "bg-sky-100/60",
  },
  aguardando_terceiros: {
    dot: "bg-amber-500",
    pill: "bg-amber-100 text-amber-700",
    column: "border-amber-200",
    overBg: "bg-amber-100/60",
  },
  em_revisao: {
    dot: "bg-violet-500",
    pill: "bg-violet-100 text-violet-700",
    column: "border-violet-200",
    overBg: "bg-violet-100/60",
  },
  concluida: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-100 text-emerald-700",
    column: "border-emerald-200 bg-emerald-50/30",
    overBg: "bg-emerald-100/60",
  },
  bloqueada: {
    dot: "bg-rose-500",
    pill: "bg-rose-100 text-rose-700",
    column: "border-rose-200 bg-rose-50/20",
    overBg: "bg-rose-100/60",
  },
};

type Board = Record<TaskStatus, Task[]>;

const EMPTY_BOARD: Board = {
  a_fazer: [],
  em_andamento: [],
  aguardando_terceiros: [],
  em_revisao: [],
  concluida: [],
  bloqueada: [],
};

function groupByStatus(tasks: Task[]): Board {
  const out: Board = {
    a_fazer: [],
    em_andamento: [],
    aguardando_terceiros: [],
    em_revisao: [],
    concluida: [],
    bloqueada: [],
  };
  for (const t of tasks) {
    if (STATUS_ORDER.includes(t.status)) {
      out[t.status].push(t);
    }
  }
  return out;
}

function DraggableTask({ task }: { task: Task }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: task.id,
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
      <TaskCard task={task} />
    </div>
  );
}

function DroppableColumn({
  status,
  isEmpty,
  children,
}: {
  status: TaskStatus;
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
          Solte aqui pra mover pra {TASK_STATUS_LABELS[status]}
        </div>
      )}
    </div>
  );
}

interface TaskKanbanProps {
  tasks: Task[];
  onUpdate?: (task: Task) => void;
}

export function TaskKanban({ tasks, onUpdate }: TaskKanbanProps) {
  const [board, setBoard] = React.useState<Board>(EMPTY_BOARD);
  const [activeId, setActiveId] = React.useState<string | null>(null);

  // Sync board com tasks recebidas via prop
  React.useEffect(() => {
    setBoard(groupByStatus(tasks));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 6 },
    })
  );

  const findTask = React.useCallback(
    (id: string): { task: Task; status: TaskStatus } | null => {
      for (const s of STATUS_ORDER) {
        const task = board[s].find((t) => t.id === id);
        if (task) return { task, status: s };
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

    const result = findTask(String(active.id));
    if (!result) return;

    const newStatus = over.id as TaskStatus;
    if (!STATUS_ORDER.includes(newStatus)) return;
    if (result.status === newStatus) return;

    const updated: Task = {
      ...result.task,
      status: newStatus,
      atualizadaEm: new Date().toISOString(),
    };

    // Otimismo: atualiza UI primeiro
    setBoard((prev) => ({
      ...prev,
      [result.status]: prev[result.status].filter(
        (t) => t.id !== result.task.id
      ),
      [newStatus]: [updated, ...prev[newStatus]],
    }));

    // PATCH no server (sem await pra não bloquear UX)
    void fetch(`/api/tasks/${result.task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).catch((err) => {
      console.error("[task-kanban] erro PATCH /api/tasks", err);
    });

    onUpdate?.(updated);
  };

  const activeTask = activeId ? findTask(activeId)?.task ?? null : null;

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <div className="rounded-2xl border border-border bg-surface p-4 sm:p-6">
        <div className="-mx-2 flex gap-3 overflow-x-auto px-2 pb-2 lg:grid lg:grid-cols-6 lg:overflow-visible">
          {STATUS_ORDER.map((status) => {
            const items = board[status];
            const style = STATUS_STYLE[status];
            return (
              <div
                key={status}
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
                      {TASK_STATUS_LABELS[status]}
                    </h4>
                    <motion.span
                      key={items.length}
                      initial={{ scale: 1.3 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                      className={cn(
                        "rounded-full px-1.5 py-0.5 text-[10px] font-semibold",
                        style.pill
                      )}
                    >
                      {items.length}
                    </motion.span>
                  </div>
                </div>

                <DroppableColumn status={status} isEmpty={items.length === 0}>
                  <AnimatePresence initial={false}>
                    {items.map((task) => (
                      <motion.div
                        key={task.id}
                        layout
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                      >
                        <DraggableTask task={task} />
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
        {activeTask && (
          <div className="rotate-2 cursor-grabbing shadow-2xl">
            <TaskCard task={activeTask} />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
