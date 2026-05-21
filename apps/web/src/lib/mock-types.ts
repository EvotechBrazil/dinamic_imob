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

export type Setor = "vendas" | "locacao" | "captacao" | "financeiro";

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
  | "proposta";

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
};

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  novo: "Novo",
  contatado: "Contatado",
  qualificado: "Qualificado",
  visita: "Visita",
  proposta: "Proposta",
};
