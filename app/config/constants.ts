// Color palette for the app
export const COLORS = {
  // Primary brand colors
  primary: '#2E7D32', // Forest green
  primaryLight: '#60ad5e',
  primaryDark: '#005005',
  
  // Secondary colors
  secondary: '#1565C0', // Blue
  secondaryLight: '#5e92f3',
  secondaryDark: '#003c8f',
  
  // Status colors
  success: '#43A047',
  warning: '#FF9800',
  error: '#D32F2F',
  info: '#0288D1',
  
  // UI colors
  background: '#F5F7FA',
  lightBackground: '#F1F3F6',
  card: '#FFFFFF',
  border: '#DDE2E5',
  lightGray: '#E0E0E0',
  
  // Text colors
  text: '#263238',
  textLight: '#607D8B',
  textInverted: '#FFFFFF',
  
  // Common colors
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Spacing values for consistent padding/margin
export const SPACING = {
  tiny: 4,
  small: 8,
  medium: 16,
  large: 24,
  xlarge: 32,
  xxlarge: 48,
};

// Screen dimensions
import { Dimensions } from 'react-native';
export const SCREEN = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

// Form field validation constants
export const VALIDATION = {
  required: 'This field is required',
  numberPositive: 'Must be a positive number',
  numberNonNegative: 'Cannot be negative',
  email: 'Please enter a valid email address',
};

// Navigation routes
export const ROUTES = {
  HOME: 'Home',
  CULVERT_TOOL: 'CulvertTool',
  CULVERT_INPUT: 'CulvertInput',
  CULVERT_RESULT: 'CulvertResult',
  CULVERT_HISTORY: 'CulvertHistory',
  SETTINGS: 'Settings',
  ABOUT: 'About',
};

// App information
export const APP_INFO = {
  name: 'AI-Forester-App',
  version: '1.0.0',
  description: 'A forestry management and field tool application',
};

// Storage keys
export const STORAGE_KEYS = {
  USER_PREFERENCES: 'ai-forester-app:user-preferences',
  CULVERT_HISTORY: 'ai-forester-app:culvert-history',
  RECENT_PROJECTS: 'ai-forester-app:recent-projects',
};

// Time formats
export const TIME_FORMATS = {
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss',
  dateTime: 'YYYY-MM-DD HH:mm:ss',
  display: 'MMM D, YYYY',
};

// Default measurement units
export const UNITS = {
  length: 'm',
  area: 'ha',
  volume: 'm³',
  flow: 'm³/s',
  rainfall: 'mm',
};

// API endpoints (mock for now)
export const API = {
  BASE_URL: 'https://api.example.com',
  CLIMATE_DATA: '/climate-data',
  TERRAIN_DATA: '/terrain-data',
  SYNC: '/sync',
};