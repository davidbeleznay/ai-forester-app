import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/constants';
import { Wifi, WifiOff } from 'lucide-react-native';

const ConnectivityStatus = () => {
  const [isConnected, setIsConnected] = useState(false);

  // Mock connectivity check for demonstration
  // In a real app, we would use NetInfo from react-native-community/netinfo
  useEffect(() => {
    // Simulate checking connectivity
    const checkConnectivity = () => {
      // Mock implementation - randomly set connection status 
      // In production, this would use real network status checks
      setIsConnected(Math.random() > 0.3); // 70% chance of being online for demo
    };

    // Check connectivity initially
    checkConnectivity();

    // Set up interval to periodically check connectivity
    const interval = setInterval(checkConnectivity, 10000);

    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // If connected, don't show the banner
  if (isConnected) {
    return null;
  }

  // Show offline banner when not connected
  return (
    <View style={styles.container}>
      <WifiOff size={16} color={COLORS.white} />
      <Text style={styles.text}>You are currently offline. Some features may be limited.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.warning,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  text: {
    color: COLORS.white,
    marginLeft: SPACING.sm,
    fontSize: 12,
    flex: 1,
  },
});

export default ConnectivityStatus;