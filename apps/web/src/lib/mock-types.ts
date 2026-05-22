/**
 * Tipos compartilhados pela landing demo Dinamic Imobiliária.
 * Squad A define — Squads B e C SÓ LEEM.
 *
 * Inspirado em vendor/jpasv-chat-bullq/api/prisma/schema.prisma (Channel,
 * Conversation, Message) + extensões do domínio imobiliário (Lead, Property,
 * Contract, Boleto, LGPDRequest).
 */

// ============================================================
// Omnichannel
// ============================================================
export type ChannelType = "whatsapp" | "instagram" | "facebook";

export type Setor =
  | "vendas"
  | "locacao"
  | "captacao"
  | "financeiro"
  | "juridico";

export type ConversationStatus = "pending" | "open" | "snoozed" | "closed";

export interface Conversation {
  id: string;
  nome: string;
  canal: ChannelType;
  avatarUrl: string;
  ultimaMsg: string;
  horaRelativa: string;
  naoLidas: number;
  setor: Setor;
  status: ConversationStatus;
  bairroInteresse?: string;
  orcamento?: number;
}

export type MessageDirection = "inbound" | "outbound";
export type MessageSender = "lead" | "ai" | "corretor";
export type MessageStatus = "sent" | "delivered" | "read" | "failed";

export interface ChatMessage {
  id: string;
  conversationId: string;
  direction: MessageDirection;
  sender: MessageSender;
  nome?: string;
  content: string;
  ts: string;
  status?: MessageStatus;
}

// ============================================================
// Agent Runs (IA observability)
// ============================================================
export type AgentAction =
  | "classify"
  | "rag-search"
  | "propose-visit"
  | "handoff"
  | "collect-info";

export interface AgentRun {
  id: string;
  ts: string;
  action: AgentAction;
  detail: string;
  tokensIn: number;
  tokensOut: number;
  costBRL: number;
}

// ============================================================
// KPIs / Charts
// ============================================================
export type DeltaType =
  | "increase"
  | "decrease"
  | "moderateIncrease"
  | "moderateDecrease"
  | "unchanged";

export interface KPI {
  label: string;
  value: string | number;
  delta?: number;
  deltaType?: DeltaType;
  helper?: string;
  prefix?: string;
  suffix?: string;
}

export interface ChartPoint {
  label: string;
  valor: number;
  valor2?: number;
  valor3?: number;
}

// ============================================================
// Financeiro
// ============================================================
export type BoletoStatus = "pago" | "pendente" | "vencido" | "cancelado";

export interface Boleto {
  id: string;
  locatario: string;
  imovel: string;
  bairro: string;
  valor: number;
  vencimento: string;
  status: BoletoStatus;
  diasAtraso?: number;
}

// ============================================================
// CRM
// ============================================================
export type LeadStatus =
  | "novo"
  | "contatado"
  | "qualificado"
  | "visita"
  | "proposta"
  | "fechado"
  | "perdido";

export type IntencaoLead = "compra" | "aluguel";

export interface Lead {
  id: string;
  nome: string;
  avatarUrl: string;
  bairro: string;
  orcamento: number;
  intencao: IntencaoLead;
  status: LeadStatus;
  setor: Setor;
  ultimaInteracao: string;
  telefone?: string;
  origemCanal?: ChannelType;
}

export type TipoImovel = "apartamento" | "casa" | "terreno" | "comercial";
export type FinalidadeImovel = "venda" | "aluguel";

export interface Property {
  id: string;
  titulo: string;
  bairro: string;
  tipo: TipoImovel;
  finalidade: FinalidadeImovel;
  preco: number;
  area: number;
  dormitorios: number;
  vagas: number;
  banheiros?: number;
  fotos: string[];
  destaque?: boolean;
  endereco?: string;
}

// ============================================================
// Tokenização (consumo IA)
// ============================================================
export interface TokenRecord {
  id: string;
  ts: string;
  conversa: string;
  modelo: string;
  tokensIn: number;
  tokensOut: number;
  costBRL: number;
}

