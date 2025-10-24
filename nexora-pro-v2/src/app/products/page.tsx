// src/app/products/page.tsx
import Link from 'next/link'

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="py-6 px-6 md:px-12 border-b border-gray-800">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold">Nexora</Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/products" className="hover:text-gray-300">Products</Link>
            <Link href="/affiliates" className="hover:text-gray-300">Affiliates</Link>
            <Link href="/legal/privacy" className="hover:text-gray-300">Privacy</Link>
          </nav>
          <button
            onClick={() => {
              if (typeof window !== 'undefined') {
                const current = window.document.documentElement.lang
                const next = current === 'en' ? 'es' : 'en'
                window.document.documentElement.lang = next
                localStorage.setItem('language', next)
                window.location.reload()
              }
            }}
            className="text-sm bg-gray-800 px-3 py-1 rounded hover:bg-gray-700"
          >
            {typeof window !== 'undefined' ? (window.document.documentElement.lang === 'en' ? 'ES' : 'EN') : 'EN'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full mb-6">
            Official Nexora Launch — April 2025
          </span>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our Flagship Products
          </h1>
          <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            All-in-one kits for founders in Mexico, Canada & USA. Launch your digital product in 24 hours — no code, no risk.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors">
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20 px-6 md:px-12 bg-gray-900">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* SaaS-in-a-Box */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-bold mb-2">SaaS-in-a-Box</h3>
            <p className="text-gray-400 text-sm mb-4">Lanza tu SaaS en 24h.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$297</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/TU_URL_SAAS_AQUI"
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
            <p className="text-gray-400 text-sm mb-4">Agentes de IA para ventas y soporte.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$197</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/TU_URL_AI_AQUI"
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
            <p className="text-gray-400 text-sm mb-4">Funnels de alto rendimiento.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$147</span>
              <span className="text-gray-500 ml-2">one-time</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/TU_URL_FUNNEL_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Get Instant Access
            </Link>
          </div>

          {/* Nexora Pro */}
          <div className="bg-gray-800 p-6 rounded-xl hover:shadow-lg transition-shadow relative">
            <span className="absolute -top-3 left-6 bg-purple-600 text-white text-xs px-3 py-1 rounded-full">Most Popular</span>
            <h3 className="text-xl font-bold mb-2">Nexora Pro</h3>
            <p className="text-gray-400 text-sm mb-4">Acceso mensual a todas las herramientas.</p>
            <div className="mb-4">
              <span className="text-2xl font-bold">$29</span>
              <span className="text-gray-500 ml-2">/mo</span>
            </div>
            <Link
              href="https://buy.lemonsqueezy.com/TU_URL_PRO_AQUI"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-block bg-purple-600 text-white text-center py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
            >
              Start Free Trial
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
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <Link href="/legal/privacy" className="hover:text-white transition-colors">
              Privacy Policy (EN)
            </Link>
            <Link href="/legal/privacidad" className="hover:text-white transition-colors">
              Política de Privacidad (ES)
            </Link>
            <Link href="/affiliates" className="hover:text-white transition-colors">
              Affiliate Program
            </Link>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  const current = window.document.documentElement.lang
                  const next = current === 'en' ? 'es' : 'en'
                  window.document.documentElement.lang = next
                  localStorage.setItem('language', next)
                  window.location.reload()
                }
              }}
              className="hover:text-white transition-colors bg-transparent border-none cursor-pointer"
            >
              {typeof window !== 'undefined' ? (window.document.documentElement.lang === 'en' ? 'ES' : 'EN') : 'EN'}
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}