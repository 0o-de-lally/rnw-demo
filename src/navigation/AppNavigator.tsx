import React from "react";
import { Text } from "react-native";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import DetailsScreen from "../screens/DetailsScreen";
import NotFoundScreen from "../screens/NotFoundScreen";

// Define the types for our route params
export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  NotFound: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Get the base path from Vite - correct variable is BASE_URL
const basePath = import.meta.env.BASE_URL || "/";
// Remove leading and trailing slashes for consistency
const normalizedBasePath = basePath.replace(/^\/|\/$/g, "");

// Configuration for URL-based navigation
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [], // React Navigation uses the current origin for web
  config: {
    initialRouteName: "Home",
    screens: {
      Home: normalizedBasePath, // e.g., "" for local, "rnw-demo" for deployed
      Details: normalizedBasePath ? `${normalizedBasePath}/details` : "details", // e.g., "details" for local, "rnw-demo/details" for deployed
      NotFound: "*", // Catch-all for paths not found
    },
  },
};

const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <Stack.Navigator initialRouteName="Home" id={undefined}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={{ title: "Details" }}
        />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{
            title: "Page Not Found",
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
