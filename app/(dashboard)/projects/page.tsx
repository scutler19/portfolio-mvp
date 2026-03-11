import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import { ProjectActions } from './project-actions'
import { StatusBadge } from '@/components/ui/status-badge'
import type { ProjectStatus } from '@/lib/types/database'

const STATUS_LABELS: Record<ProjectStatus, string> = {
  planning: 'Planning',
  active: 'Active',
  on_hold: 'On Hold',
  completed: 'Completed',
}

export default async function ProjectsPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return null

  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 sm:space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-[var(--foreground)] sm:text-3xl">
            Projects
          </h1>
          <p className="mt-2 text-[var(--muted-foreground)]">
            Manage your projects and their tasks
          </p>
        </div>
        <Link
          href="/projects/new"
          className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2"
        >
          New Project
        </Link>
      </div>

      {projects && projects.length > 0 ? (
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--card)] shadow-sm">
          <ul className="divide-y divide-[var(--border)]">
            {projects.map((project) => (
              <li
                key={project.id}
                className="group flex flex-col gap-4 px-4 py-4 transition hover:bg-[var(--accent-muted)] sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-5"
              >
                <Link href={`/projects/${project.id}`} className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--foreground)] truncate">
                    {project.name}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-sm text-[var(--muted-foreground)]">
                    {project.description || 'No description'}
                  </p>
                  <div className="mt-2">
                    <StatusBadge
                      status={project.status}
                      label={STATUS_LABELS[project.status as ProjectStatus] ?? project.status}
                    />
                  </div>
                </Link>
                <div className="flex shrink-0 items-center gap-2 border-t border-[var(--border)] pt-4 sm:border-t-0 sm:pt-0">
                  <ProjectActions projectId={project.id} projectName={project.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--surface)] px-4 py-12 text-center sm:px-6 sm:py-16">
          <p className="text-base font-medium text-[var(--foreground)]">No projects yet</p>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">
            Create your first project to get started
          </p>
          <Link
            href="/projects/new"
            className="mt-6 inline-flex rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] transition hover:opacity-90 active:scale-[0.98]"
          >
            Create project
          </Link>
        </div>
      )}
    </div>
  )
}
