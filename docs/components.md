# Lockscreen Calendar — Component Specification

## 1. Component tree

```text
App
├── ThemeProvider
│   └── DashboardPage
│       ├── AppHeader
│       │   ├── ClockBlock
│       │   └── ThemeToggle
│       ├── NextEventCard
│       ├── EventSection
│       │   ├── SectionHeader
│       │   ├── EmptyState
│       │   ├── EventCard
│       │   │   ├── StatusBadge
│       │   │   └── EventActions
│       │   └── EventForm
│       ├── DeadlineSection
│       │   ├── SectionHeader
│       │   ├── EmptyState
│       │   ├── DeadlineRow
│       │   └── DeadlineForm
│       └── NoteSection
           ├── SectionHeader
           ├── EmptyState
           ├── PinnedNoteList
           ├── NoteCard
           ├── AllNoteList
           └── NoteForm
```

## 2. Shared primitives

### `StatusBadge`

| Prop | Type | Required | Description |
|---|---|---|---|
| `status` | `'active' | 'ended' | 'done' | 'in-progress' | 'upcoming' | 'overdue' | 'due-today' | 'due-later' | 'pinned'` | yes | Status meaning |

Renders a compact status label with semantic token styling.

### `EmptyState`

| Prop | Type | Required | Description |
|---|---|---|---|
| `message` | `string` | yes | Empty-state message |

Renders a bordered muted message.

### `SectionHeader`

| Prop | Type | Required | Description |
|---|---|---|---|
| `title` | `string` | yes | Section title |
| `actionLabel` | `string` | yes | Primary action label |
| `onAction` | `() => void` | yes | Opens the section form |

### `Field`

| Prop | Type | Required | Description |
|---|---|---|---|
| `label` | `string` | yes | Visible field label |
| `error` | `string | undefined` | no | Field-level error |
| `children` | `ReactNode` | yes | Input control |

Provides label, control wrapper, and error placement.

### `Button`

| Prop | Type | Required | Description |
|---|---|---|---|
| `variant` | `'primary' | 'secondary' | 'danger' | 'ghost'` | no | Visual variant |
| `type` | `'button' | 'submit'` | no | Button type |
| `disabled` | `boolean` | no | Disabled state |
| `onClick` | `() => void` | no | Click behavior |
| `children` | `ReactNode` | yes | Button label |

Never use links for actions.

## 3. Application components

### `App`

Responsibilities:

- Own events, deadlines, notes, storage status, and loading state.
- Read and validate `localStorage` on mount.
- Save validated changes back to `localStorage`.
- Recalculate current date/time every minute and on window focus.
- Compose the dashboard sections.

### `ThemeProvider`

Responsibilities:

- Follow the browser's preferred color scheme by default.
- Toggle `data-theme` between `light` and `dark`.
- Keep selection in React state only.

### `DashboardPage`

Responsibilities:

- Apply page layout and responsive grid.
- Render loading, storage alerts, and dashboard sections.

### `AppHeader`

Responsibilities:

- Display product identity.
- Show current date and current time.
- Provide the theme toggle.

### `ClockBlock`

| Prop | Type | Required | Description |
|---|---|---|---|
| `now` | `Date` | yes | Current browser date-time |

Formats date and time with `Intl.DateTimeFormat`.

### `ThemeToggle`

| Prop | Type | Required | Description |
|---|---|---|---|
| `theme` | `'light' | 'dark'` | yes | Current theme |
| `onToggle` | `() => void` | yes | Switches theme |

### `NextEventCard`

| Prop | Type | Required | Description |
|---|---|---|---|
| `event` | `CalendarEvent | null` | yes | Eligible next event or null |
| `now` | `Date` | yes | Current time |

Selection contract:

- Only events starting today.
- Only uncompleted events.
- Event end must be strictly later than now.
- Order by start, end, title.

### `EventSection`

Responsibilities:

- Render today's events.
- Control create/edit form visibility.
- Pass validated actions to parent handlers.

### `EventCard`

| Prop | Type | Required | Description |
|---|---|---|---|
| `event` | `CalendarEvent` | yes | Event record |
| `now` | `Date` | yes | Current browser time |
| `onEdit` | `(id: string) => void` | yes | Opens edit form |
| `onDelete` | `(id: string) => void` | yes | Requests confirmed deletion |
| `onComplete` | `(id: string) => void` | yes | Marks complete |

### `EventForm`

