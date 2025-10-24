export const SUPPORTED_LOCALES = (process.env.SUPPORTED_LOCALES || 'es,en,pt,fr,de,it,ja,ko,zh,ru,ar,hi,tr,pl,nl').split(',').map(s=>s.trim()).filter(Boolean);
export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'es';
export async function loadMessages(locale: string){
  if(!SUPPORTED_LOCALES.includes(locale)) locale = DEFAULT_LOCALE;
  const mod = await import(`../messages/${locale}.json`);
  return mod.default || {};
}
