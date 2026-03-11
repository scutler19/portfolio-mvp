'use client'

import { useState, Suspense } from 'react'
import { createClient } from '@/lib/supabase/client'
import Link from 'next/link'
import { AuthThemeToggle } from '@/components/auth-theme-toggle'
import { useRouter, useSearchParams } from 'next/navigation'

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/dashboard'
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleDemoLogin() {
    setError(null)
    setLoading(true)
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: 'demo@example.com',
        password: 'demo1234',
      })
      if (error) throw error
      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Demo login failed. Ensure the demo account exists (see README).'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center bg-[var(--background)] px-4 py-12 sm:py-16">
      <AuthThemeToggle />
      <div className="w-full max-w-[400px] space-y-6 sm:space-y-8">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Sign in
          </h1>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Enter your credentials or use Demo Login to explore
          </p>
        </div>

        <div className="rounded-xl border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-3.5 text-sm text-[var(--foreground)]">
          <span className="font-semibold text-[var(--accent)]">Demo account:</span> Click &quot;Demo Login&quot; to explore
          the app without signing up.
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
              className="mt-1.5 block w-full rounded-lg border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[var(--accent)] px-4 py-3 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[var(--border)]" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-[var(--background)] px-2 text-[var(--muted-foreground)]">
              or
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDemoLogin}
          disabled={loading}
          className="w-full rounded-xl border-2 border-dashed border-[var(--accent)] bg-[var(--accent-muted)] px-4 py-3 text-sm font-semibold text-[var(--accent)] transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-60"
        >
          Demo Login
        </button>

        <p className="text-center text-sm text-[var(--muted-foreground)]">
          Don&apos;t have an account?{' '}
          <Link
            href="/signup"
            className="font-semibold text-[var(--accent)] transition hover:opacity-80"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[var(--background)] text-[var(--muted-foreground)]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  )
}
