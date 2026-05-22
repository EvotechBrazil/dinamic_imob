/**
 * Task store server-side (in-memory) — seed do TAREFAS_SEED + helpers de CRUD.
 * USO SERVER-ONLY. Demo: persistência some no restart. Produção: Redis/Postgres.
 *
 * Pattern clonado de lead-store.ts (singleton via globalThis pra sobreviver hot-reload).
 */
import { TAREFAS_SEED } from "@/components/sections/tarefas/mock";
import type {
  Setor,
  Task,
  TaskLabel,
  TaskLinkedEntity,
  TaskOrigem,
  TaskPriority,
  TaskStatus,
} from "@/lib/mock-types";

// Singleton module-level Map. Hot reload em dev pode duplicar — uso global pra evitar.
const G = globalThis as unknown as {
  __dinamicTaskStore?: Map<string, Task>;
};

function getStore(): Map<string, Task> {
  if (!G.__dinamicTaskStore) {
    const m = new Map<string, Task>();
    for (const t of TAREFAS_SEED) {
      m.set(t.id, { ...t });
    }
    G.__dinamicTaskStore = m;
  }
  return G.__dinamicTaskStore;
}

export interface ListTasksFilter {
  setor?: Setor;
  status?: TaskStatus;
  prioridade?: TaskPriority;
}

/** Lista tasks aplicando filtros opcionais (AND entre campos). */
export function listTasks(filter?: ListTasksFilter): Task[] {
  const all = Array.from(getStore().values());
  if (!filter) return all;
  return all.filter((t) => {
    if (filter.setor && t.setor !== filter.setor) return false;
    if (filter.status && t.status !== filter.status) return false;
    if (filter.prioridade && t.prioridade !== filter.prioridade) return false;
    return true;
  });
}

export interface AddTaskInput {
  titulo: string;
  setor: Setor;
  origem: TaskOrigem;
  status?: TaskStatus;
  prioridade?: TaskPriority;
  labels?: TaskLabel[];
  descricao?: string;
  responsavelNome?: string;
  responsavelAvatarUrl?: string;
  prazo?: string;
  linkedTo?: TaskLinkedEntity;
  bloqueadaPor?: string;
}

/** Cria task no store; gera id + timestamps; defaults: status=a_fazer, prioridade=normal, labels=[]. */
export function addTask(input: AddTaskInput): Task {
  const store = getStore();
  const id = `tsk-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000).toString(36)}`;
  const now = new Date().toISOString();

  const task: Task = {
    id,
    titulo: input.titulo,
    descricao: input.descricao,
    status: input.status ?? "a_fazer",
    prioridade: input.prioridade ?? "normal",
    setor: input.setor,
    responsavelNome: input.responsavelNome,
    responsavelAvatarUrl: input.responsavelAvatarUrl,
    prazo: input.prazo,
    criadaEm: now,
    atualizadaEm: now,
    labels: input.labels ?? [],
    linkedTo: input.linkedTo,
    origem: input.origem,
    bloqueadaPor: input.bloqueadaPor,
  };

  store.set(id, task);
  return task;
}

export type UpdatableTaskFields = Pick<
  Task,
  | "status"
  | "prioridade"
  | "responsavelNome"
  | "responsavelAvatarUrl"
  | "labels"
  | "descricao"
  | "prazo"
>;

/** Atualiza campos permitidos da task; retorna task atualizada ou null se não existir. */
export function updateTask(
  id: string,
  patch: Partial<UpdatableTaskFields>,
): Task | null {
  const store = getStore();
  const current = store.get(id);
  if (!current) return null;

  const updated: Task = {
    ...current,
    ...patch,
    atualizadaEm: new Date().toISOString(),
  };
  store.set(id, updated);
  return updated;
}

/** Retorna task por id ou null. */
export function getTask(id: string): Task | null {
  return getStore().get(id) ?? null;
}
