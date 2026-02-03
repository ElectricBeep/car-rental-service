import { withAuth } from 'next-auth/middleware'
import type { NextRequest } from 'next/server'
import { checkRole } from './lib/role-middleware'

export default withAuth(
  async function proxy(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith('/admin')) {
      return await checkRole(request, ['ROLE_ADMIN'])
    }

    if (request.nextUrl.pathname.startsWith('/manager')) {
      return await checkRole(request, ['ROLE_MANAGER', 'ROLE_ADMIN'])
    }

    if (request.nextUrl.pathname.startsWith('/user')) {
      return await checkRole(request, ['ROLE_USER', 'ROLE_MANAGER', 'ROLE_ADMIN'])
    }

    return await checkRole(request, [])
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return !!token
      }
    }
  }
)

// Configure which paths should be protected
export const config = {
  matcher: [
    // Protect all routes under /dashboard
    '/dashboard/:path*',
    '/protected/:path*',
    // Admin-only routes
    '/admin/:path*',
    // User routes (users and admins can access)
    '/user/:path*',
    // Profile routes
    '/profile/:path*'
  ]
}
