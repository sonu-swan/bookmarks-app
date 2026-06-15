'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [handle, setHandle] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { handle },
        emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      },
    })

    setLoading(false)

    if (error) {
      setError(error.message)
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center p-6">
          <h1 className="text-2xl font-bold mb-2">Check your email</h1>
          <p>We sent you a confirmation link. Click it to activate your account.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form onSubmit={handleSignup} className="w-full max-w-sm space-y-4 p-6">
        <h1 className="text-2xl font-bold">Sign up</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border rounded p-2"
        />

        <input
          type="text"
          placeholder="Choose a handle (e.g. johnsmith)"
          value={handle}
          onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
          required
          minLength={3}
          className="w-full border rounded p-2"
        />

        <input
          type="password"
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
          className="w-full border rounded p-2"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white rounded p-2"
        >
          {loading ? 'Signing up...' : 'Sign up'}
        </button>

        <p className="text-sm">
          Already have an account? <a href="/login" className="underline">Log in</a>
        </p>
      </form>
    </div>
  )
}
