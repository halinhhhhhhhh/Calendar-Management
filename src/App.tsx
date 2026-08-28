import { useCallback, useEffect, useMemo, useState } from 'react'
import { AppHeader } from './components/AppHeader'
import { DeadlineForm } from './components/DeadlineForm'
import { DeadlineRow } from './components/DeadlineRow'
import { EmptyState } from './components/EmptyState'
import { EventCard } from './components/EventCard'
import { EventForm } from './components/EventForm'
import type { EventFormValues } from './components/EventForm'
import { NoteCard } from './components/NoteCard'
import { NoteForm } from './components/NoteForm'
import { NextEventCard } from './components/NextEventCard'
import { getActiveDeadlines, getNextEvent, getTodayEvents, toLocalInput } from './time'
import { readStoredData, writeStoredData } from './storage'
import type { AppData, StorageStatus, Theme } from './types'

function createId(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [data, setData] = useState<AppData>({ events: [], deadlines: [], notes: [] })
  const [status, setStatus] = useState<StorageStatus>('loading')
  const [now, setNow] = useState(() => new Date())
  const [theme, setTheme] = useState<Theme>(() =>
    window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
  )
  const [operationError, setOperationError] = useState<string>()
  const [eventFormOpen, setEventFormOpen] = useState(false)
  const [editingEventId, setEditingEventId] = useState<string>()
  const [deadlineFormOpen, setDeadlineFormOpen] = useState(false)
  const [editingDeadlineId, setEditingDeadlineId] = useState<string>()
  const [noteFormOpen, setNoteFormOpen] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    try {
      setData(readStoredData())
      setStatus('ready')
    } catch (error) {
      setStatus(
        error instanceof SyntaxError || (error instanceof Error && error.message === 'Corrupt storage')
          ? 'corrupt'
          : 'unavailable',
      )
    }
  }, [])

  useEffect(() => {
    const minuteTimer = window.setInterval(() => setNow(new Date()), 60000)
    const focusHandler = () => setNow(new Date())
    window.addEventListener('focus', focusHandler)
    return () => {
      window.clearInterval(minuteTimer)
      window.removeEventListener('focus', focusHandler)
    }
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const updateData = useCallback(async (updater: (current: AppData) => AppData) => {
    setSaving(true)
    setOperationError(undefined)
    try {
      setData((current) => {
        const nextData = updater(current)
        writeStoredData(nextData)
        return nextData
      })
    } catch {
      setOperationError('The action failed. Please try again.')
    } finally {
      setSaving(false)
    }
  }, [])

  const nextEvent = useMemo(() => getNextEvent(data.events, now), [data.events, now])
  const todayEvents = useMemo(() => getTodayEvents(data.events, now), [data.events, now])
  const activeDeadlines = useMemo(() => getActiveDeadlines(data.deadlines), [data.deadlines])
  const pinnedNotes = useMemo(() => {
    return data.notes.filter((note) => note.pinned).sort((first, second) => second.createdAt.localeCompare(first.createdAt))
  }, [data.notes])
  const allNotes = useMemo(() => {
    return [...data.notes].sort((first, second) => {
      if (first.pinned !== second.pinned) return first.pinned ? -1 : 1
      const created = second.createdAt.localeCompare(first.createdAt)
      return created !== 0 ? created : first.id.localeCompare(second.id)
    })
  }, [data.notes])
  const editingEvent = data.events.find((event) => event.id === editingEventId)
  const editingDeadline = data.deadlines.find((deadline) => deadline.id === editingDeadlineId)
  const storageAvailable = status === 'ready' || status === 'corrupt'

  async function addEvent(values: EventFormValues) {
    const timestamp = new Date().toISOString()
    await updateData((current) => ({
      ...current,
      events: [...current.events, {
        id: createId(),
        ...values,
        completed: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      }],
    }))
    setEventFormOpen(false)
  }

  async function editEvent(id: string, values: EventFormValues) {
    await updateData((current) => ({
      ...current,
      events: current.events.map((event) => {
        return event.id === id ? { ...event, ...values, updatedAt: new Date().toISOString() } : event
      }),
    }))
    setEditingEventId(undefined)
  }

  async function deleteRecord(kind: 'event' | 'note', id: string) {
    const messages = {
      event: 'Delete this event permanently?',
      note: 'Delete this note permanently?',
    }
    if (!window.confirm(messages[kind])) return
    await updateData((current) => {
      return kind === 'event'
        ? { ...current, events: current.events.filter((event) => event.id !== id) }
        : { ...current, notes: current.notes.filter((note) => note.id !== id) }
    })
  }

  async function completeEvent(id: string) {
    await updateData((current) => ({
      ...current,
      events: current.events.map((event) => {
        return event.id === id ? { ...event, completed: true, updatedAt: new Date().toISOString() } : event
      }),
    }))
  }

  async function addDeadline(title: string, due: string) {
    const timestamp = new Date().toISOString()
    await updateData((current) => ({
      ...current,
      deadlines: [...current.deadlines, {
        id: createId(),
        title,
        due,
        completed: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      }],
    }))
    setDeadlineFormOpen(false)
  }

  async function editDeadline(id: string, values: { title: string; due: string }) {
    await updateData((current) => ({
      ...current,
      deadlines: current.deadlines.map((deadline) => {
        return deadline.id === id
          ? { ...deadline, ...values, updatedAt: new Date().toISOString() }
          : deadline
      }),
    }))
    setEditingDeadlineId(undefined)
  }

  async function deleteDeadline(id: string) {
    if (!window.confirm('Delete this deadline permanently?')) return

    await updateData((current) => ({
      ...current,
      deadlines: current.deadlines.filter((deadline) => deadline.id !== id),
    }))
    if (editingDeadlineId === id) setEditingDeadlineId(undefined)
  }

  async function completeDeadline(id: string) {
    await updateData((current) => ({
      ...current,
      deadlines: current.deadlines.map((deadline) => {
        return deadline.id === id ? { ...deadline, completed: true, updatedAt: new Date().toISOString() } : deadline
      }),
    }))
  }

  async function addNote(content: string) {
    const timestamp = new Date().toISOString()
    await updateData((current) => ({
      ...current,
      notes: [...current.notes, {
        id: createId(),
        content,
        pinned: false,
        createdAt: timestamp,
        updatedAt: timestamp,
      }],
    }))
    setNoteFormOpen(false)
  }

  async function togglePin(id: string) {
    await updateData((current) => ({
      ...current,
      notes: current.notes.map((note) => {
        return note.id === id ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() } : note
      }),
    }))
  }

  return (
    <main className="page">
      {status === 'loading' ? (
        <p className="loading-state" aria-live="polite">Loading your schedule…</p>
      ) : null}
      {status === 'unavailable' ? (
        <div className="alert" role="alert">Local storage is unavailable. Your changes cannot be saved.</div>
      ) : null}
      {status === 'corrupt' ? (
        <div className="alert" role="alert">Saved data is invalid. It was ignored, and nothing was deleted.</div>
      ) : null}
      {operationError ? <div className="alert" role="alert">{operationError}</div> : null}

      <AppHeader now={now} theme={theme} onToggleTheme={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <NextEventCard event={nextEvent} now={now} />

      <section className="section section--events" aria-labelledby="today-events-title">
        <div className="section-heading section-heading--row">
          <h2 id="today-events-title">Today's events</h2>
          {!eventFormOpen && !editingEvent ? (
            <button type="button" className="button button--primary" onClick={() => setEventFormOpen(true)}>Add event</button>
          ) : null}
        </div>
        <div className="card-list">
          {todayEvents.length === 0 ? <EmptyState message="No events scheduled today." /> : null}
          {todayEvents.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              now={now}
              onEdit={(id) => {
                setEventFormOpen(false)
                setEditingEventId(id)
              }}
              onDelete={(id) => deleteRecord('event', id)}
              onComplete={completeEvent}
            />
          ))}
        </div>
        {eventFormOpen ? (
          <EventForm
            mode="create"
            initialValues={{
              title: '',
              start: toLocalInput(now),
              end: toLocalInput(new Date(now.getTime() + 60000)),
            }}
            saving={saving}
            storageAvailable={storageAvailable}
            onSubmit={addEvent}
            onCancel={() => setEventFormOpen(false)}
          />
        ) : null}
        {editingEvent ? (
          <EventForm
            key={editingEvent.id}
            mode="edit"
            initialValues={{
              title: editingEvent.title,
              start: toLocalInput(new Date(editingEvent.start)),
              end: toLocalInput(new Date(editingEvent.end)),
            }}
            saving={saving}
            storageAvailable={storageAvailable}
            onSubmit={(values) => editEvent(editingEvent.id, values)}
            onCancel={() => setEditingEventId(undefined)}
          />
        ) : null}
      </section>

      <section className="section section--deadlines" aria-labelledby="deadlines-title">
        <div className="section-heading section-heading--row">
          <h2 id="deadlines-title">Deadlines</h2>
          {!deadlineFormOpen && !editingDeadline ? (
            <button type="button" className="button button--primary" onClick={() => setDeadlineFormOpen(true)}>Add deadline</button>
          ) : null}
        </div>
        <div className="list">
          {activeDeadlines.length === 0 ? <EmptyState message="No active deadlines." /> : null}
          {activeDeadlines.map((deadline) => (
            <DeadlineRow
              key={deadline.id}
              deadline={deadline}
              now={now}
              onComplete={completeDeadline}
              onEdit={(id) => {
                setDeadlineFormOpen(false)
                setEditingDeadlineId(id)
              }}
              onDelete={deleteDeadline}
            />
          ))}
        </div>
        {deadlineFormOpen ? (
          <DeadlineForm
            mode="create"
            initialValues={{ title: '', due: '' }}
            saving={saving}
            storageAvailable={storageAvailable}
            onSubmit={({ title, due }) => addDeadline(title, due)}
            onCancel={() => setDeadlineFormOpen(false)}
          />
        ) : null}
        {editingDeadline ? (
          <DeadlineForm
            key={editingDeadline.id}
            mode="edit"
            initialValues={{
              title: editingDeadline.title,
              due: toLocalInput(new Date(editingDeadline.due)),
            }}
            saving={saving}
            storageAvailable={storageAvailable}
            onSubmit={(values) => editDeadline(editingDeadline.id, values)}
            onCancel={() => setEditingDeadlineId(undefined)}
          />
        ) : null}
      </section>

      <section className="section section--notes" aria-labelledby="notes-title">
        <div className="section-heading section-heading--row">
          <h2 id="notes-title">Notes</h2>
          {!noteFormOpen ? (
            <button type="button" className="button button--primary" onClick={() => setNoteFormOpen(true)}>Add note</button>
          ) : null}
        </div>
        <h3 className="subsection-title">Pinned notes</h3>
        <div className="list">
          {pinnedNotes.length === 0 ? <EmptyState message="No pinned notes." /> : null}
          {pinnedNotes.map((note) => (
            <NoteCard key={note.id} note={note} compact onDelete={() => undefined} onTogglePin={() => undefined} />
          ))}
        </div>
        <h3 className="subsection-title">All notes</h3>
        <div className="list">
          {allNotes.length === 0 ? <EmptyState message="No notes yet." /> : null}
          {allNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={(id) => deleteRecord('note', id)} onTogglePin={togglePin} />
          ))}
        </div>
        {noteFormOpen ? (
          <NoteForm
            saving={saving}
            storageAvailable={storageAvailable}
            onSubmit={addNote}
            onCancel={() => setNoteFormOpen(false)}
          />
        ) : null}
      </section>
    </main>
  )
}
