import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/';
    const theme = normalizedPathname === '/' ? 'dark' : 'light';

    const response = NextResponse.next();
    response.cookies.set('theme', theme, { path: '/', sameSite: 'lax' });

    // Optional: Log for debugging
    // console.log(`[Middleware] Path: ${pathname}, Theme: ${theme}`);

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}; 