'use client'

import { useState } from 'react'
import type { Task, TaskStatus } from '@/lib/types/database'

const STATUS_OPTIONS: { value: TaskStatus; label: string }[] = [
  { value: 'todo', label: 'To Do' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' },
]

interface TaskFormProps {
  action: (formData: FormData) => Promise<void>
  task?: Task | null
  projects: { id: string; name: string }[]
  defaultProjectId?: string
  redirectTo?: string
}

const inputClass =
  'mt-1.5 block w-full rounded-lg border border-[var(--input)] bg-[var(--surface)] px-3.5 py-2.5 text-[var(--foreground)] shadow-sm transition placeholder:text-[var(--muted-foreground)] focus:border-[var(--ring)] focus:outline-none focus:ring-2 focus:ring-[var(--ring)]/20'

export function TaskForm({
  action,
  task,
  projects,
  defaultProjectId,
  redirectTo,
}: TaskFormProps) {
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
      else window.location.href = '/tasks'
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const projectId = task?.project_id ?? defaultProjectId ?? projects[0]?.id

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-400">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="project_id" className="block text-sm font-medium text-[var(--foreground)]">
          Project
        </label>
        <select
          id="project_id"
          name="project_id"
          required
          defaultValue={projectId}
          className={inputClass}
        >
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-[var(--foreground)]">
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          required
          defaultValue={task?.title}
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
          defaultValue={task?.description ?? ''}
          className={inputClass}
        />
      </div>
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-[var(--foreground)]">
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={task?.status ?? 'todo'}
            className={inputClass}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="due_date" className="block text-sm font-medium text-[var(--foreground)]">
            Due Date
          </label>
          <input
            id="due_date"
            name="due_date"
            type="date"
            defaultValue={task?.due_date ?? ''}
            className={inputClass}
          />
        </div>
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] shadow-sm transition hover:opacity-90 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[var(--ring)] focus:ring-offset-2 disabled:opacity-60"
        >
          {loading ? 'Saving…' : task ? 'Update Task' : 'Create Task'}
        </button>
      </div>
    </form>
  )
}
