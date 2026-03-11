import { createClient } from '@/lib/supabase/server'
import { DemoBanner } from '@/components/dashboard/demo-banner'
import { StatusBadge } from '@/components/ui/status-badge'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { count: projectsCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: tasksCount } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)

  const { count: completedCount } = await supabase
    .from('tasks')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('status', 'completed')

  const { data: recentTasks } = await supabase
    .from('tasks')
    .select('id, title, status, created_at, project_id')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  const { data: recentProjects } = await supabase
    .from('projects')
    .select('id, name, status, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div className="space-y-6 sm:space-y-8">
      <DemoBanner />

      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
          Dashboard
        </h1>
        <p className="mt-2 text-[var(--muted-foreground)]">
          Overview of your projects and tasks
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:shadow-[var(--shadow)] sm:p-6">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Projects</p>
          <p className="mt-2 font-heading text-3xl font-bold text-[var(--foreground)]">{projectsCount ?? 0}</p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Projects you&apos;re managing
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:shadow-[var(--shadow)] sm:p-6">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">Total Tasks</p>
          <p className="mt-2 font-heading text-3xl font-bold text-[var(--foreground)]">{tasksCount ?? 0}</p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Tasks across all projects
          </p>
        </div>
        <div className="rounded-xl border border-[var(--border)] bg-[var(--card)] p-5 shadow-sm transition-all duration-200 hover:shadow-[var(--shadow)] sm:p-6">
          <p className="text-sm font-medium text-[var(--muted-foreground)]">Completed</p>
          <p className="mt-2 font-heading text-3xl font-bold text-[var(--foreground)]">{completedCount ?? 0}</p>
          <p className="mt-3 text-xs leading-relaxed text-[var(--muted-foreground)]">
            Tasks marked done
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="border-b border-[var(--border)] px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="font-heading font-semibold text-[var(--foreground)]">Recent Tasks</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Latest tasks across your projects
            </p>
          </div>
          <ul className="divide-y divide-[var(--border)]">
            {recentTasks && recentTasks.length > 0 ? (
              recentTasks.map((task) => (
                <li key={task.id}>
                  <Link
                    href={`/tasks/${task.id}`}
                    className="flex flex-col gap-2 px-4 py-4 transition hover:bg-[var(--accent-muted)] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6"
                  >
                    <span className="font-medium text-[var(--foreground)]">{task.title}</span>
                    <StatusBadge status={task.status} label={task.status.replace('_', ' ')} />
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center sm:px-6">
                <p className="text-sm text-[var(--muted-foreground)]">No tasks yet</p>
                <Link
                  href="/tasks/new"
                  className="mt-3 inline-flex rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90 active:scale-[0.98]"
                >
                  Create task
                </Link>
              </li>
            )}
          </ul>
        </div>

        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <div className="border-b border-[var(--border)] px-4 py-4 sm:px-6 sm:py-5">
            <h2 className="font-heading font-semibold text-[var(--foreground)]">Recent Projects</h2>
            <p className="mt-1 text-sm text-[var(--muted-foreground)]">
              Projects you&apos;ve recently updated
            </p>
          </div>
          <ul className="divide-y divide-slate-100 dark:divide-slate-800">
            {recentProjects && recentProjects.length > 0 ? (
              recentProjects.map((project) => (
                <li key={project.id}>
                  <Link
                    href={`/projects/${project.id}`}
                    className="flex flex-col gap-2 px-4 py-4 transition hover:bg-[var(--accent-muted)] sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-6"
                  >
                    <span className="font-medium text-[var(--foreground)]">{project.name}</span>
                    <StatusBadge status={project.status} label={project.status.replace('_', ' ')} />
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-12 text-center sm:px-6">
                <p className="text-sm text-[var(--muted-foreground)]">No projects yet</p>
                <Link
                  href="/projects/new"
                  className="mt-3 inline-flex rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-medium text-[var(--accent-foreground)] transition hover:opacity-90 active:scale-[0.98]"
                >
                  Create project
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  )
}
