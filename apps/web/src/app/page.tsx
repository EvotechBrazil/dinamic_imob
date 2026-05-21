import { Topbar, Hero, Footer } from "@/components/layout";
import { ChatWidget } from "@/components/chat-widget";
import { OmnichannelSection } from "@/components/sections/omnichannel";
import { FinanceiroSection } from "@/components/sections/financeiro";
import { CRMSection } from "@/components/sections/crm";
import { TokenizacaoSection } from "@/components/sections/tokenizacao";
import { JuridicoSection } from "@/components/sections/juridico";
import { DashboardsSection } from "@/components/sections/dashboards";

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <OmnichannelSection />
        <FinanceiroSection />
        <CRMSection />
        <TokenizacaoSection />
        <JuridicoSection />
        <DashboardsSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
