'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface RoleSwitcherProps {
  currentMode: 'admin' | 'client'
}

// Demo account credentials
const DEMO_ACCOUNTS = {
  admin: {
    email: 'admin@demo.com',
    password: 'demo123',
  },
  client: {
    email: 'client@demo.com',
    password: 'demo123',
  },
}

export default function RoleSwitcher({ currentMode }: RoleSwitcherProps) {
  const router = useRouter()
  const supabase = createClient()
  const [isSwitching, setIsSwitching] = useState(false)

  const handleSwitchRole = async (mode: 'admin' | 'client') => {
    // Don't switch if already in that mode
    if (mode === currentMode) return

    setIsSwitching(true)

    try {
      // Sign out current user
      await supabase.auth.signOut()

      // Sign in as the other demo account
      const credentials = DEMO_ACCOUNTS[mode]
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (signInError) {
        console.error('Error signing in:', signInError)
        // Redirect to login on error
        router.push('/login')
        return
      }

      // Navigate to the appropriate route
      if (mode === 'admin') {
        router.push('/admin')
      } else {
        router.push('/app/projects')
      }
      router.refresh()
    } catch (error) {
      console.error('Error switching roles:', error)
      router.push('/login')
    } finally {
      setIsSwitching(false)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-xs text-gray-500 hidden sm:inline">Demo:</span>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <button
          onClick={() => handleSwitchRole('admin')}
          disabled={isSwitching || currentMode === 'admin'}
          className={`px-3 py-1.5 text-xs font-medium rounded-l-md border ${
            currentMode === 'admin'
              ? 'bg-blue-600 text-white border-blue-600 z-10'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSwitching ? '...' : 'Admin'}
        </button>
        <button
          onClick={() => handleSwitchRole('client')}
          disabled={isSwitching || currentMode === 'client'}
          className={`px-3 py-1.5 text-xs font-medium rounded-r-md border-t border-r border-b ${
            currentMode === 'client'
              ? 'bg-blue-600 text-white border-blue-600 z-10'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          } focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {isSwitching ? '...' : 'Client'}
        </button>
      </div>
    </div>
  )
}
