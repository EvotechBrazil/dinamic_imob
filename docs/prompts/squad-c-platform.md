# Squad C — Platform (Tokenização + Jurídico + Dashboards)

> **Você é o Squad C.** Implementa as 3 seções que mostram a parte de plataforma/admin da Dinamic: monetização via tokens, gestão jurídica e visão consolidada. Espera o Squad A entregar setup mínimo antes de começar.

## Pré-requisito (BLOQUEANTE)

Antes de codar, garanta que existe o commit do Squad A com mensagem:

```
feat(landing/foundation): setup pronto — B e C podem começar
```

Faça:
```bash
cd "E:/Projetos/Dinamic_Imob"
git pull --rebase origin main
git log --oneline -5    # confirma "setup pronto" no log
pnpm install
cd apps/web && pnpm dev # confirma sobe em :3000
```

Se ainda não tem o commit do A, **aguarde**.

## Leitura obrigatória

1. `docs/prompts/coordenacao-3-squads.md` — regras anti-conflito
2. `docs/prompts/landing-demo-cliente.md` — briefing visual (seções 4, 5, 6)
3. `apps/web/src/lib/mock-types.ts` — tipos que VOCÊ DEVE USAR (não criar novos)

## Missão

Implementar 3 componentes React de seção + arquivo mock data próprio.

## Sua pasta exclusiva

```
apps/web/src/components/sections/tokenizacao/**
apps/web/src/components/sections/juridico/**
apps/web/src/components/sections/dashboards/**
apps/web/src/lib/mock-data-platform.ts
```

## Arquivos PROIBIDOS de tocar

- Tudo fora da sua pasta exclusiva
- Especialmente `apps/web/package.json`, `mock-types.ts`, `page.tsx`

## Tarefas

### Seção 4 — Central de Tokenização (`sections/tokenizacao/`)

**Mensagem:** "Você paga só o que usa de IA — modelo de cobrança por consumo, transparente."

