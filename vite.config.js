/* eslint-disable no-undef */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
export default defineConfig({
  // https://github.com/vitejs/vite/issues/1973
  plugins: [
    react()
  ],
  // base: './',
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  }
})