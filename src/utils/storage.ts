import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS, DEFAULT_SETTINGS } from '../config/constants';

/**
 * Base interface for field cards
 */
export interface FieldCard {
  id: string;
  type: string;
  name: string;
  date: string;
  location?: {
    latitude: number;
    longitude: number;
    name?: string;
  };
  createdAt: number;
  updatedAt: number;
}

/**
 * Culvert sizing field card
 */
export interface CulvertFieldCard extends FieldCard {
  type: 'culvert-sizing';
  drainageArea: number;
  streamGradient: number;
  region: string;
  culvertMaterial: string;
  streamGeometry: {
    topWidths: number[];
    bottomWidth: number;
    depths: number[];
    averageTopWidth: number;
    averageDepth: number;
    crossSectionalArea: number;
    widthToDepthRatio: number;
  };
  climateFactors?: {
    projectedRainfall: number;
    year: number;
  };
  transportabilityUsed: boolean;
  results: {
    recommendedSize: number;
    method: string;
    transportabilitySize?: number;
    safetyFactor: number;
    controllingFactor: 'inlet' | 'outlet';
  };
}

/**
 * User settings interface
 */
export interface UserSettings {
  units: 'metric' | 'imperial';
  temperature: 'celsius' | 'fahrenheit';
  gpsPrecision: 'high' | 'medium' | 'low';
  autoBackup: boolean;
  defaultLocation: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

/**
 * Generic method to store data
 * @param key - Storage key
 * @param value - Data to store
 */
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error storing data for key ${key}:`, error);
    throw error;
  }
};

/**
 * Generic method to retrieve data
 * @param key - Storage key
 * @returns The stored data or null if not found
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) as T : null;
  } catch (error) {
    console.error(`Error retrieving data for key ${key}:`, error);
    return null;
  }
};

/**
 * Save a field card
 * @param card - The field card to save
 */
export const saveFieldCard = async (card: FieldCard): Promise<void> => {
  try {
    // First get all existing cards
    const existingCards = await getFieldCards();
    
    // Check if this is an update or a new card
    const cardIndex = existingCards.findIndex(c => c.id === card.id);
    
    if (cardIndex >= 0) {
      // Update existing card
      existingCards[cardIndex] = {
        ...card,
        updatedAt: Date.now(),
      };
    } else {
      // Add new card
      existingCards.push({
        ...card,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
    }
    
    // Save the updated cards
    await storeData(STORAGE_KEYS.FIELD_CARDS, existingCards);
  } catch (error) {
    console.error('Error saving field card:', error);
    throw error;
  }
};

/**
 * Retrieve all field cards
 * @returns Array of field cards
 */
export const getFieldCards = async (): Promise<FieldCard[]> => {
  try {
    const cards = await getData<FieldCard[]>(STORAGE_KEYS.FIELD_CARDS);
    return cards || [];
  } catch (error) {
    console.error('Error retrieving field cards:', error);
    return [];
  }
};

/**
 * Delete a field card
 * @param cardId - ID of the card to delete
 */
export const deleteFieldCard = async (cardId: string): Promise<void> => {
  try {
    const existingCards = await getFieldCards();
    const updatedCards = existingCards.filter(card => card.id !== cardId);
    await storeData(STORAGE_KEYS.FIELD_CARDS, updatedCards);
  } catch (error) {
    console.error(`Error deleting field card ${cardId}:`, error);
    throw error;
  }
};

/**
 * Get a specific field card by ID
 * @param cardId - ID of the card to retrieve
 * @returns The field card or null if not found
 */
export const getFieldCardById = async <T extends FieldCard>(cardId: string): Promise<T | null> => {
  try {
    const cards = await getFieldCards();
    const card = cards.find(c => c.id === cardId);
    return card as T || null;
  } catch (error) {
    console.error(`Error retrieving field card ${cardId}:`, error);
    return null;
  }
};

/**
 * Save user settings
 * @param settings - User settings to save
 */
export const saveUserSettings = async (settings: UserSettings): Promise<void> => {
  try {
    await storeData(STORAGE_KEYS.USER_SETTINGS, settings);
  } catch (error) {
    console.error('Error saving user settings:', error);
    throw error;
  }
};

/**
 * Get user settings
 * @returns User settings or default settings if not found
 */
export const getUserSettings = async (): Promise<UserSettings> => {
  try {
    const settings = await getData<UserSettings>(STORAGE_KEYS.USER_SETTINGS);
    return settings || DEFAULT_SETTINGS;
  } catch (error) {
    console.error('Error retrieving user settings:', error);
    return DEFAULT_SETTINGS;
  }
};

/**
 * Clear all stored field cards
 */
export const clearAllFieldCards = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.FIELD_CARDS);
  } catch (error) {
    console.error('Error clearing field cards:', error);
    throw error;
  }
};

/**
 * Save default location
 * @param location - Location to save as default
 */
export const saveDefaultLocation = async (location: {
  name: string;
  latitude: number;
  longitude: number;
}): Promise<void> => {
  try {
    // Update settings with new default location
    const settings = await getUserSettings();
    const updatedSettings = {
      ...settings,
      defaultLocation: location,
    };
    await saveUserSettings(updatedSettings);
  } catch (error) {
    console.error('Error saving default location:', error);
    throw error;
  }
};