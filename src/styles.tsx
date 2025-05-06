import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
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
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 6,
    padding: 12,
  },
  infoRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  label: {
    fontWeight: 'bold',
    width: 140,
    color: '#555',
  },
  value: {
    flex: 1,
    color: '#333',
  },
  successText: {
    color: 'green',
    marginTop: 8,
  },
  polyfillStatus: {
    marginTop: 12,
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  }
});
