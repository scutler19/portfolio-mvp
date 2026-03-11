'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { useTheme } from '@/components/providers/theme-provider'
import { PaletteSwitcher } from '@/components/dashboard/palette-switcher'

interface HeaderProps {
  userEmail?: string | null
}

export function Header({ userEmail }: HeaderProps) {
  const router = useRouter()
  const supabase = createClient()
  const theme = useTheme()

  const handleSignOut = useCallback(async () => {
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }, [supabase, router])

  return (
    <header className="flex h-14 min-h-[3.5rem] items-center justify-between gap-4 border-b border-[var(--border)] bg-[var(--sidebar)] px-4 sm:h-16 sm:px-6">
      <div className="min-w-0 flex-1">
        {userEmail && (
          <p className="truncate text-sm text-[var(--muted-foreground)]">
            <span className="hidden sm:inline">Signed in as </span>
            <span className="font-medium text-[var(--foreground)]">{userEmail}</span>
          </p>
        )}
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <PaletteSwitcher />
        {theme && (
          <button
            type="button"
            onClick={() => theme.setTheme(theme.resolved === 'dark' ? 'light' : 'dark')}
            className="rounded-lg p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)]"
            aria-label={theme.resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme.resolved === 'dark' ? (
              <SunIcon className="size-5" />
            ) : (
              <MoonIcon className="size-5" />
            )}
          </button>
        )}
        <button
          onClick={handleSignOut}
          className="rounded-lg px-3.5 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2"
        >
          Sign out
        </button>
      </div>
    </header>
  )
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  )
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  )
}
