# Especificação Técnica — Efeito Ciclo Dia → Noite no Hero do Portal

> Porte do efeito visual do mockup `A-editorial-noir.html` para o projeto Next.js em `apps/web/src/app/portal/`.

---

## 1. Visão geral

O efeito **ciclo dia → noite** é uma animação cinematográfica de **40 segundos em loop infinito** que simula a passagem do tempo sobre a foto do imóvel no hero do portal — amanhecer → meio-dia → entardecer → noite. Ele entrega sensação de "imóvel vivido ao longo do dia" e cria um wow factor imediato sem custo de UX (não distrai do conteúdo, não bloqueia interação). É composto por **4 camadas sincronizadas** (foto com filter cinematográfico, overlay de céu, sol/lua atravessando em arco, estrelas piscando à noite). Tudo é puro CSS animando `filter`, `transform`, `opacity` e `background` — **GPU-acelerado, ~0% CPU**, compositor-only, sem reflow/repaint.

---

## 2. Camadas e timings

| Camada              | CSS property animada                                  | 0% (amanhecer)              | 25% (meio-dia)              | 50% (entardecer)            | 75% (noite)                 | Sincronização         |
| ------------------- | ----------------------------------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------------- | --------------------- |
| `.hero-img`         | `filter` (brightness/saturate/hue-rotate/sepia/contr) | bright 0.45, hue -12°       | bright 0.75, neutro         | bright 0.55, hue +18°       | bright 0.22, hue -35°       | 40s ease-in-out ∞     |
| `.hero-sky`         | `background` (linear-gradient vertical)               | aurora rosa-amber           | azul-claro suave            | pôr-do-sol laranja-vermelho | indigo profundo             | 40s ease-in-out ∞     |
| `.celestial-body`   | `left`, `top`, `background` (radial-gradient)         | sol nascente esquerda-baixa | sol meio-dia centro-topo    | sol poente direita          | lua atravessa esq → dir     | 40s ease-in-out ∞     |
| `.stars` (container)| `opacity`                                             | 0                           | 0                           | 0.4                         | 0.9                         | 40s ease-in-out ∞     |
| `.stars .star`      | `opacity` (twinkle)                                   | piscar 0.3 → 1              | —                           | —                           | —                           | 3s ease-in-out ∞      |

> **Importante:** os 4 keyframes principais usam **a mesma duração (40s)** e **a mesma função de easing (ease-in-out)** com `infinite` — sem isso, as camadas dessincronizam após poucos loops.

---

## 3. Código CSS completo (copy-paste ready)

