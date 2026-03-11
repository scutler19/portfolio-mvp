import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { Sidebar, SidebarNavLinks } from '@/components/dashboard/sidebar'
import { Header } from '@/components/dashboard/header'
import { DashboardProviders } from '@/components/providers/dashboard-providers'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  return (
    <DashboardProviders>
      <div className="flex h-screen flex-col bg-[var(--background)]">
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <div className="flex flex-1 flex-col overflow-hidden">
            <Header userEmail={user.email} />
            <nav className="flex gap-1 border-b border-[var(--border)] bg-[var(--sidebar)] px-2 py-2 md:hidden">
              <SidebarNavLinks />
            </nav>
            <main className="flex-1 overflow-y-auto bg-[var(--background)] p-4 sm:p-6 lg:p-8">
              <div className="mx-auto max-w-5xl">{children}</div>
            </main>
          </div>
        </div>
      </div>
    </DashboardProviders>
  )
}
