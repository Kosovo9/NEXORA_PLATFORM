// pages/products/saas-in-a-box.tsx
import Link from 'next/link'

export default function SaaSInABox() {
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <Link href="/products" className="text-gray-400 hover:text-white mb-6 inline-block">
            ← Back to Products
          </Link>
          <h1 className="text-5xl font-bold mb-6">SaaS-in-a-Box</h1>
          <p className="text-xl text-gray-300 mb-8">Todo lo que necesitas para lanzar tu SaaS en 24 horas.</p>
          
          <div className="bg-gray-800 p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-bold mb-4">Incluye:</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Código fuente completo (Next.js + Tailwind)</li>
              <li>Dashboard de administración</li>
              <li>Integración con Lemon Squeezy</li>
              <li>Documentación técnica y de usuario</li>
            </ul>
          </div>

          <Link
            href="https://buy.lemonsqueezy.com/REEMPLAZA_CON_URL_1"
            target="_blank"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Comprar por $297 →
          </Link>
        </div>
      </section>
    </div>
  )
}