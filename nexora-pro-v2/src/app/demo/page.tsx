'use client';

import Link from 'next/link';

export default function DemoPage() {
  const handleClick = () => {
    alert('¡Demo interactiva activada! 🚀');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-purple-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Demo Interactiva</h1>
      <p className="mb-8 text-purple-200">Prueba Nexora Pro sin instalar nada. Solo haz clic y ve cómo funciona.</p>

      <div className="bg-gray-800 p-6 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-4">¿Qué puedes hacer?</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Crear un producto digital en segundos</li>
          <li>Configurar precios y descuentos</li>
          <li>Ver cómo se integra Lemon Squeezy</li>
          <li>Probar el panel de afiliados</li>
        </ul>
      </div>

      <div className="flex gap-4">
        <button
          onClick={handleClick}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg font-bold transition-all"
        >
          Probar Ahora
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