'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { ProjectStatus } from '@/lib/types/database'

export async function createProject(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = (formData.get('description') as string) || null
  const status = (formData.get('status') as ProjectStatus) || 'planning'

  const { error } = await supabase.from('projects').insert({
    user_id: user.id,
    name,
    description,
    status,
  })
  if (error) throw error
  revalidatePath('/projects')
  revalidatePath('/dashboard')
}

export async function updateProject(id: string, formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const name = formData.get('name') as string
  const description = (formData.get('description') as string) || null
  const status = (formData.get('status') as ProjectStatus) || 'planning'

  const { error } = await supabase
    .from('projects')
    .update({ name, description, status })
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw error
  revalidatePath('/projects')
  revalidatePath(`/projects/${id}`)
  revalidatePath('/dashboard')
}

export async function deleteProject(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) throw new Error('Unauthorized')

  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id)
  if (error) throw error
  revalidatePath('/projects')
  revalidatePath('/dashboard')
}
