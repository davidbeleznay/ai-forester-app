import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';
import { StreamGeometry } from '../screens/CulvertTool/culvertLogic';

// Define field card types
export interface BaseFieldCard {
  id: string;
  type: string;
  name: string;
  date: string;
  location?: {
    latitude: number;
    longitude: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface CulvertFieldCard extends BaseFieldCard {
  type: 'culvert-sizing';
  drainageArea: number;
  streamGradient: number;
  region: string;
  culvertMaterial: string;
  streamGeometry: StreamGeometry;
  climateFactors?: {
    projectedRainfall: number;
    year: number;
  };
  transportabilityUsed?: boolean;
  results: {
    recommendedSize: number;
    method: string;
    transportabilitySize?: number;
    safetyFactor: number;
    controllingFactor: 'inlet' | 'outlet';
  };
  notes?: string;
}

export type FieldCard = CulvertFieldCard;

/**
 * Save a field card to local storage
 * @param fieldCard The field card to save
 */
export const saveFieldCard = async (fieldCard: FieldCard): Promise<void> => {
  try {
    // Get existing field cards
    const existingCardsJson = await AsyncStorage.getItem(STORAGE_KEYS.FIELD_CARDS);
    const existingCards: FieldCard[] = existingCardsJson ? JSON.parse(existingCardsJson) : [];
    
    // Check if the card already exists (update) or is new (add)
    const existingIndex = existingCards.findIndex(card => card.id === fieldCard.id);
    
    if (existingIndex >= 0) {
      // Update existing card
      existingCards[existingIndex] = {
        ...fieldCard,
        updatedAt: Date.now()
      };
    } else {
      // Add new card
      existingCards.push({
        ...fieldCard,
        createdAt: Date.now(),
        updatedAt: Date.now()
      });
    }
    
    // Save back to storage
    await AsyncStorage.setItem(STORAGE_KEYS.FIELD_CARDS, JSON.stringify(existingCards));
  } catch (error) {
    console.error('Error saving field card:', error);
    throw new Error('Failed to save field card');
  }
};

/**
 * Get all field cards from local storage
 * @returns Array of field cards
 */
export const getFieldCards = async (): Promise<FieldCard[]> => {
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
 * @param id Field card ID
 * @returns The field card or null if not found
 */
export const getFieldCardById = async (id: string): Promise<FieldCard | null> => {
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
 * @param id Field card ID to delete
 */
export const deleteFieldCard = async (id: string): Promise<void> => {
  try {
    const cards = await getFieldCards();
    const filteredCards = cards.filter(card => card.id !== id);
    await AsyncStorage.setItem(STORAGE_KEYS.FIELD_CARDS, JSON.stringify(filteredCards));
  } catch (error) {
    console.error('Error deleting field card:', error);
    throw new Error('Failed to delete field card');
  }
};
