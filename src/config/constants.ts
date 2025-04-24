// App-wide constants for the AI Forester Field Companion

// Colors
export const COLORS = {
  primary: '#2F855A',  // Green 700
  primaryLight: '#48BB78', // Green 500
  primaryDark: '#22543D', // Green 900
  secondary: '#3182CE', // Blue 600
  danger: '#E53E3E', // Red 600
  warning: '#DD6B20', // Orange 600
  info: '#3182CE', // Blue 600
  success: '#38A169', // Green 600
  gray: {
    50: '#F7FAFC',
    100: '#EDF2F7',
    200: '#E2E8F0',
    300: '#CBD5E0',
    400: '#A0AEC0',
    500: '#718096',
    600: '#4A5568',
    700: '#2D3748',
    800: '#1A202C',
    900: '#171923',
  },
  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
};

// Typography
export const FONTS = {
  heading: {
    fontWeight: 'bold',
  },
  subheading: {
    fontWeight: '600',
  },
  body: {
    fontWeight: 'normal',
  },
  caption: {
    fontWeight: 'normal',
    fontSize: 12,
  },
};

// Spacing
export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Culvert Tool Constants
export const CULVERT_TOOL = {
  // Manning's roughness coefficients
  manningsCoefficients: {
    'CSP (Corrugated Steel Pipe)': 0.024,
    'HDPE (Plastic)': 0.012,
    'Concrete': 0.013,
  },
  // Minimum culvert diameters (in mm)
  minDiameters: [300, 400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000],
  // Safety factors
  safetyFactors: {
    low: 1.1,
    medium: 1.2,
    high: 1.3,
  },
  // Stream gradient risk categories
  gradientRisk: {
    low: { min: 0, max: 1 },
    moderate: { min: 1, max: 3 },
    high: { min: 3, max: 8 },
    veryHigh: { min: 8, max: 100 },
  },
  // Width to depth ratio categories
  widthToDepthRatio: {
    low: { min: 0, max: 3 },
    medium: { min: 3, max: 6 },
    high: { min: 6, max: 100 },
  },
};

// Storage keys
export const STORAGE_KEYS = {
  FIELD_CARDS: 'field_cards',
  USER_SETTINGS: 'user_settings',
  DEFAULT_LOCATION: 'default_location',
};

// Default settings
export const DEFAULT_SETTINGS = {
  units: 'metric',
  temperature: 'celsius',
  gpsPrecision: 'medium',
  autoBackup: true,
  defaultLocation: {
    name: 'Nanaimo Watershed',
    latitude: 49.1659,
    longitude: -123.9401,
  },
};

// API endpoints (for future use)
export const API = {
  WEATHER: 'https://api.example.com/weather',
  LOCATION: 'https://api.example.com/location',
};

// Field tool types
export const FIELD_TOOLS = [
  {
    id: 'tree-health',
    name: 'Tree Health',
    description: 'Vision Analysis',
    icon: 'tree',
    backgroundColor: '#C6F6D5',
    iconColor: '#38A169',
  },
  {
    id: 'wolman-pebble',
    name: 'Wolman Pebble Count',
    description: 'Vision Analysis',
    icon: 'camera',
    backgroundColor: '#E9D8FD',
    iconColor: '#805AD5',
  },
  {
    id: 'culvert-sizing',
    name: 'Culvert Sizing',
    description: 'With Climate Factors',
    icon: 'droplet',
    backgroundColor: '#FED7D7',
    iconColor: '#E53E3E',
  },
  {
    id: 'restoration-monitoring',
    name: 'Restoration Monitoring',
    description: 'Vision Analysis',
    icon: 'circle',
    backgroundColor: '#FEEBC8',
    iconColor: '#DD6B20',
  },
  {
    id: 'road-inspection',
    name: 'Road Inspection',
    description: 'Risk Analysis',
    icon: 'road',
    backgroundColor: '#BEE3F8',
    iconColor: '#3182CE',
  },
  {
    id: 'gully-assessment',
    name: 'Gully Assessment',
    description: 'Terrain Analysis',
    icon: 'layers',
    backgroundColor: '#D6BCFA',
    iconColor: '#6B46C1',
  },
  {
    id: 'fire-predictor',
    name: 'Fire Predictor',
    description: 'Risk Modeling',
    icon: 'circle',
    backgroundColor: '#FEEBC8',
    iconColor: '#DD6B20',
  },
  {
    id: 'landslide-predictor',
    name: 'Landslide Predictor',
    description: 'Stability Analysis',
    icon: 'alert-triangle',
    backgroundColor: '#FEFCBF',
    iconColor: '#D69E2E',
  },
];