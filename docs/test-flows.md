# Lockscreen Calendar — MVP Test Flows

## 1. Test conventions

- Execute manually in a desktop browser and its responsive/mobile emulation.
- Baseline viewports:
  - Mobile: 360 × 640.
  - Tablet: 600 × 900.
  - Desktop: 1280 × 800.
- `localStorage` key: `lockscreen-calendar:data:v1`.
- Unless stated otherwise, “reload” means a normal browser reload in the same browser profile.
- A test passes only when every expected result and every listed pass criterion is satisfied.
- A test fails on any uncaught application error, incorrect visible state, incorrect persisted state, or prohibited scope behavior.

## 2. Dashboard and clock

### TF-01 — Open app with empty storage

**Requirement ID:** FR-01, FR-18, BR-01, ED-01; AC-03, AC-17, AC-23

**Preconditions:**

- App URL is available.
- `lockscreen-calendar:data:v1` is absent or set to an empty valid workspace.

**Steps:**

1. Open the app.
2. Inspect the loading state.
3. Wait until loading completes.
4. Inspect date, time, next event, events, deadlines, pinned notes, and all notes.

**Expected result:** Dashboard renders with current date/time and all required empty states; no data is automatically created.

**Edge cases:**

- Reopen in a second tab of the same browser.
- Reload immediately after loading completes.

**Pass/Fail criteria:**

- PASS: required sections are visible and empty-state messages are correct.
- FAIL: dashboard is blank, a section is missing, unrelated demo data appears, or an error occurs.

### TF-02 — Current date and time display

**Requirement ID:** FR-02, FR-03, BR-14, BR-15, ED-13, ED-14; AC-01, AC-02, AC-28

**Preconditions:**

- App is open.
- Browser date, time, locale, and time zone are known.

**Steps:**

1. Compare displayed date with the browser's current date.
2. Compare displayed time with the browser's current time.
3. Wait across a minute boundary without reloading.
4. Switch away from the app and return after at least one minute.

**Expected result:** Date/time use browser locale settings, update at least once per minute, and recalculate when focus returns.

**Edge cases:**

- Minute boundary.
- Midnight/day rollover.
- Browser regains focus.

**Pass/Fail criteria:**

- PASS: date/time remain accurate after interval and focus updates.
- FAIL: displayed values become stale, use the wrong locale source, or day-derived lists do not recalculate.

### TF-03 — Responsive dashboard

**Requirement ID:** FR-19; AC-03, AC-24

**Preconditions:**

- At least one event, one active deadline, one pinned note, and one unpinned note exist.

**Steps:**

1. Open the dashboard at 360px width.
2. Check all sections, forms, buttons, and text.
3. Change to 600px width.
4. Change to 1280px width.
5. Open and submit each form at every viewport.

**Expected result:** Layout remains mobile-first, readable, and usable; no unintended horizontal page scrolling occurs.

**Edge cases:**

- Long title.
- Long note.
- Desktop form interaction.

**Pass/Fail criteria:**

- PASS: content fits approved layouts and touch targets meet specification.
- FAIL: horizontal scrolling, clipped controls, unreadable text, or broken layout appears.

## 3. Events

### TF-04 — Add valid event

**Requirement ID:** FR-06, BR-02, BR-03, ED-06; AC-06

**Preconditions:**

- App is open and event form is available.

**Steps:**

1. Select “Add event”.
2. Enter title `Team sync`.
3. Enter a valid start date-time and later end date-time.
4. Save the event.
5. Inspect Today's Events and Next Event.
6. Reload the page.

**Expected result:** Event is created, displayed in the correct list/order, and remains after reload.

**Edge cases:**

- Event starts in the past.
- Event is currently in progress.
- Event starts today and ends tomorrow.
- Duplicate event title.

**Pass/Fail criteria:**

- PASS: valid record persists and all derived displays update correctly.
- FAIL: record is missing, duplicated, sorted incorrectly, or changes after reload.

### TF-05 — Add invalid event

**Requirement ID:** FR-06, BR-02, BR-03, ERR-01, ERR-02, ERR-03; AC-20

**Preconditions:**

- Existing valid workspace is known.
- Event form is open.

**Steps:**

