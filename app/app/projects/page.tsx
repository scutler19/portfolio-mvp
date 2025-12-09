import { requireAuth } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import StatusBadge from '@/components/StatusBadge'
import { ProjectStatus } from '@/types/database'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function ClientProjectsPage() {
  const user = await requireAuth()
  const supabase = await createClient()

  // Get only projects assigned to this client
  const { data: projects } = await supabase
    .from('projects')
    .select('id, name, status, due_date, updated_at')
    .eq('client_id', user.id)
    .order('updated_at', { ascending: false })

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
        <p className="mt-2 text-sm text-gray-600">
          View your assigned projects and notes
        </p>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {projects && projects.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/app/projects/${project.id}`}
                  className="block hover:bg-gray-50"
                >
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <p className="text-sm font-medium text-blue-600 truncate">
                          {project.name}
                        </p>
                        <div className="ml-3">
                          <StatusBadge status={project.status as ProjectStatus} />
                        </div>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="text-sm text-gray-500">
                          {project.due_date
                            ? `Due: ${new Date(project.due_date).toLocaleDateString()}`
                            : 'No due date'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-xs text-gray-500">
                        Last updated:{' '}
                        {new Date(project.updated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">
              No projects assigned yet. Contact your administrator.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

