import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig((configEnv) => {
  // Get the base Vite config
  const baseConfig = viteConfig(configEnv);

  return mergeConfig(baseConfig, {
    test: {
      environment: "node",
      browser: {
        enabled: true,
        instances: [{ browser: "chrome" }],
        provider: "webdriverio",
        headless: true,
      },
      // Make sure the polyfills are loaded for tests
      setupFiles: ["./src/config/polyfills.ts"],
      // Add global setup file that runs before all tests
      globalSetup: "./tests/setup/globalSetup.ts",
      // Ensure environment variables are loaded
      environmentOptions: {
        env: process.env,
      },
      poolOptions: {
        threads: {
          // e2e tests should run in a single thread
          // since there is a single docker testnet
          // running at a time.
          singleThread: true,
        },
      },
    },
  });
});
