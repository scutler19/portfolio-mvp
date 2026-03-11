'use client'

import { useTheme } from '@/components/providers/theme-provider'

export function AuthThemeToggle() {
  const theme = useTheme()
  if (!theme) return null

  return (
    <button
      type="button"
      onClick={() => theme.setTheme(theme.resolved === 'dark' ? 'light' : 'dark')}
      className="absolute right-4 top-4 rounded-lg p-2.5 text-[var(--muted-foreground)] transition hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)] sm:right-6 sm:top-6"
      aria-label={theme.resolved === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme.resolved === 'dark' ? (
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
    </button>
  )
}
