import { describe, expect, it } from 'vitest'
import { getActiveDeadlines, getNextEvent, getTodayEvents } from './time'
import type { CalendarEvent, Deadline } from './types'

function event(overrides: Partial<CalendarEvent>): CalendarEvent {
  return {
    id: overrides.id ?? 'event',
    title: overrides.title ?? 'Event',
    start: overrides.start ?? '2026-08-24T10:00:00.000Z',
    end: overrides.end ?? '2026-08-24T11:00:00.000Z',
    completed: overrides.completed ?? false,
    createdAt: overrides.createdAt ?? '2026-08-23T00:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-08-23T00:00:00.000Z',
  }
}

function deadline(overrides: Partial<Deadline>): Deadline {
  return {
    id: overrides.id ?? 'deadline',
    title: overrides.title ?? 'Deadline',
    due: overrides.due ?? '2026-08-24T10:00:00.000Z',
    completed: overrides.completed ?? false,
    createdAt: overrides.createdAt ?? '2026-08-23T00:00:00.000Z',
    updatedAt: overrides.updatedAt ?? '2026-08-23T00:00:00.000Z',
  }
}

describe('time selectors', () => {
  it('selects the next event by start, end, and title', () => {
    const now = new Date(2026, 7, 24, 9)
    const first = event({ id: 'a', title: 'A', start: '2026-08-24T10:00:00.000Z', end: '2026-08-24T11:00:00.000Z' })
    const second = event({ id: 'b', title: 'B', start: '2026-08-24T03:00:00.000Z', end: '2026-08-24T03:30:00.000Z' })
    const ended = event({ id: 'c', title: 'Ended', start: '2026-08-24T07:00:00.000Z', end: '2026-08-24T08:00:00.000Z' })
    const completed = event({ id: 'd', title: 'Done', start: '2026-08-24T08:00:00.000Z', end: '2026-08-24T09:30:00.000Z', completed: true })
    const tomorrow = event({ id: 'e', title: 'Tomorrow', start: '2026-08-25T08:00:00.000Z', end: '2026-08-25T09:00:00.000Z' })

    expect(getNextEvent([first, second, ended, completed, tomorrow], now)?.id).toBe('b')
  })

  it('groups and orders today events once', () => {
    const now = new Date(2026, 7, 24, 9)
    const first = event({ id: 'first', start: '2026-08-24T10:00:00.000Z', end: '2026-08-24T11:00:00.000Z' })
    const second = event({ id: 'second', start: '2026-08-24T09:00:00.000Z', end: '2026-08-24T10:00:00.000Z' })
    const other = event({ id: 'other', start: '2026-08-25T09:00:00.000Z', end: '2026-08-25T10:00:00.000Z' })

    expect(getTodayEvents([first, second, other], now).map((item) => item.id)).toEqual(['second', 'first'])
  })

  it('returns active deadlines ordered by due and title', () => {
    const first = deadline({ id: 'first', title: 'A', due: '2026-08-25T10:00:00.000Z' })
    const second = deadline({ id: 'second', title: 'B', due: '2026-08-24T10:00:00.000Z' })
    const completed = deadline({ id: 'completed', due: '2026-08-23T10:00:00.000Z', completed: true })

    expect(getActiveDeadlines([first, second, completed]).map((item) => item.id)).toEqual(['second', 'first'])
  })
})
