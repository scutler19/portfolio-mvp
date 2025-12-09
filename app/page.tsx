import { redirect } from 'next/navigation'
import { getCurrentUser } from '@/lib/auth'
import Link from 'next/link'

export default async function HomePage() {
  const user = await getCurrentUser()

  if (user) {
    // Use the user's actual role to determine redirect
    if (user.profile.role === 'admin') {
      redirect('/admin')
    } else {
      redirect('/app/projects')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Project Manager</h1>
        <p className="text-lg text-gray-600 mb-8">Manage client projects and collaborate</p>
        <Link
          href="/login"
          className="inline-block rounded-md bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Sign in / Sign up
        </Link>
      </div>
    </div>
  )
}