// ============================================================
// Jurídico / LGPD
// ============================================================
export type ContractStatus = "ativo" | "vencendo" | "encerrado";

export interface Contract {
  id: string;
  locatario: string;
  imovel: string;
  bairro: string;
  periodoInicio: string;
  periodoFim: string;
  valor: number;
  status: ContractStatus;
}

// ============================================================
// Comissões / Corretores
// ============================================================
export type ComissaoStatus = "pago" | "pendente";

export interface Corretor {
  id: string;
  nome: string;
  setor: Setor;
  creci?: string;
  desde: string;
  nivel: "junior" | "pleno" | "senior";
}

export interface ComissaoMensal {
  id: string;
  corretorId: string;
  mes: string;
  fechamentos: number;
  vgvBRL: number;
  comissaoBRL: number;
  status: ComissaoStatus;
}

export type LGPDRequestType = "export" | "delete" | "consent_revoke";
export type LGPDRequestStatus = "pendente" | "concluido";

export interface LGPDRequest {
  id: string;
  tipo: LGPDRequestType;
  titular: string;
  dataAbertura: string;
  status: LGPDRequestStatus;
}

// ============================================================
// Helpers
// ============================================================
export const CHANNEL_LABELS: Record<ChannelType, string> = {
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  facebook: "Facebook",
};

export const SETOR_LABELS: Record<Setor, string> = {
  vendas: "Vendas",
  locacao: "Locação",
  captacao: "Captação",
  financeiro: "Financeiro",
  juridico: "Jurídico",
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  qualificado: "Qualificado",
  visita: "Visita",
  proposta: "Proposta",
  fechado: "Fechado",
  perdido: "Perdido",
};

// ============================================================
// Task Manager (ClickUp-style cross-cutting)
// ============================================================
export type TaskStatus =
  | "a_fazer"
  | "em_andamento"
  | "aguardando_terceiros"
  | "em_revisao"
  | "concluida"
  | "bloqueada";

export type TaskPriority = "baixa" | "normal" | "alta" | "urgente";

export type TaskLabel =
  | "recolher_assinatura"
  | "aguardando_documento"
  | "boleto_emitir"
  | "visita_confirmar"
  | "contrato_revisar"
  | "lgpd_processar"
  | "vistoria_agendar"
  | "comissao_pagar"
  | "follow_up_lead"
  | "renovacao";

export type TaskOrigem = "ia" | "evento_sistema" | "manual";

export type TaskLinkedEntityTipo =
  | "contrato"
  | "boleto"
  | "lead"
  | "conversa"
  | "imovel"
  | "lgpd_request";

export interface TaskLinkedEntity {
  tipo: TaskLinkedEntityTipo;
  id: string;
  titulo: string;
}

export interface Task {
  id: string;
  titulo: string;
  descricao?: string;
  status: TaskStatus;
  prioridade: TaskPriority;
  setor: Setor;
  responsavelNome?: string;
  responsavelAvatarUrl?: string;
  prazo?: string; // ISO date
  criadaEm: string;
  atualizadaEm: string;
  labels: TaskLabel[];
  linkedTo?: TaskLinkedEntity;
  origem: TaskOrigem;
  bloqueadaPor?: string;
}

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  a_fazer: "A fazer",
  em_andamento: "Em andamento",
  aguardando_terceiros: "Aguardando",
  em_revisao: "Em revisão",
  concluida: "Concluída",
  bloqueada: "Bloqueada",
};

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
  baixa: "Baixa",
  normal: "Normal",
  alta: "Alta",
  urgente: "Urgente",
};

export const TASK_LABEL_LABELS: Record<TaskLabel, string> = {
  recolher_assinatura: "Recolher assinatura",
  aguardando_documento: "Aguardando documento",
  boleto_emitir: "Emitir boleto",
  visita_confirmar: "Confirmar visita",
  contrato_revisar: "Revisar contrato",
  lgpd_processar: "Processar LGPD",
  vistoria_agendar: "Agendar vistoria",
  comissao_pagar: "Pagar comissão",
  follow_up_lead: "Follow-up lead",
  renovacao: "Renovação",
};
