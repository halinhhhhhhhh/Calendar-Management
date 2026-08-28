import type { CalendarEvent, Deadline } from './types'

const dateStyle: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
}

const timeStyle: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
}

export function formatDate(value: Date): string {
  return new Intl.DateTimeFormat(undefined, dateStyle).format(value)
}

export function formatTime(value: Date): string {
  return new Intl.DateTimeFormat(undefined, timeStyle).format(value)
}

export function formatEventTime(value: string): string {
  return new Intl.DateTimeFormat(undefined, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function formatRange(start: string, end: string): string {
  return `${formatEventTime(start)} – ${formatEventTime(end)}`
}

export function toLocalInput(value: Date): string {
  const offset = value.getTimezoneOffset() * 60000
  return new Date(value.getTime() - offset).toISOString().slice(0, 16)
}

export function fromLocalInput(value: string): Date {
  return new Date(value)
}

export function isSameLocalDay(value: Date, reference: Date): boolean {
  return (
    value.getFullYear() === reference.getFullYear() &&
    value.getMonth() === reference.getMonth() &&
    value.getDate() === reference.getDate()
  )
}

export function getNextEvent(events: CalendarEvent[], now: Date): CalendarEvent | null {
  const timestamp = now.getTime()

  return (
    events
      .filter((event) => {
        const start = new Date(event.start)
        return (
          !event.completed &&
          isSameLocalDay(start, now) &&
          new Date(event.end).getTime() > timestamp
        )
      })
      .sort((first, second) => {
        const firstStart = new Date(first.start).getTime()
        const secondStart = new Date(second.start).getTime()
        if (firstStart !== secondStart) return firstStart - secondStart

        const firstEnd = new Date(first.end).getTime()
        const secondEnd = new Date(second.end).getTime()
        if (firstEnd !== secondEnd) return firstEnd - secondEnd

        return first.title.localeCompare(second.title)
      })[0] ?? null
  )
}

export function getTodayEvents(events: CalendarEvent[], now: Date): CalendarEvent[] {
  return events
    .filter((event) => isSameLocalDay(new Date(event.start), now))
    .sort((first, second) => {
      const firstStart = new Date(first.start).getTime()
      const secondStart = new Date(second.start).getTime()
      if (firstStart !== secondStart) return firstStart - secondStart

      const firstEnd = new Date(first.end).getTime()
      const secondEnd = new Date(second.end).getTime()
      if (firstEnd !== secondEnd) return firstEnd - secondEnd

      return first.title.localeCompare(second.title)
    })
}

export function getActiveDeadlines(deadlines: Deadline[]): Deadline[] {
  return deadlines
    .filter((deadline) => !deadline.completed)
    .sort((first, second) => {
      const firstDue = new Date(first.due).getTime()
      const secondDue = new Date(second.due).getTime()
      if (firstDue !== secondDue) return firstDue - secondDue

      return first.title.localeCompare(second.title)
    })
}

export function getDeadlineStatus(deadline: Deadline, now: Date): 'overdue' | 'due-today' | 'due-later' {
  const due = new Date(deadline.due)

  if (due.getTime() < now.getTime()) {
    return 'overdue'
  }

  return isSameLocalDay(due, now) ? 'due-today' : 'due-later'
}

export function getEventStatus(event: CalendarEvent, now: Date): 'done' | 'in-progress' | 'ended' | 'active' {
  if (event.completed) return 'done'

  const timestamp = now.getTime()
  const start = new Date(event.start).getTime()
  const end = new Date(event.end).getTime()

  if (timestamp < start) return 'active'
  if (timestamp < end) return 'in-progress'
  return 'ended'
}
