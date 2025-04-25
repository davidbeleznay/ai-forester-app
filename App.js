// App.js at project root
import React from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNav from "./src/App"; // Use the App component from src directory

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNav />
    </SafeAreaProvider>
  );
}
