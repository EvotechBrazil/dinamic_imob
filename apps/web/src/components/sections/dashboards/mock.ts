/**
 * Mock data — Seção Dashboards (visão consolidada)
 * Dinamic Imobiliária / Arapongas-PR
 *
 * Fechamento da landing demo: visão executiva agregando outputs de TODOS os
 * módulos (Omnichannel, CRM, Financeiro, Jurídico, Tokenização) num só lugar.
 *
 * Squad Dashboards: só LÊ tipos de @/lib/mock-types.
 * Tudo aqui é fictício mas realista (bairros Arapongas, nomes BR, valores BR).
 */

import type { ChartPoint, KPI } from "@/lib/mock-types";

// ============================================================
// 6 KPIs consolidados (mês corrente — Maio/2026)
// Ordem: Home / Users / Calendar / TrendingUp / DollarSign / AlertTriangle
// ============================================================
export const DASHBOARD_KPIS: KPI[] = [
  {
    label: "Imóveis ativos",
    value: 628,
    delta: 12,
    deltaType: "increase",
    helper: "vs. mês anterior",
  },
  {
    label: "Leads no mês",
    value: 142,
    delta: 18,
    deltaType: "moderateIncrease",
    helper: "atribuídos por IA",
  },
  {
    label: "Visitas agendadas",
    value: 47,
    delta: 5,
    deltaType: "increase",
    helper: "confirmadas em 7d",
  },
  {
    label: "Conversão",
    value: 23,
    suffix: "%",
    delta: 2,
    deltaType: "moderateIncrease",
    helper: "lead → proposta",
  },
  {
    label: "Receita",
    value: "48.200",
    prefix: "R$ ",
    delta: 12,
    deltaType: "increase",
    helper: "locação + comissões",
  },
  {
    label: "Inadimplência",
    value: 2.8,
    suffix: "%",
    delta: -0.4,
    deltaType: "moderateDecrease",
    helper: "caiu pelo 3º mês",
  },
];

// ============================================================
// DonutChart — Leads por origem (5 fatias)
// Total: 142 leads no mês
// ============================================================
export const LEADS_BY_ORIGIN: Array<{
  name: string;
  value: number;
  color: string;
}> = [
  { name: "WhatsApp", value: 58, color: "indigo" },
  { name: "Instagram", value: 31, color: "pink" },
  { name: "Site (formulário)", value: 22, color: "amber" },
  { name: "Facebook", value: 18, color: "blue" },
  { name: "Indicação", value: 13, color: "emerald" },
];

// ============================================================
// AreaChart — Tendência de leads diários (30 dias)
// Soma exata: 142 · Pico: 9 em 28/05 · Tendência crescente leve
// ============================================================
export const TREND_30D: ChartPoint[] = [
  { label: "01/05", valor: 3 },
  { label: "02/05", valor: 4 },
  { label: "03/05", valor: 2 },
  { label: "04/05", valor: 5 },
  { label: "05/05", valor: 4 },
  { label: "06/05", valor: 3 },
  { label: "07/05", valor: 6 },
  { label: "08/05", valor: 5 },
  { label: "09/05", valor: 4 },
  { label: "10/05", valor: 7 },
  { label: "11/05", valor: 5 },
  { label: "12/05", valor: 4 },
  { label: "13/05", valor: 6 },
  { label: "14/05", valor: 5 },
  { label: "15/05", valor: 4 },
  { label: "16/05", valor: 6 },
  { label: "17/05", valor: 5 },
  { label: "18/05", valor: 3 },
  { label: "19/05", valor: 5 },
  { label: "20/05", valor: 4 },
  { label: "21/05", valor: 6 },
  { label: "22/05", valor: 5 },
  { label: "23/05", valor: 4 },
  { label: "24/05", valor: 6 },
  { label: "25/05", valor: 7 },
  { label: "26/05", valor: 5 },
  { label: "27/05", valor: 6 },
  { label: "28/05", valor: 9 },
  { label: "29/05", valor: 7 },
  { label: "30/05", valor: 4 },
];

// ============================================================
// DonutChart secundário — Distribuição por setor
// ============================================================
export const SETOR_DIST: Array<{
  name: string;
  value: number;
  color: string;
}> = [
  { name: "Vendas", value: 45, color: "indigo" },
  { name: "Locação", value: 38, color: "teal" },
  { name: "Captação", value: 12, color: "amber" },
  { name: "Financeiro", value: 5, color: "slate" },
];

// ============================================================
// Top 5 corretores do mês
// ============================================================
export const TOP_CORRETORES: Array<{
  name: string;
  leads: number;
  conversao: number;
}> = [
  { name: "Rodrigo Almeida", leads: 28, conversao: 32 },
  { name: "Patrícia Santos", leads: 24, conversao: 28 },
  { name: "Marcos Ferreira", leads: 19, conversao: 25 },
  { name: "Helena Costa", leads: 16, conversao: 30 },
  { name: "Caio Mendes", leads: 14, conversao: 22 },
];

// ============================================================
// Agregados pré-calculados (evita recálculo no client)
// ============================================================
export const TREND_TOTAL = TREND_30D.reduce((acc, p) => acc + p.valor, 0);
export const TREND_PEAK = Math.max(...TREND_30D.map((p) => p.valor));
export const TREND_PEAK_LABEL =
  TREND_30D.find((p) => p.valor === TREND_PEAK)?.label ?? "—";
export const TREND_AVG = +(TREND_TOTAL / TREND_30D.length).toFixed(1);

export const ORIGIN_TOTAL = LEADS_BY_ORIGIN.reduce(
  (acc, o) => acc + o.value,
  0
);
