'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { ProjectNote } from '@/types/database'

interface ProjectNotesProps {
  projectId: string
}

export default function ProjectNotes({ projectId }: ProjectNotesProps) {
  const supabase = createClient()
  const [notes, setNotes] = useState<(ProjectNote & { author: { name: string } })[]>([])
  const [newNote, setNewNote] = useState('')
  const [loading, setLoading] = useState(false)
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

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newNote.trim()) return

    setLoading(true)
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      setLoading(false)
      return
    }

    const { error } = await supabase.from('project_notes').insert({
      project_id: projectId,
      author_id: user.id,
      content: newNote,
    })

    if (!error) {
      setNewNote('')
      fetchNotes()
    }
    setLoading(false)
  }

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Project Notes</h2>

        {/* Add Note Form */}
        <form onSubmit={handleAddNote} className="mb-6">
          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Add a note
            </label>
            <textarea
              id="note"
              rows={3}
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
              placeholder="Write a note about this project..."
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </div>
          <div className="mt-3">
            <button
              type="submit"
              disabled={loading || !newNote.trim()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Note'}
            </button>
          </div>
        </form>

        {/* Notes List */}
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


