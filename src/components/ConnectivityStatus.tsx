import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Wifi, WifiOff } from 'lucide-react-native';
import { COLORS, SPACING } from '../config/constants';

/**
 * Component that displays the current network connectivity status.
 * For now this is just a mock implementation that shows "Online" status.
 */
const ConnectivityStatus: React.FC = () => {
  // In a real implementation, we would use NetInfo to get the actual connection status
  const [isConnected, setIsConnected] = useState(true);
  
  // Mock implementation that just shows as connected
  useEffect(() => {
    // This would normally subscribe to NetInfo changes
    const mockInterval = setInterval(() => {
      // For testing purposes you could toggle this
      // setIsConnected(prev => !prev);
    }, 10000);
    
    return () => clearInterval(mockInterval);
  }, []);
  
  // Don't show anything when connected
  if (isConnected) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <WifiOff width={16} height={16} stroke={COLORS.danger} />
      <Text style={styles.text}>Offline Mode - Changes will sync when connection is restored</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.danger + '20', // 20% opacity
    padding: SPACING.sm,
    borderRadius: 8,
    marginBottom: SPACING.md,
  },
  text: {
    marginLeft: SPACING.sm,
    fontSize: 12,
    color: COLORS.danger,
    flex: 1,
  },
});

export default ConnectivityStatus;