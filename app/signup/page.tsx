'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { AuthThemeToggle } from '@/components/auth-theme-toggle'
import { useRouter } from 'next/navigation'

export default function SignupPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) throw error
      setSuccess(true)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign up failed')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-12 sm:py-16">
        <AuthThemeToggle />
        <div className="w-full max-w-[400px] space-y-6 rounded-2xl border border-[var(--border)] bg-[var(--card)] p-8 shadow-[var(--shadow-md)]">
          <h1 className="font-heading text-xl font-bold tracking-tight text-[var(--foreground)]">
            Check your email
          </h1>
          <p className="text-sm leading-relaxed text-[var(--muted-foreground)]">
            We&apos;ve sent you a confirmation link. Click it to verify your account and sign in.
          </p>
          <Link
            href="/login"
            className="block rounded-xl bg-[var(--accent)] px-4 py-3 text-center text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90 active:scale-[0.98]"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-12 sm:py-16">
      <AuthThemeToggle />
      <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Create account
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Sign up to start managing your projects
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">
              {error}
            </div>
          )}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1.5 block w-full rounded-lg border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[var(--foreground)]">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="mt-1.5 block w-full rounded-lg border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
            />
            <p className="mt-1 text-xs text-[var(--muted-foreground)]">At least 6 characters</p>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Creating account…' : 'Sign up'}
          </button>
        </form>

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-semibold text-[var(--accent)] transition hover:opacity-80"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
