import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'project1.html'),
        projects: resolve(__dirname, 'project2.html')
      }
    }
  }
});
