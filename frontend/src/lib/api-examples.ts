// API Examples for Spring Boot Backend
// This file shows how to make API calls to your Spring Boot backend

import { getApiClient } from './api'
import { useSession } from 'next-auth/react'
import { useUserRole } from '../hooks/useUserRole'

// Example 1: Using generated API client (Token and Schema services)
export async function authenticateUser(username: string, password: string) {
  try {
    const apiClient = await getApiClient()

    // Use the generated TokenService for login
    const tokenResponse = await apiClient.token.tokenCreate({
      username,
      password
    })

    return tokenResponse
  } catch (error) {
    console.error('Authentication failed:', error)
    throw error
  }
}

// Example 2: Refreshing tokens
export async function refreshToken(refreshToken: string) {
  try {
    const apiClient = await getApiClient()

    const tokenResponse = await apiClient.token.tokenRefreshCreate({
      accessToken: '', // This field is not used in the request
      refreshToken
    })

    return tokenResponse
  } catch (error) {
    console.error('Token refresh failed:', error)
    throw error
  }
}

// Example 3: Making direct HTTP requests for other endpoints
export async function makeAuthenticatedRequest<T>(
  endpoint: string,
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
  data?: any,
  session?: any
): Promise<T> {
  try {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:8081/api'
    const url = `${baseUrl}${endpoint}`

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if session exists
    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    const response = await fetch(url, {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('API request failed:', error)
    throw error
  }
}

// Example 4: Using API calls in React components
export function useApiData() {
  const { data: session } = useSession()
  const { isAdmin } = useUserRole()

  const fetchUserData = async () => {
    try {
      // Use direct HTTP request for user endpoints
      const userData = await makeAuthenticatedRequest(
        '/users/me',
        'GET',
        undefined,
        session
      )
      return userData
    } catch (error) {
      console.error('Failed to fetch user data:', error)
      throw error
    }
  }

  const updateUserProfile = async (userData: any) => {
    try {
      const updatedUser = await makeAuthenticatedRequest(
        '/users/me',
        'PATCH',
        userData,
        session
      )
      return updatedUser
    } catch (error) {
      console.error('Failed to update user profile:', error)
      throw error
    }
  }

  const fetchAllUsers = async () => {
    if (!isAdmin) {
      throw new Error('Access denied: Admin privileges required')
    }

    try {
      const users = await makeAuthenticatedRequest(
        '/users',
        'GET',
        undefined,
        session
      )
      return users
    } catch (error) {
      console.error('Failed to fetch users:', error)
      throw error
    }
  }

  return {
    fetchUserData,
    updateUserProfile,
    fetchAllUsers
  }
}

// Example 5: Error handling with proper typing
export async function handleApiCall<T>(
  apiCall: () => Promise<T>
): Promise<{ data: T | null; error: string | null }> {
  try {
    const data = await apiCall()
    return { data, error: null }
  } catch (error: any) {
    console.error('API call failed:', error)

    // Handle different error types
    if (error.message.includes('401') || error.status === 401) {
      return { data: null, error: 'Authentication required' }
    } else if (error.message.includes('403') || error.status === 403) {
      return { data: null, error: 'Access denied' }
    } else if (error.message.includes('404') || error.status === 404) {
      return { data: null, error: 'Resource not found' }
    } else {
      return { data: null, error: 'An unexpected error occurred' }
    }
  }
}

// Example 6: File upload
export async function uploadFile(file: File, session?: any) {
  try {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:8081/api'
    const url = `${baseUrl}/users/upload-avatar/`

    const formData = new FormData()
    formData.append('file', file)

    const headers: HeadersInit = {}

    // Add authorization header if session exists
    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: formData,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('File upload failed:', error)
    throw error
  }
}

// Example 7: Search/filter endpoints
export async function searchCars(searchParams: {
  manufacturer?: string
  model?: string
  year?: number
  available?: boolean
}, session?: any) {
  try {
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:8081/api'
    const url = new URL(`${baseUrl}/vehicle-models/`)

    // Add query parameters
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.append(key, value.toString())
      }
    })

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    // Add authorization header if session exists
    if (session?.accessToken) {
      headers['Authorization'] = `Bearer ${session.accessToken}`
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Search failed:', error)
    throw error
  }
}

// Example 8: Register new user
export async function registerUser(userData: {
  username: string
  email: string
  password: string
  first_name?: string
  last_name?: string
}) {
  try {
    const apiClient = await getApiClient()

    // Use direct HTTP request for registration
    const baseUrl = process.env.BACKEND_URL || 'http://localhost:8081/api'
    const url = `${baseUrl}/auth/register/`

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error('Registration failed:', error)
    throw error
  }
}
