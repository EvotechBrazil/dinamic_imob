# Spec: Portar painel Lovable do mockup `A-editorial-noir.html` pro `hero-chat.tsx`

> Arquivo alvo: `apps/web/src/components/portal/hero-chat.tsx`
> Mockup fonte: `docs/portal-mockups/A-editorial-noir.html`
> Estratégia recomendada: **OPÇÃO B — Theme via CSS variables** (ver §3).

---

## 1. Visão geral

O componente `HeroChat` atual já implementa o painel Lovable em **light theme cream+gold** (paleta `portal-*`). A portabilidade do mockup A — *Editorial Noir* — **não altera estrutura, JSX, hooks nem lógica de negócio**: muda apenas a paleta de cores, a tipografia do greeting (Plus Jakarta → Syncopate) e o tratamento de glassmorphism do wrapper (translúcido sobre fundo dia/noite). Toda a lógica de `useChat`, `useDemoAutoplay`, `fireGoldConfetti`, placeholder rotativo, auto-resize de textarea, suggestions e proof points permanece **idêntica**. A entrega é uma re-pintura controlada via design tokens, não uma reescrita.

---

## 2. Diff visual lado-a-lado

| Elemento | Hoje (light theme) | Novo (dark theme — A Editorial Noir) |
|---|---|---|
| **Wrapper do painel** | `bg-white border-portal-border rounded-2xl shadow-portal-card` | `rgba(19,19,31,0.72)` + `backdrop-filter: blur(20px) saturate(1.2)` + border `rgba(255,255,255,0.08)` + radius `28px` + sombra profunda + glow amber sutil |
| **Logo D** | 80–96px, sem border, crop CSS (`left:-32%` `w-[290%]`) | 64px circular, border amber 1px, box-shadow amber soft (`0 0 32px rgba(245,158,11,0.25)`), mesmo crop CSS |
| **Greeting H1** | `font-portal-display` (Plus Jakarta Sans) `text-4xl→6xl` `font-extrabold` `text-portal-text` (~`#0F172A`) | **Syncopate 700** uppercase letter-spacing wide `text-3xl→5xl`, cor `#F5F2EB` |
| **Subtitle** | Manrope/Inter `text-lg` `text-portal-text-muted` max-w 2xl | Manrope 300 `text-base` cor `rgba(245,242,235,0.62)` max-w 560px |
| **Input wrapper** | `bg-white` `border-portal-border` radius 16 + shadow card | `bg-[rgba(11,11,20,0.55)]` border `rgba(255,255,255,0.12)` radius 18, focus: border amber + ring `rgba(245,158,11,0.18)` |
| **Textarea** | Texto `text-base/lg` placeholder `text-portal-text-subtle` (cinza) | Texto `#F5F2EB` placeholder `rgba(245,242,235,0.35)` |
| **Botão Send** | 44×44 radius 12 `bg-portal-gold` (amber) shadow CTA | 40×40 radius 12 amber `#F59E0B` + box-shadow `0 8px 20px rgba(245,158,11,0.32)` + hover scale 1.06 |
| **Chips sugeridos** | `bg-white border-portal-border` hover `border-portal-gold bg-portal-gold-soft` | `bg-[rgba(11,11,20,0.5)]` border `rgba(255,255,255,0.10)` hover border amber + bg `rgba(245,158,11,0.10)`, texto `#F5F2EB` |
| **Proof points** | Check verde `text-portal-success` + texto muted cinza | Check verde `#34D399` mantido + texto `rgba(245,242,235,0.62)` |
| **Demo overlay** | `bg-white/95 backdrop-blur border-portal-border` | `bg-[rgba(19,19,31,0.85)]` `backdrop-blur` border `rgba(255,255,255,0.08)` |
| **Helper "Enter pra enviar"** | `text-portal-text-subtle` (~`#94A3B8`) | `rgba(245,242,235,0.45)` |
| **Card conversa (não-idle)** | `bg-white border-portal-border shadow-portal-card` | mesmo glassmorphism do wrapper principal |
| **Section background** | `bg-gradient-to-b from-white via-portal-gold-soft/30 to-portal-bg` | gradient noir + `HeroBackground` dia/noite animado (já existe) |

---

## 3. Estratégia de implementação

### Opção A — Theme toggle via prop `variant`
Adicionar `variant?: 'light' | 'dark'` no `HeroChat` e usar ternários em cada className. **Contra:** duplica strings de classe em ~20 pontos, polui o JSX, dificulta manutenção e A/B testing.

