export function DemoBanner() {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--accent-muted)] px-4 py-4 shadow-sm transition-all duration-200 sm:px-5">
      <p className="text-sm leading-relaxed text-[var(--foreground)]">
        <span className="font-semibold text-[var(--accent)]">Portfolio demo.</span>{' '}
        This live app showcases a full-stack SaaS MVP with auth, real-time data, and CRUD flows.
        Use Demo Login on the sign-in page to explore without an account.
      </p>
    </div>
  )
}
