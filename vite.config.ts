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
      "/apis": {
        // target: "http://20.105.26.194:8080/apis",
        // target: "http://20.105.44.127:8080/apis",
        target: "http://68.219.40.93:8081/apis",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/apis/, ''),
      }
    }
  }
})