Componentes:
- `index.tsx` — exporta `<TokenizacaoSection />`
- `balance-card.tsx` — card grande com saldo atual (R$ 284,50 em créditos) + barra de progresso (% restante do plano mensal) + último uso
- `consumption-chart.tsx` — LineChart Tremor 30 dias (uso diário em R$)
- `history-table.tsx` — últimas 10 conversas (data, conversa #, modelo, tokens IN/OUT, custo R$)
- `recharge-card.tsx` — botão grande "Recarregar" + 3 planos (R$50 / R$100 / R$200)
- `model-info.tsx` — info "Usamos OpenRouter — modelo qwen/qwen3.7-max" + selo "Cobrança auditável"

Mock (em mock-data-platform.ts):
```ts
export const tokenBalance = {
  saldo: 284.50,
  planoMensal: 500.00,
  consumoMes: 215.50,
  proximaRecarga: '2026-06-01',
};
export const consumoDiario: ChartPoint[] = [
  { label: '21/04', valor: 12.30 },
  { label: '22/04', valor: 8.50 },
  // ... 30 dias
];
export const historicoTokens: TokenRecord[] = [/* 10 itens */];
```

Visual:
- Layout grid 2 colunas (saldo + consumo à esquerda, recarga + info à direita)
- Cores: primary pra ações, accent pra "Recarregar"
- Tom comercial: "ROI claro" / "Sem mensalidade fixa"

### Seção 5 — Jurídico + LGPD (`sections/juridico/`)

**Mensagem:** "Contratos e privacidade sob controle — auditável e compliance LGPD nativo."

Componentes:
- `index.tsx` — exporta `<JuridicoSection />`
- `contracts-table.tsx` — tabela 10 contratos com colunas (Locatário, Imóvel, Período, Valor, Status badge, Ações: Ver/Renovar/Encerrar — ícones, sem ação real)
- `lgpd-cards.tsx` — grid 3 cards:
  - "Exportações de dados" (3 pendentes, badge âmbar)
  - "Pedidos de exclusão" (1 pendente, badge âmbar)
  - "Consentimentos ativos" (142, badge verde)
- `compliance-banner.tsx` — banner inferior com selos: "LGPD compliant", "Dados criptografados", "Audit log completo" + link "Ver política"
- `documents-stats.tsx` (opcional) — mini-stats: documentos assinados/mês, tempo médio assinatura, taxa de aceite

Mock (em mock-data-platform.ts):
```ts
export const contratos: Contract[] = [
  { id: '1', locatario: 'Mariana Silva', imovel: 'Apto 3 dorm Jd Tropical', periodoInicio: '2025-09-01', periodoFim: '2027-08-31', valor: 2200, status: 'ativo' },
  // ... 9 mais (mix ativo/vencendo/encerrado)
];
export const lgpdStats = {
  exportsPendentes: 3,
  deletesPendentes: 1,
  consentimentosAtivos: 142,
  ultimaAuditoria: '2026-05-15',
};
```

Visual:
- Cards LGPD com ícones lucide (FileDown, Trash2, Shield)
- Status badges: ativo=green, vencendo=amber, encerrado=slate
- Tom institucional/sério

### Seção 6 — Dashboards (`sections/dashboards/`)

**Mensagem:** "Visão consolidada num só olhar."

Componentes:
- `index.tsx` — exporta `<DashboardsSection />`
- `kpi-grid.tsx` — 6 KPI cards Tremor (Imóveis ativos 628, Leads no mês 142, Visitas agendadas 23, Conversão 23%, Receita R$ 48.2k, Inadimplência 2.8%)
- `leads-origin-donut.tsx` — DonutChart Tremor com 5 origens (Site/WhatsApp/Instagram/Facebook/Indicação)
- `trend-area-chart.tsx` — AreaChart Tremor "Tendência 30 dias" (leads + visitas + propostas, 3 séries)
- `top-bairros.tsx` (opcional) — lista top 5 bairros por número de leads

Mock (em mock-data-platform.ts):
```ts
export const kpisGerais: KPI[] = [
  { label: 'Imóveis ativos', value: 628, delta: 12 },
  { label: 'Leads no mês', value: 142, delta: 18 },
  // ...
];
export const leadsPorOrigem = [
  { origem: 'WhatsApp', valor: 58 },
  { origem: 'Site', valor: 42 },
  { origem: 'Instagram', valor: 28 },
  { origem: 'Facebook', valor: 9 },
  { origem: 'Indicação', valor: 5 },
];
export const tendencia30d: { dia: string; leads: number; visitas: number; propostas: number }[] = [/* 30 itens */];
```

Visual:
- Grid responsivo (3x2 ou 6x1 em mobile)
- Charts lado a lado em desktop
- Colors: primary (indigo) + accent (amber) + neutros

## Definition of Done

- [ ] 3 componentes `<TokenizacaoSection />`, `<JuridicoSection />`, `<DashboardsSection />` exportados
- [ ] Mock data populado com bairros reais Arapongas, valores condizentes
- [ ] Roda sem erro console (`pnpm dev`)
- [ ] Responsivo até 1024px
- [ ] Avisar Squad A no chat humano pra descomentar imports no `page.tsx`

## Commits

Prefixo obrigatório `feat(landing/platform):`. Sugestão: 1 commit por seção:
- `feat(landing/platform): seção Tokenização com saldo e histórico de consumo`
- `feat(landing/platform): seção Jurídico/LGPD com contratos e cards compliance`
- `feat(landing/platform): seção Dashboards com 6 KPIs e 2 charts`

Antes de commitar:
```bash
git pull --rebase origin main
git add apps/web/src/components/sections/tokenizacao apps/web/src/lib/mock-data-platform.ts
git commit -m "feat(landing/platform): ..."
git push origin main
```

## Quando tiver dúvida

- Falta dep? Pede no chat humano pro Squad A
- Tipo não tem? Pede pro A adicionar em `mock-types.ts`
- Mensagem comercial incerta? Olha `landing-demo-cliente.md`
