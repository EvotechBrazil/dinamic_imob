import { LiveTicker } from "@/components/portal/live-ticker";
import { PortalHeader } from "@/components/portal/portal-header";
import { HeroChat } from "@/components/portal/hero-chat";
import { SearchShortcuts } from "@/components/portal/search-shortcuts";

import { FeaturedProperties } from "@/components/portal/featured-properties";
import { Neighborhoods } from "@/components/portal/neighborhoods";

import { TrustBlock } from "@/components/portal/trust-block";
import { FinalCta } from "@/components/portal/final-cta";
import { PortalFooter } from "@/components/portal/portal-footer";
import { FloatingActions } from "@/components/portal/floating-actions";

export default function PortalPage() {
  return (
    <>
      <LiveTicker />
      <PortalHeader />
      <main>
        <HeroChat />
        <SearchShortcuts />
        <FeaturedProperties />
        <Neighborhoods />
        <TrustBlock />
        <FinalCta />
      </main>
      <PortalFooter />
      <FloatingActions />
    </>
  );
}
