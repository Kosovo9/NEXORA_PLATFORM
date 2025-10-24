import Link from 'next/link';
import { loadMessages } from '@/lib/i18n';

export default async function Page({ params }: { params:{ locale:string } }) {
  const t = await loadMessages(params.locale);
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex flex-col-reverse md:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-4">
            <img src="/brand/logo.svg" alt="Nexora" className="h-10 w-10" />
            <span className="font-bold text-lg tracking-wide">Nexora Pro</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            {t?.home_title ?? 'Plataforma de Afiliados, simple.'}
          </h1>
          <p className="mt-4 text-gray-600">
            {t?.home_subtitle ?? 'Crea ofertas, comparte links, trackea clics y conversiones.'}
          </p>
          <div className="mt-6 flex gap-3">
            <Link href={//offers} className="px-5 py-2 rounded-xl bg-black text-white font-medium">Ver ofertas</Link>
            <Link href={//auth/signin} className="px-5 py-2 rounded-xl border border-black/20">Iniciar sesión</Link>
          </div>
          <p className="mt-3 text-xs text-gray-400">Demo: puedes registrar una conversión de prueba en el Admin.</p>
        </div>
        <div className="flex-1">
          <img src="/brand/hero.svg" alt="Nexora Hero" className="w-full h-auto rounded-2xl shadow" />
        </div>
      </div>
    </main>
  );
}
