import { ListSkeleton } from '@/components/ui/skeleton'

export default function TasksLoading() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <div className="h-8 w-24 animate-pulse rounded-lg bg-slate-200 dark:bg-slate-800 sm:h-9 sm:w-28" />
          <div className="h-4 w-48 animate-pulse rounded bg-slate-200 dark:bg-slate-800" />
        </div>
        <div className="h-10 w-28 animate-pulse rounded-xl bg-slate-200 dark:bg-slate-800" />
      </div>
      <ListSkeleton rows={6} />
    </div>
  )
}
