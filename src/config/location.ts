import * as Location from 'expo-location';
import { Platform } from 'react-native';
import { DEFAULT_SETTINGS } from './constants';

// Define types for location data
export interface LocationData {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number | null;
  timestamp: number;
}

export interface SavedLocation {
  name: string;
  latitude: number;
  longitude: number;
  elevation?: number;
}

/**
 * Request location permissions from the user
 * @returns Promise<boolean> - Whether permission was granted
 */
export const requestLocationPermissions = async (): Promise<boolean> => {
  try {
    let { status } = await Location.requestForegroundPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting location permissions:', error);
    return false;
  }
};

/**
 * Get the current user location with configurable accuracy
 * @param precision - The precision level for GPS (high, medium, low)
 * @returns Promise<LocationData | null> - The location data or null if unavailable
 */
export const getCurrentLocation = async (
  precision: 'high' | 'medium' | 'low' = 'medium'
): Promise<LocationData | null> => {
  try {
    // Check if we have permissions first
    const hasPermission = await requestLocationPermissions();
    
    if (!hasPermission) {
      console.warn('Location permissions not granted');
      return null;
    }
    
    // Set accuracy based on precision level
    let accuracy;
    switch (precision) {
      case 'high':
        accuracy = Location.Accuracy.BestForNavigation;
        break;
      case 'medium':
        accuracy = Location.Accuracy.Balanced;
        break;
      case 'low':
        accuracy = Location.Accuracy.Lowest;
        break;
      default:
        accuracy = Location.Accuracy.Balanced;
    }
    
    // Get location
    const location = await Location.getCurrentPositionAsync({
      accuracy,
    });
    
    // Format and return location data
    return {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      altitude: location.coords.altitude,
      accuracy: location.coords.accuracy,
      timestamp: location.timestamp,
    };
  } catch (error) {
    console.error('Error getting current location:', error);
    return null;
  }
};

/**
 * Get the default location when GPS is unavailable
 * @returns SavedLocation - The default location
 */
export const getDefaultLocation = (): SavedLocation => {
  return DEFAULT_SETTINGS.defaultLocation;
};

/**
 * Calculate the distance between two points in kilometers
 * @param lat1 - Latitude of first point
 * @param lon1 - Longitude of first point
 * @param lat2 - Latitude of second point
 * @param lon2 - Longitude of second point
 * @returns number - Distance in kilometers
 */
export const calculateDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number => {
  const R = 6371; // Earth's radius in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in km
  return distance;
};

/**
 * Convert degrees to radians
 * @param deg - Degrees
 * @returns number - Radians
 */
const deg2rad = (deg: number): number => {
  return deg * (Math.PI / 180);
};

/**
 * Format coordinates for display
 * @param latitude - Latitude value
 * @param longitude - Longitude value
 * @returns string - Formatted coordinates
 */
export const formatCoordinates = (
  latitude: number,
  longitude: number
): string => {
  const latDirection = latitude >= 0 ? 'N' : 'S';
  const lonDirection = longitude >= 0 ? 'E' : 'W';
  
  const latFormatted = `${Math.abs(latitude).toFixed(5)}° ${latDirection}`;
  const lonFormatted = `${Math.abs(longitude).toFixed(5)}° ${lonDirection}`;
  
  return `${latFormatted}, ${lonFormatted}`;
};