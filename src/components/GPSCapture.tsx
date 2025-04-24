import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MapPin, RefreshCw } from 'react-native-feather';
import { getCurrentLocation, formatCoordinates, getDefaultLocation } from '../config/location';
import { COLORS, SPACING } from '../config/constants';

interface GPSCaptureProps {
  onLocationCaptured: (location: { latitude: number; longitude: number }) => void;
  precision?: 'high' | 'medium' | 'low';
}

const GPSCapture: React.FC<GPSCaptureProps> = ({
  onLocationCaptured,
  precision = 'medium',
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [usingDefault, setUsingDefault] = useState(false);

  // Get location on component mount if available
  useEffect(() => {
    captureLocation();
  }, []);

  const captureLocation = async () => {
    setLoading(true);
    setError(null);
    setUsingDefault(false);

    try {
      const locationData = await getCurrentLocation(precision);
      
      if (locationData) {
        const newLocation = {
          latitude: locationData.latitude,
          longitude: locationData.longitude,
        };
        
        setLocation(newLocation);
        onLocationCaptured(newLocation);
      } else {
        // If location is not available, use default
        setError('Unable to get current location');
        useDefaultLocation();
      }
    } catch (err) {
      setError('Error accessing location services');
      useDefaultLocation();
    } finally {
      setLoading(false);
    }
  };

  const useDefaultLocation = () => {
    const defaultLoc = getDefaultLocation();
    const location = {
      latitude: defaultLoc.latitude,
      longitude: defaultLoc.longitude,
    };
    
    setLocation(location);
    setUsingDefault(true);
    onLocationCaptured(location);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Location</Text>
        
        <TouchableOpacity 
          style={styles.refreshButton} 
          onPress={captureLocation}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color={COLORS.primary} />
          ) : (
            <RefreshCw width={18} height={18} stroke={COLORS.primary} />
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.locationContainer}>
        <View style={styles.iconContainer}>
          <MapPin width={24} height={24} stroke={COLORS.primary} />
        </View>
        
        <View style={styles.locationInfo}>
          {location ? (
            <>
              <Text style={styles.coordinates}>
                {formatCoordinates(location.latitude, location.longitude)}
              </Text>
              
              {usingDefault && (
                <Text style={styles.defaultText}>Using default location</Text>
              )}
            </>
          ) : error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : loading ? (
            <Text style={styles.loadingText}>Getting location...</Text>
          ) : (
            <Text style={styles.defaultText}>No location captured</Text>
          )}
        </View>
      </View>
      
      <TouchableOpacity 
        style={styles.captureButton} 
        onPress={captureLocation}
        disabled={loading}
      >
        <Text style={styles.captureButtonText}>
          {location ? 'Update Location' : 'Capture Location'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  refreshButton: {
    padding: SPACING.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  locationInfo: {
    flex: 1,
  },
  coordinates: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
  defaultText: {
    fontSize: 12,
    color: COLORS.warning,
    marginTop: 2,
  },
  errorText: {
    fontSize: 12,
    color: COLORS.danger,
  },
  loadingText: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  captureButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: SPACING.sm,
    alignItems: 'center',
  },
  captureButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
});

export default GPSCapture;