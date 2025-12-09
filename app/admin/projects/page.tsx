import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import StatusBadge from '@/components/StatusBadge'
import { ProjectStatus } from '@/types/database'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function AdminProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase
    .from('projects')
    .select(`
      id,
      name,
      status,
      updated_at,
      due_date,
      client:profiles!projects_client_id_fkey (
        id,
        name
      )
    `)
    .order('updated_at', { ascending: false })

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects</h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage all client projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New Project
        </Link>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {projects && projects.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {projects.map((project) => (
              <li key={project.id}>
                <Link
                  href={`/admin/projects/${project.id}`}
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
                            ? new Date(project.due_date).toLocaleDateString()
                            : 'No due date'}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          Client: {Array.isArray(project.client) && project.client.length > 0
                            ? project.client[0].name
                            : 'Unassigned'}
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>
                          Updated:{' '}
                          {new Date(project.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center py-12">
            <p className="text-sm text-gray-500">No projects yet</p>
            <Link
              href="/admin/projects/new"
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              Create your first project
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

