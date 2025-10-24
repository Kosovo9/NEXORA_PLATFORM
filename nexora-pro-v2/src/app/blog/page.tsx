'use client';

import Link from 'next/link';

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Blog</h1>
      <p className="mb-8">Aquí encontrarás las últimas noticias, tutoriales y tips sobre Nexora Pro.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Cómo empezar con Nexora Pro</h2>
          <p className="text-gray-300">Guía paso a paso para lanzar tu primer producto digital.</p>
          <Link href="/blog/como-empezar" className="text-purple-400 hover:underline mt-3 inline-block">
            Leer más →
          </Link>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Integración con Lemon Squeezy</h2>
          <p className="text-gray-300">Todo lo que necesitas saber para monetizar tu producto.</p>
          <Link href="/blog/lemon-squeezy" className="text-purple-400 hover:underline mt-3 inline-block">
            Leer más →
          </Link>
        </div>
      </div>
      <div className="mt-8">
        <Link href="/" className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded transition-colors">
          ← Volver al inicio
        </Link>
      </div>
    </div>
  );
}