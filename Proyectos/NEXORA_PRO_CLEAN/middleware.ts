import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from './lib/i18n';
export function middleware(req: NextRequest){
  const { pathname } = req.nextUrl;
  if(pathname.startsWith('/api') || pathname.startsWith('/_next') || pathname.includes('.')) return NextResponse.next();
  const has = SUPPORTED_LOCALES.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if(has) return NextResponse.next();
  const url = req.nextUrl.clone(); url.pathname = `/${DEFAULT_LOCALE}${pathname}`; return NextResponse.redirect(url);
}