### Opção B — **Theme via CSS variables** ✅ RECOMENDADO
Definir um conjunto de design tokens em `--lovable-*` no escopo do portal. Tema light é o default; tema dark é ativado via atributo `data-portal-theme="dark"` no `<body>` ou no layout do portal.

**Por que B vence:**
1. **Zero duplicação de JSX** — a lógica fica uma única vez; o tema é dado.
2. **A/B testing trivial** — basta alternar o atributo `data-portal-theme` server-side ou via cookie.
3. **Alinha com o padrão do portal** — `apps/web/src/styles/portal.css` já usa CSS vars (`--portal-gold`, `--portal-text` etc).
4. **Tailwind v4 friendly** — arbitrary values `bg-[var(--lovable-panel-bg)]` funcionam out-of-the-box.
5. **Manutenção barata** — futuras variants (sépia, midnight, etc) viram um bloco CSS novo.

### Opção C — Componente separado `HeroChatNoir.tsx`
Cópia integral adaptada. **Contra:** dobra a superfície de bug — qualquer fix no `useChat` ou demo autoplay precisa replicar nos dois.

---

## 4. CSS variables proposto

Arquivo sugerido: `apps/web/src/styles/portal-lovable.css` (importado pelo `portal/layout.tsx`).

```css
/* Default = light theme (mantém o visual atual) */
:root,
[data-portal-theme="light"] {
  --lovable-panel-bg: #ffffff;
  --lovable-panel-border: var(--portal-border);
  --lovable-panel-radius: 1rem;            /* 16px */
  --lovable-panel-shadow: var(--portal-card-shadow);
  --lovable-panel-blur: 0px;
  --lovable-panel-glow: none;

  --lovable-greeting-color: var(--portal-text);
  --lovable-greeting-font: var(--font-plus-jakarta), system-ui, sans-serif;
  --lovable-greeting-weight: 800;
  --lovable-greeting-tracking: -0.02em;
  --lovable-greeting-transform: none;

  --lovable-subtitle-color: var(--portal-text-muted);

  --lovable-input-bg: #ffffff;
  --lovable-input-border: var(--portal-border);
  --lovable-input-border-focus: var(--portal-gold);
  --lovable-input-ring: rgba(245, 158, 11, 0.25);
  --lovable-input-text: var(--portal-text);
  --lovable-input-placeholder: var(--portal-text-subtle);

  --lovable-send-bg: var(--portal-gold);
  --lovable-send-shadow: var(--portal-cta-shadow);

  --lovable-chip-bg: #ffffff;
  --lovable-chip-border: var(--portal-border);
  --lovable-chip-text: var(--portal-text);
  --lovable-chip-hover-border: var(--portal-gold);
  --lovable-chip-hover-bg: var(--portal-gold-soft);

  --lovable-proof-color: var(--portal-text-muted);
  --lovable-proof-check: var(--portal-success);

  --lovable-helper-color: var(--portal-text-subtle);

  --lovable-demo-bg: rgba(255, 255, 255, 0.95);
  --lovable-demo-border: var(--portal-border);
}

/* Dark — Editorial Noir */
[data-portal-theme="dark"] {
  --lovable-panel-bg: rgba(19, 19, 31, 0.72);
  --lovable-panel-border: rgba(255, 255, 255, 0.08);
  --lovable-panel-radius: 1.75rem;          /* 28px */
  --lovable-panel-shadow:
    0 32px 80px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(245, 158, 11, 0.04) inset;
  --lovable-panel-blur: 20px;
  --lovable-panel-glow: 0 0 120px rgba(245, 158, 11, 0.06);

  --lovable-greeting-color: #f5f2eb;
  --lovable-greeting-font: var(--font-syncopate), "Plus Jakarta Sans", sans-serif;
  --lovable-greeting-weight: 700;
  --lovable-greeting-tracking: 0.04em;
  --lovable-greeting-transform: uppercase;

  --lovable-subtitle-color: rgba(245, 242, 235, 0.62);

  --lovable-input-bg: rgba(11, 11, 20, 0.55);
  --lovable-input-border: rgba(255, 255, 255, 0.12);
  --lovable-input-border-focus: #f59e0b;
  --lovable-input-ring: rgba(245, 158, 11, 0.18);
  --lovable-input-text: #f5f2eb;
  --lovable-input-placeholder: rgba(245, 242, 235, 0.35);

  --lovable-send-bg: #f59e0b;
  --lovable-send-shadow: 0 8px 20px rgba(245, 158, 11, 0.32);

  --lovable-chip-bg: rgba(11, 11, 20, 0.5);
  --lovable-chip-border: rgba(255, 255, 255, 0.10);
  --lovable-chip-text: #f5f2eb;
  --lovable-chip-hover-border: #f59e0b;
  --lovable-chip-hover-bg: rgba(245, 158, 11, 0.10);

  --lovable-proof-color: rgba(245, 242, 235, 0.62);
  --lovable-proof-check: #34d399;

  --lovable-helper-color: rgba(245, 242, 235, 0.45);

  --lovable-demo-bg: rgba(19, 19, 31, 0.85);
  --lovable-demo-border: rgba(255, 255, 255, 0.08);
}
```

