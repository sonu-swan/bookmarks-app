'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import type { EmailOtpType } from '@supabase/supabase-js'

export default function AuthHandler() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const next = searchParams.get('next') ?? '/dashboard'
    let cancelled = false

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (cancelled || event !== 'SIGNED_IN' || !session) return
      router.replace(next)
      router.refresh()
    })

    async function finishAuth() {
      const code = searchParams.get('code')
      const token_hash = searchParams.get('token_hash')
      const type = searchParams.get('type') as EmailOtpType | null

      if (code) {
        const { error: codeError } = await supabase.auth.exchangeCodeForSession(code)
        if (cancelled) return
        if (codeError) {
          setError(codeError.message)
          return
        }
        router.replace(next)
        router.refresh()
        return
      }

      if (token_hash && type) {
        const { error: otpError } = await supabase.auth.verifyOtp({ type, token_hash })
        if (cancelled) return
        if (otpError) {
          setError(otpError.message)
          return
        }
        router.replace(next)
        router.refresh()
        return
      }

      const { data: { session } } = await supabase.auth.getSession()
      if (cancelled) return
      if (session) {
        router.replace(next)
        router.refresh()
        return
      }

      setError('Invalid or expired confirmation link. Try signing up again.')
    }

    finishAuth()

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [router, searchParams])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="space-y-2 text-center p-6">
          <p className="text-red-600">{error}</p>
          <a href="/login" className="underline text-sm">Back to login</a>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p>Confirming your email...</p>
    </div>
  )
}
