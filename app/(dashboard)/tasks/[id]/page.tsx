import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { TaskForm } from '../task-form'
import { updateTask } from '../actions'
import { TaskActions } from '../task-actions'
import { StatusBadge } from '@/components/ui/status-badge'
import type { TaskStatus } from '@/lib/types/database'

const STATUS_LABELS: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  completed: 'Completed',
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return null
  try {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return dateStr
  }
}

export default async function TaskDetailPage({
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

  const { data: task } = await supabase
    .from('tasks')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single()

  if (!task) notFound()

  const { data: projects } = await supabase
    .from('projects')
    .select('id, name')
    .eq('user_id', user.id)
    .order('name')

  const { data: project } = await supabase
    .from('projects')
    .select('name')
    .eq('id', task.project_id)
    .single()

  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/tasks"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Back to tasks
        </Link>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
              {task.title}
            </h1>
            <div className="mt-2 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
              <Link
                href={`/projects/${task.project_id}`}
                className="font-medium text-indigo-600 transition hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                {project?.name ?? 'Unknown project'}
              </Link>
              <span className="text-slate-300 dark:text-slate-600">·</span>
              <StatusBadge
                status={task.status}
                label={STATUS_LABELS[task.status as TaskStatus] ?? task.status}
              />
              {task.due_date && (
                <>
                  <span className="text-slate-300 dark:text-slate-600">·</span>
                  <span>Due {formatDate(task.due_date)}</span>
                </>
              )}
            </div>
          </div>
          <TaskActions
            taskId={task.id}
            taskTitle={task.title}
            projectId={task.project_id}
          />
        </div>
      </div>

      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-semibold text-slate-900 dark:text-slate-100">Edit Task</h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Update task details, status, or due date
        </p>
        <div className="mt-6">
          <TaskForm
            action={(fd) => updateTask(id, fd)}
            task={task}
            projects={projects ?? []}
            redirectTo={`/tasks/${id}`}
          />
        </div>
      </div>
    </div>
  )
}
