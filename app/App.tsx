import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeSettingsTabs from './components/HomeSettingsTabs';

/**
 * Main App component with proper navigation setup
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <NavigationContainer>
        <HomeSettingsTabs />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
