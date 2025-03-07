import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: '/grc/',
  plugins: [react()],
  server: {
    fs: {
      // Allow serving files from one level up (the project root)
      allow: ['..'],
    },
  },
  resolve: {
    alias: {
      '@schemas': resolve(__dirname, '../'),
      '@examples': resolve(__dirname, '../examples'),
    },
  },
  build: {
    outDir: '../dist/frontend',
    emptyOutDir: true,
  },
})
