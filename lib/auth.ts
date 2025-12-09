import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export type UserRole = 'admin' | 'client'

export interface Profile {
  id: string
  role: UserRole
  name: string
  email: string
  created_at: string
}

export async function getCurrentUser() {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return null
    }

    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (!profile) {
      return null
    }

    return {
      ...user,
      profile: profile as Profile,
    }
  } catch (error) {
    // If Supabase isn't configured or there's an error, return null
    // This allows the app to continue functioning (e.g., showing login page)
    console.error('Error getting current user:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getCurrentUser()
  if (!user) {
    redirect('/login')
  }
  return user
}



