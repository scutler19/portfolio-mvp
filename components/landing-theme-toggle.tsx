'use client'

import { useTheme } from '@/components/providers/theme-provider'
import { PALETTE_LABELS, type Palette } from '@/components/providers/theme-provider'

const PALETTES: Palette[] = ['midnight', 'obsidian', 'pearl']

export function LandingThemeToggle() {
  const theme = useTheme()
  if (!theme) return null

  return (
    <div className="absolute right-4 top-4 flex items-center gap-1 sm:right-6 sm:top-6">
      <div className="flex rounded-lg border border-[var(--border)] bg-[var(--surface)] p-1">
        {PALETTES.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => theme.setPalette(p)}
            title={`${PALETTE_LABELS[p]} palette`}
            className={`rounded-md px-2 py-1.5 text-xs font-medium transition ${
              theme.palette === p
                ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
            }`}
          >
            {PALETTE_LABELS[p]}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={() => theme.setTheme(theme.resolved === 'dark' ? 'light' : 'dark')}
        className="rounded-lg p-2 text-[var(--muted-foreground)] transition hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)]"
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
    </div>
  )
}
