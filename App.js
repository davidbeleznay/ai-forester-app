// App.js at project root
import 'react-native-gesture-handler'; // This import must be at the top
import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Simple App component without navigation or complex imports
export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AI Forester Field Companion</Text>
      <Text style={styles.subtext}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtext: {
    marginTop: 10,
  },
});
