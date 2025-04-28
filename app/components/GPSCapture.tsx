import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import * as Location from 'expo-location';
import { COLORS, SPACING } from '../config/constants';

interface GPSCaptureProps {
  onLocationCaptured: (location: { latitude: number; longitude: number; accuracy: number }) => void;
  initialLocation?: { latitude: number; longitude: number; accuracy: number } | null;
}

const GPSCapture: React.FC<GPSCaptureProps> = ({ onLocationCaptured, initialLocation }) => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  // If initialLocation is provided, set it as the current location
  useEffect(() => {
    if (initialLocation) {
      setLocation({
        coords: {
          latitude: initialLocation.latitude,
          longitude: initialLocation.longitude,
          accuracy: initialLocation.accuracy,
          altitude: null,
          altitudeAccuracy: null,
          heading: null,
          speed: null,
        },
        timestamp: Date.now(),
      });
    }
  }, [initialLocation]);

  // Request location permissions when component mounts
  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setPermissionStatus(status);
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
      } catch (error) {
        console.error('Error requesting location permissions:', error);
        setErrorMsg('Failed to request location permissions');
      }
    })();
  }, []);

  const captureLocation = async () => {
    if (permissionStatus !== 'granted') {
      setErrorMsg('Location permission not granted');
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      // Get current location with high accuracy
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
      });
      
      setLocation(currentLocation);
      
      // Pass the location up to the parent component
      onLocationCaptured({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        accuracy: currentLocation.coords.accuracy || 0,
      });
    } catch (error) {
      console.error('Error getting location:', error);
      setErrorMsg('Failed to get location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location Data</Text>
        <TouchableOpacity 
          style={styles.captureButton} 
          onPress={captureLocation}
          disabled={loading || permissionStatus !== 'granted'}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <Text style={styles.buttonText}>Capture GPS</Text>
          )}
        </TouchableOpacity>
      </View>

      {errorMsg ? (
        <Text style={styles.errorText}>{errorMsg}</Text>
      ) : null}

      <View style={styles.locationInfo}>
        {location ? (
          <>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Latitude:</Text>
              <Text style={styles.value}>{location.coords.latitude.toFixed(6)}°</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Longitude:</Text>
              <Text style={styles.value}>{location.coords.longitude.toFixed(6)}°</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.label}>Accuracy:</Text>
              <Text style={styles.value}>{location.coords.accuracy?.toFixed(1) || 'N/A'} m</Text>
            </View>
            <Text style={styles.timestamp}>
              Recorded: {new Date(location.timestamp).toLocaleString()}
            </Text>
          </>
        ) : (
          <Text style={styles.placeholderText}>
            {permissionStatus !== 'granted'
              ? 'Location permission not granted'
              : 'Tap "Capture GPS" to record your current location'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.medium,
    marginVertical: SPACING.small,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.small,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  captureButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.small,
    borderRadius: 6,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 14,
  },
  errorText: {
    color: COLORS.error,
    marginBottom: SPACING.small,
  },
  locationInfo: {
    backgroundColor: COLORS.lightBackground,
    padding: SPACING.small,
    borderRadius: 6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.tiny,
  },
  label: {
    fontSize: 16,
    color: COLORS.textLight,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
  },
  timestamp: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: SPACING.small,
    fontStyle: 'italic',
  },
  placeholderText: {
    color: COLORS.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: SPACING.small,
  },
});

export default GPSCapture;