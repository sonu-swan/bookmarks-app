import { Suspense } from 'react'
import AuthHandler from '../auth-handler'

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<p className="flex min-h-screen items-center justify-center">Confirming your email...</p>}>
      <AuthHandler />
    </Suspense>
  )
}
