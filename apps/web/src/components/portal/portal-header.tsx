"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

type NavLink = {
  label: string;
  href: string;
};

const NAV_LINKS: ReadonlyArray<NavLink> = [
  { label: "Comprar", href: "#comprar" },
  { label: "Alugar", href: "#alugar" },
  { label: "Bairros", href: "#bairros" },
  { label: "Sobre", href: "#sobre" },
  { label: "Contato", href: "#contato" },
];

const WA_VENDAS = "https://wa.me/5543988478713";

export function PortalHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

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
      const t = window.setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
      return () => {
        window.clearTimeout(t);
      };
    }
    hamburgerRef.current?.focus();
    return undefined;
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 mix-blend-difference text-white">
        <div className="grid grid-cols-[1fr_auto_1fr] items-center px-6 py-6 lg:px-[6vw]">
          {/* Logo + wordmark (esquerda) */}
          <a
            href="/portal"
            className="flex items-center gap-3"
            aria-label="Dinamic Imobiliária — página inicial"
          >
            <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-noir-surface">
              <Image
                src="/logo-dinamic.png"
                alt=""
                aria-hidden
                width={88}
                height={88}
                priority
                className="absolute left-[-32%] top-1/2 w-[290%] max-w-none -translate-y-1/2"
              />
            </div>
            <span className="font-display-noir text-sm font-bold tracking-[0.25em]">
              DINAMIC
            </span>
          </a>

          {/* Nav desktop (centro) */}
          <nav
            aria-label="Navegação principal"
            className="hidden justify-center gap-9 md:flex"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body-noir text-xs uppercase tracking-[0.25em] transition hover:opacity-60"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + hamburger (direita) */}
          <div className="flex items-center justify-end gap-3">
            <a
              href={WA_VENDAS}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-full bg-noir-amber px-5 py-3 font-body-noir text-xs font-bold uppercase tracking-[0.2em] text-noir-bg transition hover:scale-105 sm:inline-flex"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-noir-bg" />
              Falar com a IA
            </a>

            <button
              ref={hamburgerRef}
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menu"
              aria-expanded={menuOpen}
              aria-controls="portal-mobile-drawer"
              className="inline-flex h-10 w-10 items-center justify-center md:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.div
              key="portal-drawer-backdrop"
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm md:hidden"
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
              className="fixed inset-x-0 top-0 z-50 flex flex-col gap-6 border-b border-noir-border bg-noir-bg/95 px-6 py-6 text-noir-text mix-blend-normal backdrop-blur-xl md:hidden"
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-noir-surface">
                    <Image
                      src="/logo-dinamic.png"
                      alt=""
                      aria-hidden
                      width={88}
                      height={88}
                      className="absolute left-[-32%] top-1/2 w-[290%] max-w-none -translate-y-1/2"
                    />
                  </div>
                  <span className="font-display-noir text-sm font-bold tracking-[0.25em] text-noir-text">
                    DINAMIC
                  </span>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeMenu}
                  aria-label="Fechar menu"
                  className="inline-flex h-10 w-10 items-center justify-center text-noir-text transition hover:opacity-60"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <nav
                aria-label="Navegação mobile"
                className="flex flex-col gap-4"
              >
                {NAV_LINKS.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={closeMenu}
                    className="font-body-noir text-base uppercase tracking-[0.25em] text-noir-text transition hover:opacity-60"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-noir-border pt-6">
                <a
                  href={WA_VENDAS}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="inline-flex items-center gap-2 rounded-full bg-noir-amber px-5 py-3 font-body-noir text-xs font-bold uppercase tracking-[0.2em] text-noir-bg transition hover:scale-105"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-noir-bg" />
                  Falar com a IA
                </a>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}
