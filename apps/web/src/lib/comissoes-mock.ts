/**
 * Mock — Corretores + Comissões (6 meses de histórico).
 * Dinamic Imobiliária / Arapongas-PR.
 *
 * Valores fictícios mas calibrados pra realidade do mercado de Arapongas
 * (apto 2-3 dorm na faixa R$ 180-450k, locação R$ 1.500-3.500/mês,
 *  comissão vendas ~1.5% pro corretor, locação ~50-70% do 1º aluguel).
 *
 * Convenção: meses no formato "MMM/AA" (pt-BR). Status "pago" pra meses
 * fechados, "pendente" pra mês corrente (Mai/26).
 */
import type { ComissaoMensal, Corretor } from "@/lib/mock-types";

export const CORRETORES: Corretor[] = [
  {
    id: "cor-001",
    nome: "Carlos Almeida",
    setor: "vendas",
    creci: "47812-F",
    desde: "2019-03",
    nivel: "senior",
  },
  {
    id: "cor-002",
    nome: "Bruno Tavares",
    setor: "vendas",
    creci: "62.140-F",
    desde: "2023-08",
    nivel: "junior",
  },
  {
    id: "cor-003",
    nome: "Andréia Souza",
    setor: "locacao",
    creci: "51.207-F",
    desde: "2020-11",
    nivel: "senior",
  },
  {
    id: "cor-004",
    nome: "Patrícia Rocha",
    setor: "locacao",
    creci: "59.488-F",
    desde: "2022-05",
    nivel: "pleno",
  },
  {
    id: "cor-005",
    nome: "Felipe Martins",
    setor: "captacao",
    creci: "55.901-F",
    desde: "2021-09",
    nivel: "pleno",
  },
];

export const MESES_HISTORICO = [
  "Dez/25",
  "Jan/26",
  "Fev/26",
  "Mar/26",
  "Abr/26",
  "Mai/26",
] as const;

const PAGO_ATE = "Abr/26";

function st(mes: string): "pago" | "pendente" {
  return mes === "Mai/26" ? "pendente" : "pago";
}

