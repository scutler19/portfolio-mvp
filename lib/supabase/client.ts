import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Only create client in browser environment
  if (typeof window === 'undefined') {
    throw new Error('Supabase client can only be created in the browser')
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file or Vercel environment variables.'
    )
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey)
}


