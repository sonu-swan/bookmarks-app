'use client'

import { useState } from 'react'
import { deleteBookmark, updateBookmark } from './actions'

type Bookmark = {
  id: string
  title: string
  url: string
  is_public: boolean
}

export default function BookmarkList({ bookmarks }: { bookmarks: Bookmark[] }) {
  const [editingId, setEditingId] = useState<string | null>(null)

  if (bookmarks.length === 0) {
    return <p className="text-gray-500">No bookmarks yet.</p>
  }

  return (
    <div className="space-y-3">
      {bookmarks.map((b) => (
        <div key={b.id} className="border rounded p-3">
          {editingId === b.id ? (
            <form
              action={async (formData) => {
                await updateBookmark(b.id, formData)
                setEditingId(null)
              }}
              className="space-y-2"
            >
              <input
                type="text"
                name="title"
                defaultValue={b.title}
                required
                className="w-full border rounded p-2"
              />
              <input
                type="url"
                name="url"
                defaultValue={b.url}
                required
                className="w-full border rounded p-2"
              />
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="is_public" defaultChecked={b.is_public} />
                Public
              </label>
              <div className="flex gap-2">
                <button type="submit" className="bg-black text-white rounded px-3 py-1 text-sm">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditingId(null)}
                  className="border rounded px-3 py-1 text-sm"
                >
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">{b.title}</p>
                <a href={b.url} target="_blank" className="text-sm text-blue-600 underline">
                  {b.url}
                </a>
                <p className="text-xs text-gray-500 mt-1">
                  {b.is_public ? 'Public' : 'Private'}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setEditingId(b.id)}
                  className="text-sm underline"
                >
                  Edit
                </button>
                <form action={() => deleteBookmark(b.id)}>
                  <button type="submit" className="text-sm text-red-600 underline">
                    Delete
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
