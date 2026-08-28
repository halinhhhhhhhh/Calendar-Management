import { formatEventTime, getDeadlineStatus } from '../time'
import type { Deadline } from '../types'
import { Button } from './Button'
import { StatusBadge } from './StatusBadge'

interface DeadlineRowProps {
  deadline: Deadline
  now: Date
  onComplete: (id: string) => void
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

export function DeadlineRow({ deadline, now, onComplete, onEdit, onDelete }: DeadlineRowProps) {
  const status = getDeadlineStatus(deadline, now)

  return (
    <article className={`deadline-row deadline-row--${status}`}>
      <div>
        <h4>{deadline.title}</h4>
        <p>{formatEventTime(deadline.due)}</p>
      </div>
      <div className="deadline-row__side">
        <StatusBadge status={status} />
        <div className="deadline-row__actions">
          <Button type="button" onClick={() => onComplete(deadline.id)}>
            Complete
          </Button>
          <Button type="button" variant="ghost" onClick={() => onEdit(deadline.id)}>
            Edit
          </Button>
          <Button type="button" variant="danger" onClick={() => onDelete(deadline.id)}>
            Delete
          </Button>
        </div>
      </div>
    </article>
  )
}