1. Submit with blank title.
2. Enter a title, remove start time, and submit.
3. Enter start time, remove end time, and submit.
4. Enter equal start and end values and submit.
5. Enter end earlier than start and submit.
6. Reload after each rejected submission.

**Expected result:** Each invalid submission is rejected with the specified field error; no invalid record is persisted.

**Edge cases:**

- Whitespace-only title.
- Invalid browser date-time value.

**Pass/Fail criteria:**

- PASS: every case is rejected, prior valid data remains, and no invalid record appears after reload.
- FAIL: invalid event is saved, errors are missing/wrong, or valid data is lost.

### TF-06 — Edit event

**Requirement ID:** FR-07, BR-04; AC-07

**Preconditions:**

- At least one stored event exists.

**Steps:**

1. Select “Edit” on an event.
2. Confirm the form is prefilled.
3. Change title, start, and end values.
4. Save.
5. Inspect event lists.
6. Reload.

**Expected result:** Only the selected event changes; sorting and day grouping update and data persists.

**Edge cases:**

- Change start date to another day.
- Change event to midnight-spanning.
- Cancel edit without saving.

**Pass/Fail criteria:**

- PASS: edited record updates once and persists; cancel leaves the original unchanged.
- FAIL: another event changes, update does not persist, or cancel mutates data.

### TF-07 — Delete event

**Requirement ID:** FR-08, BR-10; AC-08

**Preconditions:**

- At least one stored event exists.

**Steps:**

1. Select “Delete”.
2. Confirm deletion.
3. Inspect Today's Events and Next Event.
4. Reload.

**Expected result:** Event disappears from all relevant displays and remains absent after reload.

**Edge cases:**

- Cancel the confirmation.
- Delete the current Next Event.
- Delete the only event.

**Pass/Fail criteria:**

- PASS: confirmed deletion is permanent and cancel preserves the record.
- FAIL: deleted event returns, cancel deletes it, or unrelated records disappear.

### TF-08 — Complete event

**Requirement ID:** FR-09, BR-06, ED-07; AC-09

**Preconditions:**

- At least one uncompleted event for today exists.

**Steps:**

1. Select “Complete” on an uncompleted event.
2. Inspect Today's Events.
3. Inspect Next Event.
4. Reload.

**Expected result:** Event remains visible as “Done”, does not qualify as next event, and completed state persists.

**Edge cases:**

- Complete the current Next Event.
- Complete an in-progress event.
- Complete the only active event.

**Pass/Fail criteria:**

- PASS: completed state is visible and persisted; Next Event excludes it.
- FAIL: completed event disappears incorrectly, remains next, or state is lost.

### TF-09 — Next event selection

**Requirement ID:** FR-04, BR-05, ED-02, ED-03, ED-04, ED-05; AC-04

**Preconditions:**

- App can store several controlled events for today.

**Steps:**

1. Store an ended event, an in-progress event, a future event, a completed event, and a future event starting tomorrow.
2. Inspect Next Event.
3. Remove or complete the selected event.
4. Inspect Next Event again.
5. End all eligible events and inspect again.

**Expected result:** Next Event is the earliest eligible event today by start, end, then title; ineligible states are excluded.

**Edge cases:**

- Two future events share the same start time.
- Event ends exactly at the current time.
- No eligible event exists.

**Pass/Fail criteria:**

- PASS: selection follows every BR-05 rule and empty state is correct.
- FAIL: wrong event, ended/completed event, tomorrow's event, or blank area is shown.

### TF-10 — Today's event grouping and ordering

**Requirement ID:** FR-05, BR-04, ED-06; AC-05

**Preconditions:**

- Events exist for yesterday, today, and tomorrow.
- Today includes completed, ended, active, and same-start events.

**Steps:**

1. Open the dashboard.
2. Inspect every event in Today's Events.
3. Compare visible order with start/end/title.
4. Reload.

**Expected result:** Every today-start event appears exactly once; other dates and duplicates are excluded; sorting is deterministic.

**Edge cases:**

- Midnight-spanning event.
- Duplicate titles.
- Same start and end times.

**Pass/Fail criteria:**

- PASS: grouping and ordering match BR-04 and FR-05.
- FAIL: records are missing, duplicated, or sorted incorrectly.

