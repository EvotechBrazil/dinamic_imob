# Landing Demo Executiva — Dinamic Imobiliária

> **Objetivo:** Página única scroll-down apresentada ao cliente Dinamic em **2026-05-22** como demonstração visual da plataforma. NÃO é a landing pública de captação de leads — é uma **vitrine executiva das 6 capacidades do sistema**, com mock data realista + IA real integrada.

## Briefing aprovado em 2026-05-21

- **Audiência:** sócio/diretor da Dinamic Imobiliária
- **Tempo de demo:** 10–15 minutos
- **Objetivo da reunião:** mostrar valor visual do que está sendo construído + confirmar continuidade do projeto
- **Tom:** profissional, clean, "isso aqui já está ficando pronto", sem ser amador
- **Stack confirmada:** Next.js 14 App Router + Tailwind v4 + shadcn/ui + Origin UI React + Tremor + design tokens indigo+amber (Plus Jakarta Sans / Inter)
- **IA real:** OpenRouter (Qwen3.7-max) no chat flutuante; **demais dados mockados**

## Estrutura visual

```
┌────────────────────────────────────────────────────────────┐
│ TopBar sticky                                              │
│ [Dinamic logo]  Omnichannel · Financeiro · CRM · Tokens · Jurídico · Dashboards   [Avatar] │
└────────────────────────────────────────────────────────────┘
│
│  ┌─ HERO ─────────────────────────────────────────────────┐
│  │ "A plataforma da Dinamic em 6 frentes."                │
│  │ Subhead curta. CTA "Ver tudo abaixo"                   │
│  │ 4 mini-KPIs (#imóveis 628, leads/mês 142,              │
│  │  resposta IA 12s, conversão 23%)                       │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 1. OMNICHANNEL COMERCIAL ─────────────────────────────┐
│  │ "Tudo numa só inbox."                                  │
│  │ Card com 3 abas (WhatsApp / Instagram / Facebook)      │
│  │ Lista de 6 conversas mock (foto, nome, prévia, canal) │
│  │ Painel direito: conversa selecionada com bolhas        │
│  │ Mock: leads chegando, atribuição automática            │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 2. FINANCEIRO ────────────────────────────────────────┐
│  │ "Receita, repasses, inadimplência — auditável."        │
│  │ 4 KPI cards Tremor (Receita mês R$48.2k,               │
│  │  A receber R$67k, Inadimplência 2.8%, Repasses R$31k)  │
│  │ Chart Recebido vs Previsto (6 meses)                   │
│  │ Tabela: Boletos vencendo (5 linhas)                    │
│  │ Botão "Pergunte à IA sobre este financeiro" (real)     │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 3. CRM ───────────────────────────────────────────────┐
│  │ "Funil + ficha do lead em um clique."                  │
│  │ Kanban 5 colunas (Novo, Contatado, Qualificado,        │
│  │  Visita, Proposta) com cards de leads + foto           │
│  │ Grid de imóveis (12 cards, fotos reais via Unsplash,   │
│  │  preço, bairro Arapongas, tipo, área)                  │
│  │ Toggle: "Venda | Locação"                              │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 4. CENTRAL DE TOKENIZAÇÃO ────────────────────────────┐
│  │ "Você paga só o que usa de IA."                        │
│  │ Saldo atual (R$284,50 em créditos)                     │
│  │ Consumo últimos 30d (linha + média/dia)                │
│  │ Histórico (Conversa, modelo, tokens, custo R$)         │
│  │ Botão grande "Recarregar"                              │
│  │ Mini-explicação: "Usamos OpenRouter — Qwen3.7-max"     │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 5. JURÍDICO + LGPD ──────────────────────────────────┐
│  │ "Contratos e privacidade sob controle."                │
│  │ Tabela de contratos (10 linhas: locatário, imóvel,     │
│  │  período, status, ações)                               │
│  │ Cards LGPD: "Solicitações de export", "Pedidos        │
│  │  delete", "Consentimentos ativos"                      │
│  │ Selo "LGPD compliant" + link política                  │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ 6. DASHBOARDS GERAIS ─────────────────────────────────┐
│  │ "Visão consolidada num só olhar."                      │
│  │ 6 KPI cards (Imóveis ativos, Leads no mês, Visitas    │
│  │  agendadas, Conversão, Receita, Inadimplência)         │
│  │ 2 charts (Leads por origem - donut;                    │
│  │  Tendência 30d - area)                                 │
│  └────────────────────────────────────────────────────────┘
│
│  ┌─ Footer ──────────────────────────────────────────────┐
│  │ "Construído sob medida para a Dinamic Imobiliária"    │
│  │ 2026 · Evotech · contato                              │
│  └────────────────────────────────────────────────────────┘
│
│ ┌─ Chat IA flutuante (canto inf direito) ───────────────┐
│ │ Botão arredondado [Falar com IA]                      │
│ │ Abre: chat real OpenRouter Qwen3.7-max                │
│ │ System prompt: tom Dinamic (profissional caloroso)    │
│ └────────────────────────────────────────────────────────┘
```

