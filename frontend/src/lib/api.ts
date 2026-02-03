import { ApiClient } from '@/types/api'
import type { Session } from 'next-auth'

export async function getApiClient(session?: Session | null) {
  return new ApiClient({
    BASE: process.env.BACKEND_URL,
    HEADERS: {
      ...(session && {
        Authorization: `Bearer ${session.accessToken}`
      })
    }
  })
}
