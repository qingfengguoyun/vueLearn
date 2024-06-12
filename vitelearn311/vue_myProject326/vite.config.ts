import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import os from 'os';

// VITE_APP_ENV= 'development' / 'publish'
const MODE="development"

const IS_DEVELOP=true;

// 远程（部署时）后端服务器ip
const REMOTE_BASE_IP='http://123.56.221.66'
const REMOTE_SERVER_IP='123.56.221.66'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VueSetupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  base:"./",
  server:{
    host: '0.0.0.0',
    port: 3000,
    proxy:{
      '/ws': {
        target: IS_DEVELOP?`http://${getNetworkIp()}:8271`:`${REMOTE_BASE_IP}:8271`,
        ws: true,
      },
    },
  },
  // 设置环境变量(重点)
  // 注意：define 中的键名应该是 'import.meta.env.BASE_IP'，这是 Vite 中用于定义环境变量的方式。
  define: {
    'import.meta.env.BASE_IP': IS_DEVELOP?JSON.stringify(`http://${getNetworkIp()}`):JSON.stringify(`${REMOTE_BASE_IP}`),
    'import.meta.env.SERVER_IP': IS_DEVELOP?JSON.stringify(`${getNetworkIp()}`):JSON.stringify(`${REMOTE_SERVER_IP}`),
    'import.meta.env.SERVER_PORT': 8200,
    'import.meta.env.SOCKETIO_PORT': 8271,
  },
})



function getNetworkIp() {
  let needHost = '';
  try {
    const network = os.networkInterfaces();
    for (const dev in network) {
      const iface = network[dev];
      if (iface) { // 添加这个条件检查，确保iface有被定义
        for (let i = 0; i < iface.length; i++) {
          const alias = iface[i];
          if (
            alias.family === 'IPv4' &&
            alias.address !== '127.0.0.1' &&
            !alias.internal
          ) {
            needHost = alias.address;
          }
        }
      }
    }
  } catch (e) {
    needHost = 'localhost';
  }
  return needHost;
}

