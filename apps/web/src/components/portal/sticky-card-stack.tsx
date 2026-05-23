"use client";

import * as React from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { TextReveal } from "./text-reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface FeaturedProperty {
  num: string;
  type: string;
  title: string;
  location: string;
  description: string;
  specs: { value: string; label: string }[];
  price: string;
  image: string;
  alt: string;
}

const FEATURED: ReadonlyArray<FeaturedProperty> = [
  {
    num: "#01",
    type: "Casa residencial",
    title: "Casa moderna · Centro",
    location: "Rua Brasil, 1247 · Centro · Arapongas-PR",
    description:
      "Casa de alto padrão com 3 dormitórios, suíte master, piscina aquecida e garagem pra 4 carros. Acabamento premium em mármore travertino, ar-condicionado em todos os ambientes.",
    specs: [
      { value: "3", label: "Dormitórios" },
      { value: "180m²", label: "Área útil" },
      { value: "4", label: "Vagas" },
      { value: "1", label: "Piscina" },
    ],
    price: "R$ 1.280.000",
    image: "/portal/imoveis/imovel-1.webp",
    alt: "Casa moderna no Centro de Arapongas",
  },
  {
    num: "#02",
    type: "Apartamento",
    title: "Apartamento · Jd Tropical",
    location: "Av. Vista Bela, 892 · Jd Tropical · Arapongas-PR",
    description:
      "Apartamento 3 dorms com varanda gourmet panorâmica, vista pro parque municipal. Andar alto, sol da manhã, prédio com lazer completo: piscina, academia, salão de festas.",
    specs: [
      { value: "3", label: "Dormitórios" },
      { value: "112m²", label: "Área útil" },
      { value: "2", label: "Vagas" },
      { value: "14º", label: "Andar" },
    ],
    price: "R$ 620.000",
    image: "/portal/imoveis/imovel-2.webp",
    alt: "Apartamento Jardim Tropical",
  },
  {
    num: "#03",
    type: "Sala comercial",
    title: "Sala comercial · Industrial",
    location: "Av. Ricieri Bett, 2150 · Industrial · Arapongas-PR",
    description:
      "Sala comercial de 85m² em edifício recém-entregue. Recepção, 2 ambientes privados, copa, 2 banheiros. Estacionamento próprio, elevador, segurança 24h. Ideal escritórios.",
    specs: [
      { value: "85m²", label: "Área total" },
      { value: "2", label: "Ambientes" },
      { value: "2", label: "Vagas" },
      { value: "24h", label: "Segurança" },
    ],
    price: "R$ 450.000",
    image: "/portal/imoveis/imovel-3.webp",
    alt: "Sala comercial Industrial",
  },
];

export function StickyCardStack() {
  const sectionRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 901px)", () => {
      const cards = el.querySelectorAll<HTMLDivElement>(".stack-card");
      const triggers: ScrollTrigger[] = [];
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;
        const inner = card.querySelector<HTMLDivElement>(".card-inner");
        const next = cards[i + 1];
        if (!inner || !next) return;
        const anim = gsap.to(inner, {
          scale: 0.92,
          opacity: 0.4,
          ease: "none",
          scrollTrigger: {
            trigger: next,
            start: "top bottom",
            end: "top 10vh",
            scrub: true,
          },
        });
        if (anim.scrollTrigger) triggers.push(anim.scrollTrigger);
      });
      return () => {
        triggers.forEach((t) => t.kill());
      };
    });
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-noir-bg pt-[10vh] pb-[10vh]">
      <div className="text-center mb-[6vh] px-6">
        <div className="font-body-noir font-bold text-[11px] uppercase tracking-[0.35em] text-noir-amber mb-3">
          Destaques da semana
        </div>
        <TextReveal
          text="SELEÇÃO EDITORIAL"
          as="h3"
          className="font-display-noir font-bold text-4xl md:text-5xl lg:text-6xl text-noir-text tracking-tight"
        />
      </div>

      {FEATURED.map((p) => (
        <div key={p.num} className="stack-card sticky top-[10vh] h-[80vh] px-6 md:px-[8vw]">
          <div className="card-inner h-full w-full bg-noir-surface border border-white/10 grid md:grid-cols-[1fr_1.2fr] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.7)] origin-top">
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <div className="font-display-noir font-bold text-7xl md:text-8xl text-noir-amber leading-none">
                  {p.num}
                </div>
                <div className="font-body-noir font-bold text-[11px] uppercase tracking-[0.3em] text-noir-text-mute mt-6">
                  {p.type}
                </div>
                <h3 className="font-display-noir font-bold text-4xl md:text-5xl text-noir-text leading-tight mt-3 mb-2 tracking-tight">
                  {p.title}
                </h3>
                <div className="font-body-noir text-sm text-noir-text-mute tracking-wide">{p.location}</div>
                <p className="font-body-noir font-light text-[15px] leading-relaxed text-noir-text-mute mt-6 max-w-[90%]">
                  {p.description}
                </p>
                <div className="grid grid-cols-4 gap-4 py-6 my-6 border-t border-b border-noir-border">
                  {p.specs.map((sp) => (
                    <div
                      key={sp.label}
                      className="font-body-noir font-bold text-[11px] uppercase tracking-[0.2em] text-noir-text"
                    >
                      {sp.value}
                      <span className="block text-[10px] font-normal text-noir-text-mute mt-1">{sp.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="font-display-noir font-bold text-5xl text-noir-text leading-none mt-6">{p.price}</div>
                <div className="h-[2px] w-3/5 bg-noir-amber mt-2" />
                <a
                  href="#"
                  className="inline-flex items-center gap-2 text-noir-amber font-body-noir font-bold text-sm uppercase tracking-[0.2em] border-b border-noir-amber pb-1 mt-6 transition-transform hover:translate-x-2"
                >
                  Ver detalhes →
                </a>
              </div>
            </div>
            <div className="relative overflow-hidden hidden md:block">
              <Image
                src={p.image}
                alt={p.alt}
                fill
                className="object-cover transition-transform duration-[1500ms] ease-out hover:scale-[1.08]"
              />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
