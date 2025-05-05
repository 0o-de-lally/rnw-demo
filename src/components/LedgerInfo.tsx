import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator } from 'react-native';
import { getConfig } from '../config/appConfig';
import { arePolyfillsLoaded } from '../config/polyfills';

interface LedgerInfoData {
  chain_id: number;
  block_height: string;
  epoch: string;
  ledger_version: string;
  ledger_timestamp: string;
  // Add other fields as needed
}

const LedgerInfo: React.FC = () => {
  const [ledgerInfo, setLedgerInfo] = useState<LedgerInfoData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [polyfillsLoaded, setPolyfillsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // Check if our polyfills are loaded
    const polyfillsStatus = arePolyfillsLoaded();
    setPolyfillsLoaded(polyfillsStatus);

    if (!polyfillsStatus) {
      setError('Browser polyfills not loaded correctly. SDK may not work properly.');
      setLoading(false);
      return;
    }

    const fetchLedgerInfo = async () => {
      try {
        // Get the client from the app config
        const { client } = getConfig();

        // Fetch ledger info
        console.log('Fetching ledger info...');
        const info = await client.getLedgerInfo();
        console.log('Ledger info received:', info);
        setLedgerInfo(info);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ledger info:', err);
        setError(`Failed to fetch ledger information: ${err instanceof Error ? err.message : String(err)}`);
        setLoading(false);
      }
    };

    fetchLedgerInfo();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Fetching ledger information...</Text>
        {polyfillsLoaded && <Text style={styles.successText}>Polyfills loaded successfully</Text>}
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
        <Text style={styles.polyfillStatus}>
          Polyfills status: {polyfillsLoaded ? 'Loaded ✅' : 'Not loaded ❌'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Libra Blockchain Status</Text>
      {ledgerInfo && (
        <View style={styles.infoContainer}>
          <InfoRow label="Chain ID" value={ledgerInfo.chain_id.toString()} />
          <InfoRow label="Block Height" value={ledgerInfo.block_height} />
          <InfoRow label="Ledger Version" value={ledgerInfo.ledger_version} />
          <InfoRow label="Epoch" value={ledgerInfo.epoch} />
          <InfoRow
            label="Timestamp"
            value={new Date(Number(ledgerInfo.ledger_timestamp) / 1000).toLocaleString()}
          />
        </View>
      )}
      <Text style={styles.polyfillStatus}>
        Polyfills status: {polyfillsLoaded ? 'Loaded ✅' : 'Not loaded ❌'}
      </Text>
    </View>
  );
};

const InfoRow: React.FC<{label: string; value: string}> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontWeight: 'bold',
    width: 140,
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  successText: {
    color: 'green',
    marginTop: 8,
  },
  polyfillStatus: {
    marginTop: 12,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  }
});

export default LedgerInfo;