| Prop | Type | Required | Description |
|---|---|---|---|
| `mode` | `'create' | 'edit'` | yes | Form mode |
| `initialValues` | `EventFormValues` | yes | Default or selected event values |
| `saving` | `boolean` | yes | Submit pending state |
| `storageAvailable` | `boolean` | yes | Whether persistence is available |
| `onSubmit` | `(values: EventFormValues) => void` | yes | Submits validated input |
| `onCancel` | `() => void` | yes | Cancels create/edit mode |

Validation:

- Required title.
- Required valid start/end.
- End strictly after start.

### `DeadlineSection`

Responsibilities:

- Render active deadlines.
- Control create-form visibility.
- Pass validated actions to parent handlers.

### `DeadlineRow`

| Prop | Type | Required | Description |
|---|---|---|---|
| `deadline` | `Deadline` | yes | Deadline record |
| `now` | `Date` | yes | Current browser time |
| `onComplete` | `(id: string) => void` | yes | Marks complete |
| `onEdit` | `(id: string) => void` | yes | Opens edit form |
| `onDelete` | `(id: string) => void` | yes | Requests confirmed deletion |

### `DeadlineForm`

| Prop | Type | Required | Description |
|---|---|---|---|
| `mode` | `'create' | 'edit'` | yes | Form mode |
| `initialValues` | `DeadlineFormValues` | yes | Default or selected deadline values |
| `saving` | `boolean` | yes | Submit pending state |
| `storageAvailable` | `boolean` | yes | Whether persistence is available |
| `onSubmit` | `(values: DeadlineFormValues) => void` | yes | Submits validated input |
| `onCancel` | `() => void` | yes | Closes form |

Validation:

- Required title.
- Required valid due date-time.

### `NoteSection`

Responsibilities:

- Render pinned presentation and all-note management.
- Control create-form visibility.
- Pass actions to parent handlers.

### `PinnedNoteList`

| Prop | Type | Required | Description |
|---|---|---|---|
| `notes` | `Note[]` | yes | Pinned notes only |

### `AllNoteList`

| Prop | Type | Required | Description |
|---|---|---|---|
| `notes` | `Note[]` | yes | Every stored note |
| `onDelete` | `(id: string) => void` | yes | Requests confirmed deletion |
| `onTogglePin` | `(id: string) => void` | yes | Pins or unpins |

### `NoteCard`

| Prop | Type | Required | Description |
|---|---|---|---|
| `note` | `Note` | yes | Note record |
| `compact` | `boolean` | no | Two-line presentation for pinned list |
| `onDelete` | `(id: string) => void` | yes | Requests confirmed deletion |
| `onTogglePin` | `(id: string) => void` | yes | Pins or unpins |

### `NoteForm`

| Prop | Type | Required | Description |
|---|---|---|---|
| `saving` | `boolean` | yes | Submit pending state |
| `storageAvailable` | `boolean` | yes | Whether persistence is available |
| `onSubmit` | `(content: string) => void` | yes | Submits non-blank content |
| `onCancel` | `() => void` | yes | Closes form |

## 4. Data contracts

```ts
interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Deadline {
  id: string;
  title: string;
  due: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Note {
  id: string;
  content: string;
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}
```

- `id` uses `crypto.randomUUID()`.
- Date-time strings are ISO 8601.
- Form values use `datetime-local` strings.

## 5. State model

```ts
interface AppData {
  events: CalendarEvent[];
  deadlines: Deadline[];
  notes: Note[];
}

type StorageStatus =
  | 'loading'
  | 'ready'
  | 'unavailable'
  | 'corrupt';
```

State belongs to `App`; presentation components remain stateless except for local form and visibility state.

## 6. Persistence contract

- Storage key: `lockscreen-calendar:data:v1`.
- Read once on mount.
- Validate every record and field before use.
- Reject the entire payload if any record is invalid.
- Corrupt data is ignored without deletion.
- Save the complete validated state after each successful operation.
- Do not persist theme state.

## 7. Styling contract

- Use global CSS with custom properties.
- Component class names follow `component`, `component__element`, and `component--modifier`.
- No CSS-in-JS and no external UI framework.
- All colors reference semantic custom properties.
- Responsive rules are mobile-first.

## 8. Accessibility contract

- Main landmark: `<main>`.
- Header landmark: `<header>`.
- Each dashboard section uses `<section aria-labelledby="...">`.
- Forms use `<form>` and explicit labels.
- Status updates use polite live regions.
- Errors use alert roles.
- Buttons expose their purpose through visible text.
