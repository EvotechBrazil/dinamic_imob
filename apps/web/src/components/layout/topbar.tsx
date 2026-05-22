"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "imoveis", label: "Imóveis" },
  { id: "omnichannel", label: "Omnichannel" },
  { id: "financeiro", label: "Financeiro" },
  { id: "crm", label: "CRM" },
  { id: "tokenizacao", label: "Tokenização" },
  { id: "juridico", label: "Jurídico" },
  { id: "dashboards", label: "Dashboards" },
] as const;

export function Topbar() {
  const [activeId, setActiveId] = React.useState<string>("");
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const sections = NAV_ITEMS.map((i) => document.getElementById(i.id)).filter(
      Boolean
    ) as HTMLElement[];
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: [0.1, 0.4, 0.8] }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "border-b border-border/70 bg-white/90 backdrop-blur-md"
          : "bg-transparent"
      )}
      style={{ zIndex: "var(--z-topbar)" as unknown as number }}
    >
      <div className="section-container flex h-20 items-center justify-between">
        <Link
          href="/"
          aria-label="Dinamic Imóveis — Arapongas-PR"
          className="group flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Image
            src="/logo-dinamic.png"
            alt="Dinamic Imóveis"
            width={273}
            height={182}
            priority
            className="h-[52px] w-auto transition-transform duration-200 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                activeId === item.id
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:bg-slate-100 hover:text-ink"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button size="sm" variant="outline" className="hidden md:inline-flex">
            Acessar admin
          </Button>
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              DN
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}
