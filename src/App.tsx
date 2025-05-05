import React from 'react';
import { View, StyleSheet } from 'react-native';
import HelloWorld from './components/HelloWorld';
import LedgerInfo from './components/LedgerInfo';

const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <HelloWorld />
            <LedgerInfo />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
        maxWidth: 800
    }
});

export default App;
