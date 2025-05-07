// TODO: we should be using the docker testnet tools from
// open-libra-sdk once we solve the path issues
import { LOCAL_TESTNET_API, testnetUp, testnetDown } from '../local_testnet/compose';


// Function to handle cleanup when the script is interrupted
function setupShutdownHandler() {
  // Handle SIGINT (Ctrl+C) to properly shut down the testnet
  process.on('SIGINT', async () => {
    console.log('\nShutting down testnet...');
    await testnetDown();
    console.log('Testnet shut down successfully');
    process.exit(0);
  });
}

async function main() {
  try {

    await testnetDown();

    // Setup the shutdown handler

    console.log('Starting local testnet...');
    // Start the testnet and wait for it to be ready
    const started = await testnetUp();

    if (started) {
      console.log('✅ Local testnet is up and running!');
      console.log(`API endpoint: ${LOCAL_TESTNET_API}`);
      // loop here until the user presses Ctrl+C

      console.log('Press Ctrl+C to stop the testnet');
      setupShutdownHandler();

      // Keep the process alive
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
   } catch (error) {
      console.error('Error starting local testnet:', error);
      testnetDown();
      process.exit(1);
    }
}

// Run the main function
await main()
