# Squad B — Commercial (Omnichannel + Financeiro + CRM)

> **Você é o Squad B.** Implementa as 3 seções que mostram a operação comercial da Dinamic. Espera o Squad A entregar setup mínimo antes de começar.

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
pnpm install            # garante deps
cd apps/web && pnpm dev # confirma sobe em :3000
```

Se ainda não tem o commit do A, **aguarde** (não invente arquivos compartilhados).

## Leitura obrigatória

1. `docs/prompts/coordenacao-3-squads.md` — regras anti-conflito
2. `docs/prompts/landing-demo-cliente.md` — briefing visual (seções 1, 2, 3)
3. `apps/web/src/lib/mock-types.ts` — tipos TS que VOCÊ DEVE USAR (não criar novos)
4. `vendor/jpasv-chat-bullq/web/src/app/(dashboard)/inbox/page.tsx` — **referência visual** pra seção Omnichannel (NÃO importar código, só replicar layout 3 colunas)
5. `vendor/jpasv-chat-bullq/web/src/features/inbox/components/` se existir — mais referência visual

## Missão

Implementar 3 componentes React de seção da landing + arquivo de mock data próprio.

## Sua pasta exclusiva

```
apps/web/src/components/sections/omnichannel/**
apps/web/src/components/sections/financeiro/**
apps/web/src/components/sections/crm/**
apps/web/src/lib/mock-data-commercial.ts
```

## Arquivos PROIBIDOS de tocar

- Tudo fora da sua pasta exclusiva.
- Em especial:
  - `apps/web/package.json` — se faltar dep, **pede no chat humano pro Squad A adicionar**
  - `apps/web/src/lib/mock-types.ts` — só leitura
  - `apps/web/src/app/page.tsx` — Squad A descomenta seus imports quando você commitar

## Tarefas

### Seção 1 — Omnichannel (`sections/omnichannel/`)

**Layout 3 colunas (ver coordenação.md e landing-demo-cliente.md):**

```
┌─────────────┬─────────────────┬─────────────────┐
│ Conversation│ Chat Panel      │ Agent Runs      │
│ List        │ (selecionada)   │ Sidebar         │
└─────────────┴─────────────────┴─────────────────┘
```

Componentes a criar:
- `index.tsx` — exporta `<OmnichannelSection />`
- `conversation-list.tsx` — lista de 6 conversas filtráveis por canal (tabs: Todos, WhatsApp, Instagram, Facebook)
- `chat-panel.tsx` — header (avatar + nome + canal + setor badge) + bolhas (8 mensagens mock pra conversa selecionada) + input fake (não funcional)
- `agent-runs-sidebar.tsx` — 4 entradas mock mostrando o que a IA fez (classify → rag-search → propose-visit → handoff) com tokens + custo
- `chat-bubble.tsx` — variantes user/ai/corretor

Mock conversas (em mock-data-commercial.ts):
```ts
export const conversations: Conversation[] = [
  { id: '1', nome: 'Mariana Silva', canal: 'whatsapp', avatarUrl: 'https://i.pravatar.cc/...', ultimaMsg: 'Tem casa Centro até 350k?', horaRelativa: '14:32', naoLidas: 2, setor: 'vendas', status: 'open' },
  // ... mais 5: João/Instagram/locacao, Carla/WhatsApp/locacao, Roberto/Facebook/vendas, Ana/WhatsApp/locacao, Pedro/Instagram/captacao
];
```

Visual:
- Coluna esquerda 280px, central flex-1, direita 320px (toggleable)
- Avatares circulares; canal aparece como ícone pequeno sobre o avatar
- Badge setor com cor (vendas=indigo, locacao=teal, captacao=amber, financeiro=slate)
- Bolhas: ai = bg-primary/10 com borda primary, corretor = bg-accent/10, lead = bg-surface com borda

Use Origin UI / shadcn Tabs, Avatar, Badge, ScrollArea.

### Seção 2 — Financeiro (`sections/financeiro/`)

Componentes:
- `index.tsx` — exporta `<FinanceiroSection />`
- `kpi-grid.tsx` — 4 cards Tremor (Card + Metric + BadgeDelta)
- `receivable-chart.tsx` — AreaChart Tremor "Recebido vs Previsto" últimos 6 meses
- `boletos-table.tsx` — tabela com 5 boletos vencendo (locatário, imóvel, valor R$, vencimento, status badge)
- `ai-cta.tsx` — botão "Pergunte à IA sobre este financeiro" que abre o ChatWidget (use evento custom ou estado global simples — alternativa: scroll para o widget e dispara prompt pré-preenchido)

Mock (em mock-data-commercial.ts):
```ts
export const kpisFinanceiro: KPI[] = [
  { label: 'Receita mês', value: 'R$ 48.200', delta: 8, deltaType: 'increase' },
  { label: 'A receber', value: 'R$ 67.000', delta: 0, deltaType: 'unchanged' },
  { label: 'Inadimplência', value: '2.8%', delta: -0.4, deltaType: 'moderateDecrease' },
  { label: 'Repasses', value: 'R$ 31.000', delta: 12, deltaType: 'increase' },
];
export const recebidoVsPrevisto: ChartPoint[] = [
  { label: 'Dez', valor: 45200, valor2: 48000 },
  { label: 'Jan', valor: 47800, valor2: 48000 },
  // ... 6 meses
];
export const boletosVencendo: Boleto[] = [/* 5 itens */];
```

### Seção 3 — CRM (`sections/crm/`)

Componentes:
- `index.tsx` — exporta `<CRMSection />`
- `kanban.tsx` — 5 colunas (Novo, Contatado, Qualificado, Visita, Proposta) com 3-5 leads cada (visual estático, sem drag — opcionalmente dnd-kit pra demonstrar mas sem persistência)
- `lead-card.tsx` — avatar + nome + bairro + faixa orçamento + intenção
- `properties-grid.tsx` — grid de 12 imóveis (cards com foto Unsplash, preço R$, bairro, tipo, dormitórios, vagas)
- `property-card.tsx` — card individual
- `crm-toggle.tsx` — toggle "Venda | Locação" que filtra o grid

Mock (em mock-data-commercial.ts):
```ts
export const kanbanLeads: Record<Lead['status'], Lead[]> = {
  novo: [/* 4-5 */],
  contatado: [/* 3-4 */],
  // ...
};
export const properties: Property[] = [/* 12 itens com fotos Unsplash de imóveis */];
```

Unsplash queries úteis: `apartment interior`, `house exterior brazil`, `real estate apartment`, `modern house facade`.
URL pattern: `https://images.unsplash.com/photo-XXX?w=800&q=80`.

