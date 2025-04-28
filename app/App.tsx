import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import MainAppNavigator from './navigation/MainAppNavigator';

/**
 * Main App component with updated navigation structure.
 * Now using MainAppNavigator which includes tool-specific navigators
 */
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <MainAppNavigator />
    </SafeAreaProvider>
  );
}
