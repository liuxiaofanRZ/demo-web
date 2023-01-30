import { fileURLToPath, URL } from 'node:url'

import viteCompression from 'vite-plugin-compression'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/demo',
  build: {
    outDir:"./demo"
  },
  plugins: [
    vue(),
    vueJsx(),
    viteCompression({
      threshold: 32000,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
