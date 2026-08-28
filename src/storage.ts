import type { AppData, CalendarEvent, Deadline, Note } from './types'

export const STORAGE_KEY = 'lockscreen-calendar:data:v1'

export const emptyData: AppData = {
  events: [],
  deadlines: [],
  notes: [],
}

export class StorageUnavailableError extends Error {
  constructor() {
    super('Local storage is unavailable.')
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function validText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function validDateTime(value: unknown): value is string {
  return typeof value === 'string' && !Number.isNaN(new Date(value).getTime())
}

function validEvent(value: unknown): value is CalendarEvent {
  return (
    isRecord(value) &&
    validText(value.id) &&
    validText(value.title) &&
    validDateTime(value.start) &&
    validDateTime(value.end) &&
    new Date(value.end).getTime() > new Date(value.start).getTime() &&
    typeof value.completed === 'boolean' &&
    validDateTime(value.createdAt) &&
    validDateTime(value.updatedAt)
  )
}

function validDeadline(value: unknown): value is Deadline {
  return (
    isRecord(value) &&
    validText(value.id) &&
    validText(value.title) &&
    validDateTime(value.due) &&
    typeof value.completed === 'boolean' &&
    validDateTime(value.createdAt) &&
    validDateTime(value.updatedAt)
  )
}

function validNote(value: unknown): value is Note {
  return (
    isRecord(value) &&
    validText(value.id) &&
    validText(value.content) &&
    typeof value.pinned === 'boolean' &&
    validDateTime(value.createdAt) &&
    validDateTime(value.updatedAt)
  )
}

export function parseStoredData(rawValue: string | null): AppData {
  if (rawValue === null) {
    return emptyData
  }

  const parsed: unknown = JSON.parse(rawValue)

  if (!isRecord(parsed)) {
    throw new Error('Corrupt storage')
  }

  const { events, deadlines, notes } = parsed

  if (
    !Array.isArray(events) ||
    !Array.isArray(deadlines) ||
    !Array.isArray(notes) ||
    !events.every(validEvent) ||
    !deadlines.every(validDeadline) ||
    !notes.every(validNote)
  ) {
    throw new Error('Corrupt storage')
  }

  return {
    events,
    deadlines,
    notes,
  }
}

export function readStoredData(): AppData {
  let rawValue: string | null

  try {
    rawValue = window.localStorage.getItem(STORAGE_KEY)
  } catch {
    throw new StorageUnavailableError()
  }

  return parseStoredData(rawValue)
}

export function writeStoredData(data: AppData): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch {
    throw new StorageUnavailableError()
  }
}
