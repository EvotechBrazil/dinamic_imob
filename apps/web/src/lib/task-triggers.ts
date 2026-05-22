/**
 * Triggers server-side que materializam tasks a partir de eventos do domínio.
 * Cada função apenas registra no task-store; NÃO dispara eventos do browser
 * (esse é o lado client — ver event-bus.ts).
 *
 * Usado por API routes (ex.: /api/chat/agendar-visita → triggerVisitScheduled).
 */
import { addTask } from "@/lib/task-store";
import type { Task } from "@/lib/mock-types";

/** Retorna data ISO (YYYY-MM-DD) somando `days` à data atual. */
function isoDatePlusDays(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

export interface TriggerVisitScheduledInput {
  leadId: string;
  leadNome: string;
  bairro?: string;
}

/**
 * Visita agendada pela IA → cria task de confirmação pra Captação (prazo = amanhã).
 */
export function triggerVisitScheduled(
  input: TriggerVisitScheduledInput,
): Task {
  return addTask({
    titulo: `Confirmar visita — ${input.leadNome}`,
    descricao: input.bairro
      ? `Confirmar visita ao imóvel em ${input.bairro} com o lead.`
      : `Confirmar horário e endereço da visita com o lead.`,
    setor: "captacao",
    status: "a_fazer",
    prioridade: "alta",
    labels: ["visita_confirmar"],
    prazo: isoDatePlusDays(1),
    linkedTo: {
      tipo: "lead",
      id: input.leadId,
      titulo: input.leadNome,
    },
    origem: "ia",
  });
}

export interface TriggerContractClosedInput {
  leadId?: string;
  leadNome: string;
  valor?: number;
}

/**
 * Contrato fechado → cria 2 tasks paralelas: Jurídico (revisão) + Financeiro (boleto entrada).
 */
export function triggerContractClosed(input: TriggerContractClosedInput): {
  juridico: Task;
  financeiro: Task;
} {
  const linkedContrato = {
    tipo: "contrato" as const,
    id: input.leadId ?? `ctr-${Date.now().toString(36)}`,
    titulo: input.leadNome,
  };

  const juridico = addTask({
    titulo: `Revisar contrato — ${input.leadNome}`,
    descricao: input.valor
      ? `Revisar minuta do contrato (valor R$ ${input.valor.toLocaleString("pt-BR")}) antes do envio para assinatura.`
      : `Revisar minuta do contrato antes do envio para assinatura.`,
    setor: "juridico",
    status: "a_fazer",
    prioridade: "alta",
    labels: ["contrato_revisar"],
    prazo: isoDatePlusDays(3),
    linkedTo: linkedContrato,
    origem: "evento_sistema",
  });

  const financeiro = addTask({
    titulo: `Emitir boleto entrada — ${input.leadNome}`,
    descricao: input.valor
      ? `Gerar boleto da entrada referente ao contrato (valor R$ ${input.valor.toLocaleString("pt-BR")}).`
      : `Gerar boleto da entrada referente ao contrato.`,
    setor: "financeiro",
    status: "a_fazer",
    prioridade: "urgente",
    labels: ["boleto_emitir"],
    prazo: isoDatePlusDays(1),
    linkedTo: {
      tipo: "boleto",
      id: `bol-${Date.now().toString(36)}`,
      titulo: `Entrada — ${input.leadNome}`,
    },
    origem: "evento_sistema",
  });

  return { juridico, financeiro };
}

export interface TriggerLgpdRequestInput {
  titular: string;
  tipo: "export" | "delete" | "consent_revoke";
}

const LGPD_LABEL: Record<TriggerLgpdRequestInput["tipo"], string> = {
  export: "Exportar dados",
  delete: "Excluir dados",
  consent_revoke: "Revogar consentimento",
};

/**
 * Solicitação LGPD do titular → cria task pra Jurídico (prazo legal = 15 dias).
 */
export function triggerLgpdRequest(input: TriggerLgpdRequestInput): Task {
  const acao = LGPD_LABEL[input.tipo];
  return addTask({
    titulo: `${acao} — ${input.titular}`,
    descricao: `Solicitação LGPD (${input.tipo}) do titular ${input.titular}. Prazo legal de resposta: 15 dias.`,
    setor: "juridico",
    status: "a_fazer",
    prioridade: "alta",
    labels: ["lgpd_processar"],
    prazo: isoDatePlusDays(15),
    linkedTo: {
      tipo: "lgpd_request",
      id: `lgpd-${Date.now().toString(36)}`,
      titulo: input.titular,
    },
    origem: "evento_sistema",
  });
}
