/**
 * Conversation store server-side (in-memory) — seed do CONVERSATIONS +
 * MESSAGES_BY_CONVERSATION do mock omnichannel; novas conversas chegam via
 * chat IA do /portal e ficam persistidas até restart.
 * USO SERVER-ONLY. Demo: persistência some no restart. Produção: Postgres.
 */
import {
  CONVERSATIONS,
  MESSAGES_BY_CONVERSATION,
} from "@/components/sections/omnichannel/mock";
import type {
  ChannelType,
  ChatMessage,
  Conversation,
  MessageDirection,
  MessageSender,
  Setor,
} from "@/lib/mock-types";
import type {
  ConversationSummary,
  StoredConversation,
} from "@/lib/conversation-types";

// Singleton module-level Map. Hot reload em dev pode duplicar — uso global pra evitar.
const G = globalThis as unknown as {
  __dinamicConversationStore?: Map<string, StoredConversation>;
};

function avatarFor(nome: string): string {
  // hash simples → pravatar (1–70)
  let h = 0;
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0;
  const idx = (h % 70) + 1;
  return `https://i.pravatar.cc/150?img=${idx}`;
}

function randomShort(): string {
  return Math.random().toString(36).slice(2, 6);
}

function previewOf(content: string): string {
  return content.length > 80 ? content.slice(0, 80) : content;
}

function seedConversation(conv: Conversation): StoredConversation {
  const seededMessages: ChatMessage[] = MESSAGES_BY_CONVERSATION[conv.id] ?? [];

  // createdAt = primeira mensagem; lastMessageAt = última.
  // Fallback: Date.now() pra ambos.
  let createdAt = Date.now();
  let lastMessageAt = Date.now();

  if (seededMessages.length > 0) {
    const timestamps = seededMessages
      .map((m) => Date.parse(m.ts))
      .filter((t) => !Number.isNaN(t));
    if (timestamps.length > 0) {
      createdAt = Math.min(...timestamps);
      lastMessageAt = Math.max(...timestamps);
    }
  }

  return {
    ...conv,
    avatarUrl: conv.avatarUrl || avatarFor(conv.nome),
    messages: seededMessages,
    hasBooking: false,
    createdAt,
    lastMessageAt,
  };
}

function getStore(): Map<string, StoredConversation> {
  if (!G.__dinamicConversationStore) {
    const m = new Map<string, StoredConversation>();
    for (const conv of CONVERSATIONS) {
      m.set(conv.id, seedConversation(conv));
    }
    G.__dinamicConversationStore = m;
  }
  return G.__dinamicConversationStore;
}

export interface CreateConversationInput {
  channel: ChannelType;
  contactName?: string;
  contactPhone?: string;
  sessionId?: string;
  setor?: Setor;
  bairroInteresse?: string;
  orcamento?: number;
}

export function createConversation(
  input: CreateConversationInput,
): StoredConversation {
  const store = getStore();

  let nome = input.contactName?.trim();
  if (!nome) {
    if (input.channel === "web") {
      let webCount = 0;
      for (const c of store.values()) {
        if (c.canal === "web") webCount++;
      }
      nome = `Visitante #${webCount + 1}`;
    } else {
      nome = "Contato sem nome";
    }
  }

  const id = `cv-${Date.now().toString(36)}-${randomShort()}`;
  const now = Date.now();

  const conv: StoredConversation = {
    id,
    nome,
    canal: input.channel,
    avatarUrl: avatarFor(nome),
    ultimaMsg: "—",
    horaRelativa: "agora",
    naoLidas: input.channel === "web" ? 0 : 1,
    setor: input.setor ?? "vendas",
    status: "pending",
    bairroInteresse: input.bairroInteresse,
    orcamento: input.orcamento,
    messages: [],
    hasBooking: false,
    contactPhone: input.contactPhone,
    sessionId: input.sessionId,
    createdAt: now,
    lastMessageAt: now,
  };

  store.set(id, conv);
  return conv;
}

export interface AppendMessageInput {
  direction: MessageDirection;
  sender: MessageSender;
  content: string;
  nome?: string;
}

export function appendMessage(
  conversationId: string,
  msg: AppendMessageInput,
): ChatMessage {
  const store = getStore();
  const conv = store.get(conversationId);
  if (!conv) {
    throw new Error(`[conversation-store] conversa ${conversationId} não encontrada`);
  }

  const message: ChatMessage = {
    id: `msg-${Date.now()}-${randomShort()}`,
    conversationId,
    direction: msg.direction,
    sender: msg.sender,
    nome: msg.nome,
    content: msg.content,
    ts: new Date().toISOString(),
    status: msg.direction === "outbound" ? "sent" : undefined,
  };

  conv.messages.push(message);
  conv.lastMessageAt = Date.now();
  conv.ultimaMsg = previewOf(msg.content);
  conv.horaRelativa = "agora";

  if (msg.direction === "inbound" && conv.status !== "open") {
    conv.naoLidas += 1;
  }

  return message;
}

export function listConversations(): ConversationSummary[] {
  const all = Array.from(getStore().values());
  all.sort((a, b) => b.lastMessageAt - a.lastMessageAt);
  return all.map((c) => ({
    id: c.id,
    nome: c.nome,
    canal: c.canal,
    avatarUrl: c.avatarUrl,
    ultimaMsg: c.ultimaMsg,
    horaRelativa: c.horaRelativa,
    naoLidas: c.naoLidas,
    setor: c.setor,
    status: c.status,
    bairroInteresse: c.bairroInteresse,
    orcamento: c.orcamento,
    hasBooking: c.hasBooking,
    leadId: c.leadId,
    lastMessageAt: c.lastMessageAt,
    preview: c.ultimaMsg,
  }));
}

export function getConversation(id: string): StoredConversation | null {
  return getStore().get(id) ?? null;
}

export function bindLeadToConversation(
  conversationId: string,
  leadId: string,
): void {
  const conv = getStore().get(conversationId);
  if (!conv) return;
  conv.leadId = leadId;
}

export function markConversationHasBooking(conversationId: string): void {
  const conv = getStore().get(conversationId);
  if (!conv) return;
  conv.hasBooking = true;
}

export function markConversationRead(conversationId: string): void {
  const conv = getStore().get(conversationId);
  if (!conv) return;
  conv.naoLidas = 0;
  conv.status = "open";
}

export function findConversationBySession(
  sessionId: string,
): StoredConversation | null {
  for (const conv of getStore().values()) {
    if (conv.sessionId === sessionId) return conv;
  }
  return null;
}
