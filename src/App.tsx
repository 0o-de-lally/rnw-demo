import React from 'react';
import { View } from 'react-native';
import LedgerInfo from './components/LedgerInfo';
import { styles } from './styles';

const App: React.FC = () => {
    return (
        <View style={styles.container}>
            <LedgerInfo />
        </View>
    );
};

export default App;
