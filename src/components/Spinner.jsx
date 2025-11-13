import React from 'react'

function Spinner({ label = 'Loading...' }) {
  return (
    <div className="flex items-center justify-center py-10">
      <div className="inline-flex items-center gap-3">
        <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
        <span className="text-sm text-gray-600">{label}</span>
      </div>
    </div>
  )
}

export default Spinner
