import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { TaskActions } from './task-actions'
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

export default async function TasksPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: tasks } = await supabase
    .from('tasks')
    .select('id, title, status, due_date, project_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  const projectNames = new Map<string, string>()
  if (tasks && tasks.length > 0) {
    const ids = [...new Set(tasks.map((t) => t.project_id))]
    const { data: projects } = await supabase
      .from('projects')
      .select('id, name')
      .in('id', ids)
    projects?.forEach((p) => projectNames.set(p.id, p.name))
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Tasks
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Manage tasks across your projects
          </p>
        </div>
        <Link
          href="/tasks/new"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2"
        >
          New Task
        </Link>
      </div>

      {tasks && tasks.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <ul className="divide-y divide-[var(--border)]">
            {tasks.map((task) => (
              <li
                key={task.id}
                className="group flex flex-col gap-4 px-4 py-4 transition hover:bg-[var(--accent-muted)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5"
              >
                <Link href={`/tasks/${task.id}`} className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--foreground)] truncate">
                    {task.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-[var(--muted-foreground)]">
                    <span>{projectNames.get(task.project_id) ?? 'Unknown project'}</span>
                    <span className="hidden text-[var(--muted-foreground)] sm:inline">·</span>
                    <StatusBadge
                      status={task.status}
                      label={STATUS_LABELS[task.status as TaskStatus] ?? task.status}
                    />
                    {task.due_date && (
                      <>
                        <span className="hidden text-[var(--muted-foreground)] sm:inline">·</span>
                        <span>Due {formatDate(task.due_date)}</span>
                      </>
                    )}
                  </div>
                </Link>
                <div className="flex shrink-0 items-center gap-2 border-t border-[var(--border)] pt-4 sm:border-t-0 sm:pt-0">
                  <TaskActions taskId={task.id} taskTitle={task.title} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-base font-medium text-[var(--foreground)]">No tasks yet</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Create your first task to get started
          </p>
          <Link
            href="/tasks/new"
            className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90 active:scale-[0.98]"
          >
            Create task
          </Link>
        </div>
      )}
    </div>
  )
}
