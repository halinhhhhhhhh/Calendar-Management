import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from './Button'
import { Field } from './Field'

export interface DeadlineFormValues {
  title: string
  due: string
}

interface DeadlineFormProps {
  mode: 'create' | 'edit'
  initialValues: DeadlineFormValues
  saving: boolean
  storageAvailable: boolean
  onSubmit: (values: DeadlineFormValues) => void
  onCancel: () => void
}

export function DeadlineForm({ mode, initialValues, saving, storageAvailable, onSubmit, onCancel }: DeadlineFormProps) {
  const [values, setValues] = useState<DeadlineFormValues>(initialValues)
  const [errors, setErrors] = useState<{ title?: string; due?: string }>({})

  function handleSubmit(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault()
    const nextErrors: typeof errors = {}

    if (!values.title.trim()) {
      nextErrors.title = 'This field is required.'
    }

    if (!values.due || Number.isNaN(new Date(values.due).getTime())) {
      nextErrors.due = 'Enter a valid date and time.'
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    onSubmit({
      title: values.title.trim(),
      due: new Date(values.due).toISOString(),
    })
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3>{mode === 'create' ? 'Add deadline' : 'Edit deadline'}</h3>
      <Field label="Title" error={errors.title}>
        <input
          value={values.title}
          onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
          disabled={saving || !storageAvailable}
        />
      </Field>
      <Field label="Due date and time" error={errors.due}>
        <input
          type="datetime-local"
          value={values.due}
          onChange={(event) => setValues((current) => ({ ...current, due: event.target.value }))}
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
          {saving ? 'Saving…' : 'Save deadline'}
        </Button>
        <Button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
