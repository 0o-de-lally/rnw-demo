import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getConfig } from '../config/appConfig';
import { Aptos, AptosConfig, AptosSettings, Network } from 'open-libra-sdk';
import { styles } from '../styles';
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

  const fetchLedgerInfo = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get the client from the app config
      const cfg = getConfig();

      //////// TO USE THE APTOS ßSDK
      // let settings: AptosSettings = {
      //   clientConfig: {
      //     WITH_CREDENTIALS: false,
      //     // HEADERS: {
      //     //   'Content-Type': 'application/json',
      //     // },
      //   },
      //   network: Network.TESTNET,
      //   fullnode: cfg.apiUrl,
      // };
      // let config = new Aptos (new AptosConfig(settings));
      let config = cfg.client;

      // Fetch ledger info
      console.log('Fetching ledger info...');
      const info = await config.getLedgerInfo();
      console.log('Ledger info received:', info);
      setLedgerInfo(info);
    } catch (err) {
      console.error('Error fetching ledger info:', err);
      setError(`Failed to fetch ledger information: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLedgerInfo();
  }, []);

  const renderJson = () => {
    if (!ledgerInfo) return null;
    return JSON.stringify(ledgerInfo, null, 2);
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>LibraClient</Text>

        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Fetching ledger information...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LibraClient</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchLedgerInfo}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Refresh Ledger Info</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          <Text style={styles.subtitle}>Libra Blockchain Status:</Text>
          {ledgerInfo && (
            <View style={styles.jsonContainer}>
              <Text style={styles.jsonText}>{renderJson()}</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

export default LedgerInfo;
