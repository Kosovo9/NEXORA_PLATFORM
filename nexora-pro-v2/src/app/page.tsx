'use client';

import Link from 'next/link';
import { useLanguage } from './context/LanguageContext';
import { useState, useEffect } from 'react';

export default function Home() {
  const { language, setLanguage } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const t = {
    en: {
      heroTitle: "Build. Sell. Scale.",
      heroSubtitle: "The all-in-one platform for creators to launch digital products in minutes.",
      ctaPrimary: "Get Started — Free",
      ctaSecondary: "View Demo",
      featuresTitle: "Why Creators Love Nexora Pro",
      features: [
        { title: "Zero Code", desc: "Launch without touching a single line of code." },
        { title: "Lemon Squeezy Ready", desc: "Built-in payments, taxes, and VAT compliance." },
        { title: "Affiliate Program", desc: "Grow your audience with automated payouts." },
        { title: "Vercel Deploy", desc: "One-click deploy to production-grade infrastructure." },
      ],
      nav: {
        products: "Products",
        affiliates: "Affiliates",
        legal: "Legal",
        blog: "Blog"
      },
      footer: {
        rights: "© 2025 Nexora Pro. All rights reserved.",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
      },
      social: {
        twitter: "Follow on X",
        github: "Star on GitHub"
      },
      toggleLang: "🇪🇸 Español"
    },
    es: {
      heroTitle: "Crea. Vende. Escala.",
      heroSubtitle: "La plataforma todo-en-uno para creadores que lanzan productos digitales en minutos.",
      ctaPrimary: "Comenzar — Gratis",
      ctaSecondary: "Ver Demo",
      featuresTitle: "Por qué los creadores aman Nexora Pro",
      features: [
        { title: "Sin Código", desc: "Lanza sin escribir una sola línea de código." },
        { title: "Listo para Lemon Squeezy", desc: "Pagos integrados, impuestos y cumplimiento de IVA." },
        { title: "Programa de Afiliados", desc: "Haz crecer tu audiencia con pagos automáticos." },
        { title: "Deploy en Vercel", desc: "Despliegue en un clic a infraestructura profesional." },
      ],
      nav: {
        products: "Productos",
        affiliates: "Afiliados",
        legal: "Legal",
        blog: "Blog"
      },
      footer: {
        rights: "© 2025 Nexora Pro. Todos los derechos reservados.",
        privacy: "Política de Privacidad",
        terms: "Términos de Servicio"
      },
      social: {
        twitter: "Seguir en X",
        github: "Marcar en GitHub"
      },
      toggleLang: "🇺🇸 English"
    }
  }[language];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-indigo-950 text-white">
      {/* Navigation */}
      <header className={`container mx-auto px-4 py-6 flex justify-between items-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
        <Link href="/" className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Nexora<span className="text-purple-300">Pro</span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="/products" className="hover:text-purple-300 transition-colors">{t.nav.products}</Link>
          <Link href="/affiliates" className="hover:text-purple-300 transition-colors">{t.nav.affiliates}</Link>
          <Link href="/legal" className="hover:text-purple-300 transition-colors">{t.nav.legal}</Link>
          <Link href="/blog" className="hover:text-purple-300 transition-colors">{t.nav.blog}</Link>
        </nav>
        <button
          onClick={toggleLanguage}
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors font-medium border border-gray-700"
          aria-label={language === 'en' ? 'Cambiar a español' : 'Switch to English'}
        >
          {t.toggleLang}
        </button>
      </header>

      {/* Hero Section */}
      <main className={`container mx-auto px-4 py-16 md:py-28 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400 animate-fade-in">
          {t.heroTitle}
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 max-w-3xl mx-auto mb-10 animate-fade-in-delay">
          {t.heroSubtitle}
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/products"
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold text-lg shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
          >
            {t.ctaPrimary}
          </Link>
          <Link
            href="/demo"
            className="px-8 py-4 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-700 transition-colors font-bold text-lg transform hover:scale-105"
          >
            {t.ctaSecondary}
          </Link>
        </div>
      </main>

      {/* Features */}
      <section className={`container mx-auto px-4 py-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">{t.featuresTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.features.map((feature, idx) => (
            <div
              key={idx}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all hover:transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20"
            >
              <h3 className="text-xl font-bold mb-3 text-purple-300">{feature.title}</h3>
              <p className="text-gray-300">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className={`container mx-auto px-4 py-16 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Ready to launch your next product?</h3>
        <Link
          href="/products"
          className="inline-block px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all font-bold text-lg transform hover:scale-105"
        >
          Start Building Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-400">{t.footer.rights}</p>
            <div className="flex gap-6">
              <Link href="/legal/privacy" className="text-gray-400 hover:text-white transition-colors">
                {t.footer.privacy}
              </Link>
              <Link href="/legal/terms" className="text-gray-400 hover:text-white transition-colors">
                {t.footer.terms}
              </Link>
            </div>
            <div className="flex gap-4">
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t.social.twitter}
              >
                X
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={t.social.github}
              >
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}