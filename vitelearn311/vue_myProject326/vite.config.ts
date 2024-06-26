import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import os from 'os';
import { Socket } from 'socket.io-client';

// VITE_APP_ENV= 'development' / 'publish'
const MODE="development"

// 是否为开发状态
const IS_DEVELOP=true;

// socket端口
const SOCKET_PORT=8271

// 服务端口
const SERVER_PORT=8200

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
    // proxy:设置代理转发
    // key：匹配请求的路径,正则表达式匹配
    // target: 目标服务器地址和端口号
    // changeOrigin: 代理服务器会更改请求的来源，使其看起来像是直接发送给目标服务器的请求
    // rewrite:(path)=>path.replacce(): 重写路径
    // 实际执行：从上至下依次匹配请求路径，匹配成功后以target替换请求中服务器+端口号的部分
    // 并根据rewrite修改请求路径
    proxy:{
      // socket.io-client请求的反向代理设置
      '/socket.io': {
        target: IS_DEVELOP?`http://${getNetworkIp()}:${SOCKET_PORT}`:`${REMOTE_BASE_IP}:${SOCKET_PORT}`,
        ws: true,
      },
      '/api':{
        target: IS_DEVELOP?`http://${getNetworkIp()}:${SERVER_PORT}`:`${REMOTE_BASE_IP}:${SERVER_PORT}`,
        changeOrigin:true,
      }
    },
  },
  // 设置环境变量(重点)
  // 注意：define 中的键名应该是 'import.meta.env.BASE_IP'，这是 Vite 中用于定义环境变量的方式。
  define: {
    'import.meta.env.BASE_IP': IS_DEVELOP?JSON.stringify(`http://${getNetworkIp()}`):JSON.stringify(`${REMOTE_BASE_IP}`),
    'import.meta.env.SERVER_IP': IS_DEVELOP?JSON.stringify(`${getNetworkIp()}`):JSON.stringify(`${REMOTE_SERVER_IP}`),
    'import.meta.env.SERVER_PORT': SERVER_PORT,
    'import.meta.env.SOCKETIO_PORT': SOCKET_PORT,
    __VUE_PROD_DEVTOOLS__:true,
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

