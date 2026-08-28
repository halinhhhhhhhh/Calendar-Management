# Lockscreen Calendar — MVP Acceptance Criteria

## 1. Dashboard

### AC-01 — Current date

FR-02 is complete when the dashboard displays the current date according to the browser settings, and the date corresponds to the actual browser date at display time.

### AC-02 — Current time

FR-03 is complete when the dashboard displays the current time according to the browser settings, and the displayed value is accurate when rendered. The approved refresh behavior is also satisfied.

### AC-03 — Glanceable dashboard

FR-01 and FR-19 are complete when current date, current time, next event, today's events, deadlines, and pinned notes can be viewed from the main dashboard without page navigation, on mobile and desktop widths.

## 2. Events

### AC-04 — Next event

FR-04 is complete when:

1. An uncompleted event with a future end time and today's start date is displayed.
2. The selected event is the earliest according to BR-05.
3. Completed events are excluded.
4. Events that have already ended are excluded.
5. An event currently in progress is included.
6. A clear empty state is shown when no eligible event exists.

### AC-05 — Today's event list

FR-05 is complete when every event whose start date equals the current browser date is displayed once, including completed events, with completed state visible.

### AC-06 — Event creation

FR-06 is complete when a valid event can be created with a title, start time, and end time; it appears in the correct event list and remains available after page reload.

### AC-07 — Event editing

FR-07 is complete when a valid event can be edited; its title, start time, and end time update correctly, list placement updates when needed, and the updated record remains after reload.

### AC-08 — Event deletion

FR-08 is complete when an event can be deleted, disappears from all relevant displays, and remains absent after reload.

### AC-09 — Event completion

FR-09 is complete when an event can be marked completed, remains visible in today's list with a completed state, becomes ineligible as the next event, and retains its completed state after reload.

## 3. Deadlines

### AC-10 — Deadline display

FR-10 is complete when all deadlines requiring attention according to the approved deadline rule are displayed in the approved order, with a clear empty state when none qualify.

### AC-11 — Deadline creation

FR-11 is complete when a valid deadline can be created with a title and due date-time; it appears according to the approved deadline rule and remains after reload.

### AC-12 — Deadline completion

FR-12 is complete when a deadline can be marked completed, follows the approved visibility rule, and retains its completed state after reload.

### AC-32 — Deadline editing

FR-21 is complete when an active deadline's title and due date-time can be edited, validation errors are rejected, list order/status update correctly, and the edit persists after reload.

### AC-33 — Deadline deletion

FR-22 is complete when an active or completed deadline can be deleted after confirmation, disappears from every relevant surface, and remains absent after reload.

## 4. Notes

### AC-13 — Note creation

FR-13 is complete when a note with non-empty content can be created, appears in the app, and remains after reload.

### AC-14 — Note deletion

FR-14 is complete when a note can be deleted, disappears from all relevant displays, and remains absent after reload.

### AC-15 — Note pinning

FR-15 and FR-17 are complete when a note can be pinned, appears in pinned notes, is ordered according to BR-12, and retains its pinned state after reload.

### AC-16 — Note unpinning

FR-16 and FR-17 are complete when a pinned note can be unpinned, immediately disappears from the pinned-note presentation, remains reachable in the note management list, and remains unpinned after reload.

## 5. Persistence and operation quality

### AC-17 — Local persistence

FR-18 is complete when valid events, deadlines, notes, and completion states remain available after page reload in the same browser and device.

### AC-18 — Storage failure

ERR-05 is complete when blocked or failing `localStorage` is reported clearly and the app does not claim successful saves.

### AC-19 — Corrupt storage

ERR-06 is complete when corrupt data is rejected without an automatic destructive cleanup, and the dashboard can still render with an empty workspace.

### AC-20 — Invalid event input

ERR-01, ERR-02, and ERR-03 are complete when invalid event input is rejected, no invalid record is created or saved, and the previous valid state is preserved.

### AC-21 — Invalid deadline input

ERR-01 and ERR-04 are complete when invalid deadline input is rejected, no invalid record is created, and the previous valid state is preserved.

### AC-22 — Invalid note input

ERR-01 is complete when a blank note is rejected, no invalid note is created, and the previous valid state is preserved.

### AC-23 — Empty states

ED-01, ED-02, ED-08, and ED-11 are complete when each relevant empty state is visible and readable on mobile and desktop widths.

### AC-24 — Responsive readability

FR-19 is complete when dashboard content remains readable and usable without horizontal scrolling at approved mobile and desktop widths, while preserving the mobile-first priority.

### AC-25 — Data boundaries

BR-13 and ED-15 are complete when data persists in the same browser/device and no cross-device or cross-browser persistence is claimed.

### AC-26 — Event edge cases

ED-03, ED-04, ED-05, ED-06, and ED-07 are complete when in-progress events, same-start events, ended events, midnight-spanning events, and completed events follow the approved rules.

### AC-27 — Deadline edge cases

ED-09 and ED-10 are complete when completed deadlines and deadlines across multiple dates follow the approved visibility rule and ordering rule.

### AC-28 — Clock behavior

ED-13 and ED-14 are complete when date rollover and time updates follow the approved clock behavior.

### AC-29 — Text edge cases

ED-16 and ED-17 are complete when long text and duplicate titles are displayed safely without merging records or breaking responsive layout.

### AC-30 — Scope control

BR-16 is complete when the delivered MVP contains no out-of-scope feature and no unapproved architecture change.

### AC-31 — Simple theme mode

FR-20 and BR-17 are complete when light and dark modes are readable, can be switched during the session, do not change business data, and are not persisted after reload.
