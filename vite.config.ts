import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true
    }),
    react()
  ],
  base: './',
  publicDir: './public',
  resolve: {
    alias: {
      '@public': resolve(__dirname, 'public'),
      '@components': resolve(__dirname, 'src/components'),
      '@constants': resolve(__dirname, 'src/constants'),
      '@context': resolve(__dirname, 'src/context'),
      '@data': resolve(__dirname, 'src/data'),
      '@hooks': resolve(__dirname, 'src/hooks'),
      '@types': resolve(__dirname, 'src/types'),
      '@utils': resolve(__dirname, 'src/utils'),
      '@styles': resolve(__dirname, 'src/styles'),
      '@screens': resolve(__dirname, 'src/screens'),
      '@classes': resolve(__dirname, 'src/classes'),
      '@pages': resolve(__dirname, 'src/pages')
    }
  }
});
