# Lockscreen Calendar — MVP Business Requirements

## 1. Actors

### Local user

A single person using the app in one browser on one device. In MVP, the app does not identify users, separate accounts, or synchronize data across devices.

## 2. Functional requirements

### FR-01 — Dashboard

The app shall provide a main dashboard for viewing current date, current time, the next event, today's events, deadlines, and pinned notes.

### FR-02 — Current date display

The app shall display the current date according to the user's browser settings.

### FR-03 — Current time display

The app shall display the current time according to the user's browser settings.

### FR-04 — Next event

The app shall display the next event that has not yet ended, provided at least one such event exists today.

### FR-05 — Today's events

The app shall display all events scheduled for the current date.

### FR-06 — Event creation

The app shall allow the user to create an event with a title, start time, and end time.

### FR-07 — Event editing

The app shall allow the user to edit an existing event's title, start time, and end time.

### FR-08 — Event deletion

The app shall allow the user to delete an existing event.

### FR-09 — Event completion

The app shall allow the user to mark an event as completed.

### FR-10 — Deadline display

The app shall display deadlines that require attention.

### FR-11 — Deadline creation

The app shall allow the user to create a deadline with a title and due date-time.

### FR-12 — Deadline completion

The app shall allow the user to mark a deadline as completed.

### FR-21 — Deadline editing

The app shall allow the user to edit an active deadline's title and due date-time.

### FR-22 — Deadline deletion

The app shall allow the user to delete a stored deadline, whether active or completed.

### FR-13 — Note creation

The app shall allow the user to create a note with text content.

### FR-14 — Note deletion

The app shall allow the user to delete a note.

### FR-15 — Note pinning

The app shall allow the user to pin a note.

### FR-16 — Note unpinning

The app shall allow the user to unpin a note.

### FR-17 — Pinned note display

The app shall display notes currently marked as pinned in a priority presentation. The note management area shall keep every stored note reachable for deletion and pin/unpin actions, with pinned notes ordered before unpinned notes.

### FR-18 — Local persistence

The app shall persist events, deadlines, notes, and their completion states in `localStorage`.

### FR-19 — Responsive dashboard

The app shall present the dashboard in a readable mobile-first layout that also works on desktop.

### FR-20 — Simple theme mode

The app shall provide a simple light and dark display mode. The selected mode is session-only and is not persisted in MVP.

## 3. Business rules

### BR-01 — Single-user local workspace

The MVP supports one local user per browser/device. It shall not create, request, or infer multiple user identities.

### BR-02 — Event required fields

An event must have a non-empty title, a valid start time, and a valid end time.

### BR-03 — Event time order

An event's end time must be later than its start time.

### BR-04 — Event scheduling day

An event belongs to the date identified by its start time.

### BR-05 — Next event definition

The next event is the uncompleted, not-deleted event whose end time is in the future and whose start date is today, ordered by the earliest start time, then earliest end time, then title.

### BR-06 — Completed events

Completed events remain stored and visible in the current date's event list with a completed state. Completion does not delete an event.

### BR-07 — Deadline required fields

A deadline must have a non-empty title and a valid due date-time. Deadlines may be created with a past due date-time.

### BR-08 — Deadline attention baseline

An uncompleted deadline requires attention from its due date-time onward, including after it is overdue, until it is marked completed. The dashboard displays every active deadline, including future deadlines, ordered by the earliest due date-time, then title.

### BR-09 — Completed deadlines

Completed deadlines remain stored in `localStorage` but are hidden from the dashboard's active deadline list.

### BR-10 — Deleted records

Deleted events, deadlines, and notes are removed from the user's visible data and from `localStorage`. MVP does not provide trash, undo, or recovery.

### BR-11 — Note required content

A note must have non-empty text content.

### BR-12 — Pinned notes

A note may have exactly one pinned state. Pinned notes are displayed before unpinned notes, ordered by newest creation time first.

### BR-13 — Local persistence boundary

Data is stored only in the same browser and device. The MVP does not synchronize, migrate, or back up data to another device or browser.

### BR-14 — Time source

