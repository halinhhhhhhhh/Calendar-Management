import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import App from './App'
import { STORAGE_KEY } from './storage'

describe('App', () => {
  beforeEach(() => {
    window.localStorage.clear()
    vi.restoreAllMocks()
  })

  it('renders required empty states', () => {
    render(<App />)

    expect(screen.getByText('No next event today.')).toBeInTheDocument()
    expect(screen.getByText('No events scheduled today.')).toBeInTheDocument()
    expect(screen.getByText('No active deadlines.')).toBeInTheDocument()
    expect(screen.getByText('No pinned notes.')).toBeInTheDocument()
    expect(screen.getByText('No notes yet.')).toBeInTheDocument()
  })

  it('adds and completes an event', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add event' }))
    await user.type(screen.getByLabelText(/Title/), 'Team sync')
    await user.click(screen.getByRole('button', { name: 'Save event' }))

    expect(screen.getAllByText('Team sync').length).toBeGreaterThanOrEqual(1)
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!).events).toHaveLength(1)

    await user.click(screen.getAllByRole('button', { name: 'Complete' })[0])

    expect(screen.getByText('Done')).toBeInTheDocument()
    expect(screen.getByText('No next event today.')).toBeInTheDocument()
  })

  it('adds and completes a deadline', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add deadline' }))
    await user.type(screen.getByLabelText(/Title/), 'Submit assignment')
    await user.type(screen.getByLabelText(/Due date and time/), '2026-08-25T10:00')
    await user.click(screen.getByRole('button', { name: 'Save deadline' }))

    expect(screen.getByText('Submit assignment')).toBeInTheDocument()

    await user.click(screen.getAllByRole('button', { name: 'Complete' })[0])

    expect(screen.getByText('No active deadlines.')).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!).deadlines[0].completed).toBe(true)
  })

  it('adds, pins, unpins, and deletes a note', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: 'Add note' }))
    await user.type(screen.getByLabelText(/Content/), 'Call advisor')
    await user.click(screen.getAllByRole('button', { name: 'Add note' }).at(-1)!)

    await user.click(screen.getByRole('button', { name: 'Pin' }))
    expect(screen.getByText('Pinned')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Unpin' }))
    expect(screen.getByText('No pinned notes.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))
    expect(screen.getByText('No notes yet.')).toBeInTheDocument()
    expect(JSON.parse(window.localStorage.getItem(STORAGE_KEY)!).notes).toHaveLength(0)
  })

  it('shows corrupt storage state without deleting data', () => {
    window.localStorage.setItem(STORAGE_KEY, '{corrupt')
    render(<App />)

    expect(screen.getByText('Saved data is invalid. It was ignored, and nothing was deleted.')).toBeInTheDocument()
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe('{corrupt')
  })
})
