import { defineConfig } from 'vite'

export default defineConfig({
    test: {
      exclude: [
        "node_modules",
        "dist",
        "build",
        "coverage",
      ],
      setupFiles: ['dotenv/config'],
    },
  })