---

## 5. Mudanças por linha no `hero-chat.tsx`

> Numeração baseada no arquivo atual (438 linhas). Lógica intacta — só strings de className.

| # | Linha | Trecho atual | Substituir por |
|---|---|---|---|
| 1 | 171–173 | `"bg-gradient-to-b from-white via-portal-gold-soft/30 to-portal-bg"` | manter (`HeroBackground` cuida do dia/noite); opcional sobrepor com `data-portal-theme="dark"` no `<section>` ou no layout pai |
| 2 | 198 | `className="mx-auto relative h-20 w-20 lg:h-24 lg:w-24 overflow-hidden"` | `"mx-auto relative h-16 w-16 lg:h-16 lg:w-16 overflow-hidden rounded-full border border-[#f59e0b]/40 shadow-[0_0_32px_rgba(245,158,11,0.25)]"` |
| 3 | 209 | classes do `<Image>` — manter crop CSS `left-[-32%] w-[290%]` | **NÃO MUDAR** (padrão D do logo documentado) |
| 4 | 218 | `"font-portal-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-portal-text mt-8 text-center"` | `"text-3xl sm:text-4xl lg:text-5xl mt-8 text-center font-[family-name:var(--lovable-greeting-font)] font-[number:var(--lovable-greeting-weight)] tracking-[var(--lovable-greeting-tracking)] [text-transform:var(--lovable-greeting-transform)] text-[color:var(--lovable-greeting-color)] leading-tight"` |
| 5 | 228 | `"text-lg lg:text-xl text-portal-text-muted max-w-2xl mx-auto mt-4 leading-relaxed text-center"` | `"text-base lg:text-lg max-w-[560px] mx-auto mt-4 leading-relaxed text-center font-light text-[color:var(--lovable-subtitle-color)]"` |
| 6 | 241 | `"bg-white border border-portal-border rounded-2xl shadow-portal-card focus-within:ring-2 focus-within:ring-portal-gold focus-within:border-portal-gold transition p-5 pr-16"` | `"bg-[color:var(--lovable-input-bg)] border border-[color:var(--lovable-input-border)] rounded-[18px] backdrop-blur-[var(--lovable-panel-blur)] shadow-[var(--lovable-panel-shadow)] focus-within:ring-2 focus-within:ring-[color:var(--lovable-input-ring)] focus-within:border-[color:var(--lovable-input-border-focus)] transition p-5 pr-16"` |
| 7 | 250 | `"min-h-[112px] max-h-[260px] resize-none w-full outline-none text-base lg:text-lg placeholder:text-portal-text-subtle font-medium bg-transparent leading-relaxed"` | `"min-h-[112px] max-h-[260px] resize-none w-full outline-none text-base lg:text-lg font-medium bg-transparent leading-relaxed text-[color:var(--lovable-input-text)] placeholder:text-[color:var(--lovable-input-placeholder)]"` |
| 8 | 258 | `"absolute bottom-3 right-3 h-11 w-11 rounded-xl bg-portal-gold text-white shadow-portal-cta hover:shadow-lg disabled:bg-portal-text-subtle disabled:shadow-none disabled:cursor-not-allowed transition flex items-center justify-center"` | `"absolute bottom-3 right-3 h-10 w-10 rounded-xl bg-[color:var(--lovable-send-bg)] text-white shadow-[var(--lovable-send-shadow)] hover:scale-[1.06] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center justify-center"` |
| 9 | 263 | `"text-xs text-portal-text-subtle text-center mt-2"` | `"text-xs text-[color:var(--lovable-helper-color)] text-center mt-2"` |
| 10 | 278 | `"bg-white/95 backdrop-blur border border-portal-border rounded-2xl shadow-portal-card p-4 max-w-xl mx-auto flex flex-col gap-3"` | `"bg-[color:var(--lovable-demo-bg)] backdrop-blur border border-[color:var(--lovable-demo-border)] rounded-2xl shadow-[var(--lovable-panel-shadow)] p-4 max-w-xl mx-auto flex flex-col gap-3"` |
| 11 | 279 | `"flex items-center gap-2 text-xs uppercase tracking-wide text-portal-text-subtle"` | `"flex items-center gap-2 text-xs uppercase tracking-wide text-[color:var(--lovable-helper-color)]"` |
| 12 | 315 | `"rounded-full bg-white border border-portal-border px-4 py-2.5 text-sm font-medium text-portal-text hover:border-portal-gold hover:bg-portal-gold-soft transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"` | `"rounded-full bg-[color:var(--lovable-chip-bg)] border border-[color:var(--lovable-chip-border)] px-4 py-2.5 text-sm font-medium text-[color:var(--lovable-chip-text)] hover:border-[color:var(--lovable-chip-hover-border)] hover:bg-[color:var(--lovable-chip-hover-bg)] transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"` |
| 13 | 332 | `"flex items-center gap-2 text-sm text-portal-text-muted"` | `"flex items-center gap-2 text-sm text-[color:var(--lovable-proof-color)]"` |
| 14 | 334 | `"h-3.5 w-3.5 text-portal-success"` | `"h-3.5 w-3.5 text-[color:var(--lovable-proof-check)]"` |
| 15 | 348 | `"max-w-3xl mx-auto bg-white border border-portal-border rounded-2xl shadow-portal-card mt-8"` | `"max-w-3xl mx-auto bg-[color:var(--lovable-panel-bg)] border border-[color:var(--lovable-panel-border)] rounded-[var(--lovable-panel-radius)] backdrop-blur-[var(--lovable-panel-blur)] shadow-[var(--lovable-panel-shadow)] mt-8"` |
| 16 | 349 | `"p-4 border-b border-portal-border ..."` | trocar `border-portal-border` por `border-[color:var(--lovable-panel-border)]` |
| 17 | 350 | `"font-semibold text-portal-text"` | `"font-semibold text-[color:var(--lovable-greeting-color)]"` |
| 18 | 356 | `"text-sm text-portal-text-muted hover:text-portal-gold-dark transition"` | `"text-sm text-[color:var(--lovable-subtitle-color)] hover:text-[#f59e0b] transition"` |
| 19 | 380 | `"... text-portal-text-subtle ..."` | trocar `text-portal-text-subtle` por `text-[color:var(--lovable-helper-color)]` |
| 20 | 389 | `"... bg-portal-gold"` | `"... bg-[color:var(--lovable-send-bg)]"` |
| 21 | 406 | mesma classe do input idle (linha 241) | aplicar a mesma substituição da #6 |
| 22 | 415 | mesma classe da textarea (linha 250) | aplicar a mesma substituição da #7 |
| 23 | 422 | mesma classe do botão send (linha 258) | aplicar a mesma substituição da #8 |
| 24 | 427 | mesma classe do helper (linha 263) | aplicar a mesma substituição da #9 |

