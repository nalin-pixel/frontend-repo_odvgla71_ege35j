import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Spinner from '../components/Spinner'

const API_BASE = 'https://jsonplaceholder.typicode.com'

function UserDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/users/${id}`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        setUser(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch user')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [id])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/70 backdrop-blur border-b sticky top-0 z-10">
        <div className="mx-auto max-w-3xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">User Detail</h1>
          <Link to="/" className="text-blue-600 hover:underline">Back</Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-4 py-8">
        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <Spinner label="Loading user..." />
        ) : user ? (
          <div className="rounded-lg bg-white shadow p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">{user.name}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-slate-700">
              <p><span className="font-medium">Email:</span> {user.email}</p>
              <p><span className="font-medium">Phone:</span> {user.phone}</p>
              <p><span className="font-medium">Username:</span> {user.username}</p>
              <p><span className="font-medium">Website:</span> {user.website}</p>
              {user.address && (
                <p className="sm:col-span-2"><span className="font-medium">Address:</span> {user.address.street}, {user.address.city}</p>
              )}
              {user.company && (
                <p className="sm:col-span-2"><span className="font-medium">Company:</span> {user.company.name}</p>
              )}
            </div>
          </div>
        ) : (
          <div className="text-slate-600">User not found</div>
        )}
      </main>
    </div>
  )
}

export default UserDetail
