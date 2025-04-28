import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import HomeSettingsTabs from './components/HomeSettingsTabs';

export default function App() {
  return (
    <NavigationContainer>
      <HomeSettingsTabs />
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
