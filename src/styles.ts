import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxWidth: 800,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333",
  },
  infoContainer: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 12,
  },
  infoRow: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  label: {
    fontWeight: "bold",
    width: 140,
    color: "#555",
  },
  value: {
    flex: 1,
    color: "#333",
  },
  loadingText: {
    marginTop: 10,
    color: "#666",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 12,
  },
});
