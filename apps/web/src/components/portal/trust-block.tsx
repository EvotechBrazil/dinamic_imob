"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Home,
  Scale,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

type Stat = {
  icon: LucideIcon;
  value: number | string;
  suffix?: string;
  label: string;
  helper: string;
  animated: boolean;
};

const STATS: Stat[] = [
  {
    icon: Scale,
    value: "J-04567-PR",
    label: "CRECI ativo",
    helper: "Verificável no CRECI-PR",
    animated: false,
  },
  {
    icon: Calendar,
    value: 20,
    suffix: "+",
    label: "anos no mercado",
    helper: "desde 2006 em Arapongas",
    animated: true,
  },
  {
    icon: Home,
    value: 628,
    suffix: "",
    label: "imóveis ativos",
    helper: "atualizado em tempo real",
    animated: true,
  },
  {
    icon: Users,
    value: 6,
    suffix: "",
    label: "corretores locais",
    helper: "atendimento humano, não terceirizado",
    animated: true,
  },
];

type Testimonial = {
  quote: string;
  author: string;
  role: string;
  initials: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "A Dinamic vendeu meu apartamento em 18 dias. Atendimento rápido, contrato sem pegadinha, recebi o pagamento certinho na conta. Indico de olhos fechados.",
    author: "Patrícia Mendonça",
    role: "vendeu em mar/2026",
    initials: "PM",
  },
  {
    quote:
      "Encontrei o apto perfeito no Centro pela IA da Dinamic em 15 minutos. Visitei na quinta, fechei na sexta. Atendimento humano de verdade.",
    author: "Rodrigo Santos",
    role: "alugou em fev/2026",
    initials: "RS",
  },
  {
    quote:
      "Locação tranquila, sem burocracia desnecessária. O Felipe me explicou tudo, contrato claro, fiador aprovado em 24h.",
    author: "Beatriz Lima",
    role: "alugou em jan/2026",
    initials: "BL",
  },
];

function AnimatedCounter({
  to,
  duration = 1.2,
  suffix = "",
}: {
  to: number;
  duration?: number;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / (duration * 1000), 1);
      setCount(Math.round(easeOut(progress) * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("pt-BR")}
      {suffix}
    </span>
  );
}

function StatCard({ icon: Icon, value, suffix, label, helper, animated }: Stat) {
  const [hovered, setHovered] = useState(false);
  const cardStyle: CSSProperties = {
    boxShadow: hovered
      ? "var(--shadow-portal-card-hover)"
      : "var(--shadow-portal-card)",
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={cardStyle}
      className="rounded-2xl border border-[var(--portal-border)] bg-white p-6 text-center transition-all duration-300 hover:-translate-y-0.5 lg:p-8"
    >
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--portal-gold-soft)] text-[var(--portal-gold-dark)]">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <div className="font-display text-4xl font-bold text-[var(--portal-text)] lg:text-5xl">
        {animated && typeof value === "number" ? (
          <AnimatedCounter to={value} duration={1.2} suffix={suffix ?? ""} />
        ) : (
          <span>{value}</span>
        )}
      </div>
      <div className="mt-1 text-sm text-[var(--portal-text-muted)]">{label}</div>
      <div className="mt-2 px-2 text-xs text-[var(--portal-text-subtle)]">
        {helper}
      </div>
    </div>
  );
}

function TestimonialCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % TESTIMONIALS.length);
    }, 8000);
    return () => clearInterval(id);
  }, [paused]);

  const current = TESTIMONIALS[index];

  const goPrev = () =>
    setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const goNext = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);

  return (
    <div
      className="relative mx-auto mt-12 max-w-3xl lg:mt-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className="relative rounded-2xl border border-[var(--portal-border)] bg-white p-8 lg:p-10"
        style={{ boxShadow: "var(--shadow-portal-card)" }}
      >
        <div className="mb-4 flex justify-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-5 w-5 fill-amber-400 text-amber-400"
              aria-hidden="true"
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            <p className="text-center font-display text-xl italic leading-relaxed text-[var(--portal-text)] lg:text-2xl">
              &ldquo;{current.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--portal-gold-soft)] text-sm font-semibold text-[var(--portal-gold-dark)]">
                {current.initials}
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-[var(--portal-text)]">
                  {current.author}
                </div>
                <div className="text-xs text-[var(--portal-text-muted)]">
                  {current.role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={goPrev}
          aria-label="Depoimento anterior"
          className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-[var(--portal-text-muted)] transition-colors hover:text-[var(--portal-text)] lg:flex"
          style={{ boxShadow: "var(--shadow-portal-card)" }}
        >
          <ChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Próximo depoimento"
          className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-white p-2 text-[var(--portal-text-muted)] transition-colors hover:text-[var(--portal-text)] lg:flex"
          style={{ boxShadow: "var(--shadow-portal-card)" }}
        >
          <ChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {TESTIMONIALS.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Depoimento ${i + 1}`}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index
                ? "w-8 bg-[var(--portal-gold)]"
                : "w-1.5 bg-[var(--portal-border-strong)] hover:bg-[var(--portal-text-subtle)]",
            )}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustBlock() {
  return (
    <section className="bg-[var(--portal-bg)] py-16 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--portal-gold-dark)]">
            Por que escolher
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[var(--portal-text)] lg:text-4xl">
            Confiança que se constrói com tempo.
            <br className="hidden sm:inline" /> E com CRECI.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STATS.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        <TestimonialCarousel />
      </div>
    </section>
  );
}
