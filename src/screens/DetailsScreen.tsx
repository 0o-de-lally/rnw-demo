import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useNavigate } from "react-router-dom";

const DetailsScreen = () => {
  const navigate = useNavigate();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Details Screen</Text>
      <Text style={styles.subtitle}>URL path: /details</Text>
      <Button title="Go back to Home" onPress={() => navigate("/")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f0f0f0",
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

export default DetailsScreen;
