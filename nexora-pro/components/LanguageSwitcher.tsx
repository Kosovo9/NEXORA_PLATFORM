// components/LanguageSwitcher.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 z-50 bg-white border border-gray-200 rounded-full w-12 h-12 flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200"
      aria-label={lang === 'es' ? 'Switch to English' : 'Cambiar a Español'}
    >
      {lang === 'es' ? (
        <span className="text-sm font-bold">EN</span>
      ) : (
        <span className="text-sm font-bold">ES</span>
      )}
    </button>
  );
}