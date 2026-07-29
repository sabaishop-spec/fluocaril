import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const SECRET_KEY = process.env.ADMIN_SESSION_SECRET || 'default_secret_key_for_development_only';
const key = new TextEncoder().encode(SECRET_KEY);

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('admin_session')?.value;
  let isValid = false;

  if (token) {
    try {
      await jwtVerify(token, key, { algorithms: ['HS256'] });
      isValid = true;
    } catch (error) {
      isValid = false;
    }
  }

  if (req.nextUrl.pathname.startsWith('/login')) {
    if (isValid) {
      return NextResponse.redirect(new URL('/admin', req.url));
    }
    return NextResponse.next();
  }

  if (!isValid) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/login'],
}
