import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import {resolve} from 'path'

const pathResolve = (dir: string) => {
  return resolve(__dirname, '.', dir);
};
const alias: Record<string, string> = {
  '@': pathResolve('./src'),
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend()
  ],
  resolve: {
    // alias: {
    //   '@': fileURLToPath(new URL('./src', import.meta.url))
    // }
    alias
  }
})
