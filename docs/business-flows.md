# Lockscreen Calendar — MVP Business Flows

## 1. Flow conventions

- Actor: the single local user.
- Trigger: the action or event that starts the flow.
- Preconditions: conditions that must already be true.
- Main flow: the expected successful path.
- Alternative flow: a valid non-primary path.
- Error flow: a path caused by invalid input, unavailable storage, or operation failure.
- Expected result: the observable final state.

## BF-01 — Open app

**Actor:** Local user

**Trigger:** The user opens the app in a supported browser.

**Preconditions:**

- The app is deployed as an MVP frontend.
- A browser supported by React and `localStorage` is available.

**Main flow:**

1. The app starts in loading state.
2. The app reads `lockscreen-calendar:data:v1` from `localStorage`.
3. The app validates events, deadlines, and notes.
4. Valid data is loaded into the dashboard.
5. The app captures the browser's current date, time, and time zone.
6. The app renders current date, current time, next event, today's events, active deadlines, and pinned notes.
7. The app starts the recurring clock update and listens for browser focus.

**Alternative flow:**

- If no stored data exists, the app starts with an empty workspace and displays the required empty states.
- If stored data exists but contains no current-day records, the dashboard renders with its relevant empty states.

**Error flow:**

- If `localStorage` is unavailable, the app displays “Local storage is unavailable. Your changes cannot be saved.” and allows dashboard viewing without claiming persistence.
- If stored data is corrupt or invalid, the app rejects the entire payload, displays “Saved data is invalid. It was ignored, and nothing was deleted.”, and continues with an empty workspace.

**Expected result:** The dashboard is usable, shows the correct browser date/time, and presents valid local data or the applicable storage/empty states.

## BF-02 — View next event

**Actor:** Local user

**Trigger:** The dashboard renders or the clock updates.

**Preconditions:**

- The app has loaded a valid local workspace, or an empty workspace after a storage error.
- The browser date and time are available.

**Main flow:**

1. The app filters events whose start date is today.
2. The app removes completed events.
3. The app removes events whose end time is not strictly later than the current time.
4. The app sorts remaining events by start time, end time, then title.
5. The app selects the first event.
6. The app displays it as “NEXT EVENT” with title, start–end time, and “In progress” or “Upcoming”.

**Alternative flow:**

- If an event is currently in progress, it remains eligible and is shown with “In progress”.
- If several events have the same start time, the earliest end time and then title determine selection.

**Error flow:**

- If no eligible event exists, the app does not throw an error; it displays “No next event today.”

**Expected result:** The dashboard shows the single eligible next event according to BR-05 or a clear empty state.

## BF-03 — View today's events

**Actor:** Local user

**Trigger:** The dashboard renders or the clock updates.

**Preconditions:**

- Valid local event data is available.
- The browser date and time are available.

**Main flow:**

1. The app selects every event whose start date equals the current browser date.
2. The app sorts by start time, end time, then title.
3. The app displays each event once with title, time, status, and available actions.
4. Completed events remain visible with “Done”.

**Alternative flow:**

- If an event starts today and ends tomorrow, it remains grouped under today.
- If the date rolls over at midnight, the list is recalculated on the next clock update.

**Error flow:**

- If no event starts today, the app displays “No events scheduled today.”

**Expected result:** Today's planning list is complete, sorted, and includes completed events with visible completed state.

## BF-04 — Add event

**Actor:** Local user

**Trigger:** The user selects “Add event”.

**Preconditions:**

- The event form can be opened.
- Event title, start time, and end time are available for input.

**Main flow:**

1. The user opens the event form.
2. The user enters a non-empty title.
3. The user enters a valid start date-time.
4. The user enters a valid end date-time later than the start.
5. The user selects “Save event”.
6. The app validates the values.
7. The app creates an event with a unique ID, ISO start/end values, and `completed: false`.
8. The app saves the complete workspace to `localStorage`.
9. The form closes and Today's Events updates.
10. Next Event updates if the new event qualifies.

**Alternative flow:**

- The user may save an event with a past or current date-time if all validation rules pass.
- The user may cancel before submission; no data changes.

**Error flow:**

- Blank title: show “This field is required.” and reject submission.
- Invalid date-time: show “Enter a valid date and time.” and reject submission.
- End not after start: show “End time must be after start time.” and reject submission.
- Storage write failure: show the storage failure message, do not claim success, and preserve the last valid visible workspace.

