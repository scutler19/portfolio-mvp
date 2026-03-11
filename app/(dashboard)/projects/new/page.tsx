import { ProjectForm } from '../project-form'
import { createProject } from '../actions'
import Link from 'next/link'

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <div>
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100"
        >
          ← Back to projects
        </Link>
        <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
          New Project
        </h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Create a new project</p>
      </div>

      <div className="max-w-xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <ProjectForm action={createProject} />
      </div>
    </div>
  )
}
