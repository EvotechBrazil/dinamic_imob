/**
 * Mock data — seção Omnichannel da landing demo Dinamic Imobiliária.
 * Bairros reais de Arapongas-PR, nomes brasileiros realistas, tom IA
 * profissional caloroso (max 1 emoji/msg, sem gírias, trata por "você").
 */
import type {
  AgentRun,
  ChatMessage,
  Conversation,
  KPI,
} from "@/lib/mock-types";

// ============================================================
// KPIs do header
// ============================================================
export const OMNICHANNEL_KPIS: KPI[] = [
  {
    label: "Conversas abertas",
    value: 47,
    delta: 12,
    deltaType: "moderateIncrease",
    helper: "vs ontem",
  },
  {
    label: "Atendidas hoje",
    value: 142,
    delta: 8,
    deltaType: "increase",
    helper: "+8% semana",
  },
  {
    label: "Tempo médio resposta",
    value: "28s",
    delta: -34,
    deltaType: "decrease",
    helper: "IA + corretor",
  },
  {
    label: "Resolução IA",
    value: "78%",
    delta: 6,
    deltaType: "moderateIncrease",
    helper: "sem handoff",
  },
];

// ============================================================
// Conversas (6 — 1 ativa = Mariana Silva)
// ============================================================
export const ACTIVE_CONVERSATION_ID = "conv-mariana-silva";

export const CONVERSATIONS: Conversation[] = [
  {
    id: ACTIVE_CONVERSATION_ID,
    nome: "Mariana Silva",
    canal: "whatsapp",
    avatarUrl: "",
    ultimaMsg: "Pode sim, obrigada!",
    horaRelativa: "agora",
    naoLidas: 0,
    setor: "locacao",
    status: "open",
    bairroInteresse: "Jardim Tropical",
    orcamento: 2500,
  },
  {
    id: "conv-joao-pereira",
    nome: "João Pereira",
    canal: "instagram",
    avatarUrl: "",
    ultimaMsg: "Tem casa pra venda no Vale do Sol até R$ 480 mil?",
    horaRelativa: "3 min",
    naoLidas: 2,
    setor: "vendas",
    status: "pending",
    bairroInteresse: "Vale do Sol",
    orcamento: 480000,
  },
  {
    id: "conv-carla-andrade",
    nome: "Carla Andrade",
    canal: "whatsapp",
    avatarUrl: "",
    ultimaMsg: "Posso visitar amanhã às 10h? Trabalho até 18h",
    horaRelativa: "12 min",
    naoLidas: 1,
    setor: "locacao",
    status: "open",
    bairroInteresse: "Centro",
    orcamento: 1800,
  },
  {
    id: "conv-roberto-lima",
    nome: "Roberto Lima",
    canal: "facebook",
    avatarUrl: "",
    ultimaMsg: "Quero anunciar meu apartamento no Industrial",
    horaRelativa: "28 min",
    naoLidas: 0,
    setor: "captacao",
    status: "open",
    bairroInteresse: "Industrial",
  },
  {
    id: "conv-ana-costa",
    nome: "Ana Costa",
    canal: "whatsapp",
    avatarUrl: "",
    ultimaMsg: "Boleto de maio chegou? Não recebi por email",
    horaRelativa: "45 min",
    naoLidas: 3,
    setor: "financeiro",
    status: "pending",
  },
  {
    id: "conv-pedro-souza",
    nome: "Pedro Souza",
    canal: "instagram",
    avatarUrl: "",
    ultimaMsg: "Bom dia! Vi o sobrado no Jardim Bandeirantes…",
    horaRelativa: "1h",
    naoLidas: 0,
    setor: "vendas",
    status: "open",
    bairroInteresse: "Jardim Bandeirantes",
    orcamento: 620000,
  },
];

// ============================================================
// Mensagens da conversa ativa (8 — 4 inbound / 3 outbound IA / 1 corretor)
// ============================================================
export const ACTIVE_MESSAGES: ChatMessage[] = [
  {
    id: "msg-1",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "inbound",
    sender: "lead",
    nome: "Mariana Silva",
    content:
      "Oi! Quero alugar apto 3 dormitórios no Jardim Tropical, até R$ 2500",
    ts: new Date(Date.now() - 14 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-2",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "outbound",
    sender: "ai",
    nome: "IA Dinamic",
    content:
      "Olá! Que ótimo, vou conferir aqui. Você tem preferência de andar? Algum imóvel com vaga coberta importa?",
    ts: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg-3",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "inbound",
    sender: "lead",
    nome: "Mariana Silva",
    content: "Coberta sim, e até 3º andar",
    ts: new Date(Date.now() - 11 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-4",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "outbound",
    sender: "ai",
    nome: "IA Dinamic",
    content:
      "Anotei: 3 dormitórios, vaga coberta, até 3º andar, orçamento R$ 2.500 no Jardim Tropical. Vou pedir pro nosso corretor te passar 2 opções hoje ainda. Pode ser?",
    ts: new Date(Date.now() - 9 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg-5",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "inbound",
    sender: "lead",
    nome: "Mariana Silva",
    content: "Perfeito, obrigada pela rapidez!",
    ts: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
  },
  {
    id: "msg-6",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "outbound",
    sender: "ai",
    nome: "IA Dinamic",
    content:
      "Vou transferir você para o Rodrigo agora, ele cuida da locação no Jardim Tropical e já está com seu perfil em mãos. 🤝",
    ts: new Date(Date.now() - 6 * 60 * 1000).toISOString(),
    status: "read",
  },
  {
    id: "msg-7",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "outbound",
    sender: "corretor",
    nome: "Rodrigo (corretor)",
    content:
      "Oi Mariana, sou o Rodrigo da Dinamic. Tenho 2 ótimos pra você, com vaga coberta e dentro do orçamento. Posso enviar agora?",
    ts: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    status: "delivered",
  },
  {
    id: "msg-8",
    conversationId: ACTIVE_CONVERSATION_ID,
    direction: "inbound",
    sender: "lead",
    nome: "Mariana Silva",
    content: "Pode sim, obrigada!",
    ts: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
  },
];

// ============================================================
// Agent runs da conversa ativa (4)
// ============================================================
export const AGENT_RUNS: AgentRun[] = [
  {
    id: "run-classify",
    ts: new Date(Date.now() - 13 * 60 * 1000).toISOString(),
    action: "classify",
    detail: "Locação · intenção alta · Jardim Tropical",
    tokensIn: 180,
    tokensOut: 45,
    costBRL: 0.014,
  },
  {
    id: "run-rag",
    ts: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    action: "rag-search",
    detail: "3 imóveis match perfil (3dorm + vaga + ≤ 3º andar)",
    tokensIn: 320,
    tokensOut: 65,
    costBRL: 0.022,
  },
  {
    id: "run-propose",
    ts: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    action: "propose-visit",
    detail: "Sugeriu visita terça 14h ou quinta 10h",
    tokensIn: 140,
    tokensOut: 52,
    costBRL: 0.011,
  },
  {
    id: "run-handoff",
    ts: new Date(Date.now() - 4 * 60 * 1000).toISOString(),
    action: "handoff",
    detail: "Transferido para corretor Rodrigo (locação)",
    tokensIn: 210,
    tokensOut: 40,
    costBRL: 0.012,
  },
];
