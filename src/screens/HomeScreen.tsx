import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigate } from "react-router-dom";
import LedgerInfoView from "../components/LedgerInfo";

const HomeScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer</Text>
      <Text style={styles.subtitle}>URL path: /</Text>
      <LedgerInfoView />

      <Button title="Go to Details" onPress={() => navigate("/details")} />
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
