export const i18n = {
  defaultLocale: "en",
  locales: ["en", "es"]
} as const;

export type Locale = typeof i18n.locales[number];

export function detectLocaleFromHeaders(headers: Headers): Locale {
  const accept = headers.get("accept-language") || "";
  const first = accept.split(",")[0]?.split("-")[0]?.toLowerCase() || i18n.defaultLocale;
  return (i18n.locales as readonly string[]).includes(first)
    ? (first as Locale)
    : i18n.defaultLocale;
}

export default i18n;
