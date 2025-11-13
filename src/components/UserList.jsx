import React from 'react'
import { Link } from 'react-router-dom'

function UserList({ users, onEdit, onDelete }) {
  if (!users || users.length === 0) {
    return (
      <div className="text-center text-gray-600 py-8">No users found.</div>
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {users.map((u) => (
            <tr key={u.id} className="hover:bg-gray-50">
              <td className="px-4 py-3 font-medium text-gray-900">
                <Link to={`/users/${u.id}`} className="text-blue-600 hover:underline">{u.name}</Link>
              </td>
              <td className="px-4 py-3 text-gray-700">{u.email}</td>
              <td className="px-4 py-3 text-gray-700">{u.phone}</td>
              <td className="px-4 py-3 text-right">
                <div className="inline-flex gap-2">
                  <button
                    onClick={() => onEdit(u)}
                    className="rounded bg-amber-500 px-3 py-1 text-white hover:bg-amber-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(u)}
                    className="rounded bg-red-600 px-3 py-1 text-white hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
