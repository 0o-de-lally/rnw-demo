// Helper functions to call Libra view functions using open-libra-sdk
import { AccountAddress, addressFromString } from "open-libra-sdk";
import { getConfig } from "../config/appConfig";

export interface CommunityWallet {
  address: AccountAddress;
  isV8Authorized: boolean;
  isReauthProposed: boolean;
  balance: number;
}

/**
 * Get the list of community wallets from the root registry
 * @returns Array of community wallet addresses
 */
export async function getCommunityWallets(): Promise<AccountAddress[]> {
  try {
    const config = getConfig();
    const result = await config.client.viewJson({
      payload: {
        function: "0x1::donor_voice::get_root_registry",
        typeArguments: [],
        functionArguments: [],
      },
    });

    // The result should be an array of addresses
    let addrStrings: string[];

    // Handle different possible return formats
    if (Array.isArray(result[0])) {
      addrStrings = result[0] as string[];
    } else if (typeof result[0] === "string") {
      // Split comma-separated string if that's what's returned
      addrStrings = result[0].split(",").map((addr) => addr.trim());
    } else {
      // Try to get array from valueOf if it's an object with that method
      const value = result[0]?.valueOf();
      addrStrings = Array.isArray(value) ? value : [String(result[0])];
    }

    let accList: AccountAddress[] = addrStrings.map((addr) => {
      return addressFromString(addr); // Validate each address
    });

    return accList;
  } catch (error) {
    console.error("Error fetching community wallets:", error);
    throw new Error(
      `Failed to fetch community wallets: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Check if a community wallet is authorized for v8
 * @param walletAddress The address of the community wallet as AccountAddress
 * @returns Boolean indicating if wallet is authorized for v8
 */
export async function isWalletV8Authorized(
  walletAddress: AccountAddress,
): Promise<boolean> {
  try {
    const config = getConfig();
    const result = await config.client.viewJson({
      payload: {
        function: "0x1::reauthorization::is_v8_authorized",
        typeArguments: [],
        functionArguments: [walletAddress.toString()],
      },
    });

    // The MoveValue[] array contains the result at first position
    return result[0] as boolean;
  } catch (error) {
    console.error(
      `Error checking v8 authorization for ${walletAddress}:`,
      error,
    );
    throw new Error(
      `Failed to check v8 authorization: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Check if a reauthorization vote is underway for a community wallet
 * @param walletAddress The address of the community wallet as AccountAddress
 * @returns Boolean indicating if reauthorization vote is underway
 */
export async function isReauthProposed(
  walletAddress: AccountAddress,
): Promise<boolean> {
  try {
    const config = getConfig();
    const result = await config.client.viewJson({
      payload: {
        function: "0x1::donor_voice_governance::is_reauth_proposed",
        typeArguments: [],
        functionArguments: [walletAddress.toString()],
      },
    });

    // The MoveValue[] array contains the result at first position
    return result[0] as boolean;
  } catch (error) {
    console.error(
      `Error checking reauth proposal for ${walletAddress}:`,
      error,
    );
    throw new Error(
      `Failed to check reauth proposal: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Get the balance of a community wallet
 * @param walletAddress The address of the community wallet as AccountAddress
 * @returns The total balance of the wallet
 */
export async function getWalletBalance(
  walletAddress: AccountAddress,
): Promise<number> {
  try {
    const config = getConfig();
    const result = await config.client.viewJson({
      payload: {
        function: "0x1::ol_account::balance",
        typeArguments: [],
        functionArguments: [walletAddress.toString()],
      },
    });

    // The result is an array of two numbers: [unlockedBalance, totalBalance]
    const balanceArray = result as number[];
    return balanceArray[1]; // Return the total balance
  } catch (error) {
    console.error(`Error fetching balance for ${walletAddress}:`, error);
    throw new Error(
      `Failed to fetch wallet balance: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}

/**
 * Fetch all data for all community wallets
 * @returns Array of CommunityWallet objects with complete information
 */
export async function fetchAllCommunityWalletData(): Promise<
  CommunityWallet[]
> {
  try {
    // First get all wallet addresses
    const walletAddresses = await getCommunityWallets();

    // For each address, fetch all the required data
    const walletData = await Promise.all(
      walletAddresses.map(async (address) => {
        try {
          const [isV8Auth, isReauth, balance] = await Promise.all([
            isWalletV8Authorized(address),
            isReauthProposed(address),
            getWalletBalance(address),
          ]);

          return {
            address,
            isV8Authorized: isV8Auth,
            isReauthProposed: isReauth,
            balance,
          };
        } catch (error) {
          console.error(`Error processing data for wallet ${address}:`, error);
          // Return wallet with error indicators rather than failing the entire request
          return {
            address,
            isV8Authorized: false,
            isReauthProposed: false,
            balance: 0,
            error: String(error),
          };
        }
      }),
    );

    return walletData;
  } catch (error) {
    console.error("Error fetching all community wallet data:", error);
    throw new Error(
      `Failed to fetch community wallet data: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
}
