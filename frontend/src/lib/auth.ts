import type { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { getApiClient } from './api'
import { ApiError } from '@/types/api'
import type { TokenRequest } from '@/types/api/models/TokenRequest'

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

const authOptions: AuthOptions = {
  session: {
    strategy: 'jwt'
  },
  pages: {
    signIn: '/login'
  },
  callbacks: {
    session: async ({ session, token }) => {
      const access = decodeToken(token.accessToken as string)
      const refresh = decodeToken(token.refreshToken as string)

      if (Date.now() / 1000 > access.exp && Date.now() / 1000 > refresh.exp) {
        return Promise.reject({
          error: new Error('Refresh token expired')
        })
      }

      session.user = {
        id: access.user_id,
        username: token.username as string,
        role: access.role,
      }

      session.refreshToken = token.refreshToken as string
      session.accessToken = token.accessToken as string

      return session
    },
    jwt: async ({ token, user }) => {
      if (user?.username) {
        return { ...token, ...user }
      }

      // Refresh token
      if (Date.now() / 1000 > decodeToken(token.accessToken as string).exp) {
        const apiClient = await getApiClient()
        const res = await apiClient.token.tokenRefreshCreate({
          accessToken: token.accessToken as string,
          refreshToken: token.refreshToken as string
        })

        token.accessToken = res.accessToken
      }

      return { ...token, ...user }
    }
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (credentials === undefined) {
          return null
        }

        try {
          const apiClient = await getApiClient()
          const res = await apiClient.token.tokenCreate({
            username: credentials.username,
            password: credentials.password
          })

          return {
            id: decodeToken(res.accessToken).user_id,
            username: credentials.username,
            accessToken: res.accessToken,
            refreshToken: res.refreshToken
          }
        } catch (error) {
          if (error instanceof ApiError) {
            return null
          }
        }

        return null
      }
    })
  ]
}

export { authOptions }
