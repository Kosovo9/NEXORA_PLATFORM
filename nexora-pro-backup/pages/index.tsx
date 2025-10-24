import { motion } from 'framer-motion';
import { Rocket, Shield, Zap, Globe, Download, Users, BarChart3, Bot } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const products = [
    {
      title: "SaaS-in-a-Box",
      desc: "Lanza tu SaaS en 24h. Sin código, sin estrés.",
      price: "$297",
      features: ["Landing premium", "Funnel 5.2% CR", "30 plantillas IA", "Soporte vitalicio"],
      href: "/products/saas-in-a-box"
    },
    {
      title: "AI Agent Suite",
      desc: "Agentes de IA para ventas, soporte y analytics.",
      price: "$197",
      features: ["4 agentes listos", "Integración Hugging Face", "Prompt engineering", "Auto-optimización"],
      href: "/products/ai-agents"
    },
    {
      title: "Funnel Pro",
      desc: "Sistema de conversión probado en 12 SaaS.",
      price: "$147",
      features: ["Figma + Webflow", "Email sequences", "A/B testing", "Analytics"],
      href: "/products/funnel-pro"
    },
    {
      title: "Nexora Pro Community",
      desc: "Acceso a plantillas exclusivas + AMAs semanales.",
      price: "$29/mo",
      features: ["Plantillas premium", "Soporte 1:1", "Actualizaciones", "Networking"],
      href: "/products/nexora-pro"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      {/* Hero */}
      <header className="container mx-auto px-4 py-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center bg-indigo-900/30 px-4 py-1 rounded-full mb-6">
            <Rocket className="w-4 h-4 mr-2" />
            <span>Official Nexora Launch – April 2025</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Build. Launch. <span className="text-indigo-400">Scale.</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
            All-in-one kits for founders in Mexico, Canada & USA. 
            Launch your digital product in 24 hours — no code, no risk.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/products/saas-in-a-box"
              className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              Get Started →
            </Link>
            <Link
              href="/products"
              className="border border-gray-700 hover:bg-gray-800 px-8 py-4 rounded-lg font-bold text-lg transition"
            >
              View All Products
            </Link>
          </div>
        </motion.div>
      </header>

      {/* Trust Badges */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-center gap-8 text-gray-400">
          <div className="flex items-center"><Shield className="mr-2" /> Secure Checkout</div>
          <div className="flex items-center"><Zap className="mr-2" /> Instant Access</div>
          <div className="flex items-center"><Globe className="mr-2" /> MX • CA • US</div>
          <div className="flex items-center"><Download className="mr-2" /> 100% Digital</div>
        </div>
      </div>

      {/* Products Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Our Flagship Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-indigo-500 transition"
            >
              <h3 className="text-xl font-bold mb-2">{product.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{product.desc}</p>
              <div className="text-indigo-400 font-bold mb-4">{product.price}</div>
              <ul className="text-sm text-gray-300 mb-6 space-y-1">
                {product.features.map((f, j) => <li key={j}>• {f}</li>)}
              </ul>
              <Link
                href={product.href}
                className="block w-full text-center bg-gray-700 hover:bg-gray-600 py-2 rounded-lg transition"
              >
                Learn More
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: "5.2%", label: "Avg. Funnel CR" },
            { value: "24h", label: "Launch Time" },
            { value: "100+", label: "Templates" },
            { value: "99.9%", label: "Uptime" }
          ].map((stat, i) => (
            <div key={i}>
              <div className="text-3xl font-bold text-indigo-400">{stat.value}</div>
              <div className="text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center text-gray-500 text-sm">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} Nexora Labs. All rights reserved.</p>
          <p className="mt-2">
            <Link href="/legal/terms" className="underline mx-2">Terms</Link>
            <Link href="/legal/privacy" className="underline mx-2">Privacy</Link>
            <Link href="/legal/compliance" className="underline mx-2">Compliance</Link>
          </p>
        </div>
      </footer>
    </div>
  );
}