'use client'

import { ToastProvider } from './toast-provider'

export function DashboardProviders({ children }: { children: React.ReactNode }) {
  return <ToastProvider>{children}</ToastProvider>
}