## 4. Deadlines

### TF-11 — Add valid deadline

**Requirement ID:** FR-11, BR-07, BR-08; AC-11

**Preconditions:**

- App is open and deadline form is available.

**Steps:**

1. Open the deadline form.
2. Enter title `Submit assignment`.
3. Enter a valid due date-time.
4. Save.
5. Inspect active deadlines.
6. Reload.

**Expected result:** Deadline persists and appears in the active deadline order.

**Edge cases:**

- Past due.
- Current due.
- Future due.
- Duplicate title.

**Pass/Fail criteria:**

- PASS: all valid date-times can be saved and sorted by due then title.
- FAIL: valid deadline is rejected, missing after reload, or sorted incorrectly.

### TF-12 — Add invalid deadline

**Requirement ID:** FR-11, BR-07, ERR-01, ERR-04; AC-21

**Preconditions:**

- Existing valid workspace is known.
- Deadline form is open.

**Steps:**

1. Submit with blank title.
2. Enter title and remove due date-time.
3. Submit an invalid date-time.
4. Reload after each rejection.

**Expected result:** Invalid submissions are rejected and no invalid deadline is stored.

**Edge cases:**

- Whitespace-only title.

**Pass/Fail criteria:**

- PASS: correct field errors appear and previous valid workspace remains.
- FAIL: invalid record is persisted or prior data is lost.

### TF-13 — Display and order active deadlines

**Requirement ID:** FR-10, BR-08, ED-08, ED-10; AC-10

**Preconditions:**

- Active deadlines include overdue, due today, future, and same due-time records.
- At least one completed deadline exists.

**Steps:**

1. Open the dashboard.
2. Inspect deadline statuses.
3. Compare ordering with due date-time then title.
4. Confirm the completed deadline is absent.
5. Reload.

**Expected result:** All active deadlines are visible with correct status; completed deadline is hidden.

**Edge cases:**

- No active deadline.
- Multiple overdue deadlines.
- Same due date-time and title.

**Pass/Fail criteria:**

- PASS: visibility, status, ordering, and empty state match requirements.
- FAIL: completed deadline appears, an active deadline is missing, or order/status is wrong.

### TF-14 — Complete deadline

**Requirement ID:** FR-12, BR-09, ED-09; AC-12

**Preconditions:**

- At least one active deadline exists.

**Steps:**

1. Select “Complete”.
2. Inspect active deadlines.
3. Reload.
4. Inspect stored workspace or equivalent persisted state.

**Expected result:** Deadline is hidden from active list but remains stored with completed state after reload.

**Edge cases:**

- Complete the only deadline.
- Complete an overdue deadline.

**Pass/Fail criteria:**

- PASS: completion persists and the record is not deleted.
- FAIL: deadline remains active, disappears from storage, or state is lost.

### TF-14A — Edit deadline

**Requirement ID:** FR-21, BR-07, BR-08, ED-23; AC-32

**Preconditions:**

- At least one active deadline exists.

**Steps:**

1. Select “Edit” on a deadline.
2. Confirm the form is prefilled.
3. Change title and due date-time.
4. Save.
5. Inspect ordering and status.
6. Reload.

**Expected result:** Only the selected deadline changes; edit persists and ordering/status update correctly.

**Edge cases:**

- Cancel edit.
- Move due date/time across status boundary.
- Submit blank title.
- Submit invalid due date-time.

**Pass/Fail criteria:**

- PASS: valid edit persists and invalid edit is rejected.
- FAIL: wrong record changes, data is lost, or sorting/status is wrong.

### TF-14B — Delete deadline

**Requirement ID:** FR-22, BR-10, ED-22; AC-33

**Preconditions:**

- At least one stored deadline exists.

**Steps:**

1. Select “Delete”.
2. Confirm deletion.
3. Inspect active deadline list.
4. Reload.

**Expected result:** Deadline disappears permanently and no trash/undo state is created.

**Edge cases:**

- Cancel confirmation.
- Delete the only deadline.
- Storage write failure.

**Pass/Fail criteria:**

- PASS: confirmed deletion persists; cancel preserves the record.
- FAIL: deadline returns after reload, cancel deletes it, or another record changes.

