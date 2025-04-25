// App.js at project root
import 'react-native-gesture-handler'; // Import this first
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNav from "./src/App"; // Use the App component from src directory

export default function App() {
  return <AppNav />;
}
