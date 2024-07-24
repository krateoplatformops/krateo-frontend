import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from "vite-plugin-svgr";
// import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), /*basicSsl(),*/ svgr({
    svgrOptions: {
      icon: true,
    },
  })],
  server: {
    proxy: {
      // "/apis": {
      //   target: "http://4.209.35.224:8081/apis",
      //   changeOrigin: true,
      //   rewrite: (path) => path.replace(/^\/apis/, ''),
      // },
      "/events": {
        target: "http://172.205.110.253:8083/events",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/events/, ''),
      }
    }
  }
})
