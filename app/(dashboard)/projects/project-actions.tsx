'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { deleteProject } from './actions'
import { useToast } from '@/components/providers/toast-provider'
import { ConfirmDialog } from '@/components/ui/confirm-dialog'

interface ProjectActionsProps {
  projectId: string
  projectName: string
}

export function ProjectActions({ projectId, projectName }: ProjectActionsProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function handleDelete() {
    setConfirmOpen(true)
  }

  async function handleConfirmDelete() {
    setConfirmOpen(false)
    try {
      await deleteProject(projectId)
      toast('Project deleted', 'success')
      router.refresh()
    } catch {
      toast('Failed to delete project', 'error')
    }
  }

  return (
    <>
      <div className="flex items-center gap-1">
        <Link
          href={`/projects/${projectId}/edit`}
          className="rounded-lg px-3 py-2 text-sm font-medium text-[var(--muted-foreground)] transition hover:bg-[var(--accent-muted)] hover:text-[var(--foreground)] active:scale-[0.98]"
        >
          Edit
        </Link>
        <button
          onClick={handleDelete}
          className="rounded-lg px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 hover:text-red-700 active:scale-[0.98] dark:text-red-400 dark:hover:bg-red-950/50 dark:hover:text-red-400"
        >
          Delete
        </button>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Delete project"
        message={`Delete "${projectName}"? This will also delete all tasks in this project.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleConfirmDelete}
        onCancel={() => setConfirmOpen(false)}
      />
    </>
  )
}
