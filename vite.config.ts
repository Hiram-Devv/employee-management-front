import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@/components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@/views': fileURLToPath(new URL('./src/views', import.meta.url)),
      '@/layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
      '@/api': fileURLToPath(new URL('./src/api', import.meta.url)),
      '@/types': fileURLToPath(new URL('./src/types', import.meta.url)),
      '@/lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
    },
  },
});
