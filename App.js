// App.js at project root
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNav from "./src/App"; // <-- your renamed file

export default function App() {
  return (
    <NavigationContainer>
      <AppNav />
    </NavigationContainer>
  );
}
