import { ProjectStatus } from '@/types/database'

interface StatusBadgeProps {
  status: ProjectStatus
}

const statusColors: Record<ProjectStatus, string> = {
  planned: 'bg-gray-100 text-gray-800',
  in_progress: 'bg-blue-100 text-blue-800',
  on_hold: 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
}

const statusLabels: Record<ProjectStatus, string> = {
  planned: 'Planned',
  in_progress: 'In Progress',
  on_hold: 'On Hold',
  completed: 'Completed',
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {statusLabels[status]}
    </span>
  )
}


