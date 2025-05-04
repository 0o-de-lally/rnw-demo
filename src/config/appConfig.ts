// Simple configuration module that checks for CI environment variable

import { LOCAL_TESTNET_API } from "../local_testnet/compose";

interface AppConfig {
  apiUrl: string;
  // Add other configuration properties as needed
}

// Check if running in CI environment
const isCI = process && process.env.CI === 'true' || false;

const config: AppConfig = {
  apiUrl: isCI
    ? LOCAL_TESTNET_API // CI URL
    : 'https://twin-rpc.openlibra.space/v1',    // Production URL

  // Add other configuration properties as needed
};

export default config;
