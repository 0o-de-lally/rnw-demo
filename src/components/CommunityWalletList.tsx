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
  CommunityWallet,
  fetchAllCommunityWalletData
} from "../utils/libraCalls";

type SortKey = 'address' | 'isV8Authorized' | 'isReauthProposed' | 'balance';
type SortDirection = 'asc' | 'desc';

const CommunityWalletList: React.FC = () => {
  const [wallets, setWallets] = useState<CommunityWallet[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>('address');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCommunityWalletData();
        setWallets(data);
        setLoading(false);
      } catch (err) {
        console.error("Error loading community wallet data:", err);
        setError(`Failed to load community wallet data: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };

    loadData();
  }, []);

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
          comparison = a.address.localeCompare(b.address);
          break;
        case 'isV8Authorized':
          comparison = Number(a.isV8Authorized) - Number(b.isV8Authorized);
          break;
        case 'isReauthProposed':
          comparison = Number(a.isReauthProposed) - Number(b.isReauthProposed);
          break;
        case 'balance':
          comparison = a.balance - b.balance;
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

  // Render each row in the table
  const renderWalletRow = ({ item }: { item: CommunityWallet }) => (
    <View style={tableStyles.row}>
      <Text style={tableStyles.addressCell} numberOfLines={1} ellipsizeMode="middle">
        {item.address}
      </Text>
      <Text style={tableStyles.cell}>
        {item.isV8Authorized ? 'Yes' : 'No'}
      </Text>
      <Text style={tableStyles.cell}>
        {item.isReauthProposed ? 'Yes' : 'No'}
      </Text>
      <Text style={tableStyles.cell}>
        {item.balance.toLocaleString()}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading community wallets...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
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
          keyExtractor={(item) => item.address}
          style={tableStyles.list}
        />
      </View>

      {wallets.length === 0 && !loading && !error && (
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
  },
  cell: {
    flex: 1,
  },
  addressCell: {
    flex: 1,
    fontFamily: 'monospace',
  },
  list: {
    maxHeight: 500, // Limit the height so it doesn't grow too large
  },
});

export default CommunityWalletList;
