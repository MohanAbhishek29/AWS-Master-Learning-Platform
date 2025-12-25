import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Enables relative paths for file:// portability
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    host: true
  }
})
