/**
 * Catálogo Dinamic — texto estruturado pra injetar como contexto da IA.
 * USO SERVER-ONLY. Não importa nada client-side.
 *
 * A IA recebe esta string no system prompt e usa pra responder com imóveis REAIS
 * da base demo (mock), incluindo URL de foto, endereço e preço, e também
 * sobre comissões dos 5 corretores (6 meses de histórico).
 */
import { PROPERTIES } from "@/components/sections/crm/mock";
import {
  COMISSOES,
  CORRETORES,
  PAGO_ATE,
  comissoesDoCorretor,
  totalCorretor,
} from "@/lib/comissoes-mock";
import type { Property, Setor } from "@/lib/mock-types";

const fmtBRL = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });

function describe(p: Property): string {
  const preco =
    p.finalidade === "aluguel" ? `${fmtBRL(p.preco)}/mês` : fmtBRL(p.preco);
  const partes = [
    `[${p.id}] ${p.titulo}`,
    `tipo=${p.tipo}`,
    `finalidade=${p.finalidade}`,
    `preco=${preco}`,
    `bairro=${p.bairro}`,
    `endereco=${p.endereco ?? "-"}`,
    `dorm=${p.dormitorios}`,
    `ban=${p.banheiros ?? 0}`,
    `vaga=${p.vagas}`,
    `area=${p.area}m²`,
    `foto=${p.fotos[0] ?? ""}`,
  ];
  return partes.join(" | ");
}

const ESPECIALISTAS: Record<Setor, string> = {
  vendas: "Carlos Almeida (corretor de vendas, CRECI 47.812-F)",
  locacao: "Andréia Souza (especialista em locação)",
  captacao: "Felipe Martins (captação de imóveis)",
  financeiro: "Juliana Castro (financeiro de locação)",
  juridico: "Dra. Patrícia Soares (jurídico/contratos)",
};

function buildCorretoresBlock(): string {
  const linhasCorretores = CORRETORES.map((c) => {
    const total = totalCorretor(c.id);
    const meses = comissoesDoCorretor(c.id);
    const ultimo = meses[meses.length - 1];
    return `[${c.id}] ${c.nome} | setor=${c.setor} | CRECI ${c.creci ?? "-"} | nivel=${c.nivel} | desde=${c.desde} | total_6m=${fmtBRL(total)} | ultimo_mes(${ultimo.mes})=${fmtBRL(ultimo.comissaoBRL)} ${ultimo.status}`;
  }).join("\n");

  const linhasComissoes = COMISSOES.map((c) => {
    const corretor = CORRETORES.find((x) => x.id === c.corretorId);
    const vgv = c.vgvBRL > 0 ? ` | VGV=${fmtBRL(c.vgvBRL)}` : "";
    return `[${c.id}] ${corretor?.nome ?? c.corretorId} | ${c.mes} | fechamentos=${c.fechamentos}${vgv} | comissao=${fmtBRL(c.comissaoBRL)} | status=${c.status}`;
  }).join("\n");

  return [
    `CORRETORES ATIVOS (5 — todos com CRECI ativo). Comissões pagas até ${PAGO_ATE}; Mai/26 ainda pendente:`,
    linhasCorretores,
    "",
    "COMISSÕES — histórico mensal (6 meses, Dez/25 → Mai/26):",
    "Regra: vendas = ~1,5% do VGV pro corretor; locação = ~50% do 1º aluguel (valor anual no campo VGV); captação = R$ 200 fixo por imóvel captado.",
    linhasComissoes,
  ].join("\n");
}

export function buildCatalogContext(): string {
  const linhas = PROPERTIES.map(describe).join("\n");

  return [
    "CATÁLOGO ATIVO DA DINAMIC (12 imóveis demo — use APENAS estes ao recomendar):",
    linhas,
    "",
    "ROUTING POR SETOR (quando agendar visita, encaminhe pro especialista correto):",
    `- Aluguel/Locação → ${ESPECIALISTAS.locacao} · WhatsApp (43) 98847-8670`,
    `- Venda/Compra → ${ESPECIALISTAS.vendas} · WhatsApp (43) 98847-8713`,
    `- Captação → ${ESPECIALISTAS.captacao}`,
    `- Financeiro/Boletos → ${ESPECIALISTAS.financeiro}`,
    "",
    "AGENDA DE VISITAS:",
    "- Segunda a sexta: 9h-12h e 14h-18h",
    "- Sábado: 9h-12h",
    "- Domingo: fechado",
    "",
    buildCorretoresBlock(),
    "",
    "Quando perguntarem sobre comissão, corretor, ranking, top performer, total pago ou fechamentos, RESPONDA com base nos dados acima — somando, comparando ou rankeando conforme a pergunta. Sempre cite o nome do corretor e o valor exato em R$.",
  ].join("\n");
}
