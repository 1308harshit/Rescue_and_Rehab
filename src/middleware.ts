import { NextRequest, NextResponse } from 'next/server'
import { getAdminFromRequest } from '@/lib/auth'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the request is for an admin route
  if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    console.log('Middleware check for:', pathname, 'Token:', token ? 'found' : 'not found')
    
    if (!token) {
      // Redirect to login page if not authenticated
      const loginUrl = new URL('/admin/login', request.url)
      return NextResponse.redirect(loginUrl)
    }
  }

  // If accessing login page while already authenticated, redirect to admin dashboard
  if (pathname === '/admin/login') {
    const token = request.cookies.get('admin-token')?.value
    
    if (token) {
      const adminUrl = new URL('/admin', request.url)
      return NextResponse.redirect(adminUrl)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*'
  ]
}
