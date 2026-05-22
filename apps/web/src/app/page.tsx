import { Topbar, Hero, Footer } from "@/components/layout";
import { ChatWidget } from "@/components/chat-widget";
import { ImoveisSection } from "@/components/sections/imoveis";
import { OmnichannelSection } from "@/components/sections/omnichannel";
import { FinanceiroSection } from "@/components/sections/financeiro";
import { CRMSection } from "@/components/sections/crm";
import { TokenizacaoSection } from "@/components/sections/tokenizacao";
import { JuridicoSection } from "@/components/sections/juridico";
import { TarefasSection } from "@/components/sections/tarefas";
import { DashboardsSection } from "@/components/sections/dashboards";

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        <ImoveisSection />
        <OmnichannelSection />
        <FinanceiroSection />
        <CRMSection />
        <TokenizacaoSection />
        <JuridicoSection />
        <TarefasSection />
        <DashboardsSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
