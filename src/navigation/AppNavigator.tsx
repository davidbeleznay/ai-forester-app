import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeSettingsTabs from '../components/HomeSettingsTabs';
import CulvertInput from '../screens/CulvertInput';
import CulvertResults from '../screens/CulvertResults';

// Define the types for the navigator
export type RootStackParamList = {
  Main: undefined;
  CulvertInput: undefined;
  CulvertResults: { results: any };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={HomeSettingsTabs} />
        <Stack.Screen name="CulvertInput" component={CulvertInput} />
        <Stack.Screen name="CulvertResults" component={CulvertResults} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;