import Link from "next/link";
import Image from "next/image";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-app">
      <header className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Image src="/logo-dinamic.png" alt="Dinamic" width={32} height={32} className="h-8 w-auto" />
            <div className="flex flex-col leading-tight">
              <span className="font-semibold text-ink">Dinamic Channel</span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-muted">Painel da equipe</span>
            </div>
          </div>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/admin/inbox" className="font-medium text-ink hover:text-primary">Inbox</Link>
            <Link href="/portal" className="text-muted hover:text-primary">↗ Portal</Link>
            <Link href="/" className="text-muted hover:text-primary">↗ Dashboard</Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
