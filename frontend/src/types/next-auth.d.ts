// Extend NextAuth types to include our custom fields
import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    username?: string
    role?: string
    accessToken?: string
    refreshToken?: string
  }

  interface Session {
    user: {
      id: number
      username: string
      role?: string
    }
    accessToken: string
    refreshToken: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string
    role?: string
    accessToken?: string
    refreshToken?: string
  }
}