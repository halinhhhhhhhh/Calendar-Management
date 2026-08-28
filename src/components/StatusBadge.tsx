const labels = {
  active: 'Active',
  ended: 'Ended',
  done: 'Done',
  'in-progress': 'In progress',
  upcoming: 'Upcoming',
  overdue: 'Overdue',
  'due-today': 'Due today',
  'due-later': 'Due later',
  pinned: 'Pinned',
} as const

export type Status = keyof typeof labels

export function StatusBadge({ status }: { status: Status }) {
  return <span className={`status status--${status}`}>{labels[status]}</span>
}
