import {
  getCommunityWallets,
  isWalletV8Authorized,
  isReauthProposed,
  getWalletBalance,
} from "../utils/libraCalls";
import { AccountAddress } from "open-libra-sdk";

export interface EnhancedWallet {
  address: AccountAddress;
  isV8Authorized: boolean | null;
  isV8AuthorizedError?: string;
  isV8AuthorizedLoading: boolean;
  isReauthProposed: boolean | null;
  isReauthProposedError?: string;
  isReauthProposedLoading: boolean;
  balance: number | null;
  balanceError?: string;
  balanceLoading: boolean;
}

export async function fetchCommunityWalletAddresses(): Promise<
  AccountAddress[]
> {
  return getCommunityWallets();
}

export async function fetchEnhancedWallet(
  address: AccountAddress,
): Promise<EnhancedWallet> {
  const wallet: EnhancedWallet = {
    address,
    isV8Authorized: null,
    isV8AuthorizedLoading: true,
    isReauthProposed: null,
    isReauthProposedLoading: true,
    balance: null,
    balanceLoading: true,
  };

  // Fetch v8 authorization status
  try {
    wallet.isV8Authorized = await isWalletV8Authorized(address);
    wallet.isV8AuthorizedLoading = false;
  } catch (err) {
    wallet.isV8Authorized = null;
    wallet.isV8AuthorizedError = String(err);
    wallet.isV8AuthorizedLoading = false;
  }

  // Only fetch reauthorization proposal status if v8 is authorized
  if (wallet.isV8Authorized === true) {
    try {
      wallet.isReauthProposed = await isReauthProposed(address);
      wallet.isReauthProposedLoading = false;
    } catch (err) {
      wallet.isReauthProposed = null;
      wallet.isReauthProposedError = String(err);
      wallet.isReauthProposedLoading = false;
    }
  } else {
    wallet.isReauthProposed = null;
    wallet.isReauthProposedLoading = false;
  }

  // Fetch wallet balance
  try {
    const rawBalance = await getWalletBalance(address);
    wallet.balance = rawBalance != null ? rawBalance / 1_000_000 : null;
    wallet.balanceLoading = false;
  } catch (err) {
    wallet.balance = null;
    wallet.balanceError = String(err);
    wallet.balanceLoading = false;
  }

  return wallet;
}

export async function fetchAllEnhancedWallets(): Promise<EnhancedWallet[]> {
  const addresses = await fetchCommunityWalletAddresses();
  return Promise.all(addresses.map(fetchEnhancedWallet));
}
