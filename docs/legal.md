# Legal and security policy

## Privacy policy summary

Calendar Management is local-first. It stores events, deadlines, and notes in the browser's `localStorage` under `lockscreen-calendar:data:v1`.

The app does not:

- Create user accounts or ask users to sign in.
- Read Shopify merchant resources.
- Transmit events, deadlines, notes, or completion states to a backend or third-party service.
- Install cookies or analytics trackers.
- Integrate with an external calendar service.

Data is restricted to the browser and device used to create it. A user can remove all application data by deleting the records in the app or clearing browser storage. Because there is no server copy, clearing browser storage is permanent.

## Security rules

- Keep the app frontend-only and local-first.
- Do not add remote APIs, backend storage, authentication, payment, AI, or external calendar integration without Product Owner approval.
- Do not send application data or user business data to a third-party service.
- Do not store credentials, tokens, or authorization codes because the app has no authentication or remote-service integration.
- Treat user-entered text as untrusted display content and render it through React's escaping.
- Do not insert stored values into HTML, script URLs, or dynamic code execution.
- Preserve the last valid visible state when a storage write fails.
- Never report a failed write as successful.

## User autonomy

- The user manages their own records and can create, edit, complete, delete, pin, or unpin them.
- The app does not auto-generate, auto-delete, or transfer user records.
- Data stays local unless the user explicitly changes browser storage.
- No server-side retention period applies because the app does not transmit or retain data remotely.

## Data deletion

Events, deadlines, and notes can be deleted in the app. Complete deletion of all workspace data requires clearing the browser's local storage. The app intentionally provides no import/export or backup feature.
