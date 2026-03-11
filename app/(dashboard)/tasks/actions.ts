'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { TaskStatus } from '@/lib/types/database'

export async function createTask(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const project_id = formData.get('project_id') as string
  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const status = (formData.get('status') as TaskStatus) || 'todo'
  const due_date_str = formData.get('due_date') as string | null
  const due_date = due_date_str || null

  const { error } = await supabase.from('tasks').insert({
    user_id: user.id,
    project_id,
    title,
    description,
    status,
    due_date,
  })
  if (error) throw error
  revalidatePath('/tasks')
  revalidatePath(`/projects/${project_id}`)
  revalidatePath('/dashboard')
}

export async function updateTask(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const title = formData.get('title') as string
  const description = (formData.get('description') as string) || null
  const status = (formData.get('status') as TaskStatus) || 'todo'
  const due_date_str = formData.get('due_date') as string | null
  const due_date = due_date_str || null
  const project_id = formData.get('project_id') as string

  const { error } = await supabase
    .from('tasks')
    .update({ title, description, status, due_date, project_id })
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw error
  revalidatePath('/tasks')
  revalidatePath(`/tasks/${id}`)
  revalidatePath(`/projects/${project_id}`)
  revalidatePath('/dashboard')
}

export async function deleteTask(id: string, projectId?: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw error
  revalidatePath('/tasks')
  revalidatePath('/dashboard')
  if (projectId) revalidatePath(`/projects/${projectId}`)
}
