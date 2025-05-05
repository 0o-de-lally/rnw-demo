import { testnetDown, testnetUp } from '../../local_testnet/compose';

export default async function() {
  console.log("🚀 Global setup: starting testnet");
  // make sure we teardown any zombies first
  await testnetDown();
  await testnetUp();

  // You can set global state that will be visible to teardown
  return doTeardown
}


async function doTeardown() {
  console.log("🧹 Global teardown: stopping testnet");
  await testnetDown();
}
