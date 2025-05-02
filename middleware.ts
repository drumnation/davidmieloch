import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const normalizedPathname = pathname.replace(/\/+$/, '') || '/';

    // 1. Determine theme: Check existing cookie first, fallback to path
    let theme = request.cookies.get('theme')?.value;
    if (!theme) {
        theme = normalizedPathname === '/' ? 'dark' : 'light';
    }

    // 2. Prepare new request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-app-theme', theme);

    // 3. Clone the request and set new headers
    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // 4. Set cookie on the response for client-side/subsequent requests
    response.cookies.set('theme', theme, { path: '/', sameSite: 'lax' });

    // Optional: Log for debugging
    // console.log(`[Middleware] Path: ${pathname}, Theme: ${theme}, Setting Header & Cookie`);

    return response;
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|.*\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
}; 