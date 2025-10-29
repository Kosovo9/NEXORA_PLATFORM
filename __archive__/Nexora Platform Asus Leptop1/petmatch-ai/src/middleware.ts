// /middleware.ts
import { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

const intlMiddleware = createMiddleware({
  locales,
  defaultLocale
});

export default function middleware(request: NextRequest) {
  // Saltar middleware para rutas de API
  if (request.nextUrl.pathname.startsWith('/api')) {
    return;
  }
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
