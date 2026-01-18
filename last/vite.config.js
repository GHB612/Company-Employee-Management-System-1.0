import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080/employee_management_system_war',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // 可能需要调整此处
      },
    },
  },
  
})