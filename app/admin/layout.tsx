import { requireAuth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import Navbar from '@/components/Navbar'

// Force dynamic rendering - these pages require authentication
export const dynamic = 'force-dynamic'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await requireAuth()
  
  // If user is not an admin, redirect to client view
  if (user.profile.role !== 'admin') {
    redirect('/app/projects')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar userName={user.profile.name} currentMode={user.profile.role} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  )
}

