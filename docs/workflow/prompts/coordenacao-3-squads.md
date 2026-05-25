# Coordenação 3 Squads — Landing Demo Cliente 2026-05-22

> Documento mestre da operação paralela. Cada squad TEM QUE ler este antes de começar.

## Estrutura

| Squad | Pasta exclusiva | Missão | Quando começa |
|-------|----------------|--------|----------------|
| **A — Foundation** | `apps/web/` (root + layout + lib + chat-widget) | Setup completo + layout + chat IA flutuante + tipos TS compartilhados | **AGORA** |
| **B — Commercial** | `apps/web/src/components/sections/{omnichannel,financeiro,crm}/` + `apps/web/src/lib/mock-data-commercial.ts` | Seções 1, 2, 3 | Após A commitar `setup pronto` (~30min) |
| **C — Platform** | `apps/web/src/components/sections/{tokenizacao,juridico,dashboards}/` + `apps/web/src/lib/mock-data-platform.ts` | Seções 4, 5, 6 | Após A commitar `setup pronto` (~30min) |

## Regra de ouro (anti-conflito)

> **Cada squad só toca em arquivos sob a sua pasta exclusiva.** Nada de "deixa eu só ajustar uma coisinha lá no layout" — se precisar, pede no chat pro Squad A.

### Arquivos compartilhados (só Squad A pode modificar)

- `apps/web/package.json` (Squad A instala TODAS as deps no início)
- `apps/web/tailwind.config.ts`
- `apps/web/postcss.config.mjs`
- `apps/web/next.config.ts`
- `apps/web/tsconfig.json`
- `apps/web/src/app/layout.tsx`
- `apps/web/src/app/page.tsx` (Squad A assembla as 6 seções no final)
- `apps/web/src/app/globals.css`
- `apps/web/src/styles/tokens.css`
- `apps/web/src/lib/mock-types.ts` (Squad A define os types; B e C SÓ LEEM)
- `apps/web/src/lib/openrouter-client.ts`
- `apps/web/src/components/layout/*` (topbar, hero, footer)
- `apps/web/src/components/chat-widget/*`
- `apps/web/src/components/ui/*` (shadcn primitives)

### Arquivos exclusivos do Squad B

- `apps/web/src/components/sections/omnichannel/**`
- `apps/web/src/components/sections/financeiro/**`
- `apps/web/src/components/sections/crm/**`
- `apps/web/src/lib/mock-data-commercial.ts`

### Arquivos exclusivos do Squad C

- `apps/web/src/components/sections/tokenizacao/**`
- `apps/web/src/components/sections/juridico/**`
- `apps/web/src/components/sections/dashboards/**`
- `apps/web/src/lib/mock-data-platform.ts`

## Convenções compartilhadas (todas as squads)

### Design tokens (já definidos por Squad A em `src/styles/tokens.css`)

| Token | Uso | Valor |
|-------|-----|-------|
| `--color-primary` | botões, links principais, marcadores ativos | `#4F46E5` indigo-600 |
| `--color-primary-dark` | hover de primary | `#3730A3` indigo-800 |
| `--color-accent` | CTAs destacadas, badges importantes | `#F59E0B` amber-500 |
| `--color-bg` | background da página | `#F8FAFC` slate-50 |
| `--color-surface` | cards e containers | `#FFFFFF` |
| `--color-ink` | texto principal | `#0F172A` slate-900 |
| `--color-muted` | texto secundário, labels | `#64748B` slate-500 |

Tailwind aliases (use sempre estes nos componentes):
- `bg-primary`, `text-primary`, `border-primary`
- `bg-accent`, `text-accent`
- `bg-surface`, `bg-app` (=bg)
- `text-ink`, `text-muted`

### Tipografia

- Display (h1-h3): `font-display` (Plus Jakarta Sans 700/600)
- Body: `font-sans` (Inter 400/500)
- Code/Mono: `font-mono` (JetBrains Mono)

### Componentes

- shadcn/ui já instalado por Squad A (Button, Card, Badge, Avatar, Dialog, Tooltip, Tabs, Separator, ScrollArea, Input, Select)
- Tremor instalado por Squad A para charts (BarChart, AreaChart, DonutChart, Card, Metric, BadgeDelta)
- Ícones: `lucide-react`
- Animações: `framer-motion` (use moderado, fade-in on scroll)
- Imagens: `next/image` + Unsplash URLs em mock-data

