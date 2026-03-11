'use client'

import { useTheme, PALETTE_LABELS, type Palette } from '@/components/providers/theme-provider'
import { useCallback, useRef, useState } from 'react'

const PALETTES: Palette[] = ['midnight', 'obsidian', 'pearl']

export function PaletteSwitcher() {
  const themeCtx = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const handleSelect = useCallback(
    (p: Palette) => {
      themeCtx?.setPalette(p)
      setOpen(false)
    },
    [themeCtx]
  )

  if (!themeCtx) return null

  const currentLabel = PALETTE_LABELS[themeCtx.palette]

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--foreground)] transition hover:bg-[var(--accent-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={`Color palette: ${currentLabel}. Click to change`}
      >
        <SwatchIcon className="size-4 text-[var(--accent)]" />
        <span>{currentLabel}</span>
        <ChevronIcon className={`size-4 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            aria-hidden
            onClick={() => setOpen(false)}
          />
          <ul
            role="listbox"
            aria-label="Color palette options"
            className="absolute right-0 top-full z-50 mt-1.5 min-w-[140px] overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card)] py-1 shadow-lg"
          >
            {PALETTES.map((p) => (
              <li key={p} role="option" aria-selected={themeCtx.palette === p}>
                <button
                  type="button"
                  onClick={() => handleSelect(p)}
                  className={`flex w-full items-center gap-2 px-3 py-2.5 text-left text-sm transition ${
                    themeCtx.palette === p
                      ? 'bg-[var(--accent-muted)] font-medium text-[var(--foreground)]'
                      : 'text-[var(--muted-foreground)] hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)]'
                  }`}
                >
                  <span
                    className="size-3 rounded-full border border-[var(--border)]"
                    style={{
                      backgroundColor:
                        p === 'midnight'
                          ? 'var(--accent)'
                          : p === 'obsidian'
                            ? '#d4a853'
                            : '#2dd4bf',
                    }}
                  />
                  {PALETTE_LABELS[p]}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  )
}

function SwatchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
      />
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  )
}
