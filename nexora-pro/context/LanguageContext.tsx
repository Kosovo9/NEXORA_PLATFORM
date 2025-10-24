// context/LanguageContext.tsx
'use client'

import { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'es'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang) setLanguage(savedLang)
  }, [])

  const t = (key: string) => {
    const translations: Record<string, Record<Language, string>> = {
      'welcome': {
        'en': 'Welcome to Nexora',
        'es': 'Bienvenido a Nexora'
      },
      'getStarted': {
        'en': 'Get Started',
        'es': 'Comenzar'
      }
    }
    return translations[key]?.[language] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}
