import { createClient } from '@/lib/supabase/server'
import { createTask } from '../actions'
import { TaskForm } from '../task-form'
import Link from 'next/link'

export default async function NewTaskPage({
  searchParams,
}: {
  searchParams: Promise<{ project?: string }>
}) {
  const { project } = await searchParams
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name')

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Back to tasks
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          New Task
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Create a task and assign it to a project</p>
      </div>

      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <TaskForm
          action={createTask}
          projects={projects ?? []}
          defaultProjectId={project}
        />
      </div>
    </div>
  )
}
