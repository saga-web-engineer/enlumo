/// <reference types="vitest" />
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    poolOptions: {
      forks: {
        singleFork: true
      },
    }
  },
  resolve: {
    alias: {
      '@': __dirname + '/src',
    },
  }
})