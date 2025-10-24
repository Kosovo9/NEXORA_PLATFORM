// context/LanguageContext.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../lib/locales';

type Language = 'es' | 'en';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language;
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  const t = (key: string): string => {
    return translations[lang][key as keyof typeof translations[lang]] || key;
  };

  const value = {
    lang,
    setLang: (newLang: Language) => {
      setLang(newLang);
      localStorage.setItem('language', newLang);
    },
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
