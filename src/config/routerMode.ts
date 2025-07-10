// This file sets a global variable for router selection based on environment
// Place in src/config/routerMode.ts

export const USE_HASH_ROUTER =
  window?.location.host.includes("github.io") ||
  import.meta.env.VITE_USE_HASH_ROUTER === "true";
