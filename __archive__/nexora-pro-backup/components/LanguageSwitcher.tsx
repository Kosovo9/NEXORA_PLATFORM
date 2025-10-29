// components/LanguageSwitcher.tsx
'use client';

import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
  const { lang, setLang, t } = useLanguage();

  const toggleLang = () => {
    setLang(lang === 'es' ? 'en' : 'es');
  };

  return (
    <button
      onClick={toggleLang}
      className="fixed top-4 right-4 bg-white border border-gray-300 rounded-full p-2 shadow-md hover:bg-gray-50 transition"
      aria-label={t('languageSwitch')}
    >
      {lang === 'es' ? (
        <span className="text-sm font-medium">🇬🇧 EN</span>
      ) : (
        <span className="text-sm font-medium">🇪🇸 ES</span>
      )}
    </button>
  );
}