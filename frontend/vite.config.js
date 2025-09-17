import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url';
// https://vite.dev/config/
export default defineConfig(() => {

  const currentDir = fileURLToPath(new URL('.', import.meta.url))

  return {
    plugins: [
      react(),
      tailwindcss()
    ],
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: "http://127.0.0.1:8000",
          changeOrigin: true,
          headers: {
            Accept: 'application/json',
          },
        }
      }
    },
    resolve: {
      alias: {
        // Aqui estamos dizendo ao Vite: sempre que encontrar '@' no início de um import,
        // substitua por 'caminho/absoluto/do/projeto/src'
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
  }
})
