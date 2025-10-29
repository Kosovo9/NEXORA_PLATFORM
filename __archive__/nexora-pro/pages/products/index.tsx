// pages/products/index.tsx
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Our Flagship Products</h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            All-in-one kits for founders in Mexico, Canada & USA. Launch your digital product in 24 hours — no code, no risk.
          </p>
          <Link
            href="/"
            className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800"
          >
            Back to Home
          </Link>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* SaaS-in-a-Box */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">SaaS-in-a-Box</h3>
            <p className="text-gray-400 text-sm mb-4">Lanza tu SaaS en 24h. Sin código, sin estrés.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$297</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/REEMPLAZA_CON_URL_1"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get Instant Access
            </Link>
          </div>

          {/* AI Agent Suite */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">AI Agent Suite</h3>
            <p className="text-gray-400 text-sm mb-4">Agentes de IA para ventas, soporte y analytics.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$197</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/REEMPLAZA_CON_URL_2"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get Instant Access
            </Link>
          </div>

          {/* Funnel Pro */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">Funnel Pro</h3>
            <p className="text-gray-400 text-sm mb-4">Sistema de conversión probado en 12 SaaS.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$147</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/REEMPLAZA_CON_URL_3"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get Instant Access
            </Link>
          </div>

          {/* Nexora Avatars VIP */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow relative">
            <span className="absolute -top-3 left-6 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
            <h3 className="text-xl font-bold mb-2">Nexora Avatars VIP</h3>
            <p className="text-gray-400 text-sm mb-4">Clona tu rostro, voz y expresiones desde foto, video o audio.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$297</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/REEMPLAZA_CON_URL_4"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Generate Avatar
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 px-6 md:px-12 bg-black border-t border-gray-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-400">
              © 2025 Nexora.io. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link href="/legal/privacy" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy (EN)
            </Link>
            <Link href="/legal/privacidad" className="text-sm text-gray-400 hover:text-white">
              Política de Privacidad (ES)
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}