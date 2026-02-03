"use client";

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { useUserRole } from '@/hooks/useUserRole'
import {
  authenticateUser,
  makeAuthenticatedRequest,
  registerUser,
  searchCars
} from '@/lib/api-examples'

const ApiDemoPage = () => {
  const { data: session } = useSession()
  const { isAdmin, isUser, role } = useUserRole()
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  // Example 1: Login with API
  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await authenticateUser('testuser', 'password123')
      setResult(response)
    } catch (err) {
      setError('Login failed')
    } finally {
      setLoading(false)
    }
  }

  // Example 2: Fetch user data
  const fetchUserData = async () => {
    setLoading(true)
    setError(null)
    try {
      const userData = await makeAuthenticatedRequest(
        '/users/me',
        'GET',
        undefined,
        session
      )
      setResult(userData)
    } catch (err) {
      setError('Failed to fetch user data')
    } finally {
      setLoading(false)
    }
  }

  // Example 3: Register new user
  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    try {
      const userData = {
        username: 'newuser',
        email: 'newuser@example.com',
        password: 'password123',
        first_name: 'New',
        last_name: 'User'
      }
      const response = await registerUser(userData)
      setResult(response)
    } catch (err) {
      setError('Registration failed')
    } finally {
      setLoading(false)
    }
  }

  // Example 4: Search cars
  const handleSearchCars = async () => {
    setLoading(true)
    setError(null)
    try {
      const searchResults = await searchCars({
        manufacturer: 'Toyota',
        year: 2020,
        available: true
      }, session)
      setResult(searchResults)
    } catch (err) {
      setError('Search failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">API Demo Page</h1>

      {/* User Info */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-lg font-semibold mb-2">Current User</h2>
        <p><strong>Authenticated:</strong> {session ? 'Yes' : 'No'}</p>
        <p><strong>Role:</strong> {role || 'No role'}</p>
        <p><strong>Is Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
        <p><strong>Is User:</strong> {isUser ? 'Yes' : 'No'}</p>
      </div>

      {/* API Examples */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold mb-4">API Examples</h2>

        {/* Login Example */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">1. Authentication</h3>
          <p className="text-sm text-gray-600 mb-3">Login with username and password</p>
          <button
            onClick={handleLogin}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        {/* Fetch User Data */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">2. Fetch User Data</h3>
          <p className="text-sm text-gray-600 mb-3">Get current user information (requires auth)</p>
          <button
            onClick={fetchUserData}
            disabled={loading || !session}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Fetching...' : 'Fetch User Data'}
          </button>
        </div>

        {/* Register User */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">3. Register User</h3>
          <p className="text-sm text-gray-600 mb-3">Create a new user account</p>
          <button
            onClick={handleRegister}
            disabled={loading}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register User'}
          </button>
        </div>

        {/* Search Cars */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-2">4. Search Cars</h3>
          <p className="text-sm text-gray-600 mb-3">Search for cars with filters (requires auth)</p>
          <button
            onClick={handleSearchCars}
            disabled={loading || !session}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
          >
            {loading ? 'Searching...' : 'Search Cars'}
          </button>
        </div>
      </div>

      {/* Results */}
      {error && (
        <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      )}

      {result && (
        <div className="mt-6 bg-white border border-gray-300 rounded-lg p-4">
          <h3 className="font-semibold mb-2">Result:</h3>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-64">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}

export default ApiDemoPage