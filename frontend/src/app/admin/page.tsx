"use client";
import { useUserRole } from '@/hooks/useUserRole'

const AdminPage = () => {
  const { role, isAdmin, isUser, isAuthenticated } = useUserRole()

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Panel</h1>
      <p className="text-gray-600 mb-4">This page is protected by both client-side and server-side middleware.</p>

      {isAuthenticated && (
        <div className="bg-gray-100 p-4 rounded-lg mb-4">
          <h2 className="text-lg font-semibold mb-2">User Information</h2>
          <p><strong>Role:</strong> {role || 'No role assigned'}</p>
          <p><strong>Admin:</strong> {isAdmin ? 'Yes' : 'No'}</p>
          <p><strong>User:</strong> {isUser ? 'Yes' : 'No'}</p>
        </div>
      )}

      {isAdmin ? (
        <div className="bg-green-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Welcome Admin!</h3>
          <p className="text-green-800">You have access to all admin features.</p>
          <ul className="mt-2 space-y-1 text-green-700">
            <li>• User management</li>
            <li>• System settings</li>
            <li>• Analytics dashboard</li>
            <li>• Reports</li>
          </ul>
        </div>
      ) : (
        <div className="bg-red-100 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-red-900 mb-2">Access Denied</h3>
          <p className="text-red-800">You need admin privileges to access this page.</p>
        </div>
      )}
    </div>
  )
}

export default AdminPage