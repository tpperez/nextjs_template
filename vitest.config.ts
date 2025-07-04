import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov', 'html'],
      reportsDirectory: './coverage',

      include: [
        'app/components/**/*.{ts,tsx}',
        'app/hooks/**/*.{ts,tsx}',
        'app/services/**/*.{ts,tsx}',
        'app/stores/**/*.{ts,tsx}',
        'app/utils/**/*.{ts,tsx}',
        'app/views/**/*.{ts,tsx}',
      ],

      exclude: [
        '.docs/',
        '.next/',
        '**/*.const.ts',
        '**/*.{test}.{ts,tsx}',
        '**/*.{type}.ts',
        '**/*.config.{js,ts,mjs}',
        '**/*.d.ts',
        '**/error.tsx',
        '**/index.ts',
        '**/layout.tsx',
        '**/loading.tsx',
        '**/middleware.ts',
        '**/not-found.tsx',
        '**/page.tsx',
        '**/vitest.setup.ts',
        'coverage/',
        'node_modules/',
        'public/',
      ],

      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './'),
    },
  },
})
