// Simple configuration module using build-time environment variables

// Import polyfills before any other imports
import "./polyfills";

// Import implementation from the browser bundle
import { LibraClient, Network } from "open-libra-sdk";

interface AppConfig {
  apiUrl: string;
  client: LibraClient;
  // Add other configuration properties as needed
}

// Use build-time environment variables with fallbacks
const BUILD_API_URL =
  import.meta.env.VITE_LIBRA_URL || "http://localhost:8380/v1";
const BUILD_NETWORK = import.meta.env.VITE_LIBRA_NETWORK || "TESTNET";

let config: AppConfig;

function setConfigOnBoot(): AppConfig {
  // Determine network based on build environment variables
  const network =
    BUILD_NETWORK === "MAINNET" ? Network.MAINNET : Network.TESTNET;

  console.log(
    `Creating LibraClient with network=${network}, url=${BUILD_API_URL}`,
  );

  // The CORS headers are now handled by our custom fetch implementation in polyfills.ts
  const client = new LibraClient(network, BUILD_API_URL);

  return { apiUrl: BUILD_API_URL, client };
}

function getConfig(): AppConfig {
  if (!config) {
    config = setConfigOnBoot();
  }
  return config;
}

export { getConfig };
