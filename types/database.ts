export type ProjectStatus = 'planned' | 'in_progress' | 'on_hold' | 'completed'

export interface Project {
  id: string
  client_id: string
  name: string
  status: ProjectStatus
  description: string | null
  start_date: string | null
  due_date: string | null
  created_at: string
  updated_at: string
}

export interface ProjectNote {
  id: string
  project_id: string
  author_id: string
  content: string
  created_at: string
}

export interface ProjectWithClient extends Project {
  client: {
    id: string
    name: string
    email: string
  }
}

export interface ProjectWithNotes extends ProjectWithClient {
  notes: (ProjectNote & {
    author: {
      id: string
      name: string
    }
  })[]
}