**Total: 23 trocas** — todas mecânicas, nenhuma toca lógica.

---

## 6. Tipografia do greeting (Syncopate)

### Passo 1 — Carregar font no `apps/web/src/app/layout.tsx`

```tsx
import { Syncopate } from "next/font/google";

const syncopate = Syncopate({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-syncopate",
  display: "swap",
});
```

E aplicar no `<html>` ou `<body>`:

```tsx
<html className={`${plusJakarta.variable} ${syncopate.variable} ${inter.variable}`}>
```

### Passo 2 — Consumir via CSS var

A var `--lovable-greeting-font` no tema dark já aponta pra `var(--font-syncopate)`. No JSX, a classe arbitrária `font-[family-name:var(--lovable-greeting-font)]` resolve em runtime — no light cai em Plus Jakarta, no dark em Syncopate, sem ternário no componente.

### Passo 3 — Casing

Greeting "Olá", "Boa tarde" etc. em Syncopate **uppercase** (var `--lovable-greeting-transform`). Em light, mantém capitalização normal.

---

## 7. Manter intactos — NÃO TOCAR

- `useChat()` hook + `send()` + `reset()` + streaming (linha 50)
- `useDemoAutoplay()` callbacks + estado `demoOverlay` (linhas 151–166)
- `fireGoldConfetti()` + dedup `confettiFiredRef` (linhas 111–121)
- Array `PLACEHOLDERS` rotativo + intervalo 4s (linhas 77–85)
- Auto-resize textarea (linhas 88–94)
- Auto-scroll `scrollRef` (linhas 97–101)
- Array `SUGGESTIONS` + `handleSuggestion` (linhas 30–35, 131–138)
- Array `PROOF_POINTS` (linhas 37–41)
- `ChatMessageBubble` — mesmo componente, sem variant
- Logo D crop CSS (`left-[-32%] w-[290%]`) — padrão consistente já documentado em memory
- Event bus `dinamic:open-chat-widget` — listener no `portal/layout.tsx`
- `HeroBackground` (linha 175) — já cuida do fundo dia/noite animado
- `framer-motion` transitions, delays e stagger
- Estrutura JSX — todas as `<motion.div>`, ordem dos elementos, max-widths, paddings, etc.

