/**
 * Storage utility for managing app data persistence
 * This is a simplified mock implementation for testing
 */

// Simple in-memory storage for development
const memoryStorage: Record<string, any> = {};

/**
 * Save data to storage
 * @param key The storage key
 * @param value The value to store
 */
export const saveData = async (key: string, value: any): Promise<void> => {
  try {
    memoryStorage[key] = value;
    console.log(`Data saved for key: ${key}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Error saving data:', error);
    return Promise.reject(error);
  }
};

/**
 * Retrieve data from storage
 * @param key The storage key
 * @returns The stored value, or null if not found
 */
export const getData = async (key: string): Promise<any> => {
  try {
    const value = memoryStorage[key] || null;
    return Promise.resolve(value);
  } catch (error) {
    console.error('Error retrieving data:', error);
    return Promise.resolve(null);
  }
};

/**
 * Remove data from storage
 * @param key The storage key
 */
export const removeData = async (key: string): Promise<void> => {
  try {
    delete memoryStorage[key];
    console.log(`Data removed for key: ${key}`);
    return Promise.resolve();
  } catch (error) {
    console.error('Error removing data:', error);
    return Promise.reject(error);
  }
};

/**
 * Clear all app storage
 */
export const clearAllData = async (): Promise<void> => {
  try {
    Object.keys(memoryStorage).forEach(key => {
      delete memoryStorage[key];
    });
    console.log('All data cleared');
    return Promise.resolve();
  } catch (error) {
    console.error('Error clearing data:', error);
    return Promise.reject(error);
  }
};

// Storage keys
export const STORAGE_KEYS = {
  USER_SETTINGS: 'user_settings',
  FIELD_CARDS: 'field_cards',
  RECENT_LOCATIONS: 'recent_locations',
  OFFLINE_QUEUE: 'offline_queue',
};
