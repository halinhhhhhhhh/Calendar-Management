# Lockscreen Calendar — MVP UI Specification

## 1. Design objective

Create a fast, readable, mobile-first daily dashboard. The interface prioritizes the next event, then today's schedule, active deadlines, and pinned notes. It must look and behave like a real product while remaining strictly within the confirmed MVP scope.

## 2. Information architecture

The MVP uses one dashboard page with internal product sections. It does not use routing or a separate page navigation system.

```text
Dashboard
├── Header
│   ├── Current date and time
│   └── Theme switch
├── Next Event card
├── Today's Events section
│   ├── Event list
│   └── Add/edit event form
├── Deadlines section
│   ├── Active deadline list
│   └── Add/edit deadline form
└── Notes section
    ├── Pinned note list
    ├── All notes management list
    └── Add note form
```

## 3. Layout

### Mobile baseline

- Target width: 360px.
- Content width: `100%`, with 16px horizontal page padding.
- Maximum content width: 480px on small screens.
- Vertical spacing between major sections: 24px.
- Primary action buttons occupy the full available width.
- All cards use 16px internal padding and 16px radius.
- Single-column layout only.

### Tablet

- Breakpoint: `min-width: 600px`.
- Maximum content width: 672px.
- Preserve one readable column.
- Keep forms and cards centered.

### Desktop

- Breakpoint: `min-width: 960px`.
- Maximum content width: 1024px.
- Use a 12-column grid:
  - Header spans all columns.
  - Next Event spans all columns.
  - Today's Events spans 7 columns.
  - Deadlines spans 5 columns.
  - Notes spans 5 columns and starts after the Today's Events row.
- Keep the mobile visual hierarchy and avoid dashboard-style information overload.

## 4. Visual hierarchy

1. Header identifies the current day and time.
2. Next Event is the strongest card, using larger title and time text.
3. Today's Events is the main planning list.
4. Deadlines are compact status rows.
5. Notes occupy the calmest visual zone.

## 5. Typography

### Font stack

```css
font-family:
  system-ui,
  -apple-system,
  BlinkMacSystemFont,
  "Segoe UI",
  Roboto,
  sans-serif;
```

### Scale

| Style | Size | Weight | Line height |
|---|---:|---:|---:|
| Dashboard title | 28px | 750 | 1.1 |
| Current time | 44px | 780 | 1 |
| Next event title | 24px | 730 | 1.2 |
| Section title | 18px | 700 | 1.25 |
| Card title | 16px | 650 | 1.35 |
| Body / input | 16px | 400 | 1.5 |
| Meta / status | 13px | 600 | 1.3 |

### Rules

- Minimum interactive and body text size is 16px.
- Do not use decorative fonts.
- Text color contrast must be at least 4.5:1 in both themes.
- Long titles wrap with `overflow-wrap: anywhere`.
- Time values use `tabular-nums`.

## 6. Color system

### Semantic light theme

```css
:root {
  color-scheme: light;
  --page-bg: #f4f5f7;
  --surface: #ffffff;
  --surface-muted: #f0f2f5;
  --text-primary: #17202c;
  --text-secondary: #5d6878;
  --border: #d8dde5;
  --accent: #1769d8;
  --accent-soft: #e6effc;
  --success: #16794b;
  --success-soft: #e4f5ec;
  --warning: #96620a;
  --warning-soft: #fff3d8;
  --danger: #bd2d43;
  --danger-soft: #fdecee;
}
```

### Semantic dark theme

```css
:root[data-theme="dark"] {
  color-scheme: dark;
  --page-bg: #0b0f15;
  --surface: #151b24;
  --surface-muted: #1c2430;
  --text-primary: #f0f4f8;
  --text-secondary: #a7b2c0;
  --border: #2b3543;
  --accent: #74a9ff;
  --accent-soft: #1b2b45;
  --success: #6dd59c;
  --success-soft: #132a20;
  --warning: #e4b45d;
  --warning-soft: #302413;
  --danger: #ff8da1;
  --danger-soft: #331620;
}
```

### Rules

- Color communicates status only; it does not decorate random elements.
- Event accent: blue.
- Deadline attention: warning amber.
- Completed/success: green.
- Destructive action: danger red.
- Do not introduce gradients, illustrations, or decorative imagery.

## 7. Spacing, radius, elevation

```css
:root {
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --radius-card: 16px;
  --radius-control: 10px;
  --shadow-card: 0 2px 8px rgba(15, 23, 42, 0.06);
}
```

- Page padding: 16px mobile, 24px desktop.
- Major sections: 24px apart.
- Card padding: 16px.
- Form field gap: 12px.
- Card radius: 16px.
- Input/button radius: 10px.
- Do not elevate cards beyond one subtle shadow.

## 8. Navigation and interaction

- There is no route-based navigation in MVP.
- The header contains only product title, clock, date, and theme switch.
- Each dashboard section header contains one clear primary action.
- Forms are rendered inside the related section.
- On mobile, opening a form scrolls the new form into view.
- Only one event form mode is visible at a time:
  - Create mode: “Add event”.
  - Edit mode: “Edit event”, prefilled with the selected event.
- The deadline form supports create mode and edit mode for an active deadline.
- Primary action buttons:
  - “Save event”.
  - “Save deadline”.
  - “Add note”.
