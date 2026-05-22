/**
 * Mock data — Seção Tokenização IA
 * Dinamic Imobiliária / Arapongas-PR
 *
 * Modelo de monetização: cliente compra "créditos IA" (tokens prepagos via
 * OpenRouter — família Qwen: Flash, Plus e 3.7 Max) e consome conforme
 * atende leads.
 *
 * Squad: somente lê tipos de @/lib/mock-types.
 * Tudo aqui é fictício mas realista (custos, modelos, tokens).
 */

import type { ChartPoint, KPI, TokenRecord } from "@/lib/mock-types";

// ============================================================
// Saldo / consumo (brief Sub-agent)
// ============================================================
export const SALDO_ATUAL = 284.5; // R$
export const SALDO_INICIAL_MES = 500.0; // R$
export const CONSUMO_MES = 215.5; // R$
export const MEDIA_DIA = 7.18; // R$/dia
export const TOKENS_USADOS_MES = 4_280_000; // tokens totais

// Aliases legados (mantidos pra não quebrar imports antigos)
export const SALDO_ATUAL_BRL = SALDO_ATUAL;
export const SALDO_INICIAL_BRL = SALDO_INICIAL_MES;
export const SALDO_TOKENS = 14225;
export const SALDO_PERCENT = Math.round(
  (SALDO_ATUAL / SALDO_INICIAL_MES) * 100,
);
export const CUSTO_MEDIO_CONVERSA_BRL = 0.02;
export const CONVERSAS_HOJE = 47;

// ============================================================
// KPIs (4 cards: Saldo / Consumo mês / Média dia / Tokens)
// ============================================================
export const TOKENIZACAO_KPIS: KPI[] = [
  {
    label: "Saldo atual",
    value: "R$ 284,50",
    delta: -8,
    deltaType: "moderateDecrease",
    helper: "57% do pacote restante",
  },
  {
    label: "Consumo do mês",
    value: "R$ 215,50",
    delta: 12,
    deltaType: "moderateIncrease",
    helper: "vs R$ 192 em abr/2026",
  },
  {
    label: "Média diária",
    value: "R$ 7,18",
    helper: "Últimos 30 dias",
  },
  {
    label: "Tokens usados",
    value: "4.28M",
    helper: "≈ 2.150 conversas",
  },
];

// ============================================================
// Consumo diário — 30 pontos (R$ por dia)
// Labels 01/05 .. 30/05; valores entre 4 e 12 com leve tendência de alta
// ============================================================
const CONSUMO_DIARIO_VALORES: number[] = [
  4.2, 5.1, 4.8, 5.6, 6.0, 5.3, 6.4, 6.9, 5.8, 7.1, 7.4, 6.7, 7.9, 8.2, 7.5,
  8.6, 9.1, 8.0, 9.4, 9.8, 8.8, 10.1, 11.5, 9.2, 10.4, 10.7, 9.6, 11.2, 11.8,
  10.9,
];

export const CONSUMO_DIARIO: ChartPoint[] = CONSUMO_DIARIO_VALORES.map(
  (valor, idx) => ({
    label: `${String(idx + 1).padStart(2, "0")}/05`,
    valor,
  }),
);

// Alias legado pra compatibilidade
export const CONSUMO_DIARIO_CHART = CONSUMO_DIARIO;

// ============================================================
// Top modelos (mantido — usado em ProviderInfo)
// ============================================================
export interface TopModelo {
  nome: string;
  slug: string;
  percent: number;
  custoBRL: number;
  cor: "indigo" | "sky" | "amber";
}

export const TOP_MODELOS: TopModelo[] = [
  {
    nome: "Qwen 3.7 Max",
    slug: "qwen/qwen3.7-max",
    percent: 87,
    custoBRL: 198.4,
    cor: "indigo",
  },
  {
    nome: "Qwen Flash",
    slug: "qwen/qwen3.6-flash",
    percent: 10,
    custoBRL: 22.3,
    cor: "sky",
  },
  {
    nome: "Qwen Plus",
    slug: "qwen/qwen3.6-plus",
    percent: 3,
    custoBRL: 6.8,
    cor: "amber",
  },
];

// ============================================================
// Histórico — 10 transações recentes (TokenRecord)
// ============================================================
const HOJE = new Date("2026-05-21T18:00:00-03:00");

function tsAtras(horas: number, minutos: number): string {
  const d = new Date(HOJE);
  d.setHours(d.getHours() - horas);
  d.setMinutes(d.getMinutes() - minutos);
  return d.toISOString();
}

export const TOKEN_HISTORICO: TokenRecord[] = [
  {
    id: "tk-001",
    ts: tsAtras(0, 4),
    conversa: "Conversa #ABC1234",
    modelo: "qwen3.7-max",
    tokensIn: 412,
    tokensOut: 168,
    costBRL: 0.018,
  },
  {
    id: "tk-002",
    ts: tsAtras(0, 11),
    conversa: "Conversa #DEF5678",
    modelo: "qwen3.7-max",
    tokensIn: 287,
    tokensOut: 94,
    costBRL: 0.012,
  },
  {
    id: "tk-003",
    ts: tsAtras(0, 19),
    conversa: "Conversa #GHI9012",
    modelo: "qwen-flash",
    tokensIn: 643,
    tokensOut: 215,
    costBRL: 0.024,
  },
  {
    id: "tk-004",
    ts: tsAtras(0, 27),
    conversa: "Conversa #JKL3456",
    modelo: "qwen3.7-max",
    tokensIn: 198,
    tokensOut: 71,
    costBRL: 0.008,
  },
  {
    id: "tk-005",
    ts: tsAtras(0, 38),
    conversa: "Conversa #MNO7890",
    modelo: "qwen3.7-max",
    tokensIn: 372,
    tokensOut: 142,
    costBRL: 0.016,
  },
  {
    id: "tk-006",
    ts: tsAtras(0, 52),
    conversa: "Conversa #PQR2345",
    modelo: "qwen3.7-max",
    tokensIn: 356,
    tokensOut: 142,
    costBRL: 0.015,
  },
  {
    id: "tk-007",
    ts: tsAtras(1, 9),
    conversa: "Conversa #STU6789",
    modelo: "qwen3.7-max",
    tokensIn: 521,
    tokensOut: 197,
    costBRL: 0.022,
  },
  {
    id: "tk-008",
    ts: tsAtras(1, 24),
    conversa: "Conversa #VWX0123",
    modelo: "qwen-flash",
    tokensIn: 467,
    tokensOut: 153,
    costBRL: 0.019,
  },
  {
    id: "tk-009",
    ts: tsAtras(2, 47),
    conversa: "Conversa #YZA4567",
    modelo: "qwen3.7-max",
    tokensIn: 318,
    tokensOut: 108,
    costBRL: 0.013,
  },
  {
    id: "tk-010",
    ts: tsAtras(5, 12),
    conversa: "Conversa #BCD8901",
    modelo: "qwen3.7-max",
    tokensIn: 234,
    tokensOut: 89,
    costBRL: 0.01,
  },
];

// Alias legado
export const ULTIMAS_INTERACOES = TOKEN_HISTORICO;

// ============================================================
// Helpers de formatação
// ============================================================
export function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}
