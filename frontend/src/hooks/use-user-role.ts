import { useSession } from 'next-auth/react'

export function useUserRole() {
  const { data: session } = useSession()

  return {
    role: session?.user?.role,
    isAdmin: session?.user?.role === 'ROLE_ADMIN',
    isManager: session?.user?.role === 'ROLE_MANAGER',
    isUser: session?.user?.role === 'ROLE_USER',
    isAuthenticated: !!session?.user
  }
}