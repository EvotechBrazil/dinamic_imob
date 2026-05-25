import { PortalHeader } from "@/components/portal/portal-header";
import { HeroChat } from "@/components/portal/hero-chat";
import { IntroSection } from "@/components/portal/intro-section";
import { StickyCardStack } from "@/components/portal/sticky-card-stack";
import { Neighborhoods } from "@/components/portal/neighborhoods";
import { StatsBrutal } from "@/components/portal/stats-brutal";
import { PortalFooterCTA } from "@/components/portal/portal-footer-cta";
import { PortalFooterSitemap } from "@/components/portal/portal-footer-sitemap";
import { FloatingActions } from "@/components/portal/floating-actions";

export default function PortalPage() {
  return (
    <>
      <PortalHeader />
      <main>
        <HeroChat />
        <IntroSection />
        <StickyCardStack />
        <Neighborhoods />
        <StatsBrutal />
      </main>
      <PortalFooterCTA />
      <PortalFooterSitemap />
      <FloatingActions />
    </>
  );
}
