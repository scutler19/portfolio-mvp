import { type NextRequest } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

const protectedPaths = ['/dashboard', '/projects', '/tasks']

function isProtectedPath(pathname: string) {
  return protectedPaths.some((path) =>
    pathname === path || pathname.startsWith(path + '/')
  )
}

export async function middleware(request: NextRequest) {
  const { response, user } = await updateSession(request)

  if (isProtectedPath(request.nextUrl.pathname) && !user) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('redirect', request.nextUrl.pathname)
    return Response.redirect(loginUrl)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
