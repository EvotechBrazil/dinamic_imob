"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

import { WhatsAppIcon } from "@/components/ui/brand-icons";
import { cn } from "@/lib/utils";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { label: "Comprar", href: "#" },
  { label: "Alugar", href: "#" },
  { label: "Lançamentos", href: "#" },
  { label: "Bairros", href: "#" },
  { label: "Contato", href: "#" },
];

const WA_VENDAS = "https://wa.me/5543988478713";
const WA_LOCACAO = "https://wa.me/5543988478670";
const STICKY_THRESHOLD = 600;

export function PortalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);

  // Body scroll lock enquanto drawer mobile esta aberto
  useEffect(() => {
    if (!menuOpen) return;
    if (typeof document === "undefined") return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [menuOpen]);

  // ESC fecha drawer + Tab focus trap
  useEffect(() => {
    if (!menuOpen) return;
    if (typeof window === "undefined") return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }
      if (event.key === "Tab" && drawerRef.current) {
        const focusables = drawerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (event.shiftKey && active === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && active === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  // Focus management: ao abrir, foca no X; ao fechar, volta pro hamburger
  useEffect(() => {
    if (menuOpen) {
      // pequeno delay pra esperar drawer montar no DOM
      const t = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        window.clearTimeout(t);
      };
    }
    // Drawer fechou: restaura foco no hamburger
    hamburgerRef.current?.focus();
    return undefined;
  }, [menuOpen]);

  // Sticky search bar aparece apos rolar > STICKY_THRESHOLD
  useEffect(() => {
    if (typeof window === "undefined") return;
    const onScroll = () => {
      setScrolled(window.scrollY > STICKY_THRESHOLD);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const handleStickySearchFocus = () => {
    setScrolled(false);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 h-20 w-full border-b border-portal-border bg-white/95 backdrop-blur-md">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <a
            href="/portal"
            className="flex items-center gap-2"
            aria-label="Dinamic Imobiliária — página inicial"
          >
            <Image
              src="/logo-dinamic.png"
              alt="Dinamic Imobiliária"
              width={180}
              height={56}
              priority
              className="h-12 w-auto lg:h-14"
            />
          </a>

          {/* Nav desktop */}
          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-1 lg:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-portal-text transition hover:bg-portal-gold-soft hover:text-portal-gold-dark"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA WhatsApp desktop (md+ ja mostra pra iPad) */}
          <a
            href={WA_VENDAS}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-lg bg-portal-whatsapp px-4 text-white shadow-md transition hover:shadow-portal-whatsapp md:flex"
          >
            <WhatsAppIcon className="h-4 w-4" />
            <span className="text-sm font-semibold">(43) 98847-8713</span>
          </a>

          {/* Hamburger mobile */}
          <button
            ref={hamburgerRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
            aria-controls="portal-mobile-drawer"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-portal-text transition hover:bg-portal-gold-soft hover:text-portal-gold-dark lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              key="portal-drawer-backdrop"
              className="fixed inset-0 z-50 bg-black/50 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMenu}
              aria-hidden="true"
            />
            <motion.aside
              key="portal-drawer-panel"
              id="portal-mobile-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Menu principal"
              ref={drawerRef}
              className="fixed right-0 top-0 z-50 flex h-full w-80 max-w-[85vw] flex-col gap-4 bg-white p-6 lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="/logo-dinamic.png"
                  alt="Dinamic Imobiliária"
                  width={140}
                  height={44}
                  className="h-10 w-auto"
                />
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Fechar menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md text-portal-text transition hover:bg-portal-gold-soft hover:text-portal-gold-dark"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-2"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="rounded-lg px-3 py-3 text-base font-medium text-portal-text transition hover:bg-portal-gold-soft hover:text-portal-gold-dark"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-portal-border pt-4">
                <div className="flex flex-col gap-3">
                  <a
                    href={WA_VENDAS}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex h-12 items-center gap-3 rounded-lg bg-portal-whatsapp px-4 text-white shadow-md transition hover:shadow-portal-whatsapp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">Vendas</span>
                      <span className="text-xs opacity-90">
                        (43) 98847-8713
                      </span>
                    </span>
                  </a>
                  <a
                    href={WA_LOCACAO}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                    className="flex h-12 items-center gap-3 rounded-lg bg-portal-whatsapp px-4 text-white shadow-md transition hover:shadow-portal-whatsapp"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    <span className="flex flex-col leading-tight">
                      <span className="text-sm font-semibold">Locação</span>
                      <span className="text-xs opacity-90">
                        (43) 98847-8670
                      </span>
                    </span>
                  </a>
                </div>
              </div>

              <div className="mt-auto pt-4 text-xs text-portal-text-muted">
                CRECI ativo · Arapongas-PR
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      {/* Sticky search bar — aparece apos scrollar > 600px */}
      <AnimatePresence>
        {scrolled ? (
          <motion.div
            key="portal-sticky-search"
            className={cn(
              "fixed left-0 right-0 top-20 z-30",
              "h-14 border-b border-portal-border bg-white shadow-sm",
            )}
            initial={{ y: -60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mx-auto flex h-full max-w-3xl items-center px-4">
              <button
                type="button"
                onClick={handleStickySearchFocus}
                aria-label="Voltar ao topo e abrir busca"
                className="h-11 w-full rounded-lg border border-portal-border bg-portal-bg px-4 text-left text-sm text-portal-text-subtle transition hover:border-portal-gold focus:border-portal-gold focus:outline-none focus:ring-2 focus:ring-portal-gold/20"
              >
                Pergunte sobre imóveis em Arapongas...
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
