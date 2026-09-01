# Shopify app listing — Calendar Management

## App name

Calendar Management

## Tagline

A local-first daily command surface for upcoming events, deadlines, and pinned notes.

## Short description

Calendar Management gives merchants a quick mobile-first view of what happens next. Track events, deadlines, and pinned notes without a backend or external calendar integration.

## Detailed description

Calendar Management focuses on one job: helping you see your next commitment without navigating a full calendar interface.

### What it does

- Shows the current date, time, and next eligible event.
- Keeps today's events and active deadlines in one glanceable dashboard.
- Supports event and deadline creation, editing, completion, and deletion.
- Supports notes with pin and unpin actions for important reminders.
- Stores data directly in the browser through `localStorage`.

### How data is handled

Calendar Management does not create accounts, request Shopify merchant data, transmit business data to a server, or integrate with an external calendar provider. Events, deadlines, and notes remain on the same browser and device. Deleting records removes them from `localStorage`; there is no trash, undo, backup, or cross-device sync.

### Best fit

The app is suitable for a single merchant user who needs a simple personal planner embedded in Shopify admin. It is not intended for teams that need shared calendars, collaboration, synchronization, or backup.

## Keywords

calendar, events, deadlines, notes, planner, local storage, personal schedule

## Category

Productivity

## Privacy positioning

Local-first and no-transit data processing. No Shopify merchant data is requested beyond the context needed to open the embedded app.

## Support policy

Support is provided through the public support URL configured in the Shopify listing. Keep support requests in English or Vietnamese.

## Marketing asset policy

- Icon: upload `marketing/app-icon-512.png` (512×512 PNG).
- Screenshots: upload `marketing/screenshots/mobile-light.png`, `mobile-dark.png`, `desktop-light.png`, and `desktop-dark.png`.
- Optional support evidence: `marketing/screenshots/privacy-light.png` shows the public privacy page.
- Do not claim cross-device sync, collaboration, backup, or external calendar integration.

## Privacy and security review answers

- **Data collected:** No app data is collected by a server. Events, deadlines, and notes stay in the same browser's `localStorage`.
- **Shopify data accessed:** No merchant resources, customer data, orders, products, or store data are read.
- **Data transmission:** No app-record data is transmitted to a backend, database, analytics service, or third party.
- **Credentials/tokens:** No credentials, access tokens, authorization codes, or session tokens are stored by the app.
- **Cookies/trackers:** No cookies or analytics trackers are installed.
- **Data deletion:** Users delete records in the app or clear the site's browser storage. Cleared storage is permanent because no server copy exists.
- **Security controls:** The production app is served over HTTPS, React escapes stored text, and storage validation rejects malformed data.
- **Known limitation:** Browser settings can block storage inside an iframe. If storage is unavailable, the app shows an explicit storage-unavailable state.
