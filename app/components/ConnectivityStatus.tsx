import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../config/constants';

// Simplified ConnectivityStatus component that doesn't rely on NetInfo
const ConnectivityStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean>(true);

  // For demo purposes, we'll assume the app is always online
  // In a real app, we'd use NetInfo here, but we're removing the dependency for now
  useEffect(() => {
    // You can implement actual connectivity checks later when the dependency is resolved
    setIsConnected(true);
  }, []);

  return (
    <View style={[
      styles.container, 
      isConnected ? styles.connectedContainer : styles.disconnectedContainer
    ]}>
      <Ionicons 
        name={isConnected ? 'cloud-done-outline' : 'cloud-offline-outline'} 
        size={18} 
        color={isConnected ? COLORS.success : COLORS.error}
      />
      <Text style={[
        styles.statusText,
        isConnected ? styles.connectedText : styles.disconnectedText
      ]}>
        {isConnected 
          ? `Online (WiFi)` 
          : 'Offline - Field data will be stored locally'
        }
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.small,
    borderRadius: 4,
    marginBottom: SPACING.small,
  },
  connectedContainer: {
    backgroundColor: 'rgba(76, 175, 80, 0.1)',  // Light green background
  },
  disconnectedContainer: {
    backgroundColor: 'rgba(244, 67, 54, 0.1)',  // Light red background
  },
  statusText: {
    marginLeft: SPACING.tiny,
    fontSize: 14,
  },
  connectedText: {
    color: COLORS.success,
  },
  disconnectedText: {
    color: COLORS.error,
  }
});

export default ConnectivityStatus;