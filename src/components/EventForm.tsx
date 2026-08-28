import { useState } from 'react'
import type { FormEvent } from 'react'
import { toLocalInput } from '../time'
import { Button } from './Button'
import { Field } from './Field'

export interface EventFormValues {
  title: string
  start: string
  end: string
}

interface EventFormProps {
  mode: 'create' | 'edit'
  initialValues: EventFormValues
  saving: boolean
  storageAvailable: boolean
  onSubmit: (values: EventFormValues) => void
  onCancel: () => void
}

export function EventForm({
  mode,
  initialValues,
  saving,
  storageAvailable,
  onSubmit,
  onCancel,
}: EventFormProps) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<{ title?: string; start?: string; end?: string; order?: string }>({})

  function handleSubmit(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault()
    const nextErrors: typeof errors = {}

    if (!values.title.trim()) {
      nextErrors.title = 'This field is required.'
    }

    const start = new Date(values.start)
    const end = new Date(values.end)

    if (!values.start || Number.isNaN(start.getTime())) {
      nextErrors.start = 'Enter a valid date and time.'
    }

    if (!values.end || Number.isNaN(end.getTime())) {
      nextErrors.end = 'Enter a valid date and time.'
    }

    if (!nextErrors.start && !nextErrors.end && end.getTime() <= start.getTime()) {
      nextErrors.order = 'End time must be after start time.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      title: values.title.trim(),
      start: start.toISOString(),
      end: end.toISOString(),
    })
  }

  function handleStartChange(value: string) {
    setValues((current) => {
      const start = new Date(value)
      if (Number.isNaN(start.getTime())) {
        return { ...current, start: value }
      }

      const defaultEnd = new Date(start.getTime() + 60000)
      return {
        ...current,
        start: value,
        end: mode === 'create' ? toLocalInput(defaultEnd) : current.end,
      }
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3>{mode === 'create' ? 'Add event' : 'Edit event'}</h3>
      <Field label="Title" error={errors.title}>
        <input
          value={values.title}
          onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
          disabled={saving || !storageAvailable}
        />
      </Field>
      <Field label="Start time" error={errors.start}>
        <input
          type="datetime-local"
          value={values.start}
          onChange={(event) => handleStartChange(event.target.value)}
          disabled={saving || !storageAvailable}
        />
      </Field>
      <Field label="End time" error={errors.end ?? errors.order}>
        <input
          type="datetime-local"
          value={values.end}
          onChange={(event) => setValues((current) => ({ ...current, end: event.target.value }))}
          disabled={saving || !storageAvailable}
        />
      </Field>
      {!storageAvailable ? (
        <p className="form__storage-error" role="alert">
          Local storage is unavailable. Your changes cannot be saved.
        </p>
      ) : null}
      <div className="form__actions">
        <Button type="submit" variant="primary" disabled={saving || !storageAvailable}>
          {saving ? 'Saving…' : 'Save event'}
        </Button>
        <Button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
