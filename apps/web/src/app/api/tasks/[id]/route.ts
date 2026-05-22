/**
 * PATCH /api/tasks/[id] — atualiza campos editáveis de uma tarefa.
 *
 * Body aceito (todos opcionais):
 *   status, prioridade, responsavelNome, responsavelAvatarUrl,
 *   labels, descricao, prazo
 *
 * Retorna 404 quando a tarefa não existe; 200 com { task } no sucesso.
 */
import { NextResponse } from "next/server";
import { updateTask } from "@/lib/task-store";
import type {
  Task,
  TaskStatus,
  TaskPriority,
  TaskLabel,
} from "@/lib/mock-types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const STATUSES: TaskStatus[] = [
  "a_fazer",
  "em_andamento",
  "aguardando_terceiros",
  "em_revisao",
  "concluida",
  "bloqueada",
];

const PRIORIDADES: TaskPriority[] = ["baixa", "normal", "alta", "urgente"];

const LABELS: TaskLabel[] = [
  "recolher_assinatura",
  "aguardando_documento",
  "boleto_emitir",
  "visita_confirmar",
  "contrato_revisar",
  "lgpd_processar",
  "vistoria_agendar",
  "comissao_pagar",
  "follow_up_lead",
  "renovacao",
];

function isStatus(v: unknown): v is TaskStatus {
  return typeof v === "string" && (STATUSES as string[]).includes(v);
}

function isPrioridade(v: unknown): v is TaskPriority {
  return typeof v === "string" && (PRIORIDADES as string[]).includes(v);
}

function isLabel(v: unknown): v is TaskLabel {
  return typeof v === "string" && (LABELS as string[]).includes(v);
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  if (!id) {
    return NextResponse.json(
      { error: "ID da tarefa é obrigatório" },
      { status: 400 }
    );
  }

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
  const patch: Partial<Task> = {};

  if (raw.status !== undefined) {
    if (!isStatus(raw.status)) {
      return NextResponse.json(
        { error: "Campo 'status' inválido. Valores: " + STATUSES.join(", ") },
        { status: 400 }
      );
    }
    patch.status = raw.status;
  }

  if (raw.prioridade !== undefined) {
    if (!isPrioridade(raw.prioridade)) {
      return NextResponse.json(
        {
          error:
            "Campo 'prioridade' inválido. Valores: " + PRIORIDADES.join(", "),
        },
        { status: 400 }
      );
    }
    patch.prioridade = raw.prioridade;
  }

  if (raw.responsavelNome !== undefined) {
    if (raw.responsavelNome !== null && typeof raw.responsavelNome !== "string") {
      return NextResponse.json(
        { error: "Campo 'responsavelNome' deve ser string" },
        { status: 400 }
      );
    }
    patch.responsavelNome = raw.responsavelNome as string | undefined;
  }

  if (raw.responsavelAvatarUrl !== undefined) {
    if (
      raw.responsavelAvatarUrl !== null &&
      typeof raw.responsavelAvatarUrl !== "string"
    ) {
      return NextResponse.json(
        { error: "Campo 'responsavelAvatarUrl' deve ser string" },
        { status: 400 }
      );
    }
    patch.responsavelAvatarUrl = raw.responsavelAvatarUrl as string | undefined;
  }

  if (raw.labels !== undefined) {
    if (!Array.isArray(raw.labels) || !raw.labels.every(isLabel)) {
      return NextResponse.json(
        {
          error:
            "Campo 'labels' deve ser array de labels válidas: " +
            LABELS.join(", "),
        },
        { status: 400 }
      );
    }
    patch.labels = raw.labels as TaskLabel[];
  }

  if (raw.descricao !== undefined) {
    if (raw.descricao !== null && typeof raw.descricao !== "string") {
      return NextResponse.json(
        { error: "Campo 'descricao' deve ser string" },
        { status: 400 }
      );
    }
    patch.descricao = raw.descricao as string | undefined;
  }

  if (raw.prazo !== undefined) {
    if (raw.prazo !== null && typeof raw.prazo !== "string") {
      return NextResponse.json(
        { error: "Campo 'prazo' deve ser string (ISO date)" },
        { status: 400 }
      );
    }
    patch.prazo = raw.prazo as string | undefined;
  }

  const task = updateTask(id, patch);
  if (!task) {
    return NextResponse.json(
      { error: "Task não encontrada" },
      { status: 404 }
    );
  }

  return NextResponse.json({ task }, { status: 200 });
}
