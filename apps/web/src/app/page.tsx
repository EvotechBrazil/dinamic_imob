import { Topbar, Hero, Footer } from "@/components/layout";
import { ChatWidget } from "@/components/chat-widget";

// Sections são criadas em paralelo pelas Squads B e C — serão habilitadas
// no commit de assembly final. Cada uma exporta um named component:
//   import { OmnichannelSection } from "@/components/sections/omnichannel";
//   import { FinanceiroSection } from "@/components/sections/financeiro";
//   import { CRMSection } from "@/components/sections/crm";
//   import { TokenizacaoSection } from "@/components/sections/tokenizacao";
//   import { JuridicoSection } from "@/components/sections/juridico";
//   import { DashboardsSection } from "@/components/sections/dashboards";

const PLACEHOLDER_SECTIONS = [
  { id: "omnichannel", label: "Omnichannel comercial" },
  { id: "financeiro", label: "Módulo financeiro" },
  { id: "crm", label: "CRM + galeria de imóveis" },
  { id: "tokenizacao", label: "Central de tokenização IA" },
  { id: "juridico", label: "Jurídico + LGPD" },
  { id: "dashboards", label: "Dashboards consolidados" },
] as const;

export default function HomePage() {
  return (
    <>
      <Topbar />
      <main>
        <Hero />
        {/* <OmnichannelSection /> */}
        {/* <FinanceiroSection /> */}
        {/* <CRMSection /> */}
        {/* <TokenizacaoSection /> */}
        {/* <JuridicoSection /> */}
        {/* <DashboardsSection /> */}

        {PLACEHOLDER_SECTIONS.map((s) => (
          <section
            key={s.id}
            id={s.id}
            className="scroll-mt-20 border-t border-border bg-app py-16"
          >
            <div className="section-container">
              <p className="mb-2 text-xs font-medium uppercase tracking-wider text-primary">
                Em construção
              </p>
              <h2 className="font-display text-2xl font-bold text-ink">
                {s.label}
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted">
                Esta seção será preenchida pela Squad responsável (parallel
                build).
              </p>
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
