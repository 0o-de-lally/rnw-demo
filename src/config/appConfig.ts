// Simple configuration module using build-time environment variables

import { LibraClient, Network } from "open-libra-sdk";
import { LOCAL_TESTNET_API } from "../local_testnet/compose";

interface AppConfig {
  apiUrl: string,
  client: LibraClient,
  // Add other configuration properties as needed
}

// Use build-time environment variables with fallbacks
const BUILD_API_URL = import.meta?.env?.VITE_LIBRA_URL || process.env.REACT_APP_LIBRA_URL;
const BUILD_NETWORK = import.meta?.env?.VITE_LIBRA_NETWORK || process.env.REACT_APP_LIBRA_NETWORK;

let config: AppConfig;

function setConfigOnBoot(): AppConfig {
  // Default to use the local testnet URL or build-time provided URL
  // development and tests should not run on production URLs
  const apiUrl = BUILD_API_URL || LOCAL_TESTNET_API;

  // Determine network based on build environment variables
  const network = BUILD_NETWORK === 'MAINNET' ? Network.MAINNET : Network.TESTNET;

  const client = new LibraClient(network, apiUrl);
  return { apiUrl, client };
}

function getConfig(): AppConfig {
  if (!config) {
    config = setConfigOnBoot();
  }
  return config;
}

export { getConfig };
