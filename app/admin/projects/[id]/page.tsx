import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import ProjectForm from '@/components/ProjectForm'
import ProjectNotes from '@/components/ProjectNotes'

// Force dynamic rendering - requires authentication
export const dynamic = 'force-dynamic'

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Get project with client info
  const { data: project, error } = await supabase
    .from('projects')
    .select(`
      *,
      client:profiles!projects_client_id_fkey (
        id,
        name,
        email
      )
    `)
    .eq('id', id)
    .single()

  if (error || !project) {
    notFound()
  }

  // Get all clients for the dropdown
  const { data: clients } = await supabase
    .from('profiles')
    .select('id, name, email')
    .eq('role', 'client')
    .order('name')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Edit Project</h1>
        <p className="mt-2 text-sm text-gray-600">
          Update project details and manage notes
        </p>
      </div>

      <div className="space-y-6">
        <ProjectForm
          project={project}
          clients={clients || []}
        />
        <ProjectNotes projectId={id} />
      </div>
    </div>
  )
}


