import { useSession } from 'next-auth/react'

import { CustomRole } from '@/types/api/models/CustomRole'

export function useUserRole() {
  const { data: session } = useSession()

  return {
    role: session?.user?.role,
    isAdmin: session?.user?.role === CustomRole.ROLE_ADMIN,
    isManager: session?.user?.role === CustomRole.ROLE_MANAGER,
    isUser: session?.user?.role === CustomRole.ROLE_USER,
    isAuthenticated: !!session?.user
  }
}