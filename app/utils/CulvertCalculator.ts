import { CulvertFieldCard } from './storage';

// Precipitation regions and their factors
export const PRECIPITATION_REGIONS = {
  'Low (< 800mm/yr)': 0.8,
  'Moderate (800-1200mm/yr)': 1.0,
  'High (1200-1600mm/yr)': 1.2,
  'Very High (> 1600mm/yr)': 1.5,
};

// Road types and their return period requirements
export const ROAD_TYPES = {
  'Main Access': { returnPeriod: 100, factor: 1.0 },
  'Secondary Access': { returnPeriod: 50, factor: 0.85 },
  'Limited Access': { returnPeriod: 25, factor: 0.7 },
  'Temporary': { returnPeriod: 10, factor: 0.5 },
};

// Stream types and their adjustment factors
export const STREAM_TYPES = {
  'Perennial': 1.0,
  'Intermittent': 0.9,
  'Ephemeral': 0.8,
  'Fish Bearing': 1.2,
};

// Standard culvert sizes in mm
export const STANDARD_CULVERT_SIZES = [
  400, 500, 600, 700, 800, 900, 1000, 1200, 1400, 1600, 1800, 2000, 2400, 3000
];

// Maximum transportable size (mm) based on road conditions
export const MAX_TRANSPORTABLE_SIZE = 1800;

/**
 * Calculate the peak flow (Q) for a given drainage basin area
 * @param basinArea Area of the drainage basin in km²
 * @param precipitationRegion The precipitation region (used to determine the factor)
 * @param roadType The road type (determines return period factor)
 * @param streamType The stream type (adjustment factor)
 * @param climateProjection Optional climate change projection adjustment (percentage)
 * @returns The calculated peak flow in m³/s
 */
export const calculatePeakFlow = (
  basinArea: number,
  precipitationRegion: string,
  roadType: string,
  streamType: string,
  climateProjection?: number
): number => {
  // Get the factors from the lookup tables
  const precipFactor = PRECIPITATION_REGIONS[precipitationRegion as keyof typeof PRECIPITATION_REGIONS] || 1.0;
  const roadFactor = ROAD_TYPES[roadType as keyof typeof ROAD_TYPES]?.factor || 1.0;
  const streamFactor = STREAM_TYPES[streamType as keyof typeof STREAM_TYPES] || 1.0;
  
  // Apply climate projection adjustment if provided
  const climateFactor = climateProjection ? 1 + (climateProjection / 100) : 1.0;
  
  // Calculate peak flow using the Rational Formula with regional adjustments
  // Q = C * I * A where:
  // - C is a runoff coefficient (we'll use our combined factors)
  // - I is rainfall intensity (incorporated into our factors)
  // - A is basin area
  
  // Combined coefficient including all factors
  const combinedFactor = precipFactor * roadFactor * streamFactor * climateFactor;
  
  // Base formula (simplified for forestry applications)
  let peakFlow = 0;
  
  // Adjust calculation based on basin size
  if (basinArea <= 1) {
    // Small basins: Q = 0.28 * C * A^0.75
    peakFlow = 0.28 * combinedFactor * Math.pow(basinArea, 0.75);
  } else if (basinArea <= 10) {
    // Medium basins: Q = 0.32 * C * A^0.7
    peakFlow = 0.32 * combinedFactor * Math.pow(basinArea, 0.7);
  } else {
    // Large basins: Q = 0.43 * C * A^0.65
    peakFlow = 0.43 * combinedFactor * Math.pow(basinArea, 0.65);
  }
  
  return peakFlow;
};

/**
 * Calculate the required culvert size based on peak flow and other parameters
 * @param peakFlow Peak flow in m³/s
 * @param gradient Stream gradient in %
 * @param measurements Optional array of stream width/depth measurements
 * @returns Object containing recommended culvert size and other details
 */
