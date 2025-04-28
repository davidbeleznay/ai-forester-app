import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../config/constants';

const ConnectivityStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [connectionType, setConnectionType] = useState<string | null>(null);

  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      
      // Determine connection type
      if (state.type === 'wifi') {
        setConnectionType('WiFi');
      } else if (state.type === 'cellular') {
        setConnectionType(`Cellular (${state.details.cellularGeneration || 'Unknown'})`);
      } else if (state.type === 'bluetooth' || state.type === 'ethernet' || state.type === 'wimax') {
        setConnectionType(state.type.charAt(0).toUpperCase() + state.type.slice(1));
      } else {
        setConnectionType(state.isConnected ? 'Connected' : 'Disconnected');
      }
    });

    // Cleanup subscription on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  // If connectivity status is still being determined
  if (isConnected === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.checking}>Checking connectivity...</Text>
      </View>
    );
  }

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
          ? `Online (${connectionType})` 
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
  },
  checking: {
    color: COLORS.textLight,
    fontStyle: 'italic',
    fontSize: 14,
  },
});

export default ConnectivityStatus;