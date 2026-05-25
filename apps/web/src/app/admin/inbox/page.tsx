import { Suspense } from "react";
import { InboxView } from "@/components/admin/inbox/inbox-view";

export const metadata = {
  title: "Inbox · Dinamic Channel",
};

// Forçar render dinâmico — a inbox lê searchParams (?c=<id>) e faz polling,
// não faz sentido prerender estático.
export const dynamic = "force-dynamic";

export default function InboxPage() {
  return (
    <Suspense
      fallback={
        <div className="grid h-[calc(100vh-57px)] place-items-center bg-app text-sm text-muted">
          Carregando inbox...
        </div>
      }
    >
      <InboxView />
    </Suspense>
  );
}
