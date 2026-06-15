'use client'

import { useRef } from 'react'
import { addBookmark } from './actions'

export default function BookmarkForm() {
  const formRef = useRef<HTMLFormElement>(null)

  return (
    <form
      ref={formRef}
      action={async (formData) => {
        await addBookmark(formData)
        formRef.current?.reset()
      }}
      className="border rounded p-4 mb-6 space-y-3"
    >
      <h2 className="font-semibold">Add bookmark</h2>

      <input
        type="text"
        name="title"
        placeholder="Title"
        required
        className="w-full border rounded p-2"
      />

      <input
        type="url"
        name="url"
        placeholder="https://example.com"
        required
        className="w-full border rounded p-2"
      />

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" name="is_public" />
        Make this public
      </label>

      <button type="submit" className="bg-black text-white rounded px-4 py-2">
        Add
      </button>
    </form>
  )
}
