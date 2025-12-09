'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProjectNote } from '@/types/database'

interface ClientProjectNotesProps {
  projectId: string
}

export default function ClientProjectNotes({
  projectId,
}: ClientProjectNotesProps) {
  const supabase = createClient()
  const [notes, setNotes] = useState<(ProjectNote & { author: { name: string } })[]>([])
  const [fetching, setFetching] = useState(true)

  const fetchNotes = async () => {
    setFetching(true)
    const { data } = await supabase
      .from('project_notes')
      .select(`
        *,
        author:profiles!project_notes_author_id_fkey (
          name
        )
      `)
      .eq('project_id', projectId)
      .order('created_at', { ascending: false })

    if (data) {
      setNotes(data as (ProjectNote & { author: { name: string } })[])
    }
    setFetching(false)
  }

  useEffect(() => {
    fetchNotes()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Project Notes</h2>

        <div className="space-y-4">
          {fetching ? (
            <p className="text-sm text-gray-500">Loading notes...</p>
          ) : notes.length > 0 ? (
            notes.map((note) => (
              <div
                key={note.id}
                className="border-l-4 border-blue-500 pl-4 py-2 bg-gray-50 rounded"
              >
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">
                    {note.author.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(note.created_at).toLocaleString()}
                  </p>
                </div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {note.content}
                </p>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No notes yet</p>
          )}
        </div>
      </div>
    </div>
  )
}


