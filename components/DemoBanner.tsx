'use client'

export default function DemoBanner() {
  return (
    <div className="bg-blue-50 border-b border-blue-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              className="h-5 w-5 text-blue-400 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-sm text-blue-800">
              This is a live demo. You can toggle between{' '}
              <span className="font-medium">Admin</span> and{' '}
              <span className="font-medium">Client</span> views using the switcher in
              the navigation bar to explore both interfaces.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