**Expected result:** A valid event is persisted, displayed in the correct day list, and eligible for Next Event when applicable.

## BF-05 — Edit event

**Actor:** Local user

**Trigger:** The user selects “Edit” on an event.

**Preconditions:**

- At least one stored event exists.
- The event is visible in Today's Events.

**Main flow:**

1. The app opens the event form in edit mode with the selected event values.
2. The user changes title, start time, or end time.
3. The user selects “Save event”.
4. The app validates the complete edited event.
5. The app updates `updatedAt`.
6. The app saves the workspace to `localStorage`.
7. The app closes edit mode and refreshes Today's Events and Next Event.

**Alternative flow:**

- The user may cancel edit mode; the original event remains unchanged.
- If the edited start date is no longer today, the event disappears from Today's Events after a successful save.

**Error flow:**

- Invalid title/date-times or incorrect time order are rejected with the same messages as BF-04.
- Storage failure preserves the last valid visible workspace and reports that changes cannot be saved.

**Expected result:** Only the selected event changes; sorting and derived displays update according to the edited values.

## BF-06 — Delete event

**Actor:** Local user

**Trigger:** The user selects “Delete” on an event.

**Preconditions:**

- At least one stored event exists.
- The event is visible in the dashboard.

**Main flow:**

1. The app asks the user to confirm deletion.
2. The user confirms.
3. The app removes the event from the workspace.
4. The app saves the workspace without the event to `localStorage`.
5. The app removes the event from Today's Events and Next Event if applicable.

**Alternative flow:**

- The user cancels confirmation; the event remains unchanged.

**Error flow:**

- Storage failure preserves the last valid visible workspace and shows “The action failed. Please try again.”

**Expected result:** The deleted event is no longer visible after refresh and no trash/undo state is created.

## BF-07 — Complete event

**Actor:** Local user

**Trigger:** The user selects “Complete” on an uncompleted event.

**Preconditions:**

- At least one uncompleted event exists.

**Main flow:**

1. The user selects “Complete”.
2. The app sets `completed` to true and updates `updatedAt`.
3. The app saves the workspace to `localStorage`.
4. The event remains in Today's Events with “Done”.
5. The event becomes ineligible for Next Event.

**Alternative flow:**

- If the event is already completed, the Complete action is unavailable.

**Error flow:**

- Storage failure preserves the last valid visible workspace and reports the operation failure.

**Expected result:** The completed state persists after reload, remains visible in today's list, and does not become the next event.

## BF-08 — Add note

**Actor:** Local user

**Trigger:** The user selects the note creation action.

**Preconditions:**

- The note form can be opened.

**Main flow:**

1. The user opens the note form.
2. The user enters non-whitespace text.
3. The user selects “Add note”.
4. The app trims leading and trailing whitespace and validates the result.
5. The app creates a note with a unique ID and `pinned: false`.
6. The app saves the workspace to `localStorage`.
7. The note appears in All Notes and the form clears.

**Alternative flow:**

- The user cancels; no note is created.

**Error flow:**

- Blank or whitespace-only content: show “This field is required.” and reject submission.
- Storage failure preserves the last valid visible workspace and reports that changes cannot be saved.

**Expected result:** A valid note is stored and manageable in All Notes.

## BF-09 — Delete note

**Actor:** Local user

**Trigger:** The user selects “Delete” on a note.

**Preconditions:**

- At least one stored note exists.

**Main flow:**

1. The app asks the user to confirm deletion.
2. The user confirms.
3. The app removes the note.
4. The app saves the workspace to `localStorage`.
5. The note disappears from Pinned Notes if pinned and from All Notes.

**Alternative flow:**

- The user cancels confirmation; the note remains unchanged.

**Error flow:**

- Storage failure preserves the last valid visible workspace and shows the operation failure.

**Expected result:** The note is no longer visible or persisted after reload, with no trash/undo state.

## BF-10 — Pin note

**Actor:** Local user

**Trigger:** The user selects “Pin” on an unpinned note.

**Preconditions:**

- At least one unpinned stored note exists.

**Main flow:**

1. The user selects “Pin”.
2. The app sets `pinned` to true and updates `updatedAt`.
3. The app saves the workspace to `localStorage`.
4. The note appears in Pinned Notes with “Pinned”.
5. All Notes orders pinned notes before unpinned notes.

**Alternative flow:**

- If several notes are pinned, Pinned Notes orders them by newest creation time first.