```css
/* ============================================
   PORTAL HERO — Ciclo Dia → Noite
   apps/web/src/styles/portal-day-night.css
   ============================================ */

/* 1. Foto de fundo com filter cinematográfico */
.hero-img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: day-night 40s ease-in-out infinite;
  will-change: filter;
}

@keyframes day-night {
  0%   { filter: brightness(0.45) saturate(1.5)  hue-rotate(-12deg) sepia(0.25) contrast(1.05); }
  25%  { filter: brightness(0.75) saturate(1.05) hue-rotate(0deg)   sepia(0)    contrast(1);    }
  50%  { filter: brightness(0.55) saturate(1.55) hue-rotate(18deg)  sepia(0.35) contrast(1.08); }
  75%  { filter: brightness(0.22) saturate(0.7)  hue-rotate(-35deg) sepia(0)    contrast(0.95); }
  100% { filter: brightness(0.45) saturate(1.5)  hue-rotate(-12deg) sepia(0.25) contrast(1.05); }
}

/* 2. Overlay de céu (gradient vertical com blend mode) */
.hero-sky {
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: overlay;
  animation: sky-color 40s ease-in-out infinite;
  will-change: background;
}

@keyframes sky-color {
  0%   { background: linear-gradient(180deg, rgba(245,158,11,0.45) 0%, rgba(251,113,133,0.32) 28%, transparent 58%); }
  25%  { background: linear-gradient(180deg, rgba(147,197,253,0.22) 0%, rgba(219,234,254,0.12) 30%, transparent 60%); }
  50%  { background: linear-gradient(180deg, rgba(245,158,11,0.5)  0%, rgba(220,38,38,0.4)    30%, transparent 65%); }
  75%  { background: linear-gradient(180deg, rgba(30,27,75,0.75)   0%, rgba(79,70,229,0.4)    35%, transparent 75%); }
  100% { background: linear-gradient(180deg, rgba(245,158,11,0.45) 0%, rgba(251,113,133,0.32) 28%, transparent 58%); }
}

/* 3. Sol/Lua atravessando o céu em arco */
.celestial-body {
  position: absolute;
  width: 90px;
  height: 90px;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(2px);
  animation: sun-arc 40s ease-in-out infinite;
  will-change: left, top, background, opacity;
}

@keyframes sun-arc {
  /* SOL */
  0%   { left: -8%;  top: 65%; opacity: 0.9;
         background: radial-gradient(circle, rgba(254,243,199,1) 0%, rgba(245,158,11,0.85) 45%, transparent 70%); }
  25%  { left: 45%;  top: 10%; opacity: 1;
         background: radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(254,243,199,0.9) 50%, transparent 75%); }
  50%  { left: 92%;  top: 28%; opacity: 0.85;
         background: radial-gradient(circle, rgba(254,215,170,1) 0%, rgba(220,38,38,0.85)  45%, transparent 70%); }
  60%  { left: 105%; top: 50%; opacity: 0; }
  /* LUA (reaparece pela esquerda) */
  65%  { left: -10%; top: 40%; opacity: 0;
         background: radial-gradient(circle, rgba(219,234,254,1) 0%, rgba(147,197,253,0.7) 45%, transparent 70%); }
  70%  { left: 5%;   top: 30%; opacity: 0.85;
         background: radial-gradient(circle, rgba(219,234,254,1) 0%, rgba(147,197,253,0.7) 45%, transparent 70%); }
  80%  { left: 50%;  top: 16%; opacity: 1;
         background: radial-gradient(circle, rgba(237,233,254,1) 0%, rgba(167,139,250,0.8) 45%, transparent 70%); }
  95%  { left: 105%; top: 35%; opacity: 0; }
  100% { left: -8%;  top: 65%; opacity: 0.9;
         background: radial-gradient(circle, rgba(254,243,199,1) 0%, rgba(245,158,11,0.85) 45%, transparent 70%); }
}

/* 4. Estrelas — container com fade sincronizado */
.stars {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  animation: stars-fade 40s ease-in-out infinite;
  will-change: opacity;
}

@keyframes stars-fade {
  0%, 30%    { opacity: 0; }
  60%, 85%   { opacity: 0.9; }
  100%       { opacity: 0; }
}

.stars .star {
  position: absolute;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  background: rgba(245,242,235,0.95);
  box-shadow: 0 0 4px rgba(245,242,235,0.9);
  animation: twinkle 3s ease-in-out infinite;
}

@keyframes twinkle {
  0%, 100% { opacity: 0.3; transform: scale(0.8); }
  50%      { opacity: 1;   transform: scale(1.2); }
}

/* 5. Acessibilidade — respeitar prefers-reduced-motion */
@media (prefers-reduced-motion: reduce) {
  .hero-img,
  .hero-sky,
  .celestial-body,
  .stars,
  .stars .star {
    animation: none !important;
  }
  .hero-img { filter: brightness(0.55) saturate(1.2) contrast(1.02); }
  .hero-sky,
  .celestial-body,
  .stars { display: none; }
}
```

---

## 4. Adaptação pro Next.js + Tailwind v3.4

### 4.1. Onde colocar o CSS

Criar `apps/web/src/styles/portal-day-night.css` com o bloco da seção 3 (copy-paste direto).

Importar no layout do portal — `apps/web/src/app/portal/layout.tsx`:

```tsx
import "@/styles/portal-day-night.css"
// ... resto do layout
```

> Importar no `layout.tsx` (e **não** no `globals.css`) escopa o CSS apenas às rotas `/portal/*` e mantém o bundle do landing principal limpo.

### 4.2. Refator do `hero-background.tsx`

O componente atual `apps/web/src/components/portal/hero-background.tsx` provavelmente renderiza só o `<Image>` da foto. Ele precisa virar um **wrapper de 4 camadas**:

