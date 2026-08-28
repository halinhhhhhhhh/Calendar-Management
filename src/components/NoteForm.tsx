import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from './Button'
import { Field } from './Field'

interface NoteFormProps {
  saving: boolean
  storageAvailable: boolean
  onSubmit: (content: string) => void
  onCancel: () => void
}

export function NoteForm({ saving, storageAvailable, onSubmit, onCancel }: NoteFormProps) {
  const [content, setContent] = useState('')
  const [error, setError] = useState<string>()

  function handleSubmit(submission: FormEvent<HTMLFormElement>) {
    submission.preventDefault()

    if (!content.trim()) {
      setError('This field is required.')
      return
    }

    setError(undefined)
    onSubmit(content.trim())
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <h3>Add note</h3>
      <Field label="Content" error={error}>
        <textarea
          value={content}
          onChange={(event) => setContent(event.target.value)}
          disabled={saving || !storageAvailable}
          rows={4}
        />
      </Field>
      {!storageAvailable ? (
        <p className="form__storage-error" role="alert">
          Local storage is unavailable. Your changes cannot be saved.
        </p>
      ) : null}
      <div className="form__actions">
        <Button type="submit" variant="primary" disabled={saving || !storageAvailable}>
          {saving ? 'Saving…' : 'Add note'}
        </Button>
        <Button type="button" onClick={onCancel} disabled={saving}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
