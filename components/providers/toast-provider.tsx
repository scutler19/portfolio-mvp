'use client'

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from 'react'

type Toast = { id: string; message: string; type: 'success' | 'error' | 'info' }

interface ToastContextValue {
  toast: (message: string, type?: 'success' | 'error' | 'info') => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timeoutRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const toast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = crypto.randomUUID()
    setToasts((prev) => [...prev, { id, message, type }])
    const t = setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id))
    }, 3500)
    timeoutRef.current.push(t)
  }, [])

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 flex flex-col items-center gap-2 p-4 sm:bottom-4 sm:left-auto sm:right-4 sm:items-end"
        aria-live="polite"
        role="region"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto w-full max-w-sm rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium shadow-lg transition-all duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 sm:w-auto"
            role="status"
          >
            {t.type === 'success' && (
              <span className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                <CheckIcon />
                {t.message}
              </span>
            )}
            {t.type === 'error' && (
              <span className="flex items-center gap-2 text-red-700 dark:text-red-400">
                <ErrorIcon />
                {t.message}
              </span>
            )}
            {t.type === 'info' && (
              <span className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                {t.message}
              </span>
            )}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

function CheckIcon() {
  return (
    <svg className="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
  )
}

function ErrorIcon() {
  return (
    <svg className="size-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}
