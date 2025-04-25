import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import ConnectivityStatus from './components/ConnectivityStatus';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <ConnectivityStatus />
      <AppNavigator />
    </NavigationContainer>
  );
}
