import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'node:url'
import path from 'path'

const projectDir = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  base: globalThis.process?.env?.VITE_BASE_PATH || '/',
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(projectDir, "./src"),
    },
  },
})