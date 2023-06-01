import { fileURLToPath, URL } from 'node:url'

import viteCompression from 'vite-plugin-compression'
import Unocss from 'unocss/vite'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// 按需加载
import Components from 'unplugin-vue-components/vite'
// 按需加载antdv
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/demo-vue/',
  // build: {
  //   outDir:"./demo"
  // },
  plugins: [
    Unocss({ /* options */ }),
    vue(),
    vueJsx(),
    Components({
      resolvers: [AntDesignVueResolver()],
    }),
    // viteCompression({
    //   threshold: 512000,
    // }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
