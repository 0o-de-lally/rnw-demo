import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Link } from "react-router-dom";

import LedgerInfoView from "../components/LedgerInfo";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer</Text>
      <Text style={styles.subtitle}>URL path: /</Text>
      <LedgerInfoView />

      <Link
        to="/details"
        style={{
          textDecorationLine: "underline",
          color: "#007AFF",
          marginTop: 16,
        }}
      >
        <Text>Go to Details</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: "#666",
  },
});

export default HomeScreen;