### Padrão de componente de seção

Cada seção exporta UM componente React com a assinatura:

```tsx
// apps/web/src/components/sections/omnichannel/index.tsx
export function OmnichannelSection() {
  return (
    <section id="omnichannel" className="scroll-mt-20 py-16">
      <SectionHeader title="..." subtitle="..." />
      {/* conteúdo */}
    </section>
  );
}
```

`SectionHeader` é fornecido por Squad A em `src/components/layout/section-header.tsx`.

### Mock data — convenções

- Use nomes reais brasileiros (Mariana Silva, João Pereira, Carla Andrade, Roberto Lima, Ana Costa, Pedro Souza, etc.)
- Use bairros REAIS de Arapongas-PR: Centro, Jardim Tropical, Jardim Universitário, Industrial, Aeroporto, Vila Industrial, Vale do Sol, Jardim Bandeirantes
- Datas relativas a hoje (2026-05-21)
- Valores em R$ realistas pro mercado de Arapongas (apartamento 2-3 dorm: R$ 1.500–3.500 aluguel; venda: R$ 250k–700k)
- Tokens da API: ~R$ 0,01–0,06 por turno IA

### Commits

- Sempre na branch `main`
- Prefixo obrigatório: `feat(landing/<squad>):` ou `chore(landing/<squad>):`
- Squad A: `feat(landing/foundation): ...`
- Squad B: `feat(landing/commercial): ...`
- Squad C: `feat(landing/platform): ...`
- Pull antes de commitar: `git pull --rebase origin main`
- Commit a cada milestone pequeno (não acumule — quanto mais frequente, menos conflito)

### Como rodar local (qualquer squad)

```bash
cd "E:/Projetos/Dinamic_Imob"
pnpm install     # se primeira vez nessa sessão
cd apps/web
pnpm dev         # sobe Next em http://localhost:3000
```

## Sincronização

### Squad A → notifica B e C quando o setup mínimo está pronto

Squad A faz commit com mensagem **exata**:

```
feat(landing/foundation): setup pronto — B e C podem começar

- apps/web Next.js 14 rodando
- Design tokens + Tailwind + shadcn instalados
- src/lib/mock-types.ts definido (Conversation, KPI, Lead, Property,
  TokenRecord, Contract, LGPDRequest, AgentRun)
- src/lib/openrouter-client.ts pronto
- Layout root + topbar (anchors pras 6 sections) + footer
- Chat widget flutuante funcional
- src/app/page.tsx com placeholders <OmnichannelSection/> etc
```

B e C dão `git pull` e arrancam.

### Conflitos de merge

Não devem acontecer se a regra de pastas exclusivas for respeitada. Se acontecer:
1. NÃO force-push
2. Avisa no chat humano qual arquivo é
3. Resolve com Squad A presente

## Estimativa de tempo

- **Squad A:** 2-3h (1h setup + 1-2h chat widget e layout)
- **Squad B:** 2-3h em paralelo (40-60min por seção)
- **Squad C:** 2-3h em paralelo (40-60min por seção)
- **Squad A finalização:** 30min (assembla page.tsx com os 6 componentes B+C)
- **Total:** ~3-4h corridas

## Definition of Done (todas as squads)

- [ ] `pnpm dev` em apps/web roda sem erro de console
- [ ] Layout responsivo em desktop (1280px+, foco principal) e iPad (768px+)
- [ ] Componentes da minha seção visíveis na home `http://localhost:3000`
- [ ] Sem TODOs sem dono no código
- [ ] Mock data populado com dados imobiliários realistas (Dinamic / Arapongas)
- [ ] Commits com prefixo correto e msg descritiva
- [ ] Squad A: chat IA responde de verdade (OpenRouter Qwen3.7-max)

## Briefing visual completo

Sempre referir-se a `docs/prompts/landing-demo-cliente.md` para o layout ASCII e descrições funcionais detalhadas das 6 seções.

## Referência visual técnica (Squad B, seção Omnichannel)

Inspecionar o layout REAL do `vendor/jpasv-chat-bullq/web/src/app/(dashboard)/inbox/page.tsx` para copiar a estrutura de 3 colunas. **Não importar código** — só replicar visualmente.

---

**Mantenedor:** documento estável durante a operação. Atualize via PR se algo mudar.
