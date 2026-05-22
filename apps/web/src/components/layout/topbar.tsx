"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { id: "imoveis", label: "Imóveis" },
  { id: "omnichannel", label: "Dinamic Channel" },
  { id: "financeiro", label: "Financeiro" },
  { id: "crm", label: "CRM" },
  { id: "tokenizacao", label: "Tokenização" },
  { id: "juridico", label: "Jurídico" },
  { id: "tarefas", label: "Tarefas" },
  { id: "dashboards", label: "Dashboards" },
] as const;

export function Topbar() {
  const [activeId, setActiveId] = React.useState<string>("");
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trava scroll do body quando menu mobile está aberto
  React.useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

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
          .sort(
            (a, b) => b.intersectionRect.height - a.intersectionRect.height
          );
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-30% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
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
      <div className="section-container flex h-36 items-center justify-between">
        <Link
          href="/"
          aria-label="Dinamic Imóveis — Arapongas-PR"
          className="group flex items-center rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
        >
          <Image
            src="/logo-dinamic.png"
            alt="Dinamic Imóveis"
            width={384}
            height={256}
            priority
            className="h-[128px] w-auto transition-transform duration-200 group-hover:scale-[1.02]"
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
          <Avatar className="hidden h-9 w-9 sm:flex">
            <AvatarFallback className="bg-primary/10 text-primary">
              DN
            </AvatarFallback>
          </Avatar>
          <button
            type="button"
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md text-ink transition hover:bg-slate-100 lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer — desliza pra baixo abaixo do header */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 top-36 z-40 bg-ink/40 lg:hidden"
            onClick={() => setMobileOpen(false)}
            aria-hidden
          />
          <nav
            id="mobile-nav"
            className="absolute left-0 right-0 top-full z-50 border-b border-border bg-white shadow-lg lg:hidden"
          >
            <ul className="section-container flex flex-col gap-1 py-3">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "block rounded-md px-4 py-3 text-base font-medium transition-colors",
                      activeId === item.id
                        ? "bg-primary/10 text-primary"
                        : "text-ink hover:bg-slate-50"
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="mt-2 border-t border-border pt-3">
                <Button asChild size="sm" className="w-full">
                  <a href="#omnichannel" onClick={() => setMobileOpen(false)}>
                    Acessar admin
                  </a>
                </Button>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
