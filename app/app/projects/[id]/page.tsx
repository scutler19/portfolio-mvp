import { requireAuth } from '@/lib/auth'
import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import StatusBadge from '@/components/StatusBadge'
import { ProjectStatus } from '@/types/database'
import ClientProjectNotes from '@/components/ClientProjectNotes'

export default async function ClientProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  await requireAuth() // Ensure user is authenticated
  const { id } = await params
  const supabase = await createClient()
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !project) {
    notFound()
  }

  return (
    <div>
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
            <div className="mt-2 flex items-center space-x-4">
              <StatusBadge status={project.status as ProjectStatus} />
              {project.due_date && (
                <p className="text-sm text-gray-600">
                  Due: {new Date(project.due_date).toLocaleDateString()}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Details */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Project Details
          </h2>
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Status</dt>
              <dd className="mt-1 text-sm text-gray-900">
                <StatusBadge status={project.status as ProjectStatus} />
              </dd>
            </div>
            {project.start_date && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Start Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(project.start_date).toLocaleDateString()}
                </dd>
              </div>
            )}
            {project.due_date && (
              <div>
                <dt className="text-sm font-medium text-gray-500">Due Date</dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {new Date(project.due_date).toLocaleDateString()}
                </dd>
              </div>
            )}
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {project.description || 'No description provided'}
              </dd>
            </div>
          </dl>
        </div>

        {/* Notes Section */}
        <ClientProjectNotes projectId={id} />
      </div>
    </div>
  )
}

