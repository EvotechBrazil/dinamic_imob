"use client";

import { PortalFooterCTA } from "./portal-footer-cta";
import { PortalFooterSitemap } from "./portal-footer-sitemap";

/**
 * @deprecated use PortalFooterCTA e PortalFooterSitemap separadamente.
 * Mantido só pra compatibilidade com imports antigos.
 */
export function PortalFooter() {
  return (
    <>
      <PortalFooterCTA />
      <PortalFooterSitemap />
    </>
  );
}
