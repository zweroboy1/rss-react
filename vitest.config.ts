import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    css: false,
    coverage: {
      all: true,
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['**/*.tsx'],
      exclude: [],
    },
  },
})