## Mock data (mínimo necessário)

Arquivo `apps/web/src/lib/mock-data.ts`:

### Omnichannel
- 6 conversas com `{nome, canal: 'wa'|'ig'|'fb', avatar, ultimaMsg, hora, naoLidas}`
- 1 conversa expandida com 8 mensagens

### Financeiro
- KPIs: receita 48.200, a receber 67.000, inadimplencia 2.8%, repasses 31.000
- 6 pontos chart "Recebido vs Previsto"
- 5 boletos vencendo (locatário, valor, vencimento, status)

### CRM
- 5 colunas Kanban × 3-5 leads cada = ~20 cards
- 12 imóveis (foto Unsplash, preço, bairro real Arapongas, tipo, área, dormitórios, vagas)
- bairros reais: Centro, Jardim Tropical, Jardim Universitário, Industrial, Aeroporto, Vila Industrial

### Tokens
- Saldo R$ 284,50
- 30 pontos consumo diário
- 10 itens histórico (data, conversa#, modelo, tokens, custo)

### Jurídico
- 10 contratos (inquilino, imóvel, periodo, status: ativo/vencendo/encerrado)
- LGPD: 3 export pendentes, 1 delete, 142 consentimentos ativos

### Dashboards
- 6 KPIs + 2 charts (donut leads por origem 5 fatias, area 30d)

## Componentes a usar (priorizar pré-construídos)

- **Layout:** Tailwind grid + flex
- **Cards/KPI:** Tremor Card + Metric + BadgeDelta
- **Charts:** Tremor BarChart, AreaChart, DonutChart, LineChart
- **Tabela:** TanStack Table v8 + Tremor Table OU Origin UI Table (decidir)
- **Kanban:** dnd-kit + Card customizado
- **Chat widget:** componente próprio + integração `scripts/test-openrouter.mjs` (extrair lógica pra `lib/openrouter-client.ts`)
- **Imagens:** next/image + Unsplash (preencher mock)
- **Animações:** Framer Motion sutil (fade-in on scroll)
- **Ícones:** lucide-react

## Critérios de aceite (DoD da landing demo)

- [ ] Roda em `pnpm dev` (apps/web) → `http://localhost:3000`
- [ ] Visível em desktop (alvo principal — demo será no laptop)
- [ ] Responsivo até iPad (mínimo)
- [ ] 6 seções com nav sticky funcionando (scroll anchor)
- [ ] Chat IA responde de verdade via OpenRouter (custo cabe em ~5 testes durante demo: < R$ 0,30)
- [ ] Lighthouse mobile ≥ 85 (não foco crítico)
- [ ] Sem erros no console
- [ ] Logo placeholder ou texto "DINAMIC" estilizado se logo SVG não chegou
- [ ] Cores indigo-600 + amber-500 aplicadas consistentemente

## Fora do escopo da demo (não fazer)

- Backend real (NestJS) — adiado
- Database (Postgres) — landing usa só mock-data.ts
- Auth — landing é pública
- CRUD funcional — só visualização
- Filtros funcionais — só visual
- Mobile-first detalhado — só desktop bonito

## Estimativa de tempo

- 4-6h de codificação intensa por 1 dev experiente
- Possível em 1 dia se foco total

## Comando de execução (no próximo turno)

```bash
cd "E:/Projetos/Dinamic_Imob"
# Em uma nova sessão Claude Code, mandar:
# "Implementar landing demo conforme docs/prompts/landing-demo-cliente.md"
```

---

**Aprovado em:** _____ (você assina/aprova antes da implementação)
**Última atualização:** 2026-05-21
