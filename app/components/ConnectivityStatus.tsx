import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/constants';

const ConnectivityStatus: React.FC = () => {
  // In a real app, this would use NetInfo to check actual connectivity
  // For demo purposes, we'll just simulate being offline
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  useEffect(() => {
    // Simulate checking network connectivity
    const interval = setInterval(() => {
      // Randomly change connection status for demo purposes
      setIsConnected(Math.random() > 0.7);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  if (isConnected) {
    return null; // Don't show anything if connected
  }

  return (
    <View style={styles.container}>
      <View style={styles.indicator} />
      <Text style={styles.text}>Offline Mode - Data will be saved locally</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.warning + '15',
    borderRadius: 6,
    padding: SPACING.sm,
    marginBottom: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.warning,
    marginRight: SPACING.sm,
  },
  text: {
    fontSize: 13,
    color: COLORS.warning,
    fontWeight: '500',
  },
});

export default ConnectivityStatus;