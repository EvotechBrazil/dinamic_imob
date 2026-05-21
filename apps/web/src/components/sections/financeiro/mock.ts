/**
 * Mock data — Seção Financeiro
 * Dinamic Imobiliária / Arapongas-PR
 *
 * Squad C: somente lê tipos de @/lib/mock-types.
 * Tudo aqui é fictício mas realista (bairros, nomes, valores BR).
 */

import type { Boleto, ChartPoint, KPI } from "@/lib/mock-types";

// ============================================================
// KPIs financeiros (mês corrente — Maio/2026)
// ============================================================
export const FINANCEIRO_KPIS: KPI[] = [
  {
    label: "Receita do mês",
    value: "R$ 48.200",
    delta: 12,
    deltaType: "moderateIncrease",
    helper: "vs mês anterior",
  },
  {
    label: "A receber (próximos 30d)",
    value: "R$ 67.000",
    helper: "42 boletos em aberto",
  },
  {
    label: "Inadimplência",
    value: "2,8%",
    delta: -0.4,
    deltaType: "moderateDecrease",
    helper: "vs mês anterior",
    suffix: "%",
  },
  {
    label: "Repasses (proprietários)",
    value: "R$ 31.000",
    helper: "agendados p/ dia 10",
  },
];

// ============================================================
// Série Recebido vs Previsto — últimos 6 meses
// (valor = recebido, valor2 = previsto)
// ============================================================
export const FINANCEIRO_CHART: ChartPoint[] = [
  { label: "Dez/25", valor: 38900, valor2: 40500 },
  { label: "Jan/26", valor: 41200, valor2: 42800 },
  { label: "Fev/26", valor: 43500, valor2: 44600 },
  { label: "Mar/26", valor: 45100, valor2: 47200 },
  { label: "Abr/26", valor: 46800, valor2: 50100 },
  { label: "Mai/26", valor: 48200, valor2: 52400 },
];

// ============================================================
// Próximos vencimentos (5 boletos representativos)
// ============================================================
export const PROXIMOS_BOLETOS: Boleto[] = [
  {
    id: "blt-001",
    locatario: "Mariana Silva",
    imovel: "Apto 302, Centro",
    bairro: "Centro",
    valor: 2850,
    vencimento: "em 2 dias",
    status: "pendente",
  },
  {
    id: "blt-002",
    locatario: "João Pereira",
    imovel: "Casa 17, Jardim Tropical",
    bairro: "Jardim Tropical",
    valor: 3200,
    vencimento: "em 5 dias",
    status: "pendente",
  },
  {
    id: "blt-003",
    locatario: "Carla Andrade",
    imovel: "Apto 504, Jardim Universitário",
    bairro: "Jardim Universitário",
    valor: 1950,
    vencimento: "ontem",
    status: "vencido",
    diasAtraso: 1,
  },
  {
    id: "blt-004",
    locatario: "Roberto Lima",
    imovel: "Sala 12, Industrial",
    bairro: "Industrial",
    valor: 2400,
    vencimento: "pago em 18/05",
    status: "pago",
  },
  {
    id: "blt-005",
    locatario: "Ana Costa",
    imovel: "Apto 201, Vale do Sol",
    bairro: "Vale do Sol",
    valor: 1750,
    vencimento: "em 7 dias",
    status: "pendente",
  },
];
