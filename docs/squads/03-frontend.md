# Squad 3 — Frontend (Next.js + Landing + Admin + PWA)

> apps/web — Landing pública híbrida (buscador + IA), Admin com dashboards Tremor e CRUD Generator, Chat widget conversacional, PWA mobile-first. Foco da 1ª entrega: **wow visual** que fecha contrato.

## Missão & Stack

**Missão:** entregar a face do produto Dinamic — uma landing pública que converte, um admin que faz a equipe Dinamic feliz, e uma experiência mobile que parece app nativo. Tudo conectado ao Backend via OpenAPI tipado, com qualidade visual de referência (Tremor + Origin UI).

**Stack principal:**
- **Framework:** Next.js 14 App Router + RSC
- **CSS:** Tailwind v4 + design tokens `@dinamic/ui`
- **Componentes:** shadcn/ui + **Origin UI React** (170+ comp) + **Tremor Blocks** (dashboards) + Tremor charts
- **Tabelas:** TanStack Table v8 (server-side pagination/sort/filter)
- **Data fetch:** TanStack Query v5 + cliente OpenAPI gerado
- **Formulários:** react-hook-form + zod (compartilhado com Backend via `@dinamic/shared`)
- **Mapa:** Mapbox GL JS
- **Auth:** NextAuth (cliente; backend é Squad 1)
- **PWA:** next-pwa + Workbox
- **Animações:** Framer Motion + Lottie (CTAs)
- **Storybook:** componentes isolados + acessibilidade
- **Testes:** Vitest (unit), React Testing Library (component), Playwright (E2E — Squad 1 framework)
- **Observabilidade:** Sentry Browser + PostHog client

**Áreas owned:**
- `apps/web/src/app/(public)/` — landing, busca, ficha de imóvel, páginas SEO, contato
- `apps/web/src/app/(dashboard)/` — admin (imóveis, leads, conversas, financeiro, demanda, configurações)
- `apps/web/src/app/(auth)/` — login, registro, recuperação
- `apps/web/src/features/*` — features modulares espelhando módulos backend
- `apps/web/src/components/` — componentes locais não-package
- `packages/ui` (compartilhado com Squad 1) — wrappers shadcn + Tremor + tokens

## Composição do time (6 devs)

| Papel | Foco |
|-------|------|
| 1× Tech Lead / Frontend Architect | Direção, design system, padrões de feature, code review |
| 2× Senior Frontend Engineers | Implementação features, Server Components, Server Actions |
| 1× UI/UX Engineer | Storybook, componentes design system, a11y, motion |
| 1× Data Viz Engineer | Tremor dashboards, TanStack Table, charts financeiros |
| 1× QA / E2E Engineer | Playwright E2E, visual regression, Lighthouse budgets |

## Visão executiva dos 9 sprints

| Sprint | Sprint Goal | SP | Marco |
|--------|-------------|----|----|
| **S0** | apps/web shell + Tailwind + design tokens + Storybook + componentes base | 50 | Esqueleto pronto |
| **S1** | 🎯 **Landing pública WOW v1** com mock — demo aprovada pelo cliente | 80 | M1 — Demo wow |
| **S2** | Admin shell (sidebar+topbar) + 3 dashboards Tremor populados + CRUD Generator | 75 | Admin navegável |
| **S3** | Listagem imóveis pública (filtros+Mapbox) + ficha imóvel pública + chat widget UI | 75 | Vitrine pública |
| **S4** | Chat integrado real + CRM admin (Kanban funil + ficha lead timeline) | 80 | M3 — demo IA cliente |
| **S5** | Cadastros auxiliares (8 CRUDs via Generator) + ficha imóvel admin multi-aba | 75 | Backoffice |
| **S6** | Financeiro UI (contratos/boletos/repasses/dunning) + dashboards financeiros + agenda corretor | 70 | M4 — locação ponta |
| **S7** | Demanda reprimida UI + radar UI + páginas SEO renderizadas + PWA install + push | 70 | SEO + PWA |
| **S8** | Polimento UX + a11y WCAG AA + perf budget + LGPD UI + Playwright E2E + suporte go-live | 60 | M6 — GO-LIVE |
| **Total** | | **635 SP** | |

---

## Sprint 0 (semanas 1-2) — apps/web Shell

### Sprint Goal

