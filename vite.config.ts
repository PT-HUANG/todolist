import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
      interval: 100,
    },
    host: '0.0.0.0',
    port: 3000,
  },
  base: "/todolist-frontend/",
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
