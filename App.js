// App.js at project root
import 'react-native-gesture-handler'; // This import must be at the top
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import App from "./app/App"; // Correct import path to app/App.tsx

// Correctly re-export the App component
export default function AppWrapper() {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
}
