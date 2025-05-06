import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getConfig } from '../config/appConfig';
import { styles } from '../styles';
import axios from 'axios';

const TestAxios = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const cfg = getConfig()
      // Using axios instead of fetch
      const response = await axios.get(cfg.apiUrl);

      // With axios, data is already parsed as JSON
      setData(response.data);
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
      <Text style={styles.title}>Axios</Text>

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
          <View style={styles.jsonContainer}>
            <Text style={styles.jsonText}>{renderJson()}</Text>
          </View>
        </>
      )}
    </View>
  );
};

export default TestAxios;
