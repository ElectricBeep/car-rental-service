import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

function decodeToken(token: string): {
  token_type: string
  exp: number
  iat: number
  jti: string
  user_id: number
  role: string
} {
  return JSON.parse(atob(token.split('.')[1])) as {
    token_type: string
    exp: number
    iat: number
    jti: string
    user_id: number
    role: string
  }
}

export async function checkRole(
  request: NextRequest,
  requiredRoles: string[] = []
) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  })
  const decodedToken = decodeToken(token?.accessToken as string)

  if (!decodedToken) {
    const url = new URL('/login', request.url)
    url.searchParams.set('callbackUrl', request.url)
    return Response.redirect(url)
  }

  if (requiredRoles.length === 0) {
    return null
  }

  const userRole = decodedToken.role as string
  const hasRequiredRole = requiredRoles.some(role => userRole === role)

  if (!hasRequiredRole) {
    // Redirect to unauthorized page or dashboard
    const url = new URL('/dashboard', request.url)
    return Response.redirect(url)
  }

  return null
}

// Helper functions for common role checks
export const requireAuth = (request: NextRequest) =>
  checkRole(request, [])

export const requireAdmin = (request: NextRequest) =>
  checkRole(request, ['ROLE_ADMIN'])

export const requireUser = (request: NextRequest) =>
  checkRole(request, ['ROLE_USER', 'ROLE_ADMIN']) // Admin can access user routes