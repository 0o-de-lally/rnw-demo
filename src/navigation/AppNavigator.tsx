import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';

// Define the types for our route params
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Configuration for URL-based navigation
const linking = {
  prefixes: ['http://localhost:5173'], // Adjust these URLs as needed
  config: {
    screens: {
      Home: '',
      Details: 'details',
    },
  },
};

const AppNavigator = () => {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        initialRouteName="Home"
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Home' }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: 'Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