export const COMISSOES: ComissaoMensal[] = [
  // Carlos Almeida — vendas sênior (top performer)
  { id: "com-001", corretorId: "cor-001", mes: "Dez/25", fechamentos: 2, vgvBRL: 580_000, comissaoBRL: 8_700, status: st("Dez/25") },
  { id: "com-002", corretorId: "cor-001", mes: "Jan/26", fechamentos: 3, vgvBRL: 720_000, comissaoBRL: 10_800, status: st("Jan/26") },
  { id: "com-003", corretorId: "cor-001", mes: "Fev/26", fechamentos: 1, vgvBRL: 340_000, comissaoBRL: 5_100, status: st("Fev/26") },
  { id: "com-004", corretorId: "cor-001", mes: "Mar/26", fechamentos: 4, vgvBRL: 920_000, comissaoBRL: 13_800, status: st("Mar/26") },
  { id: "com-005", corretorId: "cor-001", mes: "Abr/26", fechamentos: 3, vgvBRL: 680_000, comissaoBRL: 10_200, status: st("Abr/26") },
  { id: "com-006", corretorId: "cor-001", mes: "Mai/26", fechamentos: 2, vgvBRL: 460_000, comissaoBRL: 6_900, status: st("Mai/26") },

  // Bruno Tavares — vendas júnior
  { id: "com-007", corretorId: "cor-002", mes: "Dez/25", fechamentos: 1, vgvBRL: 280_000, comissaoBRL: 4_200, status: st("Dez/25") },
  { id: "com-008", corretorId: "cor-002", mes: "Jan/26", fechamentos: 2, vgvBRL: 410_000, comissaoBRL: 6_150, status: st("Jan/26") },
  { id: "com-009", corretorId: "cor-002", mes: "Fev/26", fechamentos: 2, vgvBRL: 380_000, comissaoBRL: 5_700, status: st("Fev/26") },
  { id: "com-010", corretorId: "cor-002", mes: "Mar/26", fechamentos: 1, vgvBRL: 220_000, comissaoBRL: 3_300, status: st("Mar/26") },
  { id: "com-011", corretorId: "cor-002", mes: "Abr/26", fechamentos: 3, vgvBRL: 540_000, comissaoBRL: 8_100, status: st("Abr/26") },
  { id: "com-012", corretorId: "cor-002", mes: "Mai/26", fechamentos: 2, vgvBRL: 360_000, comissaoBRL: 5_400, status: st("Mai/26") },

  // Andréia Souza — locação sênior (top performer locação)
  { id: "com-013", corretorId: "cor-003", mes: "Dez/25", fechamentos: 4, vgvBRL: 110_400, comissaoBRL: 4_600, status: st("Dez/25") },
  { id: "com-014", corretorId: "cor-003", mes: "Jan/26", fechamentos: 5, vgvBRL: 138_000, comissaoBRL: 5_800, status: st("Jan/26") },
  { id: "com-015", corretorId: "cor-003", mes: "Fev/26", fechamentos: 3, vgvBRL: 88_800, comissaoBRL: 3_700, status: st("Fev/26") },
  { id: "com-016", corretorId: "cor-003", mes: "Mar/26", fechamentos: 6, vgvBRL: 170_400, comissaoBRL: 7_100, status: st("Mar/26") },
  { id: "com-017", corretorId: "cor-003", mes: "Abr/26", fechamentos: 5, vgvBRL: 148_800, comissaoBRL: 6_200, status: st("Abr/26") },
  { id: "com-018", corretorId: "cor-003", mes: "Mai/26", fechamentos: 4, vgvBRL: 117_600, comissaoBRL: 4_900, status: st("Mai/26") },

  // Patrícia Rocha — locação pleno
  { id: "com-019", corretorId: "cor-004", mes: "Dez/25", fechamentos: 2, vgvBRL: 57_600, comissaoBRL: 2_400, status: st("Dez/25") },
  { id: "com-020", corretorId: "cor-004", mes: "Jan/26", fechamentos: 3, vgvBRL: 83_700, comissaoBRL: 3_500, status: st("Jan/26") },
  { id: "com-021", corretorId: "cor-004", mes: "Fev/26", fechamentos: 4, vgvBRL: 112_800, comissaoBRL: 4_700, status: st("Fev/26") },
  { id: "com-022", corretorId: "cor-004", mes: "Mar/26", fechamentos: 3, vgvBRL: 86_400, comissaoBRL: 3_600, status: st("Mar/26") },
  { id: "com-023", corretorId: "cor-004", mes: "Abr/26", fechamentos: 4, vgvBRL: 115_200, comissaoBRL: 4_800, status: st("Abr/26") },
  { id: "com-024", corretorId: "cor-004", mes: "Mai/26", fechamentos: 5, vgvBRL: 141_500, comissaoBRL: 5_900, status: st("Mai/26") },

  // Felipe Martins — captação (bônus fixo R$ 200/captação)
  { id: "com-025", corretorId: "cor-005", mes: "Dez/25", fechamentos: 6, vgvBRL: 0, comissaoBRL: 1_200, status: st("Dez/25") },
  { id: "com-026", corretorId: "cor-005", mes: "Jan/26", fechamentos: 8, vgvBRL: 0, comissaoBRL: 1_600, status: st("Jan/26") },
  { id: "com-027", corretorId: "cor-005", mes: "Fev/26", fechamentos: 5, vgvBRL: 0, comissaoBRL: 1_000, status: st("Fev/26") },
  { id: "com-028", corretorId: "cor-005", mes: "Mar/26", fechamentos: 9, vgvBRL: 0, comissaoBRL: 1_800, status: st("Mar/26") },
  { id: "com-029", corretorId: "cor-005", mes: "Abr/26", fechamentos: 7, vgvBRL: 0, comissaoBRL: 1_400, status: st("Abr/26") },
  { id: "com-030", corretorId: "cor-005", mes: "Mai/26", fechamentos: 6, vgvBRL: 0, comissaoBRL: 1_200, status: st("Mai/26") },
];

// ============================================================
// Helpers
// ============================================================
export function comissoesDoCorretor(corretorId: string): ComissaoMensal[] {
  return COMISSOES.filter((c) => c.corretorId === corretorId);
}

export function totalCorretor(corretorId: string): number {
  return comissoesDoCorretor(corretorId).reduce(
    (acc, c) => acc + c.comissaoBRL,
    0
  );
}

export function totalDoMes(mes: string): number {
  return COMISSOES.filter((c) => c.mes === mes).reduce(
    (acc, c) => acc + c.comissaoBRL,
    0
  );
}

export { PAGO_ATE };
