import React, { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { getConfig } from '../config/appConfig';
import {styles} from '../styles';

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

  useEffect(() => {

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
    </View>
  );
};

const InfoRow: React.FC<{label: string; value: string}> = ({ label, value }) => (
  <View style={styles.infoRow}>
    <Text style={styles.label}>{label}:</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

export default LedgerInfo;
