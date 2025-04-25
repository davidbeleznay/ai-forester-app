import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { WifiOff, Wifi } from 'lucide-react-native';

type ConnectivityStatusProps = {
  onConnectivityChange?: (isConnected: boolean) => void;
};

/**
 * ConnectivityStatus component displays the current network connectivity status
 * and provides a callback when connectivity changes
 */
const ConnectivityStatus: React.FC<ConnectivityStatusProps> = ({ 
  onConnectivityChange 
}) => {
  // Mock connectivity for testing purposes
  const [isConnected, setIsConnected] = useState(true);
  const [animation] = useState(new Animated.Value(0));
  
  // Simulate occasional network changes
  useEffect(() => {
    const interval = setInterval(() => {
      // 10% chance of switching connectivity state (just for demo)
      if (Math.random() < 0.1) {
        const newConnectedState = !isConnected;
        setIsConnected(newConnectedState);
        
        if (onConnectivityChange) {
          onConnectivityChange(newConnectedState);
        }
        
        // Animate the indicator when status changes
        Animated.sequence([
          Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(animation, {
            toValue: 0,
            duration: 300,
            delay: 2000,
            useNativeDriver: true,
          })
        ]).start();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isConnected, onConnectivityChange, animation]);
  
  // Only show when there's no connection or during animation
  if (isConnected && animation._value === 0) {
    return null;
  }
  
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          backgroundColor: isConnected ? '#10b981' : '#ef4444',
          opacity: animation.interpolate({
            inputRange: [0, 1],
            outputRange: [0.8, 1]
          }),
          transform: [{
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-30, 0]
            })
          }]
        }
      ]}
    >
      {isConnected ? (
        <View style={styles.content}>
          <Wifi size={16} color="white" />
          <Text style={styles.text}>Online</Text>
        </View>
      ) : (
        <View style={styles.content}>
          <WifiOff size={16} color="white" />
          <Text style={styles.text}>Offline Mode</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingVertical: 6,
    paddingHorizontal: 16,
    zIndex: 999,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    marginLeft: 8,
    fontWeight: '500',
  }
});

export default ConnectivityStatus;
