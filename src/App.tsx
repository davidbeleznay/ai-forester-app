import React from 'react';
import { StatusBar } from 'expo-status-bar';
import HomeSettingsTabs from './components/HomeSettingsTabs';

export default function App() {
  return (
    <>
      <HomeSettingsTabs />
      <StatusBar style="light" />
    </>
  );
}