> "apps/web roda com Next 14 + Tailwind v4 + design tokens da Squad 1, Storybook expõe 20+ componentes base (Button, Input, Select, Card, Dialog, Table, etc), o Tech Lead validou padrões de feature folder, Sprint 1 pode entregar a landing wow sem retrabalho."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-001** | Como Frontend, quero `apps/web` inicializado com Next 14 App Router + Tailwind v4 + import dos design tokens da Squad 1 | 5 |
| **US-S3-002** | Como Frontend, quero shadcn/ui CLI configurado + 15 componentes base instalados (button, input, select, dialog, dropdown, card, badge, avatar, tabs, table, toast, tooltip, sheet, alert, skeleton) | 5 |
| **US-S3-003** | Como Frontend, quero Origin UI React integrado (instalação + 10 componentes ricos: stepper, file-upload, cropper, calendar, combobox, multi-select, command palette, date-range-picker, code, kbd) | 8 |
| **US-S3-004** | Como Frontend, quero Tremor instalado + 5 componentes preview (Card, KPI, BarChart, LineChart, AreaChart) | 5 |
| **US-S3-005** | Como UI Eng, quero Storybook configurado com Vite + autodocs + a11y addon | 5 |
| **US-S3-006** | Como UI Eng, quero 20+ stories cobrindo: Button (variantes), Input (estados), Card, Dialog, Table básica, KPI Card, etc | 5 |
| **US-S3-007** | Como Frontend, quero padrão de feature folder definido (`features/<dominio>/{components,hooks,services,types,routes}`) + 1 exemplo trivial | 3 |
| **US-S3-008** | Como Frontend, quero TanStack Query configurado + provider raiz + Devtools + estratégia de cache padronizada | 3 |
| **US-S3-009** | Como Frontend, quero NextAuth client config (consumindo backend Squad 1 — login flow básico, telas vazias) | 5 |
| **US-S3-010** | Como Frontend, quero font loading otimizado (Plus Jakarta + Inter via next/font, display swap) | 2 |
| **US-S3-011** | Como QA, quero Playwright instalado + 1 teste smoke (homepage renderiza) | 2 |
| **US-S3-012** | Como TL, quero ADR-004 (estrutura features, RSC vs Client boundary, data fetching strategy) | 2 |
| | **Total** | **50** |

### Definition of Done específica

- [ ] DoD global
- [ ] `pnpm dev:web` sobe em < 5s, hot reload < 1s
- [ ] Storybook acessível em `localhost:6006` com ≥ 20 stories
- [ ] Design tokens da Squad 1 funcionam (cor `bg-primary` aplica indigo-600)
- [ ] Lighthouse home placeholder ≥ 95 (sem JS pesado ainda)
- [ ] Sentry browser captura erro de teste
- [ ] ADR-004 publicada e revisada por TL

### Entregáveis técnicos

- `apps/web/src/app/layout.tsx` + `(public)/page.tsx` placeholder
- `apps/web/src/components/ui/` (shadcn) + integrações OriginUI/Tremor
- `apps/web/storybook/` configurado
- `apps/web/src/lib/` (cn, fetcher, query-client, sentry, posthog)
- `apps/web/playwright.config.ts` + 1 spec smoke
- ADR-004

### Dependências

**Recebe de:**
- **Squad 1 S0:** monorepo + design tokens + tsconfig + eslint (D01, D02)
- **Squad 2 S0:** cliente OpenAPI gerado (`@dinamic/api-client`) — pode chegar no fim do sprint, OK consumir vazio (D06)

**Entrega para:**
- **Nenhuma squad consumindo ainda** — Sprint 0 é fundação interna

### Cerimônias

**Sprint Planning (Seg sem-1, 4h):**
- Apresentar wireframes de referência (ImobiBrasil + Tremor Solar) à equipe
- Walkthrough do design tokens da Squad 1
- Planning poker das 12 user stories
- Atribuir owner por user story
- Reunião de 30min com PO pra validar TOM da landing (vai impactar S1)

**Daily (9h15, 15min):** atenção pra dependência Squad 1 (tokens não chegaram → bloqueia stories US-001, US-002, US-004).

**Backlog Refinement S1 (Qui sem-1, 14h):** apresentar wireframe v0 da landing pra equipe; ajustar antes do planning S1.

**Backlog Refinement S2 (Qui sem-2):** validar plano de admin shell + 3 dashboards Tremor com PO (qual KPI específico em cada um?).

**Sprint Review (Sex sem-2, 14h):**
- Demo Storybook (≥ 20 componentes ao vivo)
- Mostrar página `/` placeholder renderizando design tokens
- Walkthrough de uma feature folder (padrão)
- Convidar Squad 1 + Squad 2 para validar DX

**Retrospective:**
- Os design tokens da Squad 1 atenderam expectativa?
- Origin UI integrou tranquilo no Tailwind v4?
- O padrão de feature folder vai escalar?

### Riscos do sprint

| Risco | Probab. | Mitigação |
|-------|---------|-----------|
| Tokens Squad 1 atrasam | Médio | Stub tokens locais primeiro; refator quando chegar |
| Origin UI tem incompatibilidade com Tailwind v4 (caso recente) | Médio | Validar dia 1; downgrade pra v3 se quebrar |
| Tremor charts não rodam server-side | Baixo | Marcar como `'use client'` em containers |
| PO muda direção do tom da landing depois do S0 | Alto | Mockup no Figma + aprovação ANTES do planning S1 |

