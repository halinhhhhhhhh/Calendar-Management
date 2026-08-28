import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        privacy: 'privacy.html',
        support: 'support.html',
      },
    },
  },
  server: {
    host: '127.0.0.1',
    allowedHosts: [
      'thickness-attending-groups-admission.trycloudflare.com',
      '.trycloudflare.com',
    ],
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
  },
})
