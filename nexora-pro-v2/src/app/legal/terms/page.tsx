'use client';

import Link from 'next/link';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Términos de Servicio</h1>
      <p className="mb-6">Última actualización: 10 de octubre de 2025</p>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">1. Aceptación de los términos</h2>
        <p>Al acceder o utilizar este sitio, aceptas cumplir con estos términos.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">2. Uso del servicio</h2>
        <p>Estás autorizado a usar el servicio solo con fines legales y conforme a estos términos.</p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">3. Limitación de responsabilidad</h2>
        <p>No seremos responsables por daños directos, indirectos o consecuentes derivados del uso de este servicio.</p>
      </section>

      <div className="mt-8">
        <Link href="/legal" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
          ← Volver a Legal
        </Link>
      </div>
    </div>
  );
}