### Métricas

- Velocity vs 50 SP
- # componentes em Storybook
- Tempo hot reload (alvo < 1s)
- Lighthouse placeholder (alvo ≥ 95)

---

## Sprint 1 (semanas 3-4) — 🎯 Landing Pública WOW

### Sprint Goal

> "Landing pública deployada em preview e aprovada pelo cliente da Dinamic. Cliente vê uma página que parece de imobiliária líder de mercado, com hero buscador + CTA IA + 6 seções, tudo populado com mock realista. **Fecha contrato.**"

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-013** | Como visitante, quero ver header com logo Dinamic + nav (Comprar, Alugar, Lançamentos, Bairros, Sobre, Contato) + CTA "Anuncie seu imóvel" | 3 |
| **US-S3-014** | Como visitante, quero hero com headline forte + buscador inline (Finalidade [Comprar/Alugar] + Cidade + Tipo + Faixa preço) + CTA secundária destacada "💬 Prefere conversar? Fale com a IA" | 13 |
| **US-S3-015** | Como visitante, quero seção "Imóveis em destaque" com 8 cards (foto + preço + tipo + dormitórios + bairro + CTA "Ver detalhes") usando mock data | 8 |
| **US-S3-016** | Como visitante, quero seção "Como a IA Dinamic ajuda" com 3 mini-cases ilustrados (qualificação automática, sugestão personalizada, resposta em < 60s) | 5 |
| **US-S3-017** | Como visitante, quero seção "Bairros" com cards (foto bairro + #imóveis + bairros: Centro, Jardim Tropical, Industrial, Aeroporto, etc) + mini mapa Mapbox preview | 8 |
| **US-S3-018** | Como visitante, quero seção "Números que importam" (628 imóveis | 60s primeira resposta | XX anos no mercado | XX bairros) com animação count-up | 5 |
| **US-S3-019** | Como visitante, quero seção "Depoimentos" com 3-4 cards (foto + nome + bairro + texto) | 3 |
| **US-S3-020** | Como visitante, quero CTA final (formulário simples: nome + telefone + intenção + bairro) + botão WhatsApp flutuante | 5 |
| **US-S3-021** | Como visitante, quero footer com colunas (Sobre, Locação, Venda, Suporte, Contato, Redes) + selo LGPD + endereço | 3 |
| **US-S3-022** | Como visitante mobile, quero a landing 100% responsiva e acessível (sm/md/lg/xl) | 8 |
| **US-S3-023** | Como visitante, quero animações sutis (Framer Motion: fade-in no scroll, hover em cards, micro-interactions) sem prejudicar perf | 5 |
| **US-S3-024** | Como visitante, quero Lighthouse mobile ≥ 92 (perf, a11y, best, SEO) | 5 |
| **US-S3-025** | Como visitante, quero chat widget mockado (botão flutuante → abre janela → 5 mensagens fake exibindo capacidades) | 5 |
| **US-S3-026** | Como SEO, quero metadata, OpenGraph, JSON-LD `RealEstateAgent` na home | 3 |
| | **Total** | **82** |

> Velocity acima do alvo ramp-up (~50) porque é Sprint chave. Pode "comer" buffer dos sprints S2/S3. Refinement obrigatório.

### Definition of Done específica

- [ ] DoD global
- [ ] Cliente Dinamic acessou URL preview e aprovou (assinou aprovação)
- [ ] Lighthouse mobile ≥ 92 (todas as 4 categorias)
- [ ] LCP < 2.5s em mobile 3G simulado
- [ ] Sem hydration warnings em produção (RSC + Client boundary corretos)
- [ ] Funciona perfeito em iPhone SE (375px) até Desktop wide (1920px+)
- [ ] Screenshot de cada seção no PR
- [ ] Demo gravada em vídeo (30s) anexa ao Sprint Review

### Entregáveis técnicos

- `apps/web/src/app/(public)/page.tsx` (landing completa, RSC)
- `apps/web/src/features/landing/components/{Hero, Featured, IAValueProps, BairrosGrid, Numbers, Testimonials, ContactCTA, Footer}.tsx`
- `apps/web/src/features/chat-widget/` (versão mock — UI apenas)
- `apps/web/src/lib/mock-data.ts` (consumindo seed mock de `@dinamic/db`)
- Metadata + OG image gerada via `@vercel/og`
- Storybook: stories de todos componentes da landing

### Dependências

**Recebe de:**
- **Squad 1 S0:** seed mock realista (50-100 imóveis) (D03)
- **Squad 1 S1:** ambiente preview deployado para mostrar pro cliente (D05 indireto)

**Entrega para:**
- **🎯 PO + Cliente Dinamic:** M1 demo wow (decisão de seguir com o projeto)
- **Squad 3 S3:** padrão de cards e filtros que vai reusar na listagem
- **Squad 2 S3:** referência visual do chat widget (UI antes do backend)

### Cerimônias

**Sprint Planning (Seg sem-3, 4h):** apresentar wireframes finais (Figma high-fi) à equipe; planning poker. **PO presente o tempo todo** (decisões visuais são rápidas).

**Daily (9h15):** demo de progresso diária (cada dev mostra o que codou ontem). Sprint visual = feedback rápido.

**Mid-sprint demo (Qua sem-3, 15h):** apresentar versão "esqueleto navegável" ao PO + TL Squad 1. Ajustar tom/cores se necessário.

**Refinement S2 (Qui sem-3):** validar admin shell com PO; quais 3 dashboards (overview, funil, financeiro? ou outros?).

**Refinement S3 (Qui sem-4):** definir filtros da listagem pública (quais facets do Meili expor).

**Sprint Review (Sex sem-4, 14h) — CLIENTE PRESENTE:**
- Demo da landing ao vivo no preview deployado
- Mobile + desktop side-by-side
- Mostrar chat widget mock (vendendo a visão)
- Lighthouse score em tela
- Coletar feedback **em formulário estruturado** (não verbal solto)
- **Aprovação formal pra seguir** ou ajustes targeted

**Retrospective:** focar em "o que faltou aprovar com cliente antes do sprint?"

### Riscos do sprint

| Risco | Probab. | Impacto | Mitigação |
|-------|---------|---------|-----------|
| Cliente recusa parcial demo (cor errada, tom errado) | Médio | Crítico | Mid-sprint demo + Figma aprovado antes |
| Lighthouse mobile < 90 por imagens não otimizadas | Alto | Médio | Image pipeline pronto Squad 1 S2 ANTES, no S1 usar `next/image` + AVIF placeholder |
| Mapbox no Bairros lento (third-party JS) | Médio | Médio | Lazy load + suspense; static preview inicial |
| Velocity 80 SP é otimista | Médio | Médio | Buffer no S2 se atrasar; cortar testimonials (US-019) por último |
| Chat widget mock confunde cliente ("já tem IA pronta?") | Médio | Baixo | Label visível "Demonstração" + tooltip |

### Métricas

- Velocity vs 82 SP
- Lighthouse mobile (alvo ≥ 92)
- LCP, FID, CLS no preview deployado
- # ajustes solicitados pelo cliente na review (alvo ≤ 5)
- **Aprovação formal do cliente** (binário sim/não)

---

## Sprint 2 (semanas 5-6) — Admin Shell + 3 Dashboards Tremor + CRUD Generator

### Sprint Goal

> "Equipe Dinamic faz login, vê admin com sidebar Tremor + topbar (notificações, busca, usuário), navega entre 3 dashboards (Visão geral, Funil de leads, Financeiro) populados com mock realista. CRUD Generator base funciona com 1 entidade real (Property)."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-027** | Como usuário, quero login → redirect admin com Auth funcional (consumindo Squad 1 S1) | 5 |
| **US-S3-028** | Como usuário, quero shell admin (sidebar Tremor com seções: Dashboard, Imóveis, Leads, Conversas, Visitas, Contratos, Financeiro, Demanda, Cadastros, Configurações + topbar com busca global + notificações + avatar+dropdown) | 8 |
| **US-S3-029** | Como admin, quero dashboard "Visão Geral" com 6 KPI cards (Imóveis ativos, Leads no mês, Visitas agendadas, Conversão, Receita prevista, Inadimplência) + 2 gráficos (Leads por origem, Tendência 30d) — mock | 8 |
| **US-S3-030** | Como admin, quero dashboard "Funil de Leads" — Kanban com colunas (Novo, Contatado, Qualificado, Visita, Proposta, Fechado, Perdido) + cards de lead + filtros por setor (Vendas, Locação, Captação) — mock | 13 |
| **US-S3-031** | Como admin, quero dashboard "Financeiro" — Cards (Recebido mês, A receber, Inadimplência %, Repasses) + chart (Recebido vs Previsto 6 meses) + tabela (Boletos vencendo) — mock | 8 |
| **US-S3-032** | Como Frontend, quero `EntityDefinition<T>` types + `<CrudList />` + `<CrudForm />` + `<CrudView />` base (TanStack Table v8 + react-hook-form + zod do `@dinamic/shared`) | 13 |
| **US-S3-033** | Como admin, quero `EntityDefinition` para `Property` (30+ campos, 5 tabs no form: Dados, Endereço, Características, Fotos, Status) consumindo endpoints Squad 2 S1 | 8 |
| **US-S3-034** | Como admin, quero CRUD list `properties` com filtros (status, finalidade, tipo, bairro, faixa preço), sort, pagination server-side, export CSV/XLSX | 5 |
| **US-S3-035** | Como admin, quero soft-delete + restore + confirm dialog | 3 |
| **US-S3-036** | Como Frontend, quero date range picker (Origin UI) reusável nos dashboards | 3 |
| **US-S3-037** | Como QA, quero E2E smoke admin (login → dashboard overview → CRUD property) | 3 |
| | **Total** | **77** |

### DoD específica

- [ ] Login OK + redirect funcional (cookie HTTP-only + JWT correto)
- [ ] 3 dashboards renderizam com mock data realista (não números chumbados)
- [ ] CRUD Property: criar, listar com 50 itens, editar, soft-delete, restaurar funciona
- [ ] CRUD Generator: criar nova `EntityDefinition` em < 30min gera tela funcional
- [ ] Storybook: stories de KPI Card, Kanban Card, Table Toolbar

### Dependências

**Recebe de:**
- **Squad 1 S1:** auth + tenant middleware (D05)
- **Squad 2 S1:** endpoints `properties` (D07 cumprido aqui)
- **Squad 2 S0:** cliente OpenAPI gerado (D06)

**Entrega para:**
- **Squad 3 S5:** CRUD Generator pronto pra plugar 8 cadastros

### Cerimônias

**Planning:** PO confirma exatamente quais KPIs em cada dashboard.

**Refinement S3 (Qui sem-5):** plano de listagem pública + Mapbox + ficha imóvel.

**Refinement S4 (Qui sem-6):** integração chat widget real com Squad 2 ai-agent.

**Review:** equipe Dinamic convidada → demo admin ao vivo. Coletar feedback UX (onde clicariam? o que faltou?).

### Riscos

| Risco | Mitigação |
|-------|-----------|
| Kanban drag-and-drop performático com 100 leads | Virtualization com `@dnd-kit` + paginação por coluna |
| CRUD Generator abstração vaza pra casos especiais | Permitir `slot` overrides em cada componente (Form, List, View) |
| Endpoints Squad 2 atrasam | Stub via MSW (mock service worker) em dev até backend pronto |

### Métricas

- Velocity vs 77 SP
- # de telas concluídas (alvo: 4 — dashboards + CRUD)
- Lighthouse desktop admin (alvo ≥ 88)

---

## Sprint 3 (semanas 7-8) — Listagem Pública + Ficha + Chat UI

### Sprint Goal

> "Visitante busca imóvel, filtra, vê grid + mapa Mapbox interativo, abre ficha de imóvel detalhada (paridade Code49: fotos, descrição, características, mapa, calculadora, contato). Chat widget UI 100% pronto pra integração no S4."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-038** | Como visitante, quero `/imoveis` listagem com filtros (sidebar/sheet mobile: finalidade, tipo, cidade, bairro multi-select, faixa preço, dormitórios, vagas, área m², features) consumindo Meili Squad 2 S2 | 13 |
| **US-S3-039** | Como visitante, quero toggle Grid ↔ Mapa (Mapbox markers com cluster + popup) | 8 |
| **US-S3-040** | Como visitante, quero ordenação (mais recente, menor preço, maior preço, maior área) + facets visíveis (X imóveis em Y bairros) | 5 |
| **US-S3-041** | Como visitante, quero URL state (filtros + page + sort persistidos na querystring) — back/forward funciona | 5 |
| **US-S3-042** | Como visitante, quero `/imovel/[slug]` ficha SSG com: galeria fotos (lightbox), descrição rich, características em grid, mapa, calculadora financiamento (Price), corretor responsável (foto + WhatsApp), formulário contato + agendar visita | 13 |
| **US-S3-043** | Como visitante, quero compartilhar ficha (WhatsApp, Facebook, copiar link) + favoritar (localStorage no MVP) | 3 |
| **US-S3-044** | Como visitante, quero meta + OG por imóvel (foto principal, preço, bairro) | 3 |
| **US-S3-045** | Como visitante, quero `<ChatWidget />` real (UI completa: botão flutuante → janela maximizada/minimizada → input + histórico + suggestion chips + typing indicator) — sem backend ainda | 13 |
| **US-S3-046** | Como visitante mobile, quero PWA add-to-home preview (sem service worker ainda) | 3 |
| **US-S3-047** | Como QA, quero E2E "visitante busca → filtra → abre ficha → preenche formulário" | 5 |
| | **Total** | **71** |

### DoD específica

- [ ] Listagem retorna 50 imóveis em < 1s p95
- [ ] Mapa renderiza 100 markers sem travar (cluster ativo zoom ≤ 12)
- [ ] Ficha imóvel Lighthouse mobile ≥ 90 (com imagens reais)
- [ ] URL state preservada em refresh
- [ ] Chat widget UI passa code review (animações, estados loading/error/empty)

### Dependências

**Recebe de:**
- **Squad 2 S1:** `GET /public/properties/:slug` (D07)
- **Squad 2 S2:** `GET /search?...` Meili + facets (D09)
- **Squad 1 S2:** Mapbox config (D11 derivada)

**Entrega para:**
- **Squad 2 S3:** referência UX do chat (já desenhado)

### Métricas

- Velocity vs 71 SP
- Latência média listagem (alvo < 1s p95)
- Lighthouse mobile ficha (alvo ≥ 90)

---

## Sprint 4 (semanas 9-10) — 🎯 Chat Integrado + CRM Admin

### Sprint Goal

> "Visitante real conversa com a IA no chat web; corretor recebe lead qualificado no CRM Kanban com timeline completa. **Demo IA cliente (M3) atingida.**"

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-048** | Como visitante, quero chat widget consumindo `POST /chat/messages` (SSE streaming) Squad 2 S3 — typing em tempo real | 13 |
| **US-S3-049** | Como visitante, quero suggestion chips dinâmicos (vindos do agente IA) | 5 |
| **US-S3-050** | Como visitante, quero quando IA fizer handoff, ver "Estou conectando você com um corretor" + alguém assumir em < 60s (visualmente) | 5 |
| **US-S3-051** | Como visitante, quero histórico de conversa persistido (cookies + retomar conversa em outra visita) | 5 |
| **US-S3-052** | Como corretor, quero `/conversas` inbox unificada (web + WhatsApp na mesma lista) | 8 |
| **US-S3-053** | Como corretor, quero abrir conversa, ver histórico, "assumir" (IA para) ou voltar pra IA | 5 |
| **US-S3-054** | Como admin, quero `/leads` Kanban funil real (não mais mock) — drag-and-drop entre colunas dispara `PATCH /leads/:id/status` Squad 2 | 13 |
| **US-S3-055** | Como admin, quero ficha de lead `/leads/:id` com: dados pessoais, LeadProfile (preferências editáveis), timeline (visitas, propostas, conversas, audit events), tarefas pendentes, atribuição corretor | 13 |
| **US-S3-056** | Como admin, quero atribuir lead manualmente (override do round-robin) | 3 |
| **US-S3-057** | Como admin, quero registrar interação manual (call, email, visita realizada) | 5 |
| **US-S3-058** | Como QA, quero E2E "visitante chat → IA qualifica → handoff → corretor recebe no Kanban" | 5 |
| | **Total** | **80** |

### DoD específica

- [ ] Chat real ponta-a-ponta no staging respondendo via OpenRouter
- [ ] Lead criado pelo handoff aparece no Kanban em < 5s
- [ ] Drag-and-drop atualiza backend (não só UI local)
- [ ] Timeline mostra ≥ 4 tipos de evento ordenados
- [ ] **Cliente Dinamic vê demo IA cliente (M3) aprovada**

### Dependências

**Recebe de:**
- **Squad 2 S3:** endpoint `POST /chat/messages` + handoff payload (D10)
- **Squad 2 S2:** endpoints leads + timeline (D08)
- **Squad 1 S4:** staging full (D13 indireto)

**Entrega para:**
- **🎯 Cliente + PO:** M3 demo IA cliente

### Cerimônias

**Mid-sprint demo cliente (Qua sem-9):** apresentar chat + Kanban funcionais em staging. Coletar feedback de UX antes da review oficial.

**Review (Sex sem-10) — CLIENTE + EQUIPE VENDAS/LOCAÇÃO:** demo "lead chega via chat → corretor assume → preenche ficha". Coletar feedback do uso real.

### Riscos

| Risco | Mitigação |
|-------|-----------|
| SSE streaming não funciona com CDN/proxy | Fallback long-polling; testar Vercel + Hostinger no staging |
| Kanban performático com 200+ leads | Virtualização + paginação por coluna |
| Equipe vendas acha funil "errado" | Coletar lista de status na refinement de S2 com eles |

### Métricas

- Velocity vs 80 SP
- Tempo médio do chat respondendo (alvo < 2s primeiro token)
- # leads simulados criados via chat na demo

---

## Sprint 5 (semanas 11-12) — Cadastros Auxiliares + Ficha Imóvel Admin

### Sprint Goal

> "Toda entidade auxiliar do domínio (proprietários, corretores, condomínios, bairros, grupos, regiões, tipos, features) tem CRUD completo via Generator. Ficha de imóvel no admin tem 7 abas (paridade Code49: Dados, Endereço, Características, Fotos, Status, Interessados, Histórico)."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-059** | `EntityDefinition` + tela CRUD para `Owner` (proprietário): CPF/CNPJ, contato, imóveis vinculados, dados bancários PIX | 8 |
| **US-S3-060** | CRUD `Broker` (corretor): foto, CRECI, setor, comissão, agenda, leads atribuídos | 5 |
| **US-S3-061** | CRUD `Condominium` (condomínio): nome, endereço, taxa, amenities, fotos | 3 |
| **US-S3-062** | CRUD `Neighborhood` (bairro): nome, cidade, geo polygon (Mapbox), descrição SEO | 3 |
| **US-S3-063** | CRUD `PropertyGroup` / `Region` / `PropertyType` / `PropertyFeature` (4 cadastros simples via Generator) | 5 |
| **US-S3-064** | Ficha imóvel admin multi-aba: refator de S2 pra 7 abas (Dados, Endereço, Características, Fotos com drag-reorder + capa, Status + visibilidade, Interessados list, Histórico audit log) | 13 |
| **US-S3-065** | Aba Fotos: bulk upload (drag-drop) + crop + reorder + alt text + cover marker (Origin UI File Upload + Cropper) | 8 |
| **US-S3-066** | Aba Interessados: lista de leads que viram, agendaram visita ou fizeram proposta neste imóvel | 5 |
| **US-S3-067** | Aba Histórico: timeline de mudanças (preço alterado, status, fotos adicionadas) consumindo audit log Squad 1+2 | 5 |
| **US-S3-068** | Bulk actions: alterar status em massa, exportar selecionados, deletar selecionados | 5 |
| **US-S3-069** | Busca global topbar (cmd+K / Ctrl+K) — Command palette (OriginUI) buscando em imóveis + leads + cadastros | 8 |
| **US-S3-070** | E2E "criar proprietário → vincular a imóvel → alterar foto principal → publicar" | 5 |
| | **Total** | **73** |

### Dependências

**Recebe de:**
- **Squad 2 S1/S2:** endpoints respectivos (D08 + cadastros)
- **Squad 1 S2:** image pipeline funcionando (R2 + variantes)

### Métricas

- # de CRUDs concluídos via Generator (alvo: 8 cadastros)
- Tempo médio "criar novo CRUD com Generator" (alvo < 1h)

---

## Sprint 6 (semanas 13-14) — Financeiro UI + Agenda Corretor

### Sprint Goal

> "Equipe Dinamic gere contratos de locação no admin, vê boletos (gerados pelo Squad 2 S5/S6 via Asaas), acompanha repasses PIX a proprietários, agenda do corretor mostra slots disponíveis e visitas agendadas."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-071** | Wizard "Novo contrato locação" (5 steps: imóvel, inquilino, proprietário, condições, revisão+gerar) | 13 |
| **US-S3-072** | Lista de contratos com filtros (ativo/vencido/encerrado/com inadimplência) + ações (renovar, encerrar, gerar carta) | 8 |
| **US-S3-073** | Ficha de contrato: cabeçalho + abas (Dados, Boletos, Repasses, Documentos, Histórico, Assinatura D4Sign status) | 8 |
| **US-S3-074** | Lista de boletos com filtros (status, vencimento, valor) + ações (reenviar, cancelar, marcar pago manual) | 5 |
| **US-S3-075** | Lista de repasses PIX (mensal, por proprietário) + status (pendente/efetuado) + extrato PDF download | 5 |
| **US-S3-076** | Dashboard financeiro completo (recebido vs previsto, inadimplência %, contratos vencendo 30d, top 10 inadimplentes) | 8 |
| **US-S3-077** | Tela inadimplência: lista detalhada, dunning status, ação manual (ligar, escalonar) | 5 |
| **US-S3-078** | Agenda corretor: calendário mensal + semanal + diário (Origin UI Calendar customizado) com visitas, slots disponíveis configuráveis | 13 |
| **US-S3-079** | Corretor define horários disponíveis padrão + bloqueios pontuais | 5 |
| **US-S3-080** | E2E "criar contrato → emitir boletos → simular pagamento → repasse gerado" | 5 |
| | **Total** | **75** |

### Dependências

**Recebe de:**
- **Squad 2 S5/S6:** endpoints contracts, financial, signature (D12)

### Métricas

- Velocity vs 75 SP
- # de contratos simulados ponta-a-ponta no E2E

---

## Sprint 7 (semanas 15-16) — Demanda + Radar + SEO + PWA

### Sprint Goal

> "Painel de demanda reprimida mostra heatmap de buscas frustradas; admin gerencia radar (lista de LeadProfile ativos); páginas SEO renderizam dinamicamente a partir de `/seo-pages` da Squad 2; app é instalável como PWA com push notifications."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-081** | Painel `/demanda` com heatmap (Mapbox heatmap layer ou table+chart) de buscas frustradas agregadas por bairro+intenção+período | 13 |
| **US-S3-082** | Drill-down: clicar em bairro mostra detalhes (buscas, filtros usados, leads frustrados) | 5 |
| **US-S3-083** | Sugestão automática: "20 leads querem 3+ dormitórios no Centro entre R$1500-2500 — captação prioritária" | 5 |
| **US-S3-084** | Tela `/radar` lista LeadProfile ativos + matches recentes enviados + opt-out | 5 |
| **US-S3-085** | Páginas SEO `/casas-a-venda-arapongas-jardim-tropical` etc renderizadas via SSG + ISR a partir de `/seo-pages` endpoint Squad 2 S7 | 13 |
| **US-S3-086** | Sitemap.xml dinâmico (gera com base em properties + neighborhoods + tipos) | 3 |
| **US-S3-087** | `manifest.json` + ícones PWA (192, 512, maskable) + theme color + display standalone | 3 |
| **US-S3-088** | Service worker (next-pwa) com estratégias: cache-first imagens/fontes, network-first API, stale-while-revalidate listing | 8 |
| **US-S3-089** | Install prompt UX (beforeinstallprompt mobile Android, instruções iOS standalone) | 5 |
| **US-S3-090** | Web Push notifications (VAPID + permission flow + handler) — match de radar via push | 8 |
| **US-S3-091** | Offline page (`/offline`) com mensagem + link cached | 2 |
| | **Total** | **70** |

### Dependências

**Recebe de:**
- **Squad 2 S7:** endpoint `/seo-pages` (D14)
- **Squad 2 S4:** radar matcher + demand-signals endpoints

### Métricas

- # páginas SEO geradas (alvo ≥ 50)
- Lighthouse mobile PWA (alvo PWA = installable)
- # push notifications enviados em teste

---

## Sprint 8 (semanas 17-18) — Polimento + a11y + LGPD UI + E2E + Go-live

### Sprint Goal

> "Frontend chega ao go-live com WCAG AA, sem regressões visuais, LGPD UI completa (cookie banner + consent + export/delete UI), Playwright cobre 10 fluxos golden, suporte ativo durante DNS switchover."

### Backlog

| ID | User Story | SP |
|----|------------|----|
| **US-S3-092** | Cookie banner LGPD + preferências (essenciais, analytics, marketing) | 5 |
| **US-S3-093** | Página `/privacidade` + `/termos` + `/lgpd` com export/delete forms consumindo endpoints Squad 2 | 5 |
| **US-S3-094** | Consentimento separado para radar (modal explícito no opt-in) | 3 |
| **US-S3-095** | a11y audit completo (WCAG AA): contraste, foco visível, navegação por teclado, screen reader (NVDA) — corrigir issues | 13 |
| **US-S3-096** | Visual regression Chromatic (ou Percy) — snapshots em PRs | 5 |
| **US-S3-097** | Performance budget no CI (≤ 250KB JS first-load) + audit final | 5 |
| **US-S3-098** | Playwright E2E completo: 10 fluxos golden (visitante busca, ficha, contato, chat, login admin, criar imóvel, criar lead, registrar visita, gerar contrato, dashboard) | 13 |
| **US-S3-099** | i18n base (pt-BR default; estrutura pra adicionar idiomas em Fase 2) | 3 |
| **US-S3-100** | Polimento UX: loading states, empty states, error boundaries, toasts consistentes | 8 |
| **US-S3-101** | Suporte ao go-live (T-3d a T+7d) + bugfixes prioritários | 8 |
| **US-S3-102** | Retro Frontend + documentação final + lessons learned | 3 |
| | **Total** | **71** |

### DoD específica

- [ ] WCAG AA validado (axe-core no CI sem erros)
- [ ] 10 fluxos Playwright passando
- [ ] Sem regressão visual nas screens críticas
- [ ] Bundle size ≤ budget
- [ ] 0 P1, ≤ 5 P2 abertos no go-live

### Métricas

- Velocity vs 71 SP
- Lighthouse mobile final (alvo ≥ 92 em todas as páginas críticas)
- # fluxos E2E passando (alvo 10/10)
- # P1/P2 no go-live

---

## Backlog de Fase 2 (pós-MVP) — Squad 3

- Mobile app React Native (compartilha `packages/api-client` + `packages/shared`)
- Tour virtual 360 (Pannellum / Marzipano) na ficha
- AR para preview de imóvel (Sceneform / WebXR)
- Comparador de imóveis (até 4)
- Salvar busca + alertas por email
- Chat multi-corretor (várias pessoas atendendo o mesmo lead)
- Modo escuro completo
- Dashboards drill-down avançados (cohorts, retenção, atribuição)
- Editor visual de páginas SEO (admin edita conteúdo gerado pela IA)
- A/B test framework client-side (PostHog flags)
- Acessibilidade WCAG AAA em fluxos críticos
- Multilíngua (espanhol primeiro — turistas, investidores)
- White-label (outras imobiliárias na mesma plataforma)

---

**Mantenedor:** Tech Lead Squad 3 + Chief Scrum Master
**Última atualização:** 2026-05-21
