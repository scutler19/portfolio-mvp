import { createClient } from '@/lib/supabase/server'
import ProjectForm from '@/components/ProjectForm'

export default async function NewProjectPage() {
  const supabase = await createClient()

  // Get all clients for the dropdown
  const { data: clients } = await supabase
    .from('profiles')
    .select('id, name, email')
    .eq('role', 'client')
    .order('name')

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">New Project</h1>
        <p className="mt-2 text-sm text-gray-600">
          Create a new project and assign it to a client
        </p>
      </div>

      <ProjectForm clients={clients || []} />
    </div>
  )
}


