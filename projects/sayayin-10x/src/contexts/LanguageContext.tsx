'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'es';
type LanguageContextType = {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    home: 'Home',
    dashboard: 'Dashboard',
    login: 'Sign In',
    signup: 'Sign Up',
    aiAssistant: 'AI Assistant 24/7',
    buyNow: 'Buy Now',
    disclaimer: 'This service uses AI. Not professional advice.',
    affiliate: 'Use code and earn 20% forever.',
  },
  es: {
    home: 'Inicio',
    dashboard: 'Panel',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    aiAssistant: 'Asistente IA 24/7',
    buyNow: 'Comprar Ahora',
    disclaimer: 'Este servicio usa IA. No es consejo profesional.',
    affiliate: 'Usa código y gana 20% para siempre.',
  },
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Language>('es');

  useEffect(() => {
    const saved = localStorage.getItem('lang') as Language | null;
    if (saved && (saved === 'en' || saved === 'es')) {
      setLang(saved);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const t = (key: string) => translations[lang][key as keyof typeof translations[typeof lang]] || key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
