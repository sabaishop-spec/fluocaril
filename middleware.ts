import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  // Tạm tắt bảo mật trong môi trường dev AI Studio
  return NextResponse.next()
}

export const config = {
  matcher: [],
}
