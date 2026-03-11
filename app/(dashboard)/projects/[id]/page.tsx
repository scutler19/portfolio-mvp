import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ProjectForm } from '../project-form'
import { updateProject } from '../actions'
import { ProjectActions } from '../project-actions'
import { StatusBadge } from '@/components/ui/status-badge'
import type { ProjectStatus } from '@/lib/types/database'

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planning',
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!project) notFound()

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, status')
    .eq('project_id', id)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Back to projects
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {project.name}
            </h1>
            <StatusBadge
              status={project.status}
              label={STATUS_LABELS[project.status as ProjectStatus] ?? project.status}
              className="mt-2"
            />
          </div>
          <ProjectActions projectId={project.id} projectName={project.name} />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-slate-100">Edit Project</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Update project details
          </p>
          <div className="mt-6">
            <ProjectForm
              action={(fd) => updateProject(id, fd)}
              project={project}
              redirectTo={`/projects/${id}`}
            />
          </div>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-5 dark:border-slate-800 sm:px-6">
            <h2 className="font-semibold text-slate-900 dark:text-slate-100">Tasks</h2>
            <Link
              href={`/tasks/new?project=${id}`}
              className="text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
            >
              Add task
            </Link>
          </div>
          <div className="min-h-[120px]">
            {tasks && tasks.length > 0 ? (
              <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                {tasks.map((task) => (
                  <li key={task.id}>
                    <Link
                      href={`/tasks/${task.id}`}
                      className="flex flex-col gap-2 px-4 py-4 transition hover:bg-slate-50/80 dark:hover:bg-slate-800/50 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6"
                    >
                      <span className="font-medium text-slate-900 dark:text-slate-100">{task.title}</span>
                      <StatusBadge status={task.status} label={task.status.replace('_', ' ')} />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center px-4 py-12 text-center sm:px-6">
                <p className="text-sm text-slate-500 dark:text-slate-400">No tasks yet</p>
                <Link
                  href={`/tasks/new?project=${id}`}
                  className="mt-3 text-sm font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                >
                  Add task
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
