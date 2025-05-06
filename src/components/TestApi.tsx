import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getConfig } from '../config/appConfig';
import { styles } from '../styles';

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
      <Text style={styles.title}>Fetch()</Text>

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

export default TestApi;
