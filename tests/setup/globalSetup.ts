import { testnetDown, testnetUp } from '../../local_testnet/compose';

// Setup once for parallelized tests
let isSetup = false;
let isTearingDown = false;

export default async function() {
  if (isSetup) return doTeardown;

  console.log("🚀 Global setup: starting testnet");
  // make sure we teardown any zombies first
  await testnetDown();
  await testnetUp();
  isSetup = true;

  // You can set global state that will be visible to teardown
  return doTeardown
}

async function doTeardown() {
  if (isTearingDown) return;
  console.log("🧹 Global teardown: stopping testnet");
  isTearingDown = true;
  await testnetDown();
  isSetup = false;
  isTearingDown = false;
}