## 5. Notes

### TF-15 — Add valid note

**Requirement ID:** FR-13, BR-11; AC-13

**Preconditions:**

- Note form is available.

**Steps:**

1. Open note form.
2. Enter `Call advisor at 3 PM`.
3. Submit.
4. Inspect All Notes and Pinned Notes.
5. Reload.

**Expected result:** Note is created unpinned, visible in All Notes, and persists.

**Edge cases:**

- Leading/trailing spaces.
- Multi-line note.
- Long note.
- HTML/script-like text.
- Duplicate note.

**Pass/Fail criteria:**

- PASS: valid content is safely displayed once and persisted.
- FAIL: note is missing, rendered as executable markup, or duplicated.

### TF-16 — Add invalid note

**Requirement ID:** FR-13, BR-11, ERR-01; AC-22

**Preconditions:**

- Existing valid workspace is known.

**Steps:**

1. Open note form.
2. Submit blank content.
3. Submit spaces/tabs/newlines only.
4. Reload.

**Expected result:** Invalid notes are rejected and no blank note is persisted.

**Edge cases:**

- Unicode whitespace.

**Pass/Fail criteria:**

- PASS: required error appears and valid workspace is unchanged.
- FAIL: blank note is created or previous data is lost.

### TF-17 — Delete note

**Requirement ID:** FR-14, BR-10; AC-14

**Preconditions:**

- At least one stored note exists.

**Steps:**

1. Select “Delete”.
2. Confirm.
3. Inspect All Notes and Pinned Notes.
4. Reload.

**Expected result:** Note is removed from all displays and remains absent after reload.

**Edge cases:**

- Cancel deletion.
- Delete a pinned note.
- Delete the only note.

**Pass/Fail criteria:**

- PASS: confirmed deletion is permanent; cancel preserves the note.
- FAIL: note returns after reload, cancel deletes it, or another note is removed.

### TF-18 — Pin and display note

**Requirement ID:** FR-15, FR-17, BR-12, ED-11; AC-15

**Preconditions:**

- At least two unpinned notes with different creation times exist.

**Steps:**

1. Pin the newest note.
2. Inspect Pinned Notes and All Notes.
3. Pin the older note.
4. Compare pinned ordering.
5. Reload.

**Expected result:** Both pinned notes appear in Pinned Notes, newest first; All Notes shows pinned before unpinned.

**Edge cases:**

- No pinned note.
- Pin the only note.
- Pin long text.

**Pass/Fail criteria:**

- PASS: pin state and ordering persist correctly.
- FAIL: pinned note is missing, ordering is wrong, or state is lost.

### TF-19 — Unpin note

**Requirement ID:** FR-16, FR-17, BR-12, ED-12; AC-16

**Preconditions:**

- At least one pinned note exists.

**Steps:**

1. Select “Unpin”.
2. Inspect Pinned Notes.
3. Inspect All Notes.
4. Reload.

**Expected result:** Note immediately leaves Pinned Notes but remains manageable in All Notes; unpinned state persists.

**Edge cases:**

- Unpin the only pinned note.
- Unpin a long note.

**Pass/Fail criteria:**

- PASS: pinned display and management list follow FR-17.
- FAIL: note disappears entirely or remains pinned after reload.

## 6. Persistence and storage

### TF-20 — Persist all MVP records

**Requirement ID:** FR-18, BR-01, BR-13, ED-15; AC-17, AC-25

**Preconditions:**

- Workspace is empty.

**Steps:**

1. Create one event, one deadline, and one note.
2. Complete the event and deadline.
3. Pin the note.
4. Reload.
5. Open the same app in another tab.

**Expected result:** Records and states remain available in the same browser/device. Cross-device sync is not claimed.

**Edge cases:**

- Reload twice.
- Close and reopen the browser.
- Duplicate titles.

**Pass/Fail criteria:**

- PASS: same-browser/device persistence is intact and no sync claim appears.
- FAIL: any required record/state is lost or cross-device behavior is implied.

### TF-21 — Storage unavailable

**Requirement ID:** ERR-05, ED-19; AC-18

**Preconditions:**

- Browser can block `localStorage` or storage write can be simulated in a test build.

