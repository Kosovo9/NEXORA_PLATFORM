import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Crear la respuesta
  const response = NextResponse.next();

  // Headers de seguridad
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  );

  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; img-src 'self' data: https:; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-ancestors 'none';"
  );

  response.headers.set(
    'Referrer-Policy',
    'no-referrer-when-downgrade'
  );

  response.headers.set(
    'X-Frame-Options',
    'DENY'
  );

  response.headers.set(
    'X-Content-Type-Options',
    'nosniff'
  );

  response.headers.set(
    'Permissions-Policy',
    'interest-cohort=()'
  );

  // Headers adicionales de seguridad
  response.headers.set(
    'X-XSS-Protection',
    '1; mode=block'
  );

  response.headers.set(
    'Cross-Origin-Embedder-Policy',
    'require-corp'
  );

  response.headers.set(
    'Cross-Origin-Opener-Policy',
    'same-origin'
  );

  response.headers.set(
    'Cross-Origin-Resource-Policy',
    'same-origin'
  );

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};