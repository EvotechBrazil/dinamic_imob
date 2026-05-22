"use client";

import * as React from "react";
import { SectionHeader } from "@/components/layout/section-header";
import type { Task } from "@/lib/mock-types";
import { TAREFAS_SEED } from "./mock";
import { TaskKpis } from "./task-kpis";
import { TaskTriggersDemo } from "./task-triggers-demo";
import { TaskFilters, type TaskFilter } from "./task-filters";
import { TaskKanban } from "./task-kanban";

export function TarefasSection() {
  const [tasks, setTasks] = React.useState<Task[]>(TAREFAS_SEED);
  const [filter, setFilter] = React.useState<TaskFilter>({
    setor: "all",
    prioridade: "all",
  });

  const refetchTasks = React.useCallback(async () => {
    try {
      const res = await fetch("/api/tasks", { cache: "no-store" });
      if (!res.ok) {
        console.error("[tarefas] /api/tasks falhou", res.status);
        return;
      }
      const data = (await res.json()) as { tasks?: Task[] };
      if (Array.isArray(data.tasks) && data.tasks.length > 0) {
        setTasks(data.tasks);
      }
    } catch (err) {
      console.error("[tarefas] erro ao buscar /api/tasks", err);
      // mantém seed como fallback
    }
  }, []);

  // Fetch inicial
  React.useEffect(() => {
    void refetchTasks();
  }, [refetchTasks]);

  // Listeners de triggers
  React.useEffect(() => {
    const handler = () => {
      void refetchTasks();
    };
    window.addEventListener("dinamic:tasks-refresh", handler);
    window.addEventListener("dinamic:task-created", handler);
    return () => {
      window.removeEventListener("dinamic:tasks-refresh", handler);
      window.removeEventListener("dinamic:task-created", handler);
    };
  }, [refetchTasks]);

  const filteredTasks = React.useMemo(() => {
    return tasks.filter((t) => {
      if (filter.setor !== "all" && t.setor !== filter.setor) return false;
      if (filter.prioridade !== "all" && t.prioridade !== filter.prioridade)
        return false;
      return true;
    });
  }, [tasks, filter]);

  return (
    <section
      id="tarefas"
      className="scroll-mt-28 border-t border-border bg-app py-16 lg:py-24"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="07 · Tarefas & Gestor"
          title="Central de tarefas — tudo conectado, gestor no controle."
          subtitle="Kanban estilo ClickUp puxando ações de todos os setores. IA cria, eventos disparam, gestor enxerga gargalos em segundos e prioriza o que importa."
        />

        <TaskKpis tasks={filteredTasks} />
        <TaskTriggersDemo />
        <TaskFilters filter={filter} onFilterChange={setFilter} />
        <TaskKanban tasks={filteredTasks} />
      </div>
    </section>
  );
}
