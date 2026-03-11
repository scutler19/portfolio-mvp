export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed'
export type TaskStatus = 'todo' | 'in_progress' | 'completed'

export interface Project {
  id: string
  user_id: string
  name: string
  description: string | null
  status: ProjectStatus
  created_at: string
}

export interface Task {
  id: string
  user_id: string
  project_id: string
  title: string
  description: string | null
  status: TaskStatus
  due_date: string | null
  created_at: string
}
