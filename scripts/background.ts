import { testnetUp, testnetDown, DOCKER_URL, LibraClient, Network } from 'open-libra-sdk';

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

    // Setup the shutdown handler
    setupShutdownHandler();

    console.log('Starting local testnet...');
    // Start the testnet and wait for it to be ready
    const started = await testnetUp();

    if (started) {
      console.log('✅ Local testnet is up and running!');
      console.log(`API endpoint: ${DOCKER_URL}`);

      // Create a client connected to the local testnet
      const client = new LibraClient(Network.TESTNET, DOCKER_URL);

      // Verify the connection by getting the ledger info
      const ledgerInfo = await client.getLedgerInfo();
      console.log('\nTestnet status:');
      console.log(`Chain ID: ${ledgerInfo.chain_id}`);
      console.log(`Blockchain version: ${ledgerInfo.block_height}`);
      console.log(`Ledger timestamp: ${new Date(ledgerInfo.ledger_timestamp / 1000).toISOString()}`);

      console.log('\nTestnet is ready for testing. Press Ctrl+C to shut down.');

      // Keep the process running until interrupted
      console.log('\nThe testnet will remain running until you press Ctrl+C...');
    } else {
      console.error('❌ Failed to start local testnet');
    }
    await testnetDown();
  } catch (error) {
    console.error('Error occurred:', error);
    await testnetDown();
    process.exit(1);
  }
}

// Run the main function
main().catch(error => {
  console.error('Unhandled error in main:', error);
  process.exit(1);
});
