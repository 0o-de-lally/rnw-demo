import React from "react";
import { Text, View } from "react-native";
import LedgerInfoView from "./components/LedgerInfo";
import { styles } from "./styles";

const App: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explorer</Text>
      <LedgerInfoView />
    </View>
  );
};

export default App;
