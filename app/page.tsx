import Link from 'next/link'
import { LandingThemeToggle } from '@/components/landing-theme-toggle'

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col bg-[var(--background)]">
      <LandingThemeToggle />

      <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-4 py-16 sm:px-6 sm:py-20 lg:py-28">
        <div className="mx-auto mb-10 w-full max-w-xl rounded-2xl border border-[var(--border)] bg-[var(--card)] px-5 py-6 shadow-[var(--shadow-md)] backdrop-blur-sm sm:mb-12 sm:px-8 sm:py-7">
          <h2 className="font-heading text-base font-semibold tracking-tight text-[var(--accent)]">
            Portfolio Demo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--muted-foreground)]">
            This live demo showcases a full-stack SaaS MVP built with Next.js and Supabase. It
            demonstrates authentication, dashboard design, and CRUD data management for projects and
            tasks.
          </p>
          <p className="mt-2 text-sm text-[var(--foreground)]">
            Try Demo Login to explore without an account, or sign up to manage your own projects.
          </p>
        </div>

        <div className="text-center">
          <h1 className="font-heading text-4xl font-bold tracking-tight text-[var(--foreground)] sm:text-5xl">
            ProjectTrack
          </h1>
          <p className="mt-4 text-lg text-[var(--muted-foreground)] sm:text-xl">
            Project and task management, refined
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row sm:gap-6">
            <Link
              href="/login"
              className="w-full rounded-xl bg-[var(--accent)] px-8 py-3.5 text-center text-base font-semibold text-[var(--accent-foreground)] shadow-[var(--shadow)] transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 sm:w-auto"
            >
              Sign in
            </Link>
            <Link
              href="/signup"
              className="w-full rounded-xl border-2 border-[var(--border)] bg-[var(--surface)] px-8 py-3.5 text-center text-base font-semibold text-[var(--foreground)] transition hover:border-[var(--accent)] hover:bg-[var(--accent-muted)] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 sm:w-auto"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
