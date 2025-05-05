import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getConfig } from '../config/appConfig';

const TestApi = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cfg = getConfig()
      // Using JSONPlaceholder as a sample API
      // const response = await fetch('https://twin-rpc.openlibra.space/v1');
      const response = await fetch(cfg.apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || 'An error occurred fetching the data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderJson = () => {
    if (!data) return null;
    return JSON.stringify(data, null, 2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Test</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={fetchData}
        disabled={loading}
      >
        <Text style={styles.buttonText}>Refresh Data</Text>
      </TouchableOpacity>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={styles.loadingText}>Loading data...</Text>
        </View>
      )}

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}

      {data && (
        <>
          <Text style={styles.subtitle}>Response Data:</Text>
          <ScrollView style={styles.jsonContainer}>
            <Text style={styles.jsonText}>{renderJson()}</Text>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    color: '#666',
  },
  errorContainer: {
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: '#d32f2f',
  },
  jsonContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 4,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  jsonText: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
});

export default TestApi;
