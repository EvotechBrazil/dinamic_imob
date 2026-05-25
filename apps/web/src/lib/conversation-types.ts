import type { Conversation, ChatMessage } from "@/lib/mock-types";

export interface StoredConversation extends Conversation {
  messages: ChatMessage[];
  /** Lead vinculado (quando agendamento foi confirmado). */
  leadId?: string;
  /** Identificador do navegador (gerado client-side, persistido no localStorage). */
  sessionId?: string;
  /** Conversa gerou agendamento de visita. */
  hasBooking: boolean;
  contactPhone?: string;
  contactEmail?: string;
  /** epoch ms */
  createdAt: number;
  lastMessageAt: number;
}

export interface ConversationSummary extends Conversation {
  hasBooking: boolean;
  leadId?: string;
  lastMessageAt: number;
  preview: string;
}
