import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const isLinking = requestUrl.searchParams.get('link') === 'true'
  const supabase = await createClient()

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (error) {
      console.error('Error exchanging code for session:', error)
      redirect('/login?error=auth_failed')
    }
  }

  // Get user to determine redirect
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    // Check if profile exists, create if not
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile) {
      // Profile should be created by trigger, but fallback
      const email = user.email || user.user_metadata?.email || ''
      const name =
        user.user_metadata?.name ||
        user.user_metadata?.full_name ||
        user.user_metadata?.preferred_username ||
        'User'

      await supabase.from('profiles').insert({
        id: user.id,
        email,
        name,
        role: 'client',
      })
    }

    // If linking account, redirect to settings
    if (isLinking) {
      redirect('/settings?linked=true')
    }

    // Redirect based on user's actual role
    const finalProfile = profile || await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()
      .then(({ data }) => data)

    if (finalProfile?.role === 'admin') {
      redirect('/admin')
    } else {
      redirect('/app/projects')
    }
  }

  redirect('/login')
}