**Error flow:**

- Storage failure preserves the last valid visible workspace and reports the operation failure.

**Expected result:** The note remains stored, its pinned state persists after reload, and it is visible in the pinned presentation.

## BF-11 — Unpin note

**Actor:** Local user

**Trigger:** The user selects “Unpin” on a pinned note.

**Preconditions:**

- At least one pinned stored note exists.

**Main flow:**

1. The user selects “Unpin”.
2. The app sets `pinned` to false and updates `updatedAt`.
3. The app saves the workspace to `localStorage`.
4. The note immediately disappears from Pinned Notes.
5. The note remains visible and manageable in All Notes.

**Alternative flow:**

- None. MVP does not provide automatic unpinning.

**Error flow:**

- Storage failure preserves the last valid visible workspace and reports the operation failure.

**Expected result:** The unpinned state persists after reload and the note remains available in All Notes.

## BF-12 — Add deadline

**Actor:** Local user

**Trigger:** The user selects the deadline creation action.

**Preconditions:**

- The deadline form can be opened.

**Main flow:**

1. The user opens the deadline form.
2. The user enters a non-empty title.
3. The user enters a valid due date-time.
4. The user selects “Save deadline”.
5. The app validates the values.
6. The app creates a deadline with `completed: false`.
7. The app saves the workspace to `localStorage`.
8. The active deadline list updates and sorts by due date-time then title.

**Alternative flow:**

- Past, current, and future due date-times are all valid.
- The user may cancel; no deadline is created.

**Error flow:**

- Blank title: show “This field is required.” and reject submission.
- Invalid due date-time: show “Enter a valid date and time.” and reject submission.
- Storage failure preserves the last valid visible workspace and reports that changes cannot be saved.

**Expected result:** A valid active deadline is persisted and displayed in the approved order.

## BF-13 — Complete deadline

**Actor:** Local user

**Trigger:** The user selects “Complete” on an active deadline.

**Preconditions:**

- At least one uncompleted deadline exists.

**Main flow:**

1. The user selects “Complete”.
2. The app sets `completed` to true and updates `updatedAt`.
3. The app saves the workspace to `localStorage`.
4. The deadline disappears from the active deadline list.

**Alternative flow:**

- If other deadlines remain active, they remain visible and retain their approved order.

**Error flow:**

- Storage failure preserves the last valid visible workspace and reports the operation failure.

**Expected result:** The completed deadline remains stored but is hidden from the dashboard and its completed state persists after reload.

## BF-14 — Toggle light/dark mode

**Actor:** Local user

**Trigger:** The user selects the theme control.

**Preconditions:**

- The dashboard is rendered.

**Main flow:**

1. The app initializes from the browser's preferred color scheme.
2. The user toggles light/dark mode.
3. The app switches semantic CSS custom properties.
4. Event, deadline, and note data remain unchanged.

**Alternative flow:**

- If no browser preference exists, the app defaults to light mode.

**Error flow:**

- Theme switching failure is out of scope because this is a local UI-only operation.

**Expected result:** The selected theme is readable for the current session and is not persisted after reload.

## BF-14A — Edit deadline

**Actor:** Local user

**Trigger:** The user selects “Edit” on an active deadline.

**Preconditions:**

- At least one active deadline exists.

**Main flow:**

1. The app opens the deadline form in edit mode with the selected title and due date-time.
2. The user changes one or both values.
3. The user saves.
4. The app validates title and due date-time.
5. The app updates the deadline and `updatedAt`.
6. The app persists the complete workspace.
7. The deadline list reorders and its status recalculates.

**Alternative flow:**

- Cancel returns to the dashboard without changing the deadline.

**Error flow:**

- Blank title or invalid due date-time is rejected.
- If storage fails, the last valid visible workspace is preserved.

**Expected result:** Only the selected deadline changes and the valid edit persists.

## BF-14B — Delete deadline

**Actor:** Local user

**Trigger:** The user selects “Delete” on a stored deadline.

**Preconditions:**

- A stored deadline is reachable for management.

**Main flow:**

1. The app requests confirmation.
2. The user confirms.
3. The app removes the deadline.
4. The app persists the workspace without the deadline.
5. The active deadline list updates.

**Alternative flow:**

- Cancel preserves the deadline.

**Error flow:**

- Storage failure preserves the last valid visible workspace.

**Expected result:** The deleted deadline no longer returns after reload and no trash/undo state is created.
