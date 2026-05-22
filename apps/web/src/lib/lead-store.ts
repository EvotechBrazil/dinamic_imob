/**
 * Lead store server-side (in-memory) — seed do KANBAN_LEADS + addLead pelo agendamento.
 * USO SERVER-ONLY. Demo: persistência some no restart. Produção: Redis/Postgres.
 */
import { KANBAN_LEADS } from "@/components/sections/crm/mock";
import type {
  IntencaoLead,
  Lead,
  LeadStatus,
  Setor,
} from "@/lib/mock-types";

interface StoredLead extends Lead {
  addedAt?: number;
}

const STATUS_ORDER: LeadStatus[] = [
  "novo",
  "contatado",
  "qualificado",
  "visita",
  "proposta",
  "fechado",
  "perdido",
];

// Singleton module-level Map. Hot reload em dev pode duplicar — uso global pra evitar.
const G = globalThis as unknown as {
  __dinamicLeadStore?: Map<string, StoredLead>;
};

function getStore(): Map<string, StoredLead> {
  if (!G.__dinamicLeadStore) {
    const m = new Map<string, StoredLead>();
    for (const s of STATUS_ORDER) {
      for (const lead of KANBAN_LEADS[s]) {
        m.set(lead.id, { ...lead });
      }
    }
    G.__dinamicLeadStore = m;
  }
  return G.__dinamicLeadStore;
}

export function listLeads(): StoredLead[] {
  return Array.from(getStore().values());
}

export interface AddLeadInput {
  nome: string;
  whatsapp: string;
  imovelId: string;
  bairro: string;
  preco: number;
  finalidade: "aluguel" | "venda";
}

function avatarFor(nome: string): string {
  // hash simples → pravatar (1–70)
  let h = 0;
  for (let i = 0; i < nome.length; i++) h = (h * 31 + nome.charCodeAt(i)) >>> 0;
  const idx = (h % 70) + 1;
  return `https://i.pravatar.cc/150?img=${idx}`;
}

export function addLead(input: AddLeadInput): StoredLead {
  const store = getStore();
  const id = `ld-ai-${Date.now().toString(36)}`;
  const intencao: IntencaoLead = input.finalidade === "aluguel" ? "aluguel" : "compra";
  const setor: Setor = input.finalidade === "aluguel" ? "locacao" : "vendas";

  const lead: StoredLead = {
    id,
    nome: input.nome,
    avatarUrl: avatarFor(input.nome),
    bairro: input.bairro,
    orcamento: input.preco,
    intencao,
    status: "visita",
    setor,
    ultimaInteracao: "agora",
    addedAt: Date.now(),
  };

  store.set(id, lead);
  return lead;
}
