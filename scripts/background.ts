/**
 * Demo background script that runs continuously
 * Use with concurrently for development
 */
import { testnetDown, testnetUp } from "open-libra-sdk";
import { execSync } from "child_process";


console.log('🚀 Background script started');

const shutDown = () => {
  console.log('\n📉 Shutting down testnet...');
  testnetDown()
    .then(() => {
      console.log('✅ Testnet shutdown successfully');
    })
    .catch(error => {
      console.error('❌ Error shutting down testnet:', error);
    })
    .finally(() => {
      console.log('🛑 Background script terminated');
      process.exit(0);
    });
  }
// Find Docker location explicitly
try {
  const dockerPath = execSync('which docker').toString().trim();
  console.log(`Docker located at: ${dockerPath}`);

  // Directly check if Docker is running
  try {
    const dockerVersion = execSync('docker --version').toString().trim();
    console.log(`Docker version: ${dockerVersion}`);

    const dockerInfo = execSync('docker info').toString().trim().substring(0, 100) + '...';
    console.log(`Docker info: ${dockerInfo}`);
  } catch (error) {
    console.error('Docker is installed but not running properly:', error.message);
  }
} catch (error) {
  console.error('Error finding Docker:', error.message);
}

// Track how long the script has been running
const startTime = new Date();
let counter = 0;

// Only try to start testnet once at startup
console.log('Attempting to start OL testnet...');
testnetUp()
  .then(() => {
    console.log('✅ Testnet started successfully!');
  })
  .catch(error => {
    console.error('❌ Failed to start testnet:', error);

    // Attempt to print more detailed error info
    if (error.stdout) console.log('STDOUT:', error.stdout);
    if (error.stderr) console.log('STDERR:', error.stderr);
    if (error.cmd) console.log('Command attempted:', error.cmd);
    shutDown();
  });

// Function to log a status message
function logStatus() {
  const currentTime = new Date();
  const runningTime = Math.floor((currentTime - startTime) / 1000);

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
  shutDown();
});
