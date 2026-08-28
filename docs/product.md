# Lockscreen Calendar — Product Definition

## 1. Product overview

Lockscreen Calendar is a mobile-first web application that helps a user quickly see what is happening now and what needs attention next. The MVP is a frontend-only product focused on a personal daily command surface containing the next event, today's events, deadlines, and pinned notes.

## 2. Problem

Users repeatedly check a full calendar application to track classes, meetings, deadlines, and personal tasks. This repeated navigation wastes time, increases cognitive load, and can cause important work to be missed.

## 3. Target users

- Students managing classes, assignments, and deadlines.
- Working people managing meetings and job-related commitments.
- Busy individuals who need a quick view of their daily schedule.

## 4. Core value

- Immediately know the next thing to do.
- Reduce repeated visits to a traditional calendar app.
- Present short, readable, glanceable information.
- Allow important notes to be captured and kept visible.

## 5. Main features

- Display current date and current time.
- Display the next upcoming event.
- Display today's event list.
- Create, edit, delete, and complete events.
- Display deadlines.
- Create, edit, delete, and complete deadlines.
- Create, delete, pin, and unpin notes.
- Display pinned notes.
- Persist MVP data locally on the user's device.

## 6. MVP scope

### In scope

- Main dashboard.
- Current date display.
- Current time display.
- Next event display.
- Today's event list.
- Event creation.
- Event editing.
- Event deletion.
- Event completion.
- Deadline display.
- Deadline creation.
- Deadline editing.
- Deadline deletion.
- Deadline completion.
- Note creation.
- Note deletion.
- Note pinning and unpinning.
- Pinned note display.
- Data storage using `localStorage`.
- Mobile-first responsive UI for mobile and desktop.
- React, TypeScript, Vite, and CSS implementation.

### Out of scope

- Backend.
- Database server.
- Authentication.
- General account authentication or login system.
- Payment.
- AI.
- Native notifications.
- Native mobile app.
- Multi-device synchronization.
- Sharing or collaboration.
- Offline installation or PWA behavior.
- Data export or import.
- Remote calendar integration.

## 7. Success criteria

When opening the app, the user can quickly identify:

- The current date.
- The current time.
- The next event.
- Today's events.
- Deadlines requiring attention.
- Pinned important notes.

The MVP is also successful when:

- Event, deadline, and note data survives a page reload on the same device and browser.
- Required event, deadline, and note operations can be completed without developer errors.
- The main dashboard remains readable on mobile and desktop widths.
- No approved feature is missing and no out-of-scope feature is introduced.

## 8. Technical constraints

- Implement only the MVP frontend.
- Use React, TypeScript, Vite, and CSS.
- Use `localStorage` for persistence.
- Do not integrate any remote calendar service or send local business data to a remote service.
- Do not add a backend, authentication, payment, AI, native notifications, or a native mobile app.
- Do not expand scope without Product Owner approval.

## 9. Confirmed baseline decisions

The Product Owner has confirmed these requirements. They are mandatory for MVP design and implementation:

1. Event and deadline inputs use date and time.
2. An active deadline is visible from its due date-time onward, including overdue deadlines, until completed.
3. Completed events remain visible in today's event list with a completed state.
4. Completed deadlines remain stored but are hidden from the active deadline list.
5. Events and deadlines may be created with past date-times.
6. The clock updates automatically at least once per minute and when the app regains focus.
7. The browser's current time zone is the source of truth; date-time values are stored in ISO format.
8. Corrupt localStorage data is rejected and ignored without destructive cleanup.
9. The Product Owner has confirmed that no remote calendar integration is in scope; all application data remains in `localStorage`.
