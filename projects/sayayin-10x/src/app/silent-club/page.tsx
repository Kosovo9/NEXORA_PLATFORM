'use client';

import { useLanguage } from '../../../contexts/LanguageContext';

export default function Page() {
  const { t, lang } = useLanguage();
  return (
    <div className='p-8 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4'>{t('home')} - Idea: silent-club</h1>
      <p className='mb-6'>{t('aiAssistant')}</p>
      <button className='bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded'>
        {t('buyNow')}
      </button>
      <p className='mt-8 text-sm text-gray-400'>{t('disclaimer')}</p>
      <p className='text-sm text-green-400'>{t('affiliate')}</p>
    </div>
  );
}
