'use client';

import Link from 'next/link';

export default function AffiliatesPage() {
  const handleClick = () => {
    alert('¡Te has unido al programa de afiliados! 🎉');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Programa de Afiliados</h1>
      <p className="mb-8 text-purple-200">Gana dinero promoviendo Nexora Pro. Recibe hasta el 30% por cada venta.</p>

      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">¿Cómo funciona?</h2>
        <ol className="list-decimal list-inside space-y-2">
          <li>Regístrate como afiliado</li>
          <li>Obtén tu enlace único</li>
          <li>Comparte y gana comisiones</li>
          <li>Cobra automáticamente cada mes</li>
        </ol>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 rounded-lg font-bold transition-all"
        >
          Únete ahora
        </button>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-bold transition-colors"
        >
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}