**Steps:**

1. Block `localStorage`.
2. Open the app.
3. Inspect dashboard and storage message.
4. Attempt to create a valid event.

**Expected result:** Dashboard is viewable; persistence failure is clearly reported; successful saving is not claimed.

**Edge cases:**

- Storage becomes available after reload.
- Storage write fails after app startup.

**Pass/Fail criteria:**

- PASS: user is informed and no false success state appears.
- FAIL: app crashes, silently loses changes, or claims saved data.

### TF-22 — Corrupt storage

**Requirement ID:** ERR-06; AC-19

**Preconditions:**

- `lockscreen-calendar:data:v1` can be edited in browser developer tools.

**Steps:**

1. Set the key to malformed JSON.
2. Open the app.
3. Inspect dashboard and corrupt-data message.
4. Reload without manually changing the key.

**Expected result:** Corrupt payload is rejected and ignored; app starts with an empty workspace and does not delete the payload.

**Edge cases:**

- Valid JSON with wrong record shape.
- Valid JSON with one valid and one invalid event.
- Missing one collection property.

**Pass/Fail criteria:**

- PASS: dashboard renders and original corrupt value remains unchanged.
- FAIL: app crashes, automatically overwrites/deletes corrupt value, or uses invalid records.

### TF-23 — Operation failure

**Requirement ID:** ERR-07; AC-18–AC-22

**Preconditions:**

- A storage write failure can be induced during a supported operation.

**Steps:**

1. Perform create/edit/delete/complete/pin/unpin operations while writes fail.
2. Inspect visible workspace after each failure.
3. Restore storage and reload.

**Expected result:** Each failure shows the operation error and preserves the last valid visible workspace.

**Edge cases:**

- Failure during edit.
- Failure during delete.
- Failure immediately after startup.

**Pass/Fail criteria:**

- PASS: no false success and no partial invalid UI state remains.
- FAIL: UI shows success, stores invalid state, or crashes.

### TF-24 — Local data limits

**Requirement ID:** ED-18

**Preconditions:**

- App implements a defined local-data limit or a browser storage quota error can be induced.

**Steps:**

1. Fill storage to the limit or trigger quota failure.
2. Attempt another create/edit operation.
3. Inspect message and existing data.
4. Reload.

**Expected result:** Exceeding the limit is reported clearly and existing valid data is preserved.

**Edge cases:**

- Very long title.
- Very long note.
- Many records.

**Pass/Fail criteria:**

- PASS: quota/limit failure is handled as ERR-05/ERR-07.
- FAIL: uncaught exception, silent data loss, or misleading success occurs.

### TF-25 — Time zone and text behavior

**Requirement ID:** BR-14, ED-16, ED-17, ED-20; AC-25, AC-29

**Preconditions:**

- Stored event, deadline, and note records exist.
- Browser time zone can be changed.

**Steps:**

1. Record displayed date/time values.
2. Change the browser time zone.
3. Reload the app.
4. Inspect records and long/special/duplicate text.

**Expected result:** Date/time display follows current browser time zone; records are not migrated or merged; text remains safe/readable.

**Edge cases:**

- Time zone moves across day boundary.
- Script-like text.
- Long unbroken string.

**Pass/Fail criteria:**

- PASS: current timezone is used without data migration or layout breakage.
- FAIL: records are rewritten unexpectedly, dates become invalid, or text overflows.

## 7. UI states

### TF-26 — Loading, empty, and error states

**Requirement ID:** FR-01, ERR-05, ERR-06, ED-01, ED-02, ED-08, ED-11; AC-03, AC-18, AC-19, AC-23

**Preconditions:**

- App can be opened with empty, valid, unavailable-storage, and corrupt-storage states.

**Steps:**

1. Open with empty storage.
2. Trigger loading if observable.
3. Block storage and reopen.
4. Corrupt storage and reopen.
5. Inspect each required empty/error message.

**Expected result:** All approved loading, empty, and error states render correctly in light and dark mode.

**Edge cases:**

- Loading transitions quickly.
- Storage changes during startup.

**Pass/Fail criteria:**

- PASS: every state is visible, readable, and does not block the dashboard indefinitely.
- FAIL: blank screen, missing state, wrong message, or infinite loading occurs.