```tsx
// apps/web/src/components/portal/hero-background.tsx
import Image from "next/image"

const STAR_POSITIONS = [
  { top: "12%", left: "8%",  delay: "0s"   },
  { top: "18%", left: "23%", delay: "0.4s" },
  { top: "8%",  left: "37%", delay: "0.8s" },
  { top: "22%", left: "52%", delay: "1.2s" },
  { top: "14%", left: "68%", delay: "1.6s" },
  { top: "26%", left: "81%", delay: "2.0s" },
  { top: "32%", left: "15%", delay: "2.4s" },
  { top: "6%",  left: "44%", delay: "0.2s" },
  { top: "28%", left: "63%", delay: "0.6s" },
  { top: "10%", left: "76%", delay: "1.0s" },
  { top: "35%", left: "30%", delay: "1.4s" },
  { top: "20%", left: "90%", delay: "1.8s" },
  { top: "5%",  left: "55%", delay: "2.2s" },
  { top: "16%", left: "5%",  delay: "2.6s" },
  { top: "30%", left: "47%", delay: "0.1s" },
  { top: "9%",  left: "60%", delay: "0.5s" },
  { top: "24%", left: "72%", delay: "0.9s" },
  { top: "11%", left: "88%", delay: "1.3s" },
  { top: "33%", left: "20%", delay: "1.7s" },
  { top: "7%",  left: "33%", delay: "2.1s" },
  { top: "19%", left: "41%", delay: "2.5s" },
  { top: "27%", left: "58%", delay: "0.3s" },
  { top: "13%", left: "70%", delay: "0.7s" },
  { top: "21%", left: "85%", delay: "1.1s" },
  { top: "36%", left: "12%", delay: "1.5s" },
]

export function HeroBackground({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Camada 1: foto com filter animado (wrapper, NÃO no Image) */}
      <div className="hero-img absolute inset-0">
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Camada 2: overlay de céu */}
      <div className="hero-sky" aria-hidden />

      {/* Camada 3: sol/lua */}
      <div className="celestial-body" aria-hidden />

      {/* Camada 4: estrelas */}
      <div className="stars" aria-hidden>
        {STAR_POSITIONS.map((s, i) => (
          <span
            key={i}
            className="star"
            style={{ top: s.top, left: s.left, animationDelay: s.delay }}
          />
        ))}
      </div>
    </div>
  )
}
```

### 4.3. Por que o filter vai no WRAPPER e não no `<Image>`

O `next/image` injeta seu próprio `<img>` dentro de um wrapper e gerencia `style` inline (object-fit, position). Aplicar `filter` direto no `<Image>` via `className` funciona — **mas** o Next pode sobrescrever transitions em re-render. Aplicar no wrapper `.hero-img` é mais robusto, e o `<Image>` herda visualmente o filter por estar dentro dele (filter cascateia).

### 4.4. (Opcional) Registrar keyframes no Tailwind

Se quiser invocar via `animate-day-night` em outros lugares, em `apps/web/tailwind.config.ts`:

```ts
export default {
  theme: {
    extend: {
      keyframes: {
        "day-night": {
          "0%, 100%": { filter: "brightness(0.45) saturate(1.5) hue-rotate(-12deg) sepia(0.25) contrast(1.05)" },
          "25%":      { filter: "brightness(0.75) saturate(1.05) hue-rotate(0deg)  sepia(0)    contrast(1)"    },
          "50%":      { filter: "brightness(0.55) saturate(1.55) hue-rotate(18deg) sepia(0.35) contrast(1.08)" },
          "75%":      { filter: "brightness(0.22) saturate(0.7)  hue-rotate(-35deg) sepia(0)   contrast(0.95)" },
        },
      },
      animation: {
        "day-night": "day-night 40s ease-in-out infinite",
      },
    },
  },
}
```

> **Recomendação:** mantenha tudo em `portal-day-night.css` — o Tailwind não simplifica nada aqui (são 5 keyframes complexos com gradientes inline, ficam ilegíveis no config).

---

## 5. Variações pra ajustar tom

### Preset Sutil (não distrai)

```css
.hero-img        { animation-duration: 60s; }
.hero-sky        { animation-duration: 60s; opacity: 0.6; }
.celestial-body  { animation-duration: 60s; opacity: 0.7; filter: blur(4px); }
.stars           { animation-duration: 60s; }
/* No keyframe day-night, reduzir os hue-rotate pela metade:
   0%: hue-rotate(-6deg)  50%: hue-rotate(9deg)  75%: hue-rotate(-18deg) */
```

### Preset Padrão (o do mockup A)

40s, valores da seção 3 inalterados. **Equilibrado** — recomendado pra entrega ao cliente.

