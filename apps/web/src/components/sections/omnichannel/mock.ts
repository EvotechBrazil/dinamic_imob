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

// ============================================================
// Helpers internos: gera timestamps relativos consistentes
// ============================================================
const minsAgo = (m: number) => new Date(Date.now() - m * 60 * 1000).toISOString();

// ============================================================
// MESSAGES_BY_CONVERSATION
// 8-10 mensagens por conversa, plausíveis por canal+setor.
// ============================================================
export const MESSAGES_BY_CONVERSATION: Record<string, ChatMessage[]> = {
  [ACTIVE_CONVERSATION_ID]: ACTIVE_MESSAGES,

  // ----- João Pereira · Instagram · vendas -----
  "conv-joao-pereira": [
    {
      id: "joao-1",
      conversationId: "conv-joao-pereira",
      direction: "inbound",
      sender: "lead",
      nome: "João Pereira",
      content: "Boa tarde! Vi o anúncio de vocês aqui no Instagram",
      ts: minsAgo(22),
    },
    {
      id: "joao-2",
      conversationId: "conv-joao-pereira",
      direction: "inbound",
      sender: "lead",
      nome: "João Pereira",
      content: "Tem casa pra venda no Vale do Sol até R$ 480 mil?",
      ts: minsAgo(21),
    },
    {
      id: "joao-3",
      conversationId: "conv-joao-pereira",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Olá João, tudo bem? Temos 4 opções no Vale do Sol dentro desse orçamento. Você prefere casa térrea ou sobrado?",
      ts: minsAgo(20),
      status: "read",
    },
    {
      id: "joao-4",
      conversationId: "conv-joao-pereira",
      direction: "inbound",
      sender: "lead",
      nome: "João Pereira",
      content: "Sobrado seria ideal. Mínimo 3 quartos",
      ts: minsAgo(18),
    },
    {
      id: "joao-5",
      conversationId: "conv-joao-pereira",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Perfeito. Tenho 2 sobrados que casam com seu perfil — um na Rua dos Ipês (R$ 465 mil, 3 suítes) e outro na Av. das Palmeiras (R$ 478 mil, 4 dorm). Quer que eu envie as fichas?",
      ts: minsAgo(17),
      status: "read",
    },
    {
      id: "joao-6",
      conversationId: "conv-joao-pereira",
      direction: "inbound",
      sender: "lead",
      nome: "João Pereira",
      content: "Manda os dois, por favor",
      ts: minsAgo(10),
    },
    {
      id: "joao-7",
      conversationId: "conv-joao-pereira",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Enviei agora no seu DM. Posso agendar uma visita pra você nos dois ainda essa semana?",
      ts: minsAgo(9),
      status: "delivered",
    },
    {
      id: "joao-8",
      conversationId: "conv-joao-pereira",
      direction: "inbound",
      sender: "lead",
      nome: "João Pereira",
      content: "Sábado de manhã consigo, pode ser?",
      ts: minsAgo(3),
    },
  ],

  // ----- Carla Andrade · WhatsApp · locação -----
  "conv-carla-andrade": [
    {
      id: "carla-1",
      conversationId: "conv-carla-andrade",
      direction: "inbound",
      sender: "lead",
      nome: "Carla Andrade",
      content: "Oi, vocês têm apto pra alugar no Centro até R$ 1.800?",
      ts: minsAgo(48),
    },
    {
      id: "carla-2",
      conversationId: "conv-carla-andrade",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Olá Carla! Temos 6 opções no Centro nesse valor. Quantos dormitórios você precisa?",
      ts: minsAgo(47),
      status: "read",
    },
    {
      id: "carla-3",
      conversationId: "conv-carla-andrade",
      direction: "inbound",
      sender: "lead",
      nome: "Carla Andrade",
      content: "2 dormitórios, mobiliado de preferência",
      ts: minsAgo(45),
    },
    {
      id: "carla-4",
      conversationId: "conv-carla-andrade",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Anotei: 2 dorm + mobiliado + Centro + até R$ 1.800. Encontrei 3 que atendem. Quer ver as fotos?",
      ts: minsAgo(44),
      status: "read",
    },
    {
      id: "carla-5",
      conversationId: "conv-carla-andrade",
      direction: "inbound",
      sender: "lead",
      nome: "Carla Andrade",
      content: "Sim, manda por favor",
      ts: minsAgo(30),
    },
    {
      id: "carla-6",
      conversationId: "conv-carla-andrade",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Pronto, mandei aqui. O da Av. Maracanã está com promoção de IPTU incluso por 12 meses. ✨",
      ts: minsAgo(29),
      status: "read",
    },
    {
      id: "carla-7",
      conversationId: "conv-carla-andrade",
      direction: "inbound",
      sender: "lead",
      nome: "Carla Andrade",
      content: "Posso visitar amanhã às 10h? Trabalho até 18h",
      ts: minsAgo(12),
    },
  ],

  // ----- Roberto Lima · Facebook · captação -----
  "conv-roberto-lima": [
    {
      id: "roberto-1",
      conversationId: "conv-roberto-lima",
      direction: "inbound",
      sender: "lead",
      nome: "Roberto Lima",
      content: "Boa tarde, vocês fazem captação de imóvel pra venda?",
      ts: minsAgo(58),
    },
    {
      id: "roberto-2",
      conversationId: "conv-roberto-lima",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Olá Roberto, fazemos sim! Pode me contar um pouco sobre o imóvel? Tipo, bairro e tamanho ajudam bastante.",
      ts: minsAgo(57),
      status: "read",
    },
    {
      id: "roberto-3",
      conversationId: "conv-roberto-lima",
      direction: "inbound",
      sender: "lead",
      nome: "Roberto Lima",
      content: "Quero anunciar meu apartamento no Industrial",
      ts: minsAgo(55),
    },
    {
      id: "roberto-4",
      conversationId: "conv-roberto-lima",
      direction: "inbound",
      sender: "lead",
      nome: "Roberto Lima",
      content: "78m², 2 quartos, 1 vaga. Penso em R$ 320 mil",
      ts: minsAgo(54),
    },
    {
      id: "roberto-5",
      conversationId: "conv-roberto-lima",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Ótimo perfil! Em 2026 a média no Industrial pra 2 dorm está entre R$ 295k e R$ 340k, então seu valor está alinhado. Posso pedir pro Marcelo, nosso captador da região, te ligar pra agendar uma avaliação gratuita?",
      ts: minsAgo(52),
      status: "read",
    },
    {
      id: "roberto-6",
      conversationId: "conv-roberto-lima",
      direction: "inbound",
      sender: "lead",
      nome: "Roberto Lima",
      content: "Pode ligar amanhã depois das 14h",
      ts: minsAgo(45),
    },
    {
      id: "roberto-7",
      conversationId: "conv-roberto-lima",
      direction: "outbound",
      sender: "corretor",
      nome: "Marcelo (captação)",
      content:
        "Oi Roberto, tudo bem? Sou o Marcelo da Dinamic. Já está agendado pra amanhã 14h30, te ligo no seu WhatsApp.",
      ts: minsAgo(40),
      status: "delivered",
    },
    {
      id: "roberto-8",
      conversationId: "conv-roberto-lima",
      direction: "inbound",
      sender: "lead",
      nome: "Roberto Lima",
      content: "Combinado, obrigado",
      ts: minsAgo(28),
    },
  ],

  // ----- Ana Costa · WhatsApp · financeiro -----
  "conv-ana-costa": [
    {
      id: "ana-1",
      conversationId: "conv-ana-costa",
      direction: "inbound",
      sender: "lead",
      nome: "Ana Costa",
      content: "Bom dia! Boleto de maio chegou? Não recebi por email",
      ts: minsAgo(70),
    },
    {
      id: "ana-2",
      conversationId: "conv-ana-costa",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Olá Ana! Vou verificar pra você. Pode me confirmar o contrato? Você é locatária do imóvel na Rua Tucanos?",
      ts: minsAgo(69),
      status: "read",
    },
    {
      id: "ana-3",
      conversationId: "conv-ana-costa",
      direction: "inbound",
      sender: "lead",
      nome: "Ana Costa",
      content: "Isso, contrato 2024-118",
      ts: minsAgo(67),
    },
    {
      id: "ana-4",
      conversationId: "conv-ana-costa",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Confirmei aqui: o boleto foi gerado dia 25/04 e enviado pro email ana.costa@gmail.com. Pode estar na caixa de spam. Quer que eu reenvie agora pelo WhatsApp em PDF?",
      ts: minsAgo(65),
      status: "read",
    },
    {
      id: "ana-5",
      conversationId: "conv-ana-costa",
      direction: "inbound",
      sender: "lead",
      nome: "Ana Costa",
      content: "Sim, por favor!",
      ts: minsAgo(60),
    },
    {
      id: "ana-6",
      conversationId: "conv-ana-costa",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Pronto, enviei o PDF aqui. Vencimento dia 10/05, valor R$ 1.650 + IPTU R$ 87. Linha digitável também tá na mensagem.",
      ts: minsAgo(58),
      status: "read",
    },
    {
      id: "ana-7",
      conversationId: "conv-ana-costa",
      direction: "inbound",
      sender: "lead",
      nome: "Ana Costa",
      content: "Recebi, obrigada! Posso pagar via PIX?",
      ts: minsAgo(50),
    },
    {
      id: "ana-8",
      conversationId: "conv-ana-costa",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Pode sim! O boleto tem PIX copia-e-cola no rodapé. Qualquer dúvida, é só me chamar.",
      ts: minsAgo(48),
      status: "delivered",
    },
  ],

  // ----- Pedro Souza · Instagram · vendas -----
  "conv-pedro-souza": [
    {
      id: "pedro-1",
      conversationId: "conv-pedro-souza",
      direction: "inbound",
      sender: "lead",
      nome: "Pedro Souza",
      content: "Bom dia! Vi o sobrado no Jardim Bandeirantes…",
      ts: minsAgo(90),
    },
    {
      id: "pedro-2",
      conversationId: "conv-pedro-souza",
      direction: "inbound",
      sender: "lead",
      nome: "Pedro Souza",
      content: "É aquele de R$ 620 mil com piscina, ainda está disponível?",
      ts: minsAgo(89),
    },
    {
      id: "pedro-3",
      conversationId: "conv-pedro-souza",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Olá Pedro! Está sim, é o sobrado da Rua das Acácias. 4 suítes, piscina aquecida, 320m² de área construída. Quer mais detalhes ou prefere já agendar uma visita?",
      ts: minsAgo(87),
      status: "read",
    },
    {
      id: "pedro-4",
      conversationId: "conv-pedro-souza",
      direction: "inbound",
      sender: "lead",
      nome: "Pedro Souza",
      content: "Tem financiamento direto com a construtora?",
      ts: minsAgo(80),
    },
    {
      id: "pedro-5",
      conversationId: "conv-pedro-souza",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "É revenda, não tem direto com construtora, mas trabalhamos com Caixa e Itaú. Com entrada de 20% (R$ 124 mil), a parcela fica em torno de R$ 4.300 em 360 meses (SAC).",
      ts: minsAgo(79),
      status: "read",
    },
    {
      id: "pedro-6",
      conversationId: "conv-pedro-souza",
      direction: "inbound",
      sender: "lead",
      nome: "Pedro Souza",
      content: "Dá pra visitar sexta à tarde?",
      ts: minsAgo(70),
    },
    {
      id: "pedro-7",
      conversationId: "conv-pedro-souza",
      direction: "outbound",
      sender: "ai",
      nome: "IA Dinamic",
      content:
        "Dá sim! Tenho 14h, 15h30 ou 17h. Qual fica melhor pra você?",
      ts: minsAgo(68),
      status: "read",
    },
    {
      id: "pedro-8",
      conversationId: "conv-pedro-souza",
      direction: "inbound",
      sender: "lead",
      nome: "Pedro Souza",
      content: "15h30 perfeito",
      ts: minsAgo(62),
    },
    {
      id: "pedro-9",
      conversationId: "conv-pedro-souza",
      direction: "outbound",
      sender: "corretor",
      nome: "Letícia (vendas)",
      content:
        "Oi Pedro, sou a Letícia, vou te receber sexta às 15h30. Te mando o pin do endereço uma hora antes!",
      ts: minsAgo(60),
      status: "delivered",
    },
  ],
};

