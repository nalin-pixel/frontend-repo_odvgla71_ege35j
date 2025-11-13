import React, { useEffect, useState } from 'react'
import Spinner from './components/Spinner'
import UserList from './components/UserList'
import UserForm from './components/UserForm'

// Base API for JSONPlaceholder
const API_BASE = 'https://jsonplaceholder.typicode.com'

function App() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  // Fetch users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true)
      setError('')
      try {
        const res = await fetch(`${API_BASE}/users`)
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        const data = await res.json()
        setUsers(data)
      } catch (err) {
        setError(err.message || 'Failed to fetch users')
      } finally {
        setLoading(false)
      }
    }

    fetchUsers()
  }, [])

  const handleCreateClick = () => {
    setEditingUser(null)
    setShowForm(true)
  }

  const handleEdit = (user) => {
    setEditingUser(user)
    setShowForm(true)
  }

  const handleDelete = async (user) => {
    if (!confirm(`Delete ${user.name}?`)) return
    try {
      setSubmitting(true)
      const res = await fetch(`${API_BASE}/users/${user.id}`, { method: 'DELETE' })
      if (!res.ok) throw new Error('Delete failed')
      // Optimistically remove from list in UI
      setUsers((prev) => prev.filter((u) => u.id !== user.id))
    } catch (err) {
      alert(err.message || 'Delete failed')
    } finally {
      setSubmitting(false)
    }
  }

  const handleSubmit = async (form) => {
    try {
      setSubmitting(true)
      if (editingUser) {
        // Update existing user (simulated)
        const res = await fetch(`${API_BASE}/users/${editingUser.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...editingUser, ...form }),
        })
        if (!res.ok) throw new Error('Update failed')
        const updated = await res.json()
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? updated : u)))
      } else {
        // Create new user (simulated)
        const res = await fetch(`${API_BASE}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        })
        if (!res.ok) throw new Error('Create failed')
        const created = await res.json()
        // JSONPlaceholder returns an id; append to list for UI
        setUsers((prev) => [{ id: created.id || Date.now(), ...form }, ...prev])
      }
      setShowForm(false)
      setEditingUser(null)
    } catch (err) {
      alert(err.message || 'Save failed')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="bg-white/70 backdrop-blur border-b sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-800">User Manager</h1>
          <nav className="flex items-center gap-4 text-sm">
            <a href="/" className="text-slate-700 hover:text-blue-600">Home</a>
            <a href="/test" className="text-slate-700 hover:text-blue-600">Backend Test</a>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <p className="text-slate-700">Manage users from the public JSONPlaceholder API. Create, edit, and delete are simulated.</p>
          <button
            onClick={handleCreateClick}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            + New User
          </button>
        </div>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 p-3 text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <Spinner label="Fetching users..." />
        ) : (
          <UserList users={users} onEdit={handleEdit} onDelete={handleDelete} />
        )}

        {showForm && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-800">
                  {editingUser ? 'Edit User' : 'Create User'}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(false)
                    setEditingUser(null)
                  }}
                  className="text-slate-500 hover:text-slate-800"
                >
                  ✕
                </button>
              </div>
              <UserForm
                initialData={editingUser}
                onSubmit={handleSubmit}
                onCancel={() => {
                  setShowForm(false)
                  setEditingUser(null)
                }}
                submitting={submitting}
              />
            </div>
          </div>
        )}
      </main>

      <footer className="mt-12 border-t py-6 text-center text-sm text-slate-500">
        JSONPlaceholder demo • All mutations are simulated
      </footer>
    </div>
  )
}

export default App
