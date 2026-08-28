export interface CalendarEvent {
  id: string
  title: string
  start: string
  end: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface Deadline {
  id: string
  title: string
  due: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

export interface Note {
  id: string
  content: string
  pinned: boolean
  createdAt: string
  updatedAt: string
}

export interface AppData {
  events: CalendarEvent[]
  deadlines: Deadline[]
  notes: Note[]
}

export type StorageStatus = 'loading' | 'ready' | 'unavailable' | 'corrupt'
export type Theme = 'light' | 'dark'
