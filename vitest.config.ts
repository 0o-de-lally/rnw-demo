import { defineConfig, mergeConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import viteConfig from './vite.config'

export default defineConfig(configEnv => {
  // Get the base Vite config
  const baseConfig = typeof viteConfig === 'function'
    ? viteConfig(configEnv)
    : viteConfig

  return mergeConfig(baseConfig, {
    plugins: [
      react(),
    ],
    test: {
      environment: 'node',
      browser: {
        enabled: true,
        instances: [{ browser: 'chrome' }],
        provider: 'webdriverio',
        headless: true,
      },
      // Make sure the polyfills are loaded for tests
      setupFiles: ['./src/config/polyfills.ts'],
      // Add global setup file that runs before all tests
      globalSetup: './tests/setup/globalSetup.ts',
      // Ensure environment variables are loaded
      environmentOptions: {
        env: process.env
      }
    }
  })
})
