import { formatRange, getEventStatus } from '../time'
import type { CalendarEvent } from '../types'
import { Button } from './Button'
import { StatusBadge } from './StatusBadge'

interface EventCardProps {
  event: CalendarEvent
  now: Date
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  onComplete: (id: string) => void
}

export function EventCard({ event, now, onEdit, onDelete, onComplete }: EventCardProps) {
  const status = getEventStatus(event, now)

  return (
    <article className={`event-card event-card--${status}`}>
      <div className="event-card__main">
        <h4>{event.title}</h4>
        <p>{formatRange(event.start, event.end)}</p>
        <StatusBadge status={status} />
      </div>
      <div className="event-card__actions">
        <Button type="button" onClick={() => onComplete(event.id)} disabled={event.completed}>
          Complete
        </Button>
        <Button type="button" variant="ghost" onClick={() => onEdit(event.id)}>
          Edit
        </Button>
        <Button type="button" variant="danger" onClick={() => onDelete(event.id)}>
          Delete
        </Button>
      </div>
    </article>
  )
}