- Secondary actions:
  - “Cancel”.
  - “Edit”.
  - “Delete”.
  - “Complete”.
  - “Pin” / “Unpin”.
  - “Light” / “Dark”.
- Every destructive action asks for confirmation before deleting.

## 9. Forms

### Event form

- Title: single-line text input, required.
- Start time: `datetime-local`, required.
- End time: `datetime-local`, required.
- Default end time is one minute after the selected start time when the start time changes.
- If the user changes start time so end time is no longer later, preserve the user's end value and show validation error on save.

### Deadline form

- Title: single-line text input, required.
- Due date-time: `datetime-local`, required.
- Past values are valid.
- Edit mode is prefilled with the selected active deadline.
- Cancel exits edit mode without changing the deadline.

### Note form

- Content: multi-line textarea, required.
- Minimum height: 88px.
- Submit preserves line breaks while preventing whitespace-only input.

### Shared form rules

- Labels are visible for every field.
- Required state is indicated in the label.
- Errors appear directly under the invalid field.
- Submit is disabled only while the submitted operation is processing.
- A successful create clears only that form and closes it when appropriate.
- A successful edit closes edit mode and returns the section to create-ready state.
- Invalid data is never saved.
- Operation errors appear near the relevant form or list.

## 10. State specification

### Loading state

Dashboard loading displays a centered, non-blocking status:

```text
Loading your schedule…
```

- Must be accessible while local data is read.
- Never blocks the page structure indefinitely.
- If loading fails, transition to the storage error state.

### Empty states

| Area | Message |
|---|---|
| Next event | “No next event today.” |
| Today's events | “No events scheduled today.” |
| Deadlines | “No active deadlines.” |
| Pinned notes | “No pinned notes.” |
| All notes | “No notes yet.” |

Each empty state uses muted text, a 1px dashed border, 16px padding, and 12px radius. It never uses a blank area.

### Error states

| Situation | Message |
|---|---|
| Storage unavailable | “Local storage is unavailable. Your changes cannot be saved.” |
| Corrupt storage | “Saved data is invalid. It was ignored, and nothing was deleted.” |
| Invalid title/content | “This field is required.” |
| Invalid time | “Enter a valid date and time.” |
| Invalid event order | “End time must be after start time.” |
| Operation failure | “The action failed. Please try again.” |

Error text uses `role="alert"` and danger color. It does not replace the entire dashboard.

### Form processing

- Buttons show “Saving…” while an operation is pending.
- Inputs remain visible and disabled during processing.
- Failure restores editable form values.

## 11. Event presentation

### Next Event card

- Label: “NEXT EVENT”.
- Title: event title.
- Time: start–end.
- Status:
  - In progress: “In progress”.
  - Upcoming: “Upcoming”.
- Empty state is centered and calm.

### Today's Events

- Every event whose start date is today appears once.
- Completed events remain visible with:
  - Strike-through title.
  - “Done” status.
  - Disabled Complete button.
- Active events use “Active” status.
- Ended events use “Ended” status.
- Primary list order:
  1. Start time.
  2. End time.
  3. Title.

## 12. Deadline presentation

- Active uncompleted deadlines are always visible: future, current, and overdue.
- Completed deadlines are hidden from the dashboard.
- Order:
  1. Due date-time.
  2. Title.
- Status:
  - Overdue: “Overdue”.
  - Due today: “Due today”.
  - Future: “Due later”.
- Overdue rows use warning styling.
- The complete action is available only for active deadlines.
- Edit and Delete actions are available for active deadlines.
- Deleting a deadline requires confirmation and has no undo.

## 13. Note presentation

- Pinned notes appear first in a compact “Pinned Notes” list.
- Every stored note remains reachable in “All Notes” for management.
- Pinned state:
  - Pinned rows show “Pinned” and “Unpin”.
  - Unpinned rows show “Pin”.
- Order in All Notes:
  1. Pinned first.
  2. Newest creation time first.
  3. Stable ID.
- Long text is clamped to two lines in Pinned Notes.
- All Notes may show up to four lines with `overflow-wrap: anywhere`.

## 14. Accessibility

- Minimum touch target: 44px high on mobile, 40px on desktop.
- Use semantic HTML elements.
- Every icon-only control has an accessible label; text labels are preferred.
- Forms support keyboard entry and visible focus.
- Status changes use `aria-live="polite"`.
- Alerts use `role="alert"`.
- Theme switch has the accessible name “Toggle dark mode”.
- Maintain visible focus with at least a 2px offset ring.

## 15. Business-flow alignment

- Adding a valid event updates Today's Events and may update Next Event.
- Editing an event updates all affected displays.
- Completing an event removes it from Next Event but keeps it visible in Today's Events.
- Deleting an event removes it from all displays after confirmation.
- Adding a deadline inserts it into the active deadline order.
- Completing a deadline removes it from the active list but retains its stored completed state.
- Adding a note makes it manageable in All Notes.
- Pinning a note adds it to Pinned Notes; unpinning removes it from that list.
- All successful operations persist to `localStorage`.

## 16. Out of scope for UI

- Figma.
- Calendar month screen.
- Settings page.
- External calendar integration UI.
- Account UI.
- Notification UI.
- Offline/PWA installation UI.
- Data import/export UI.