---

## 8. Como testar

```powershell
cd e:\Projetos\Dinamic_Imob\apps\web
pnpm dev
```

1. Acessar `http://localhost:3000/portal` — deve renderizar **light** (default).
2. No DevTools, setar `document.documentElement.setAttribute('data-portal-theme', 'dark')` — deve flippar pra noir.
3. Validar fluxo idle: greeting em Syncopate uppercase, fundo dia/noite animado, glow amber no painel.
4. Validar fluxo demo autoplay: aguardar 6s sem digitar — demo overlay aparece no theme correto.
5. Validar user input: enviar "casa 3 dorms" — card de conversa também muda de tema.
6. Validar confete: forçar IA a confirmar agendamento e ver confete dourado em ambos os temas.
7. Validar mobile: 375px — Syncopate não pode quebrar layout (text-3xl em mobile).
8. Validar a11y: contraste do greeting `#F5F2EB` sobre `rgba(19,19,31,0.72)` deve passar WCAG AA (≥4.5).

---

## 9. Riscos de regressão e mitigação

| Risco | Como mitigar |
|---|---|
| **CSS specificity** — `text-portal-text` (Tailwind) pode vencer `color: var(--lovable-greeting-color)` arbitrário | Garantir que as classes Tailwind antigas foram **removidas** (não comentadas). Conferir no DevTools que só uma regra de `color` está ativa. |
| **Font loading flash (FOUT)** com Syncopate | Usar `display: "swap"` no `next/font` (já no passo §6) + `font-display: swap` no CSS. Fallback `"Plus Jakarta Sans"` cobre o intervalo. |
| **Dark text sobre dark bg em estados loading** — placeholder cinza-claro pode ficar invisível durante stream | Definir `--lovable-input-placeholder` com alpha 0.35 garante contraste mesmo durante loading. Testar com IA digitando longa resposta. |
| **`backdrop-filter` quebrado no Safari iOS antigo** | Adicionar `-webkit-backdrop-filter` (Tailwind v4 já emite ambos com `backdrop-blur-*`). Fallback: sólido `bg-[#13131F]` quando `@supports not (backdrop-filter)`. |
| **Mismatch SSR/CSR no greeting** se `data-portal-theme` for setado client-only | Setar o atributo no `<html>` server-side via `layout.tsx` lendo cookie ou env flag — nunca via `useEffect`. |
| **Confetti gold invisível em light** se mudar cor pra branca | `fireGoldConfetti` usa `#F59E0B` hardcoded — funciona nos dois temas. Não tocar. |

---

## 10. Rollout sugerido

1. **PR 1** — adicionar `portal-lovable.css` com vars (light = default exato). Sem mudança visual.
2. **PR 2** — refatorar `hero-chat.tsx` consumindo as vars (light continua pixel-perfect).
3. **PR 3** — adicionar Syncopate font + bloco `[data-portal-theme="dark"]`.
4. **PR 4** — flag no `portal/layout.tsx` que define `data-portal-theme` baseado em query `?theme=dark` (A/B).
5. **PR 5** — após validação interna, default vira `dark` pro cliente.

Cada PR é reversível e zero-impacto nos PRs anteriores.
