import "../globals.css";
import type { ReactNode } from "react";
import { loadMessages, SUPPORTED_LOCALES } from "@/lib/i18n";
import Link from "next/link";

export const dynamic = "force-dynamic";
export async function generateStaticParams(){ return SUPPORTED_LOCALES.map(l=>({ locale:l })); }

export default async function LocaleLayout({ children, params }:{ children: ReactNode, params:{ locale:string }}){
  const t = await loadMessages(params.locale);
  return (
    <html lang={params.locale}>
      <body className="min-h-dvh bg-white text-slate-900 antialiased">
        <header className="border-b">
          <div className="max-w-6xl mx-auto p-4 flex items-center justify-between">
            <Link href={`/${params.locale}`} className="font-bold">Nexora Pro</Link>
            <nav className="flex gap-4 text-sm">
              <Link href={`/${params.locale}/offers`}>{t.nav_offers ?? 'Offers'}</Link>
              <Link href={`/${params.locale}/admin`}>{t.nav_admin ?? 'Admin'}</Link>
              <Link href={`/${params.locale}/auth/signin`}>{t.nav_signin ?? 'Sign in'}</Link>
            </nav>
          </div>
        </header>
        <main className="max-w-6xl mx-auto p-6">{children}</main>
        <footer className="border-t">
          <div className="max-w-6xl mx-auto p-4 text-xs flex flex-wrap gap-4">
            <Link href={`/${params.locale}/legal/terms`}>Terms</Link>
            <Link href={`/${params.locale}/legal/privacy`}>Privacy</Link>
            <Link href={`/${params.locale}/legal/disclaimer`}>Disclaimer</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
