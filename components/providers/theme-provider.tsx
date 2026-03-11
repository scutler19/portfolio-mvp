'use client'

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react'

export type Theme = 'light' | 'dark' | 'system'
export type Palette = 'midnight' | 'obsidian' | 'pearl'

interface ThemeContextValue {
  theme: Theme
  setTheme: (t: Theme) => void
  resolved: 'light' | 'dark'
  palette: Palette
  setPalette: (p: Palette) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) return null
  return ctx
}

const PALETTE_LABELS: Record<Palette, string> = {
  midnight: 'Midnight',
  obsidian: 'Obsidian',
  pearl: 'Pearl',
}

export { PALETTE_LABELS }

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolved, setResolved] = useState<'light' | 'dark'>('light')
  const [palette, setPaletteState] = useState<Palette>('midnight')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const storedTheme = (localStorage.getItem('theme') as Theme) || 'system'
    const storedPalette = (localStorage.getItem('palette') as Palette) || 'midnight'
    setThemeState(storedTheme)
    setPaletteState(storedPalette)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const root = document.documentElement
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = theme === 'dark' || (theme === 'system' && prefersDark)
    setResolved(isDark ? 'dark' : 'light')
    root.classList.toggle('dark', isDark)
    root.setAttribute('data-palette', palette)
  }, [theme, palette, mounted])

  useEffect(() => {
    if (!mounted) return
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const fn = () => setResolved(mq.matches ? 'dark' : 'light')
    mq.addEventListener('change', fn)
    return () => mq.removeEventListener('change', fn)
  }, [mounted, theme])

  const setTheme = useCallback((t: Theme) => {
    setThemeState(t)
    localStorage.setItem('theme', t)
  }, [])

  const setPalette = useCallback((p: Palette) => {
    setPaletteState(p)
    localStorage.setItem('palette', p)
  }, [])

  const value: ThemeContextValue = { theme, setTheme, resolved, palette, setPalette }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
