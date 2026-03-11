'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
  {
    href: '/projects',
    label: 'Projects',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
      </svg>
    ),
  },
  {
    href: '/tasks',
    label: 'Tasks',
    icon: (
      <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
]

function NavLinks({ pathname, className = '' }: { pathname: string; className?: string }) {
  return (
    <>
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                : 'text-[var(--muted-foreground)] hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)]'
            } ${className}`}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </>
  )
}

export function SidebarNavLinks() {
  const pathname = usePathname()
  return (
    <div className="flex w-full gap-1">
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
        return (
          <Link
            key={item.href}
            href={item.href}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-lg px-2 py-2.5 text-sm font-medium transition-all duration-200 ${
              isActive
                ? 'bg-[var(--accent-muted)] text-[var(--accent)]'
                : 'text-[var(--muted-foreground)] hover:bg-[var(--accent-muted)]'
            }`}
          >
            {item.icon}
            {item.label}
          </Link>
        )
      })}
    </div>
  )
}

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-[var(--sidebar-border)] bg-[var(--sidebar)] md:flex lg:flex">
      <div className="flex min-h-[3.5rem] items-center border-b border-[var(--border)] px-5 sm:min-h-[4rem] sm:px-6">
        <Link
          href="/dashboard"
          className="font-heading text-lg font-semibold tracking-tight text-[var(--foreground)] transition hover:text-[var(--muted-foreground)]"
        >
          ProjectTrack
        </Link>
      </div>
      <nav className="flex-1 space-y-0.5 p-4">
        <NavLinks pathname={pathname} />
      </nav>
    </aside>
  )
}