### TF-27 — Theme mode

**Requirement ID:** FR-20, BR-17; AC-31

**Preconditions:**

- Dashboard contains all section types.

**Steps:**

1. Open in a browser with dark preference.
2. Inspect dark styling.
3. Toggle to light mode.
4. Reload.
5. Toggle again and inspect data.

**Expected result:** Both themes are readable; selection is session-only and does not alter business data.

**Edge cases:**

- No browser preference.
- Toggle during an open form.
- Toggle in storage-error state.

**Pass/Fail criteria:**

- PASS: themes switch cleanly and data/persistence remain unchanged.
- FAIL: unreadable contrast, broken layout, persisted theme, or data mutation occurs.

### TF-28 — Form states and validation

**Requirement ID:** FR-06, FR-07, FR-11, FR-13, ERR-01–ERR-04; AC-20–AC-22

**Preconditions:**

- All three forms are available.
- Existing valid workspace is known.

**Steps:**

1. Open each form.
2. Inspect labels, required indicators, defaults, and focus order.
3. Submit valid and invalid values.
4. Cancel each form.
5. Trigger processing state if observable.

**Expected result:** Forms show visible labels, clear field errors, preserve valid values, and reject invalid data.

**Edge cases:**

- Start-time change changes suggested end time.
- Cancel after editing.
- Operation failure during submit.

**Pass/Fail criteria:**

- PASS: form behavior follows UI specification and business validation.
- FAIL: missing labels, wrong error placement, data mutation on cancel, or invalid save occurs.

## 8. Scope control and regression

### TF-29 — MVP scope control

**Requirement ID:** BR-16; AC-30

**Preconditions:**

- App is running.

**Steps:**

1. Inspect visible UI and controls.
2. Monitor network requests during normal use.
3. Search implementation for prohibited integration markers.
4. Verify build output remains frontend-only and contains no remote calendar integration marker.

**Expected result:** No backend, database, remote calendar service, remote API, payment, AI, native notification, native app, or general authentication behavior is introduced. All persisted data remains in `localStorage`.

**Edge cases:**

- Empty workspace.
- Storage failure.
- Reload.

**Pass/Fail criteria:**

- PASS: product contains MVP frontend behavior only.
- FAIL: any out-of-scope feature, request, dependency, or architecture component appears.

### TF-30 — End-to-end regression suite

**Requirement ID:** FR-01–FR-20, BR-01–BR-17, ERR-01–ERR-07, ED-01–ED-20

**Preconditions:**

- TF-01 through TF-29 are available.
- App build is current.

**Steps:**

1. Execute TF-01 through TF-29 in sequence.
2. Retest all event, deadline, note, persistence, UI, storage, and scope tests after any defect fix.
3. Run the production build.

**Expected result:** All tests pass, no TypeScript/build error exists, and related features remain correct after fixes.

**Edge cases:**

- Single record.
- Many records.
- Empty workspace.
- Storage failure.
- Corrupt storage.

**Pass/Fail criteria:**

- PASS: all tests and build pass.
- FAIL: any test, TypeScript check, build, or required regression fails.

## 9. Requirement coverage map

| Requirement group | Covered by |
|---|---|
| FR-01–FR-03 | TF-01, TF-02, TF-26 |
| FR-04 | TF-09 |
| FR-05 | TF-10 |
| FR-06–FR-09 | TF-04–TF-08 |
| FR-10 | TF-13 |
| FR-11–FR-12, FR-21–FR-22 | TF-11, TF-12, TF-14, TF-14A, TF-14B |
| FR-13–FR-17 | TF-15–TF-19 |
| FR-18 | TF-20–TF-24 |
| FR-19 | TF-03 |
| FR-20 | TF-27 |
| BR-01–BR-17 | TF-01, TF-04–TF-08, TF-11–TF-19, TF-20–TF-25, TF-27, TF-29 |
| ERR-01–ERR-07 | TF-05, TF-12, TF-16, TF-21–TF-24, TF-28 |
| ED-01–ED-20 | TF-01–TF-04, TF-09–TF-11, TF-13–TF-16, TF-18–TF-25, TF-26, TF-30 |
