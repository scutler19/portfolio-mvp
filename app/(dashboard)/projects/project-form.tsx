'use client'

import { useState } from 'react'
import type { Project, ProjectStatus } from '@/lib/types/database'

const STATUS_OPTIONS: { value: ProjectStatus; label: string }[] = [
  { value: 'planning', label: 'Planning' },
  { value: 'active', label: 'Active' },
  { value: 'on_hold', label: 'On Hold' },
  { value: 'completed', label: 'Completed' },
]

interface ProjectFormProps {
  action: (formData: FormData) => Promise<void>
  project?: Project | null
  redirectTo?: string
}

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20'

export function ProjectForm({ action, project, redirectTo }: ProjectFormProps) {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const form = e.currentTarget
    const formData = new FormData(form)
    try {
      await action(formData)
      if (redirectTo) window.location.href = redirectTo
      else window.location.href = '/projects'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {project && (
        <input type="hidden" name="_projectId" value={project.id} />
      )}
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-[var(--foreground)]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          defaultValue={project?.name}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-[var(--foreground)]">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          rows={4}
          defaultValue={project?.description ?? ''}
          className={inputClass}
        />
      </div>
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-[var(--foreground)]">
          Status
        </label>
        <select
          id="status"
          name="status"
          defaultValue={project?.status ?? 'planning'}
          className={inputClass}
        >
          {STATUS_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? 'Saving…' : project ? 'Update Project' : 'Create Project'}
        </button>
      </div>
    </form>
  )
}