The MVP uses the browser's current date, time, and time zone as the source of truth. Stored date-time values are interpreted using the browser's current time zone.

### BR-15 — Clock baseline

The current date and current time shall refresh automatically at least once per minute and whenever the app regains browser focus.

### BR-16 — Scope control

No backend, database server, authentication, remote-service integration, calendar-service integration, payment, AI, native notification, native mobile app, sharing, import, or export may be introduced in MVP. All application data shall remain within `localStorage` on the same browser/device.

### BR-17 — Theme behavior

The app may follow the browser's preferred color scheme initially. The user may switch between light and dark mode during the session. Theme selection shall not modify event, deadline, or note records and shall not be persisted.

## 3.1 Non-functional requirements

### NFR-01 — Usability

The dashboard shall be glanceable, mobile-first, and readable without horizontal page scrolling at supported mobile and desktop widths.

### NFR-02 — Performance

The app shall render the main dashboard promptly and keep routine create, edit, delete, completion, and pin/unpin interactions responsive on a typical mobile device.

### NFR-03 — Reliability

Valid local data shall remain available after reload in the same browser/device. Failed writes shall not be reported as successful.

### NFR-04 — Data privacy

MVP data shall remain local to the browser/device. The app shall not send local event, deadline, or note data to a remote service.

### NFR-05 — Accessibility

Core dashboard actions shall be operable by keyboard, use semantic labels, provide visible focus, and maintain readable contrast in light and dark modes.

### NFR-06 — Maintainability

Domain validation, time selection, persistence, and UI presentation shall remain separated enough to test business rules independently from rendering.

### NFR-07 — Compatibility

The app shall run in modern browsers supporting React, `localStorage`, and the confirmed date/time APIs.

### NFR-08 — Local data privacy

The app shall not transmit application data or user business data to a remote service. All persisted application data shall remain in `localStorage`.

## 4. Input

### Event

- Title: required, non-empty text.
- Start time: required, valid date and time.
- End time: required, valid date and time.

### Deadline

- Title: required, non-empty text.
- Due date-time: required, valid date and time.

### Note

- Content: required, non-empty text.
- Pinned state: optional boolean supplied by pin/unpin action.

### System input

- Current date and time from the browser.
- Existing events, deadlines, and notes from `localStorage`.
- Stored date-time values in ISO format, interpreted using the browser's current time zone.

## 4.1 User stories

- As a busy user, I want to see the next event so that I know immediately what to do next.
- As a student, I want to see all today's events so that I can plan my remaining day.
- As a student, I want to create, edit, complete, and delete deadlines so that my workload stays current.
- As a working user, I want overdue and upcoming deadlines visible so that I do not miss important work.
- As a user, I want to add and delete notes so that I can keep temporary reminders.
- As a user, I want to pin and unpin notes so that important information stays visible.
- As a user, I want data saved locally so that my dashboard survives reload on the same device.
- As a user, I want light and dark modes so that the dashboard remains comfortable to read.

## 5. Output

- Current date display.
- Current time display.
- Next event, when an eligible event exists.
- Today's event list.
- Deadline list.
- Deadline editing and deletion actions.
- Pinned note list.
- Event, deadline, and note records persisted in `localStorage`.
- Feedback showing event, deadline, and note changes.
- Feedback for invalid input or unavailable local storage.

## 6. Error cases

### ERR-01 — Blank required text

If an event title, deadline title, or note content is blank, the app shall reject the change and keep the previous valid state.

### ERR-02 — Invalid event time

If an event start time or end time is missing or invalid, the app shall reject the event creation or edit.

### ERR-03 — Invalid event time order

If an event end time is not later than its start time, the app shall reject the event creation or edit.

### ERR-04 — Invalid deadline due date

If a deadline due date is missing or invalid, the app shall reject the deadline creation or edit.

### ERR-05 — Local storage unavailable

If `localStorage` is unavailable or cannot be written, the app shall inform the user that local persistence is unavailable while allowing dashboard viewing. The app shall not claim data has been saved.

### ERR-06 — Corrupt local data

