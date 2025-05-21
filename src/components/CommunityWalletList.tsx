import React, { useEffect, useState, useMemo } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { styles } from "../styles";
import {
  getCommunityWallets,
  isWalletV8Authorized,
  isReauthProposed,
  getWalletBalance
} from "../utils/libraCalls";
import { AccountAddress } from "open-libra-sdk";

type SortKey = 'address' | 'isV8Authorized' | 'isReauthProposed' | 'balance';
type SortDirection = 'asc' | 'desc';

// Enhanced wallet type to handle loading states and errors for individual fields
interface EnhancedWallet {
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

const CommunityWalletList: React.FC = () => {
  const [addresses, setAddresses] = useState<AccountAddress[]>([]);
  const [wallets, setWallets] = useState<EnhancedWallet[]>([]);
  const [addressesLoading, setAddressesLoading] = useState<boolean>(true);
  const [addressesError, setAddressesError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('address');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // Step 1: Fetch all wallet addresses
  useEffect(() => {
    const loadAddresses = async () => {
      try {
        setAddressesLoading(true);
        setAddressesError(null);

        const addressList = await getCommunityWallets();

        if (addressList.length === 0) {
          setAddressesError("No community wallets found in the registry.");
        } else {
          setAddresses(addressList);
          // Initialize wallet data with addresses only
          const initialWallets = addressList.map(address => ({
            address,
            isV8Authorized: null,
            isV8AuthorizedLoading: true,
            isReauthProposed: null,
            isReauthProposedLoading: true,
            balance: null,
            balanceLoading: true
          }));
          setWallets(initialWallets);
        }
      } catch (err) {
        console.error("Error loading community wallet addresses:", err);
        setAddressesError(`Failed to load community wallets: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setAddressesLoading(false);
      }
    };

    loadAddresses();
  }, []);

  // Step 2: Once we have addresses, fetch additional data for each wallet
  useEffect(() => {
    if (addresses.length === 0) return;

    // Load details for each wallet in parallel
    addresses.forEach(async (address, index) => {
      // Helper function to update a specific wallet's data
      const updateWalletData = (
        walletIndex: number,
        field: keyof EnhancedWallet,
        value: number,
        errorField?: string,
        error?: string
      ) => {
        setWallets(prevWallets => {
          const updatedWallets = [...prevWallets];
          updatedWallets[walletIndex] = {
            ...updatedWallets[walletIndex],
            [field]: value,
            ...(errorField && error ? { [errorField]: error } : {})
          };
          return updatedWallets;
        });
      };

      // Fetch v8 authorization status
      try {
        const isV8Auth = await isWalletV8Authorized(address);
        updateWalletData(index, 'isV8Authorized', isV8Auth);
      } catch (err) {
        console.error(`Error checking v8 authorization for ${address}:`, err);
        updateWalletData(
          index,
          'isV8Authorized',
          null,
          'isV8AuthorizedError',
          String(err)
        );
      } finally {
        updateWalletData(index, 'isV8AuthorizedLoading', false);
      }

      // Fetch reauthorization proposal status
      try {
        const isReauth = await isReauthProposed(address);
        updateWalletData(index, 'isReauthProposed', isReauth);
      } catch (err) {
        console.error(`Error checking reauth proposal for ${address}:`, err);
        updateWalletData(
          index,
          'isReauthProposed',
          null,
          'isReauthProposedError',
          String(err)
        );
      } finally {
        updateWalletData(index, 'isReauthProposedLoading', false);
      }

      // Fetch wallet balance
      try {
        const balance = await getWalletBalance(address);
        updateWalletData(index, 'balance', balance);
      } catch (err) {
        console.error(`Error fetching balance for ${address}:`, err);
        updateWalletData(
          index,
          'balance',
          null,
          'balanceError',
          String(err)
        );
      } finally {
        updateWalletData(index, 'balanceLoading', false);
      }
    });
  }, [addresses]);

  // Handle sorting logic
  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      // Toggle direction if clicking the same column
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Default to ascending when changing columns
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Sort the wallets based on current sort key and direction
  const sortedWallets = useMemo(() => {
    if (!wallets.length) return [];

    return [...wallets].sort((a, b) => {
      let comparison = 0;

      switch (sortKey) {
        case 'address':
          comparison = a.address.toString().localeCompare(b.address.toString());
          break;
        case 'isV8Authorized':
          // Handle null values during loading or errors
          if (a.isV8Authorized === null && b.isV8Authorized === null) comparison = 0;
          else if (a.isV8Authorized === null) comparison = -1;
          else if (b.isV8Authorized === null) comparison = 1;
          else comparison = Number(a.isV8Authorized) - Number(b.isV8Authorized);
          break;
        case 'isReauthProposed':
          // Handle null values during loading or errors
          if (a.isReauthProposed === null && b.isReauthProposed === null) comparison = 0;
          else if (a.isReauthProposed === null) comparison = -1;
          else if (b.isReauthProposed === null) comparison = 1;
          else comparison = Number(a.isReauthProposed) - Number(b.isReauthProposed);
          break;
        case 'balance':
          // Handle null values during loading or errors
          if (a.balance === null && b.balance === null) comparison = 0;
          else if (a.balance === null) comparison = -1;
          else if (b.balance === null) comparison = 1;
          else comparison = a.balance - b.balance;
          break;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [wallets, sortKey, sortDirection]);

  // Render the table header with sort buttons
  const renderHeader = () => (
    <View style={tableStyles.headerRow}>
      <TouchableOpacity
        style={tableStyles.headerCell}
        onPress={() => handleSort('address')}
      >
        <Text style={tableStyles.headerText}>
          Address {sortKey === 'address' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tableStyles.headerCell}
        onPress={() => handleSort('isV8Authorized')}
      >
        <Text style={tableStyles.headerText}>
          V8 Authorized {sortKey === 'isV8Authorized' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tableStyles.headerCell}
        onPress={() => handleSort('isReauthProposed')}
      >
        <Text style={tableStyles.headerText}>
          Reauth Proposed {sortKey === 'isReauthProposed' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={tableStyles.headerCell}
        onPress={() => handleSort('balance')}
      >
        <Text style={tableStyles.headerText}>
          Balance {sortKey === 'balance' ? (sortDirection === 'asc' ? '↑' : '↓') : ''}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Helper function to render cell content based on loading/error state
  const renderCellContent = (value: number, isLoading: boolean, error?: string) => {
    if (isLoading) return <ActivityIndicator size="small" color="#0088ff" />;
    if (error || value === null) return <Text style={tableStyles.errorCell}>n/a</Text>;
    if (typeof value === 'boolean') return <Text>{value ? 'Yes' : 'No'}</Text>;
    if (typeof value === 'number') return <Text>{value.toLocaleString()}</Text>;
    return <Text>{String(value)}</Text>;
  };

  // Render each row in the table
  const renderWalletRow = ({ item }: { item: EnhancedWallet }) => (
    <View style={tableStyles.row}>
      <Text style={tableStyles.addressCell} numberOfLines={1} ellipsizeMode="middle">
        {item.address.toString()}
      </Text>
      <View style={tableStyles.cell}>
        {renderCellContent(item.isV8Authorized, item.isV8AuthorizedLoading, item.isV8AuthorizedError)}
      </View>
      <View style={tableStyles.cell}>
        {renderCellContent(item.isReauthProposed, item.isReauthProposedLoading, item.isReauthProposedError)}
      </View>
      <View style={tableStyles.cell}>
        {renderCellContent(item.balance, item.balanceLoading, item.balanceError)}
      </View>
    </View>
  );

  if (addressesLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading community wallets...</Text>
      </View>
    );
  }

  if (addressesError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{addressesError}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Community Wallets</Text>

      <View style={tableStyles.table}>
        {renderHeader()}

        <FlatList
          data={sortedWallets}
          renderItem={renderWalletRow}
          keyExtractor={(item) => item.address.toString()}
          style={tableStyles.list}
        />
      </View>

      {wallets.length === 0 && !addressesLoading && !addressesError && (
        <Text style={styles.loadingText}>No community wallets found.</Text>
      )}
    </View>
  );
};

// Additional styles specific to the table component
const tableStyles = StyleSheet.create({
  table: {
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 12,
  },
  headerCell: {
    flex: 1,
    paddingVertical: 8,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#444',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 12,
    alignItems: 'center',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
  },
  addressCell: {
    flex: 1,
    fontFamily: 'monospace',
  },
  errorCell: {
    color: '#888',
    fontStyle: 'italic',
  },
  list: {
    maxHeight: 500, // Limit the height so it doesn't grow too large
  },
});

export default CommunityWalletList;
