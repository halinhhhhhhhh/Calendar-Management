import { formatRange } from '../time'
import type { CalendarEvent } from '../types'
import { EmptyState } from './EmptyState'
import { StatusBadge } from './StatusBadge'

interface NextEventCardProps {
  event: CalendarEvent | null
  now: Date
}

export function NextEventCard({ event, now }: NextEventCardProps) {
  if (!event) {
    return (
      <section className="next-event next-event--empty" aria-labelledby="next-event-title">
        <div className="section-heading">
          <h2 id="next-event-title">Next event</h2>
        </div>
        <EmptyState message="No next event today." />
      </section>
    )
  }

  const status = new Date(event.start).getTime() <= now.getTime() ? 'in-progress' : 'upcoming'

  return (
    <section className="next-event" aria-labelledby="next-event-title">
      <div className="section-heading">
        <p className="section-heading__eyebrow">Next event</p>
        <h2 id="next-event-title">{event.title}</h2>
      </div>
      <p className="next-event__time">{formatRange(event.start, event.end)}</p>
      <StatusBadge status={status} />
    </section>
  )
}
