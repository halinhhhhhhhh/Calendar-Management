import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'
import { chromium } from 'playwright'
import { STORAGE_KEY } from '../src/storage.ts'

const root = resolve(import.meta.dirname, '..')
const outputDirectory = resolve(root, 'marketing')
const baseUrl = process.env.DEPLOY_BASE_URL ?? 'https://calendar-management-2.halinh280107.workers.dev'

await mkdir(outputDirectory, { recursive: true })
await mkdir(resolve(outputDirectory, 'screenshots'), { recursive: true })

const svg = await readFile(resolve(root, 'public/icons/app-icon.svg'))
await sharp(svg, { density: 384 }).resize(512, 512).png().toFile(resolve(outputDirectory, 'app-icon-512.png'))

const browser = await chromium.launch()

async function captureTheme(theme, label) {
  const context = await browser.newContext({
    viewport: { width: theme.width, height: theme.height },
    colorScheme: theme.mode,
    deviceScaleFactor: theme.scale,
    locale: 'en-US',
    timezoneId: 'Asia/Bangkok',
  })
  const page = await context.newPage()
  await page.addInitScript(([storageKey, appData]) => {
    window.localStorage.setItem(storageKey, JSON.stringify(appData))
  }, [STORAGE_KEY, theme.data])
  await page.goto(baseUrl, { waitUntil: 'networkidle' })
  await page.getByRole('heading', { name: 'Today' }).waitFor()
  await page.screenshot({ path: resolve(outputDirectory, 'screenshots', `${label}.png`), fullPage: true })
  await context.close()
}

const today = new Date()
const eventStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0, 0, 0)
const eventEnd = new Date(eventStart.getTime() + 45 * 60 * 1000)
const secondStart = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 30, 0, 0)
const secondEnd = new Date(secondStart.getTime() + 60 * 60 * 1000)
const deadline = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 17, 0, 0, 0)
const createdAt = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0, 0, 0).toISOString()
const updatedAt = createdAt
const appData = {
  events: [
    { id: 'event-next', title: 'Product planning call', start: eventStart.toISOString(), end: eventEnd.toISOString(), completed: false, createdAt, updatedAt },
    { id: 'event-second', title: 'Supplier follow-up', start: secondStart.toISOString(), end: secondEnd.toISOString(), completed: false, createdAt, updatedAt },
  ],
  deadlines: [
    { id: 'deadline-campaign', title: 'Approve campaign copy', due: deadline.toISOString(), completed: false, createdAt, updatedAt },
  ],
  notes: [
    { id: 'note-first', content: 'Confirm sample photos before the call', pinned: true, createdAt, updatedAt },
    { id: 'note-second', content: 'Review Q4 launch checklist', pinned: false, createdAt, updatedAt },
  ],
}

await captureTheme({ mode: 'light', width: 390, height: 844, scale: 2, data: appData }, 'dashboard-light-mobile')
await captureTheme({ mode: 'dark', width: 390, height: 844, scale: 2, data: appData }, 'dashboard-dark-mobile')
await captureTheme({ mode: 'light', width: 1440, height: 1000, scale: 1, data: appData }, 'dashboard-light-desktop')
await captureTheme({ mode: 'dark', width: 1440, height: 1000, scale: 1, data: appData }, 'dashboard-dark-desktop')

await browser.close()

const metadata = {
  generatedAt: new Date().toISOString(),
  baseUrl,
  icon: 'marketing/app-icon-512.png',
  screenshots: [
    'marketing/screenshots/dashboard-light-mobile.png',
    'marketing/screenshots/dashboard-dark-mobile.png',
    'marketing/screenshots/dashboard-light-desktop.png',
    'marketing/screenshots/dashboard-dark-desktop.png',
  ],
}
await writeFile(resolve(outputDirectory, 'assets.json'), `${JSON.stringify(metadata, null, 2)}\n`, 'utf8')