If stored data cannot be interpreted as valid MVP records, the app shall reject the corrupt data and continue with an empty local workspace. It shall not automatically delete the corrupt payload before Product Owner approval.

### ERR-07 — Operation failure

If create, edit, delete, complete, pin, or unpin fails, the app shall show a clear failure message and preserve the user's last valid visible state.

### ERR-08 — Editing unavailable deadline

If the selected deadline no longer exists when edit submission begins, the app shall reject the edit and return the dashboard to a valid state.

### ERR-09 — Deleting unavailable deadline

If the selected deadline no longer exists when deletion is confirmed, the app shall preserve the current valid workspace and not create a duplicate or partial record.

## 7. Edge cases

### ED-01 — Empty workspace

The dashboard shall render successfully when no event, deadline, or note exists.

### ED-02 — No eligible next event

When no uncompleted event with a future end time exists today, the next-event area shall communicate that no next event is available.

### ED-03 — Event in progress

An event whose current time is between its start and end times shall be eligible as the next event.

### ED-04 — Events with the same start time

Events with equal start times shall be ordered deterministically using end time and title.

### ED-05 — Event ending at current time

An event is no longer eligible as the next event when its end time equals the current time.

### ED-06 — Midnight-spanning events

The MVP shall support events starting today that end tomorrow. The event belongs to today, but the requirement owner must confirm whether such creation is allowed before UI design.

### ED-07 — Completed event eligibility

Completed events shall not be selected as the next event.

### ED-08 — No active deadline

When no deadline requires attention, the deadline area shall communicate the empty state.

### ED-09 — Completed deadline visibility

Completed deadlines shall be hidden from the active deadline list.

### ED-10 — Deadlines across multiple dates

The app shall display future, current, and overdue active deadlines together, ordered by due date-time, then title.

### ED-11 — Empty pinned notes

When no pinned note exists, the pinned-note area shall communicate the empty state.

### ED-12 — Unpinned note removal

When a pinned note is unpinned, it shall immediately disappear from the pinned-note display.

### ED-13 — Clock day rollover

The dashboard shall account for the current date when determining today's events and attention deadlines. It shall recalculate the date at each clock update.

### ED-14 — Clock time update

The current time display shall refresh automatically at least once per minute and when the app regains browser focus.

### ED-15 — Same-device persistence

Data saved in one browser tab or window shall be available after reload in the same browser and device. Cross-tab synchronization is out of scope.

### ED-16 — Long and special characters

The app shall safely display long text and special characters without breaking the dashboard layout.

### ED-17 — Duplicate titles

Events, deadlines, and notes with the same title or content are valid and shall not be merged.

### ED-18 — Maximum data volume

The app shall define a reasonable local-data limit before implementation or clearly report when local storage capacity is exhausted. The exact limit is open.

### ED-19 — Private browsing restrictions

In a browser where `localStorage` is blocked, the app shall follow ERR-05 behavior.

### ED-20 — Time zone changes

The app shall use the browser's current time zone as its display and selection source of truth. Stored date-time values use ISO format and are displayed using the browser's current time zone without migrating stored records.

### ED-21 — Deadline completion preservation during edit

Editing an active deadline shall not change its completed state. Changing the completed state of a completed deadline is out of MVP scope.

### ED-22 — Deadline deletion

When the only active deadline is deleted, the deadline area shall return to its empty state.

### ED-23 — Deadline edit ordering

When a deadline's due date-time changes, the active deadline list shall reorder according to BR-08.

## 8. Data requirements

- Each deadline shall have a unique stable ID, non-empty title, valid ISO due date-time, completed state, creation timestamp, and update timestamp.
- Deadline edits shall change `updatedAt` but not `createdAt`.
- Deadline deletion shall remove the entire deadline record permanently.
- The current MVP storage payload shall remain a validated object containing arrays for local events, deadlines, and notes.
- Invalid records shall cause the storage payload to be rejected as a whole.
- Completed deadlines remain in storage but are excluded from the active list.
- No remote calendar credential, token, authorization code, client secret, or cached remote-calendar record shall exist in the storage payload.
