import React from 'react';
import { View, StyleSheet } from 'react-native';
import HelloWorld from './components/HelloWorld';
import LedgerInfo from './components/LedgerInfo';
import TestApi from './components/TestApi';
import TestAxios from './components/TestAxios';

const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <LedgerInfo />
            <TestApi />
            <TestAxios />
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
