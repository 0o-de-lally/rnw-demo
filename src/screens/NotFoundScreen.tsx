import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();

  // If not already using a hash route, retry with hash
  React.useEffect(() => {
    if (!window.location.hash) {
      // Rebuild the hash route from the current path
      const hashUrl = `#${window.location.pathname}${window.location.search}${window.location.hash}`;
      // Only retry if not already on a hash route
      window.location.replace(hashUrl);
    }
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>404</Text>
      <Text style={styles.subtitle}>Page Not Found</Text>
      <Text style={styles.message}>eek</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigate("/")}>
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 80,
    fontWeight: "bold",
    color: "#e74c3c",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
    color: "#666",
  },
  button: {
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default NotFoundScreen;