// ============================================================
// RUNS_BY_CONVERSATION — 3-5 runs por conversa
// ============================================================
export const RUNS_BY_CONVERSATION: Record<string, AgentRun[]> = {
  [ACTIVE_CONVERSATION_ID]: AGENT_RUNS,

  "conv-joao-pereira": [
    {
      id: "joao-run-1",
      ts: minsAgo(20),
      action: "classify",
      detail: "Vendas · intenção média · Vale do Sol",
      tokensIn: 165,
      tokensOut: 38,
      costBRL: 0.0012,
    },
    {
      id: "joao-run-2",
      ts: minsAgo(17),
      action: "rag-search",
      detail: "2 sobrados match (3+ dorm · até R$ 480k · Vale do Sol)",
      tokensIn: 305,
      tokensOut: 72,
      costBRL: 0.0021,
    },
    {
      id: "joao-run-3",
      ts: minsAgo(9),
      action: "propose-visit",
      detail: "Sugeriu visita sábado manhã nos 2 imóveis",
      tokensIn: 142,
      tokensOut: 48,
      costBRL: 0.0011,
    },
    {
      id: "joao-run-4",
      ts: minsAgo(3),
      action: "collect-info",
      detail: "Capturou horário preferido (sábado AM)",
      tokensIn: 88,
      tokensOut: 22,
      costBRL: 0.0008,
    },
  ],

  "conv-carla-andrade": [
    {
      id: "carla-run-1",
      ts: minsAgo(47),
      action: "classify",
      detail: "Locação · intenção alta · Centro",
      tokensIn: 158,
      tokensOut: 40,
      costBRL: 0.0013,
    },
    {
      id: "carla-run-2",
      ts: minsAgo(44),
      action: "rag-search",
      detail: "3 aptos match (2 dorm · mobiliado · ≤ R$ 1.800)",
      tokensIn: 295,
      tokensOut: 68,
      costBRL: 0.002,
    },
    {
      id: "carla-run-3",
      ts: minsAgo(29),
      action: "collect-info",
      detail: "Confirmou preferência mobiliado + IPTU incluso",
      tokensIn: 112,
      tokensOut: 35,
      costBRL: 0.0009,
    },
    {
      id: "carla-run-4",
      ts: minsAgo(12),
      action: "propose-visit",
      detail: "Cliente sugeriu amanhã 10h — aguardando confirmação corretor",
      tokensIn: 130,
      tokensOut: 42,
      costBRL: 0.0011,
    },
  ],

  "conv-roberto-lima": [
    {
      id: "roberto-run-1",
      ts: minsAgo(57),
      action: "classify",
      detail: "Captação · intenção alta · Industrial",
      tokensIn: 172,
      tokensOut: 44,
      costBRL: 0.0014,
    },
    {
      id: "roberto-run-2",
      ts: minsAgo(52),
      action: "rag-search",
      detail: "Comparativo de mercado 2dorm Industrial 2026",
      tokensIn: 280,
      tokensOut: 95,
      costBRL: 0.0024,
    },
    {
      id: "roberto-run-3",
      ts: minsAgo(45),
      action: "collect-info",
      detail: "Capturou janela disponível (após 14h)",
      tokensIn: 95,
      tokensOut: 28,
      costBRL: 0.0009,
    },
    {
      id: "roberto-run-4",
      ts: minsAgo(40),
      action: "handoff",
      detail: "Transferido para Marcelo (captação Industrial)",
      tokensIn: 188,
      tokensOut: 38,
      costBRL: 0.0014,
    },
  ],

  "conv-ana-costa": [
    {
      id: "ana-run-1",
      ts: minsAgo(69),
      action: "classify",
      detail: "Financeiro · 2ª via boleto · contrato 2024-118",
      tokensIn: 145,
      tokensOut: 32,
      costBRL: 0.0011,
    },
    {
      id: "ana-run-2",
      ts: minsAgo(65),
      action: "rag-search",
      detail: "Consultou status boleto Asaas (maio/2026 emitido 25/04)",
      tokensIn: 220,
      tokensOut: 58,
      costBRL: 0.0017,
    },
    {
      id: "ana-run-3",
      ts: minsAgo(58),
      action: "collect-info",
      detail: "Reenviou PDF + linha digitável + PIX copia-e-cola",
      tokensIn: 175,
      tokensOut: 70,
      costBRL: 0.0018,
    },
    {
      id: "ana-run-4",
      ts: minsAgo(48),
      action: "classify",
      detail: "Conversa resolvida · sem handoff necessário",
      tokensIn: 90,
      tokensOut: 18,
      costBRL: 0.0008,
    },
  ],

  "conv-pedro-souza": [
    {
      id: "pedro-run-1",
      ts: minsAgo(87),
      action: "classify",
      detail: "Vendas · intenção alta · Jardim Bandeirantes",
      tokensIn: 168,
      tokensOut: 42,
      costBRL: 0.0013,
    },
    {
      id: "pedro-run-2",
      ts: minsAgo(79),
      action: "rag-search",
      detail: "Simulação financiamento Caixa/Itaú (entrada 20%, SAC 360m)",
      tokensIn: 340,
      tokensOut: 110,
      costBRL: 0.0029,
    },
    {
      id: "pedro-run-3",
      ts: minsAgo(68),
      action: "propose-visit",
      detail: "Ofereceu 3 horários sexta (14h / 15h30 / 17h)",
      tokensIn: 148,
      tokensOut: 50,
      costBRL: 0.0012,
    },
    {
      id: "pedro-run-4",
      ts: minsAgo(60),
      action: "handoff",
      detail: "Visita confirmada 15h30 → corretora Letícia (vendas)",
      tokensIn: 195,
      tokensOut: 44,
      costBRL: 0.0015,
    },
  ],
};