## Definition of Done

- [ ] 3 componentes `<OmnichannelSection />`, `<FinanceiroSection />`, `<CRMSection />` exportados de `sections/*/index.tsx`
- [ ] Mock data 100% populado com nomes/bairros reais (Arapongas), valores realistas
- [ ] Roda sem erro console (`pnpm dev` em apps/web)
- [ ] Visual responsivo até 1024px (desktop foco)
- [ ] Avisar no chat humano pro Squad A descomentar os imports no `page.tsx` quando estiverem prontos

## Commits

Prefixo obrigatório `feat(landing/commercial):`. Sugestão: 1 commit por seção:
- `feat(landing/commercial): seção Omnichannel com 3 colunas`
- `feat(landing/commercial): seção Financeiro com KPIs Tremor e tabela boletos`
- `feat(landing/commercial): seção CRM com Kanban e grid imóveis`

Antes de commitar:
```bash
git pull --rebase origin main
git add apps/web/src/components/sections/omnichannel apps/web/src/lib/mock-data-commercial.ts
git commit -m "feat(landing/commercial): ..."
git push origin main
```

## Quando tiver dúvida

- Falta dep? Pede no chat humano pro Squad A
- Não entendi tipo? Olha `mock-types.ts`, se ainda faltar, pede pro A adicionar
- Visual incerto? `vendor/jpasv-chat-bullq/web/src/app/(dashboard)/inbox/page.tsx` + `landing-demo-cliente.md`
