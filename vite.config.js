import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  resolve: { alias: { '@': '/src' } },
  plugins: [vue()],
  server: {
    host: true,
    port: 5173,
    usePolling: true,
  }
})
