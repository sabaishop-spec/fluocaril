import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const session = req.cookies.get('admin_session')
  const isLoginPage = req.nextUrl.pathname === '/login'
  const isAdminPage = req.nextUrl.pathname.startsWith('/admin')

  // Nếu vào trang admin mà chưa có cookie session -> đá về trang login
  if (isAdminPage && !session) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Nếu đã đăng nhập rồi mà cố vào lại trang login -> đá thẳng vào admin
  if (isLoginPage && session) {
    return NextResponse.redirect(new URL('/admin', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