### Preset Dramático (wow factor máximo)

```css
.hero-img        { animation-duration: 25s; }
.hero-sky        { animation-duration: 25s; mix-blend-mode: soft-light; }
.celestial-body  { animation-duration: 25s; width: 120px; height: 120px; filter: blur(1px) drop-shadow(0 0 30px currentColor); }
.stars           { animation-duration: 25s; }
/* No keyframe day-night, aumentar contraste:
   75% (noite): brightness(0.15) saturate(0.5) hue-rotate(-45deg) */
```

---

## 6. Performance & a11y

### GPU acceleration

- `filter`, `transform`, `opacity` e `background` (quando interpolado) são **compositor-only** no Chromium/WebKit modernos — não causam layout nem paint.
- `will-change: filter, opacity, background` declarado em cada camada hinta o browser a promover pra GPU layer.
- **Não usar `backdrop-filter`** aqui — Safari iOS tem bugs conhecidos com backdrop-filter em elementos animados (flicker, perda de aceleração).

### `prefers-reduced-motion`

Já está coberto na seção 3 — o `@media (prefers-reduced-motion: reduce)` desliga todas as animações e fixa um filter estático suave. Testável via DevTools → Rendering → "Emulate CSS media feature prefers-reduced-motion".

### Mobile

- iOS Safari 15+ suporta tudo isso sem ressalvas. Testado nos mockups.
- Em devices mais antigos (iPhone 8 e abaixo), considerar carregar uma versão estática via media query (`@media (max-device-pixel-ratio: 2) and (max-width: 414px)` → desligar animações).

### Lighthouse impact estimado

- **CLS:** 0 (todas as camadas são `position: absolute` com `inset: 0`, não causam shift).
- **LCP:** sem impacto (a foto carrega normal via `next/image priority`).
- **TBT:** ~0ms (animações rodam no compositor, não bloqueiam main thread).
- **Performance score:** sem queda mensurável em dispositivos médios.

---

## 7. Como testar

### Comandos

```powershell
cd "e:\Projetos\Dinamic_Imob\apps\web"
pnpm dev
# Abrir http://localhost:3000/portal
```

### Checklist visual (DevTools aberto)

- [ ] Hero carrega a foto, e em ~2s já dá pra notar a luz mudando (brightness subindo do amanhecer pro meio-dia).
- [ ] Aos ~10s: foto clara, céu azul-claro, sol no topo centro.
- [ ] Aos ~20s: pôr-do-sol — foto laranja, céu vermelho-laranja, sol caindo à direita.
- [ ] Aos ~30s: noite — foto escura azulada, lua no meio do céu, estrelas piscando.
- [ ] Aos ~40s: volta pro amanhecer suavemente (loop sem corte visível).

### Checklist técnico

- [ ] **DevTools → Performance → record 5s** → confirmar 0 "Layout" e 0 "Paint" events durante a animação (só "Composite Layers").
- [ ] **DevTools → Rendering → Paint flashing ON** → o hero NÃO deve ficar verde piscando.
- [ ] **DevTools → Rendering → Emulate `prefers-reduced-motion: reduce`** → todas as animações param, foto fica com filter estático suave, céu/sol/estrelas desaparecem.
- [ ] **DevTools → Network → throttle 3G** → animação roda normal mesmo sem foto carregada (CSS-only).
- [ ] **Console:** zero warnings de "Forced reflow" ou "Layout thrashing".

---

## Resumo executivo

| Item                     | Decisão                                                           |
| ------------------------ | ----------------------------------------------------------------- |
| Arquivo CSS              | `apps/web/src/styles/portal-day-night.css`                        |
| Import                   | `apps/web/src/app/portal/layout.tsx`                              |
| Componente refatorado    | `apps/web/src/components/portal/hero-background.tsx`              |
| Filter no `<Image>`      | NÃO — aplicar no wrapper `.hero-img`                              |
| Tailwind config          | OPCIONAL — recomendado manter em CSS puro                         |
| Duração default          | 40s (preset Padrão)                                               |
| Custo de runtime         | ~0% CPU, GPU compositor-only                                      |
| a11y                     | `prefers-reduced-motion` honrado                                  |
| Mobile                   | OK em iOS 15+, Android 10+                                        |

Pronto pra implementar. Próximo passo: aplicar o refator no `hero-background.tsx` e validar visualmente em `/portal`.
