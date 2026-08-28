import { Button } from './Button'
import type { Note } from '../types'

interface NoteCardProps {
  note: Note
  compact?: boolean
  onDelete: (id: string) => void
  onTogglePin: (id: string) => void
}

export function NoteCard({ note, compact = false, onDelete, onTogglePin }: NoteCardProps) {
  return (
    <article className={`note-card ${compact ? 'note-card--compact' : ''}`}>
      <p>{note.content}</p>
      {!compact ? (
        <div className="note-card__actions">
          <Button type="button" onClick={() => onTogglePin(note.id)}>
            {note.pinned ? 'Unpin' : 'Pin'}
          </Button>
          <Button type="button" variant="danger" onClick={() => onDelete(note.id)}>
            Delete
          </Button>
        </div>
      ) : (
        <span className="status status--pinned">Pinned</span>
      )}
    </article>
  )
}
