import { formatDate, formatTime } from '../time'
import { Button } from './Button'
import type { Theme } from '../types'

interface AppHeaderProps {
  now: Date
  theme: Theme
  onToggleTheme: () => void
}

export function AppHeader({ now, theme, onToggleTheme }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__identity">
        <img className="app-header__logo" src="/icons/app-icon.svg" alt="" width="44" height="44" />
        <div>
        <p className="app-header__eyebrow">Lockscreen Calendar</p>
        <h1 className="app-header__title">{formatDate(now)}</h1>
        <p className="app-header__clock">{formatTime(now)}</p>
        </div>
      </div>
      <Button type="button" variant="secondary" onClick={onToggleTheme} aria-label="Toggle dark mode">
        {theme === 'dark' ? 'Light' : 'Dark'}
      </Button>
    </header>
  )
}
