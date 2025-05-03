// Simple configuration module that checks for CI environment variable

interface AppConfig {
  apiUrl: string;
  // Add other configuration properties as needed
}

// Check if running in CI environment
const isCI = process.env.CI === 'true' || false;

const config: AppConfig = {
  apiUrl: isCI
    ? 'https://api-ci.example.com/v1'  // CI URL
    : 'https://api.example.com/v1',    // Production URL

  // Add other configuration properties as needed
};

// Log the configuration in development mode
if (__DEV__) {
  console.log(`Running in ${isCI ? 'CI' : 'production'} environment`);
  console.log('Config:', config);
}

export default config;
