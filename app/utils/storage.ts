import AsyncStorage from '@react-native-async-storage/async-storage';

// Define the types for the field card
export interface CulvertFieldCard {
  id: string;
  timestamp: number;
  location?: {
    latitude: number;
    longitude: number;
    accuracy: number;
  };
  inputValues: {
    basinArea: number;
    precipitationRegion: string;
    roadType: string;
    streamType: string;
    gradient: number;
    roadWidth: number;
    measurements?: {
      width: number;
      depth: number;
    }[];
  };
  drainage: {
    peakFlow: number;
    method: string;
    climateProjection?: number;
  };
  recommendedSize: {
    diameter: number;
    height?: number;
    width?: number;
    type: 'round' | 'box';
    transportable: boolean;
  };
  capacity: {
    maxFlow: number;
    velocity: number;
  };
  notes?: string;
  photos?: string[];
  user?: string;
}

// Storage keys
const STORAGE_KEYS = {
  FIELD_CARDS: 'ai-forester-app:culvert-field-cards',
};

/**
 * Save a field card to AsyncStorage
 * @param fieldCard The field card to save
 */
export const saveFieldCard = async (fieldCard: CulvertFieldCard): Promise<void> => {
  try {
    // Get existing field cards
    const existingCards = await getFieldCards();
    
    // Check if card already exists (same ID)
    const cardIndex = existingCards.findIndex(card => card.id === fieldCard.id);
    
    if (cardIndex >= 0) {
      // Update existing card
      existingCards[cardIndex] = fieldCard;
    } else {
      // Add new card
      existingCards.push(fieldCard);
    }
    
    // Save back to storage
    await AsyncStorage.setItem(STORAGE_KEYS.FIELD_CARDS, JSON.stringify(existingCards));
  } catch (error) {
    console.error('Error saving field card:', error);
    throw new Error('Failed to save field card');
  }
};

/**
 * Get all field cards from AsyncStorage
 * @returns An array of field cards
 */
export const getFieldCards = async (): Promise<CulvertFieldCard[]> => {
  try {
    const cardsJson = await AsyncStorage.getItem(STORAGE_KEYS.FIELD_CARDS);
    return cardsJson ? JSON.parse(cardsJson) : [];
  } catch (error) {
    console.error('Error getting field cards:', error);
    return [];
  }
};

/**
 * Get a specific field card by ID
 * @param id The ID of the field card to get
 * @returns The field card or null if not found
 */
export const getFieldCardById = async (id: string): Promise<CulvertFieldCard | null> => {
  try {
    const cards = await getFieldCards();
    return cards.find(card => card.id === id) || null;
  } catch (error) {
    console.error('Error getting field card by ID:', error);
    return null;
  }
};

/**
 * Delete a field card by ID
 * @param id The ID of the field card to delete
 * @returns True if successfully deleted, false otherwise
 */
export const deleteFieldCard = async (id: string): Promise<boolean> => {
  try {
    const cards = await getFieldCards();
    const filteredCards = cards.filter(card => card.id !== id);
    
    // If no card was filtered out, it didn't exist
    if (filteredCards.length === cards.length) {
      return false;
    }
    
    await AsyncStorage.setItem(STORAGE_KEYS.FIELD_CARDS, JSON.stringify(filteredCards));
    return true;
  } catch (error) {
    console.error('Error deleting field card:', error);
    return false;
  }
};

/**
 * Clear all field cards
 * @returns True if successfully cleared, false otherwise
 */
export const clearAllFieldCards = async (): Promise<boolean> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEYS.FIELD_CARDS);
    return true;
  } catch (error) {
    console.error('Error clearing field cards:', error);
    return false;
  }
};