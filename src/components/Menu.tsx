import React from "react";
import { Link } from "react-router-dom";
import { View, Text, StyleSheet } from "react-native";

const Menu: React.FC = () => (
  <View style={styles.menuContainer}>
    <Text style={styles.menuTitle}>Menu</Text>
    <Link to="/" style={styles.menuLink}>
      Home
    </Link>
    <Link to="/community-wallets" style={styles.menuLink}>
      Community Wallets
    </Link>
    <Link to="/details" style={styles.menuLink}>
      Details
    </Link>
  </View>
);

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    gap: 24,
  },
  menuTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginRight: 24,
    color: "#333",
  },
  menuLink: {
    fontSize: 15,
    color: "#007bff",
    textDecorationLine: "underline",
    marginHorizontal: 8,
  },
});

export default Menu;