export const calculateCulvertSize = (
  peakFlow: number,
  gradient: number,
  measurements?: { width: number; depth: number }[]
): {
  diameter: number;
  height?: number;
  width?: number;
  type: 'round' | 'box';
  transportable: boolean;
  capacity: {
    maxFlow: number;
    velocity: number;
  };
} => {
  // Determine if box culvert is needed based on measurements
  let needsBoxCulvert = false;
  let avgWidth = 0;
  let avgDepth = 0;
  
  if (measurements && measurements.length > 0) {
    // Calculate average width and depth
    avgWidth = measurements.reduce((sum, m) => sum + m.width, 0) / measurements.length;
    avgDepth = measurements.reduce((sum, m) => sum + m.depth, 0) / measurements.length;
    
    // If width/depth ratio > 3, typically a box culvert is preferred
    if (avgWidth / avgDepth > 3) {
      needsBoxCulvert = true;
    }
  }
  
  // Manning's equation parameters
  const manningsN = 0.024; // Typical for corrugated metal pipes
  const minSlope = Math.max(0.005, gradient / 100); // Convert % to decimal, minimum of 0.5%
  
  // Function to calculate flow capacity for a round culvert
  const calculateRoundCulvertCapacity = (diameter: number): { flow: number; velocity: number } => {
    // Convert diameter from mm to m
    const diameterMeters = diameter / 1000;
    
    // Calculate area and hydraulic radius
    const area = Math.PI * Math.pow(diameterMeters / 2, 2);
    const hydraulicRadius = diameterMeters / 4;
    
    // Manning's equation for full pipe flow
    // Q = (1.0/n) * A * R^(2/3) * S^(1/2)
    const flow = (1.0 / manningsN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(minSlope, 1/2);
    
    // Calculate velocity
    const velocity = flow / area;
    
    return { flow, velocity };
  };
  
  // Function to calculate flow capacity for a box culvert
  const calculateBoxCulvertCapacity = (width: number, height: number): { flow: number; velocity: number } => {
    // Convert dimensions from mm to m
    const widthMeters = width / 1000;
    const heightMeters = height / 1000;
    
    // Calculate area and hydraulic radius
    const area = widthMeters * heightMeters;
    const perimeter = 2 * (widthMeters + heightMeters);
    const hydraulicRadius = area / perimeter;
    
    // Manning's equation for full box flow
    // Q = (1.0/n) * A * R^(2/3) * S^(1/2)
    const flow = (1.0 / manningsN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(minSlope, 1/2);
    
    // Calculate velocity
    const velocity = flow / area;
    
    return { flow, velocity };
  };
  
  // Function to find the smallest standard culvert size that meets the flow requirement
  const findSmallestAdequateSize = (): number => {
    for (const size of STANDARD_CULVERT_SIZES) {
      const capacity = calculateRoundCulvertCapacity(size);
      // Add a 20% safety factor
      if (capacity.flow >= peakFlow * 1.2) {
        return size;
      }
    }
    // If none found, return the largest size
    return STANDARD_CULVERT_SIZES[STANDARD_CULVERT_SIZES.length - 1];
  };
  
  // Calculate box culvert dimensions based on required flow and stream measurements
  const calculateBoxCulvertDimensions = (): { width: number, height: number } => {
    // Start with measured stream dimensions if available
    let width = avgWidth > 0 ? Math.ceil(avgWidth * 1000) : 1000; // Convert to mm and round up
    let height = avgDepth > 0 ? Math.ceil(avgDepth * 1000) : 1000; // Convert to mm and round up
    
    // Round to nearest standard increments (typically 200mm)
    width = Math.ceil(width / 200) * 200;
    height = Math.ceil(height / 200) * 200;
    
    // Ensure minimum dimensions
    width = Math.max(width, 800);
    height = Math.max(height, 800);
    
    // Iteratively adjust dimensions until capacity is sufficient
    let capacity = calculateBoxCulvertCapacity(width, height);
    
    // Add a 20% safety factor
    while (capacity.flow < peakFlow * 1.2) {
      // Prefer to increase width for natural stream shape
      if (width / height < 3) {
        width += 200;
      } else {
        height += 200;
      }
      
      capacity = calculateBoxCulvertCapacity(width, height);
    }
    
    return { width, height };
  };
  
  // Determine culvert type and size
  if (needsBoxCulvert) {
    // Use box culvert
    const boxDimensions = calculateBoxCulvertDimensions();
    const capacity = calculateBoxCulvertCapacity(boxDimensions.width, boxDimensions.height);
    
    // Check transportability - for box culverts, typically both dimensions should be under limit
    const transportable = Math.max(boxDimensions.width, boxDimensions.height) <= MAX_TRANSPORTABLE_SIZE;
    
    return {
      diameter: Math.max(boxDimensions.width, boxDimensions.height), // Use larger dimension as "equivalent diameter"
      width: boxDimensions.width,
      height: boxDimensions.height,
      type: 'box',
      transportable,
      capacity: {
        maxFlow: capacity.flow,
        velocity: capacity.velocity,
      },
    };
  } else {
    // Use round culvert
    const diameter = findSmallestAdequateSize();
    const capacity = calculateRoundCulvertCapacity(diameter);
    
    // Check if it's transportable to the site
    const transportable = diameter <= MAX_TRANSPORTABLE_SIZE;
    
    return {
      diameter,
      type: 'round',
      transportable,
      capacity: {
        maxFlow: capacity.flow,
        velocity: capacity.velocity,
      },
    };
  }
};

/**
 * Complete culvert sizing calculation from input values
 * @param inputValues Input values for calculation
 * @param climateProjection Optional climate projection percentage
 * @returns Complete field card with calculation results
 */
export const performCulvertSizing = (
  inputValues: {
    basinArea: number;
    precipitationRegion: string;
    roadType: string;
    streamType: string;
    gradient: number;
    roadWidth: number;
    measurements?: { width: number; depth: number }[];
  },
  climateProjection?: number
): Partial<CulvertFieldCard> => {
  // Generate a unique ID
  const id = `culvert-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 7)}`;
  
  // Calculate peak flow
  const peakFlow = calculatePeakFlow(
    inputValues.basinArea,
    inputValues.precipitationRegion,
    inputValues.roadType,
    inputValues.streamType,
    climateProjection
  );
  
  // Calculate recommended culvert size
  const culvertResult = calculateCulvertSize(
    peakFlow,
    inputValues.gradient,
    inputValues.measurements
  );
  
  // Return the complete field card object
  return {
    id,
    timestamp: Date.now(),
    inputValues,
    drainage: {
      peakFlow,
      method: 'Modified Rational Method',
      climateProjection,
    },
    recommendedSize: {
      diameter: culvertResult.diameter,
      height: culvertResult.height,
      width: culvertResult.width,
      type: culvertResult.type,
      transportable: culvertResult.transportable,
    },
    capacity: culvertResult.capacity,
  };
};