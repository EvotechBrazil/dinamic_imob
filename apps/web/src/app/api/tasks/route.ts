/**
 * GET /api/tasks — lista tarefas do store in-memory, com filtros opcionais.
 * POST /api/tasks — cria nova tarefa.
 *
 * Filtros (query string):
 *   ?setor=vendas|locacao|captacao|financeiro|juridico
 *   ?status=a_fazer|em_andamento|aguardando_terceiros|em_revisao|concluida|bloqueada
 *   ?prioridade=baixa|normal|alta|urgente
 *
 * Inspirado no padrão de /api/leads e /api/chat: NextResponse.json + tratamento
 * de erro consistente, sem caching (dynamic = force-dynamic).
 */
import { NextResponse } from "next/server";
import { listTasks, addTask } from "@/lib/task-store";
import type {
  Setor,
  TaskStatus,
  TaskPriority,
} from "@/lib/mock-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const SETORES: Setor[] = [
  "vendas",
  "locacao",
  "captacao",
  "financeiro",
  "juridico",
];

const STATUSES: TaskStatus[] = [
  "a_fazer",
  "em_andamento",
  "aguardando_terceiros",
  "em_revisao",
  "concluida",
  "bloqueada",
];

const PRIORIDADES: TaskPriority[] = ["baixa", "normal", "alta", "urgente"];

function parseSetor(value: string | null): Setor | undefined {
  if (!value) return undefined;
  return (SETORES as string[]).includes(value) ? (value as Setor) : undefined;
}

function parseStatus(value: string | null): TaskStatus | undefined {
  if (!value) return undefined;
  return (STATUSES as string[]).includes(value)
    ? (value as TaskStatus)
    : undefined;
}

function parsePrioridade(value: string | null): TaskPriority | undefined {
  if (!value) return undefined;
  return (PRIORIDADES as string[]).includes(value)
    ? (value as TaskPriority)
    : undefined;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const setor = parseSetor(searchParams.get("setor"));
  const status = parseStatus(searchParams.get("status"));
  const prioridade = parsePrioridade(searchParams.get("prioridade"));

  const tasks = listTasks({ setor, status, prioridade });
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "JSON inválido no body" },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Body deve ser um objeto" },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;

  const titulo = typeof raw.titulo === "string" ? raw.titulo.trim() : "";
  if (!titulo) {
    return NextResponse.json(
      { error: "Campo 'titulo' é obrigatório e não pode ser vazio" },
      { status: 400 }
    );
  }

  const setorRaw = typeof raw.setor === "string" ? raw.setor : "";
  const setor = parseSetor(setorRaw);
  if (!setor) {
    return NextResponse.json(
      {
        error:
          "Campo 'setor' é obrigatório e deve ser um dos: " +
          SETORES.join(", "),
      },
      { status: 400 }
    );
  }

  const origem =
    typeof raw.origem === "string" && raw.origem.trim().length > 0
      ? raw.origem.trim()
      : "manual";

  try {
    const task = addTask({
      ...raw,
      titulo,
      setor,
      origem,
    } as Parameters<typeof addTask>[0]);

    return NextResponse.json({ task }, { status: 201 });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : "Erro ao criar tarefa";
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}
