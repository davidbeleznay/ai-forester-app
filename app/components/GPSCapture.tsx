import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator 
} from 'react-native';
import { COLORS, SPACING } from '../config/constants';

interface GPSCaptureProps {
  onLocationCaptured: (location: {latitude: number, longitude: number} | null) => void;
}

const GPSCapture: React.FC<GPSCaptureProps> = ({ onLocationCaptured }) => {
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate capturing current location
  const captureLocation = () => {
    setLoading(true);
    setError(null);
    
    // Mock location capture with a delay to simulate real GPS capture
    setTimeout(() => {
      try {
        // For demo purposes, generate a random location near Vancouver Island
        // In a real app, this would use the Expo Location API
        const mockLocation = {
          latitude: 49.1659 + (Math.random() * 0.1 - 0.05),
          longitude: -123.9401 + (Math.random() * 0.1 - 0.05)
        };
        
        setLocation(mockLocation);
        onLocationCaptured(mockLocation);
        setLoading(false);
      } catch (err) {
        setError('Failed to capture location. Please try again.');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Location Data</Text>
      
      {location ? (
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>
            Latitude: {location.latitude.toFixed(5)}°
          </Text>
          <Text style={styles.locationText}>
            Longitude: {location.longitude.toFixed(5)}°
          </Text>
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={captureLocation}
          >
            <Text style={styles.captureButtonText}>Update Location</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.captureContainer}>
          <Text style={styles.captureText}>
            Capture your current location for field documentation.
          </Text>
          
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <TouchableOpacity 
            style={styles.captureButton}
            onPress={captureLocation}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.captureButtonText}>Capture Location</Text>
            )}
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.info,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  captureContainer: {
    alignItems: 'center',
    paddingVertical: SPACING.sm,
  },
  captureText: {
    fontSize: 14,
    color: COLORS.gray[600],
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  locationContainer: {
    padding: SPACING.sm,
    backgroundColor: COLORS.info + '10',
    borderRadius: 6,
  },
  locationText: {
    fontSize: 15,
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  captureButton: {
    backgroundColor: COLORS.info,
    borderRadius: 6,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    alignItems: 'center',
    marginTop: SPACING.sm,
  },
  captureButtonText: {
    color: COLORS.white,
    fontWeight: '500',
    fontSize: 14,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
});

export default GPSCapture;