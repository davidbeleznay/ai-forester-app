import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeSettingsTabs from './components/HomeSettingsTabs';

/**
 * Extremely simplified App component with minimal dependencies
 */
export default function App() {
  return (
    <NavigationContainer>
      <HomeSettingsTabs />
    </NavigationContainer>
  );
}