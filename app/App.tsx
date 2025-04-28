import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import HomeSettingsTabs from './components/HomeSettingsTabs';

/**
 * Main App component with simplified structure.
 * NavigationContainer is now in the root App.js.
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <HomeSettingsTabs />
    </SafeAreaProvider>
  );
}
