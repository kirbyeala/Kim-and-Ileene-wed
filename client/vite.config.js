import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [vue(), VitePWA({
    registerType: 'autoUpdate',
    manifest: {
      name: 'Kim & Ileene Wedding Memories',
      short_name: 'K&I Memories',
      theme_color: '#f7f2e8',
      background_color: '#faf8f3',
      display: 'standalone',
      start_url: '/upload'
    },
    workbox: { runtimeCaching: [{ urlPattern: /^https:\/\/images\.unsplash\.com/, handler: 'CacheFirst' }] }
  })],
  server: { port: 5173 }
})
