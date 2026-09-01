# Cloudflare Workers deployment

## Supervisor status

This project deploys to Cloudflare Workers Static Assets with `wrangler.json`.

## Required repository facts

- Repository: `halianhhhhhhhh/Calendar-Management`
- Branch: `main`
- Build command: `npm run build`
- Build output directory: `dist`
- SPA/legal redirects: already provided by `public/_redirects`
- Deploy command: `npm run deploy`
- Worker name: `calendar-management-2`
- Public URL: `https://calendar-management-2.halinh280107.workers.dev`

## Option A — Connect the repository in Cloudflare

1. Open the Cloudflare dashboard.
2. Go to **Workers & Pages → Create → Workers → Connect to Git**.
3. authorize and select `halianhhhhhhhh/Calendar-Management`.
4. Set production branch to `main`.
5. Set build command to `npm run build`.
6. Set build output directory to `dist`.
7. Leave environment variables empty; the app has no secrets.
8. Save and deploy.
9. Copy the generated `*.pages.dev` URL.

## Option B — Authorize Supervisor to deploy

1. Run `npx wrangler login` in this repository.
2. Complete Cloudflare authorization in the opened browser.
3. Tell Supervisor the preferred Pages project name.
4. Supervisor will create the project, push this deployment package, deploy, and verify the URL.

## Required post-deployment checks

- `/` returns the dashboard.
- `/privacy` returns the privacy page.
- `/support` returns the support page.
- Add/edit/complete/delete for event, deadline, and note flows works after reload.
- Layout is usable at 360px, 768px, and 1024px or wider.
- Light and dark themes render correctly.
- Browser storage contains app data only; no access token is stored.

## After a successful deployment

Record the final URL in `shopify.app.calendar-management.toml` as:

- `application_url`
- `app_preferences.url`

Then verify the embedded app in a Shopify development store before any submission step.
