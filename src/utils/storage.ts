// Mock implementation of storage.ts while AsyncStorage is being resolved
import { DEFAULT_SETTINGS } from '../config/constants';

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

// Mock data for testing
const mockFieldCards: FieldCard[] = [
  {
    id: '1',
    type: 'culvert-sizing',
    name: 'Example Creek Culvert',
    date: '2025-04-22',
    location: {
      latitude: 49.1659,
      longitude: -123.9401,
      name: 'Example Creek'
    },
    createdAt: Date.now() - 86400000, // 1 day ago
    updatedAt: Date.now() - 86400000
  },
  {
    id: '2',
    type: 'tree-health',
    name: 'Douglas Fir Assessment',
    date: '2025-04-23',
    location: {
      latitude: 49.1670,
      longitude: -123.9410,
      name: 'North Forest'
    },
    createdAt: Date.now() - 43200000, // 12 hours ago
    updatedAt: Date.now() - 43200000
  },
  {
    id: '3',
    type: 'wolman-pebble',
    name: 'Stream Bed Analysis',
    date: '2025-04-24',
    location: {
      latitude: 49.1680,
      longitude: -123.9420,
      name: 'Mountain Creek'
    },
    createdAt: Date.now() - 3600000, // 1 hour ago
    updatedAt: Date.now() - 3600000
  }
];

/**
 * Retrieve all field cards
 * @returns Array of field cards
 */
export const getFieldCards = async (): Promise<FieldCard[]> => {
  return Promise.resolve([...mockFieldCards]);
};

/**
 * Save a field card
 * @param card - The field card to save
 */
export const saveFieldCard = async (card: FieldCard): Promise<void> => {
  console.log('Mock saveFieldCard called with:', card);
  return Promise.resolve();
};

/**
 * Delete a field card
 * @param cardId - ID of the card to delete
 */
export const deleteFieldCard = async (cardId: string): Promise<void> => {
  console.log('Mock deleteFieldCard called with ID:', cardId);
  return Promise.resolve();
};

/**
 * Get a specific field card by ID
 * @param cardId - ID of the card to retrieve
 * @returns The field card or null if not found
 */
export const getFieldCardById = async <T extends FieldCard>(cardId: string): Promise<T | null> => {
  const card = mockFieldCards.find(c => c.id === cardId);
  return Promise.resolve(card as T || null);
};

/**
 * Save user settings
 * @param settings - User settings to save
 */
export const saveUserSettings = async (settings: UserSettings): Promise<void> => {
  console.log('Mock saveUserSettings called with:', settings);
  return Promise.resolve();
};

/**
 * Get user settings
 * @returns User settings or default settings if not found
 */
export const getUserSettings = async (): Promise<UserSettings> => {
  return Promise.resolve(DEFAULT_SETTINGS);
};

/**
 * Clear all stored field cards
 */
export const clearAllFieldCards = async (): Promise<void> => {
  console.log('Mock clearAllFieldCards called');
  return Promise.resolve();
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
  console.log('Mock saveDefaultLocation called with:', location);
  return Promise.resolve();
};

/**
 * Generic method to store data (mock implementation)
 */
export const storeData = async <T>(key: string, value: T): Promise<void> => {
  console.log(`Mock storeData called with key ${key}`);
  return Promise.resolve();
};

/**
 * Generic method to retrieve data (mock implementation)
 */
export const getData = async <T>(key: string): Promise<T | null> => {
  console.log(`Mock getData called with key ${key}`);
  return Promise.resolve(null);
};