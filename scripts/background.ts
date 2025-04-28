/**
 * Demo background script that runs continuously
 * Use with concurrently for development
 */
import { testnetDown, testnetUp } from "open-libra-sdk";

console.log('🚀 Background script started');

// Track how long the script has been running
const startTime = new Date();
let counter = 0;

// Function to log a status message
function logStatus() {
  const currentTime = new Date();
  const runningTime = Math.floor((currentTime - startTime) / 1000);

  // Start the OL testnet
  testnetUp()
    .then(() => {
      console.log('Testnet is up');
    });

  counter++;

  console.log(`
┌─────────────────────────────────────┐
│ 🔄 Background process running       │
│ ⏱️  Running for: ${runningTime}s    │
│ 🔢 Counter: ${counter}              │
└─────────────────────────────────────┘
  `);
}

// Log status every 5 seconds
setInterval(logStatus, 5000);

// Keep the process alive (will run until manually terminated)
process.stdin.resume();

// Handle graceful shutdown
process.on('SIGINT', () => {
  testnetDown();
  console.log('\n🛑 Testnet terminated');
  process.exit(0);
});
