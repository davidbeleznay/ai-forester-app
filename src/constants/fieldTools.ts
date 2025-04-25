import { IconName } from '../components/CustomIcon';

// Define the structure for field tools
export interface FieldTool {
  id: string;
  name: string;
  description: string;
  icon: IconName;
  bgColor: string;
  route?: string;
}

// Field tools available in the app
export const FIELD_TOOLS: FieldTool[] = [
  {
    id: 'tree-health',
    name: 'Tree Health',
    description: 'Vision Analysis',
    icon: 'tree',
    bgColor: 'bg-green-100',
    route: 'TreeHealth'
  },
  {
    id: 'pebble-count',
    name: 'Wolman Pebble Count',
    description: 'Vision Analysis',
    icon: 'Camera',
    bgColor: 'bg-purple-100',
    route: 'PebbleCount'
  },
  {
    id: 'culvert-sizing',
    name: 'Culvert Sizing',
    description: 'With Climate Factors',
    icon: 'culvert',
    bgColor: 'bg-red-100',
    route: 'CulvertSizing'
  },
  {
    id: 'restoration-monitoring',
    name: 'Restoration Monitoring',
    description: 'Vision Analysis',
    icon: 'Gauge',
    bgColor: 'bg-amber-100',
    route: 'RestorationMonitoring'
  },
  {
    id: 'road-inspection',
    name: 'Road Inspection',
    description: 'Risk Analysis',
    icon: 'Road',
    bgColor: 'bg-blue-100',
    route: 'RoadInspection'
  },
  {
    id: 'gully-assessment',
    name: 'Gully Assessment',
    description: 'Terrain Analysis',
    icon: 'Layers',
    bgColor: 'bg-purple-100',
    route: 'GullyAssessment'
  },
  {
    id: 'fire-predictor',
    name: 'Fire Predictor',
    description: 'Risk Modeling',
    icon: 'Flame',
    bgColor: 'bg-orange-100',
    route: 'FirePredictor'
  },
  {
    id: 'landslide-predictor',
    name: 'Landslide Predictor',
    description: 'Stability Analysis',
    icon: 'landslide',
    bgColor: 'bg-yellow-100',
    route: 'LandslidePredictor'
  }
];

// Recent field cards shown on the home screen
export const RECENT_FIELD_CARDS = [
  {
    id: '1',
    name: 'Tree Health',
    date: 'Yesterday',
    icon: 'tree',
    bgColor: 'bg-green-100'
  },
  {
    id: '2',
    name: 'Wolman Pebble Count',
    date: 'April 20, 2025',
    icon: 'Camera',
    bgColor: 'bg-blue-100'
  },
  {
    id: '3',
    name: 'Culvert Sizing',
    date: 'April 18, 2025',
    icon: 'culvert',
    bgColor: 'bg-red-100'
  }
];

// Tool guides for the instructions screen
export const TOOL_GUIDES = [
  {
    id: 'guide-culvert',
    name: 'Culvert Sizing',
    description: 'How to properly size culverts for forestry roads',
    icon: 'culvert',
    bgColor: 'bg-red-100'
  },
  {
    id: 'guide-tree',
    name: 'Tree Health',
    description: 'Using vision analysis to assess tree health conditions',
    icon: 'tree',
    bgColor: 'bg-green-100'
  },
  {
    id: 'guide-pebble',
    name: 'Wolman Pebble Count',
    description: 'Automated streambed material assessment',
    icon: 'Camera',
    bgColor: 'bg-purple-100'
  },
  {
    id: 'guide-road',
    name: 'Road Inspection',
    description: 'AI-powered risk analysis for forestry roads',
    icon: 'Road',
    bgColor: 'bg-blue-100'
  }
];
