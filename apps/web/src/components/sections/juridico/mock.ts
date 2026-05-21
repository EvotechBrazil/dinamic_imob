/**
 * Mock data — Seção 5 Jurídico + LGPD
 * Squad sub-agente Jurídico — landing demo Dinamic Imobiliária.
 *
 * Contratos de locação + solicitações LGPD (Lei Geral de Proteção de Dados).
 * Bairros reais de Arapongas-PR.
 */

import type { Contract, KPI, LGPDRequest } from "@/lib/mock-types";

// ============================================================
// KPIs (4 itens)
// ============================================================
export const JURIDICO_KPIS: KPI[] = [
  {
    label: "Contratos ativos",
    value: 142,
    delta: 6,
    deltaType: "moderateIncrease",
    helper: "vs. mês anterior",
  },
  {
    label: "Vencendo (30d)",
    value: 8,
    helper: "3 sem renovação automática",
  },
  {
    label: "Solicitações LGPD pendentes",
    value: 4,
    helper: "SLA legal: 15 dias úteis",
  },
  {
    label: "Consentimentos ativos",
    value: 487,
    delta: 12,
    deltaType: "increase",
    helper: "em 3 versões da política",
  },
];

// helpers de data — ISO string
const iso = (year: number, month: number, day: number) =>
  new Date(year, month - 1, day).toISOString();

// ============================================================
// Contratos (10 — 6 ativos / 3 vencendo / 1 encerrado)
// ============================================================
export const CONTRACTS: Contract[] = [
  // ativos (6)
  {
    id: "ct-001",
    locatario: "Mariana Silva",
    imovel: "Apto 302, Ed. Solar Central",
    bairro: "Centro",
    periodoInicio: iso(2025, 3, 15),
    periodoFim: iso(2027, 3, 14),
    valor: 2200,
    status: "ativo",
  },
  {
    id: "ct-002",
    locatario: "João Pereira",
    imovel: "Casa 17, Rua das Acácias",
    bairro: "Jardim Tropical",
    periodoInicio: iso(2024, 11, 1),
    periodoFim: iso(2026, 10, 31),
    valor: 1850,
    status: "ativo",
  },
  {
    id: "ct-003",
    locatario: "Carla Andrade",
    imovel: "Apto 504, Ed. Bandeirantes",
    bairro: "Jardim Bandeirantes",
    periodoInicio: iso(2025, 7, 10),
    periodoFim: iso(2027, 7, 9),
    valor: 1680,
    status: "ativo",
  },
  {
    id: "ct-004",
    locatario: "Rafael Moreira",
    imovel: "Sobrado, Rua das Palmeiras",
    bairro: "Vale do Sol",
    periodoInicio: iso(2025, 1, 20),
    periodoFim: iso(2027, 1, 19),
    valor: 3100,
    status: "ativo",
  },
  {
    id: "ct-005",
    locatario: "Beatriz Tanaka",
    imovel: "Apto 201, Res. Universitário",
    bairro: "Jardim Universitário",
    periodoInicio: iso(2024, 8, 5),
    periodoFim: iso(2026, 8, 4),
    valor: 1520,
    status: "ativo",
  },
  {
    id: "ct-006",
    locatario: "Eduardo Lima",
    imovel: "Galpão Comercial 4B",
    bairro: "Industrial",
    periodoInicio: iso(2024, 5, 1),
    periodoFim: iso(2027, 4, 30),
    valor: 3500,
    status: "ativo",
  },
  // vencendo (3) — fim em 30-90 dias a partir de 2026-05-21
  {
    id: "ct-007",
    locatario: "Patrícia Nogueira",
    imovel: "Apto 102, Ed. Aeroporto Plaza",
    bairro: "Aeroporto",
    periodoInicio: iso(2024, 6, 15),
    periodoFim: iso(2026, 6, 14),
    valor: 1750,
    status: "vencendo",
  },
  {
    id: "ct-008",
    locatario: "Lucas Ribeiro",
    imovel: "Casa 32, Rua Industrial",
    bairro: "Vila Industrial",
    periodoInicio: iso(2024, 7, 1),
    periodoFim: iso(2026, 6, 30),
    valor: 1980,
    status: "vencendo",
  },
  {
    id: "ct-009",
    locatario: "Aline Castro",
    imovel: "Apto 401, Ed. Tropical",
    bairro: "Jardim Tropical",
    periodoInicio: iso(2024, 8, 12),
    periodoFim: iso(2026, 8, 11),
    valor: 1650,
    status: "vencendo",
  },
  // encerrado (1)
  {
    id: "ct-010",
    locatario: "Marcos Vinícius",
    imovel: "Apto 103, Ed. Centro",
    bairro: "Centro",
    periodoInicio: iso(2023, 4, 1),
    periodoFim: iso(2025, 3, 31),
    valor: 1450,
    status: "encerrado",
  },
];

// ============================================================
// Solicitações LGPD (6)
// ============================================================
export const LGPD_REQUESTS: LGPDRequest[] = [
  {
    id: "lgpd-001",
    tipo: "export",
    titular: "Fernanda Cordeiro",
    dataAbertura: iso(2026, 5, 19),
    status: "pendente",
  },
  {
    id: "lgpd-002",
    tipo: "export",
    titular: "Ricardo Mendes",
    dataAbertura: iso(2026, 5, 17),
    status: "pendente",
  },
  {
    id: "lgpd-003",
    tipo: "export",
    titular: "Juliana Borges",
    dataAbertura: iso(2026, 5, 14),
    status: "pendente",
  },
  {
    id: "lgpd-004",
    tipo: "delete",
    titular: "Gustavo Almeida",
    dataAbertura: iso(2026, 5, 12),
    status: "pendente",
  },
  {
    id: "lgpd-005",
    tipo: "consent_revoke",
    titular: "Daniela Souza",
    dataAbertura: iso(2026, 5, 8),
    status: "concluido",
  },
  {
    id: "lgpd-006",
    tipo: "export",
    titular: "Henrique Vasconcelos",
    dataAbertura: iso(2026, 5, 6),
    status: "concluido",
  },
];

export const CONSENTIMENTOS_ATIVOS = 487;
export const POLITICAS_VERSIONADAS = 3;
