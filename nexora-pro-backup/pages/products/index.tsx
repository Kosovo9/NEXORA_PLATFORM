// pages/products/index.tsx
import Link from 'next/link';

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>
        <div className="space-y-6">
          <Link href="/products/saas-in-a-box" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
            <h2 className="text-xl font-bold">SaaS-in-a-Box</h2>
            <p className="text-gray-400">Lanza tu SaaS en 24h — $297 one-time</p>
          </Link>
          <Link href="/products/ai-agents" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
            <h2 className="text-xl font-bold">AI Agent Suite</h2>
            <p className="text-gray-400">Agentes de IA listos para vender — $197</p>
          </Link>
          <Link href="/products/funnel-pro" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
            <h2 className="text-xl font-bold">Funnel Pro</h2>
            <p className="text-gray-400">Sistema de conversión probado — $147</p>
          </Link>
          <Link href="/products/nexora-pro" className="block p-6 bg-gray-800 rounded-lg hover:bg-gray-700">
            <h2 className="text-xl font-bold">Nexora Pro Community</h2>
            <p className="text-gray-400">Acceso exclusivo — $29/mo</p>
          </Link>
        </div>
      </div>
    </div>
  );
}