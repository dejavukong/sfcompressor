import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const SUPPORTED_LANGS = ['zh', 'en'];
const DEFAULT_LANG = 'zh';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes, static files, Next.js internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if pathname already has a supported locale prefix
  const hasLang = SUPPORTED_LANGS.some(
    (lang) => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`
  );

  if (hasLang) {
    return NextResponse.next();
  }

  // Detect preferred language from Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? '';
  const preferredLang = acceptLang.toLowerCase().startsWith('zh') ? 'zh' : 'en';
  const lang = SUPPORTED_LANGS.includes(preferredLang) ? preferredLang : DEFAULT_LANG;

  // Redirect to localized path
  return NextResponse.redirect(new URL(`/${lang}${pathname || '/'}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|favicon.ico).*)'],
};
