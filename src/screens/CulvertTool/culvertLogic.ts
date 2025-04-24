import { CULVERT_TOOL } from '../../config/constants';
import {
  calculateAverage,
  calculateTrapezoidalArea,
  calculateHydraulicRadius,
  calculateWettedPerimeter,
  calculateManningsFlow,
  calculatePipeArea,
  calculatePipeWettedPerimeter,
  calculateWidthToDepthRatio,
  findNextLargestCulvertSize,
  roundToDecimals
} from '../../utils/mathHelpers';

// Define types for culvert calculations
export interface StreamGeometry {
  topWidths: number[];
  bottomWidth: number;
  depths: number[];
  averageTopWidth: number;
  averageDepth: number;
  crossSectionalArea: number;
  widthToDepthRatio: number;
}

export interface CulvertSizingInput {
  drainageArea: number;
  streamGradient: number;
  region: string;
  culvertMaterial: string;
  streamGeometry: StreamGeometry;
  useClimateFactors?: boolean;
  projectedRainfall?: number;
  useTransportability?: boolean;
}

export interface CulvertSizingResult {
  recommendedSize: number;
  method: string;
  transportabilitySize?: number;
  q100Flow?: number;
  safetyFactor: number;
  controllingFactor: 'inlet' | 'outlet';
  comparisonInfo?: string;
}

// California Method lookup table
const californiaSizingTable: { [width: number]: { [depth: number]: number | 'Q100' } } = {
  0.5: { 0.1: 600, 0.2: 600, 0.3: 600, 0.4: 700, 0.5: 800 },
  1.0: { 0.1: 600, 0.2: 600, 0.3: 700, 0.4: 900, 0.5: 1000 },
  1.5: { 0.1: 600, 0.2: 700, 0.3: 900, 0.4: 1200, 0.5: 1400 },
  2.0: { 0.1: 600, 0.2: 800, 0.3: 1200, 0.4: 1500, 0.5: 1600 },
  2.5: { 0.1: 600, 0.2: 900, 0.3: 1400, 0.4: 1800, 0.5: 1900 },
  3.0: { 0.1: 700, 0.2: 1000, 0.3: 1600, 0.4: 1900, 0.5: "Q100" },
};

/**
 * Calculates stream geometry based on field measurements
 * @param topWidths - Array of top width measurements (m)
 * @param bottomWidth - Bottom width measurement (m)
 * @param depths - Array of depth measurements (m)
 * @returns StreamGeometry object with calculated values
 */
export const calculateStreamGeometry = (
  topWidths: number[],
  bottomWidth: number,
  depths: number[]
): StreamGeometry => {
  // Calculate averages
  const averageTopWidth = calculateAverage(topWidths);
  const averageDepth = calculateAverage(depths);
  
  // Calculate cross-sectional area using trapezoidal formula
  const crossSectionalArea = calculateTrapezoidalArea(
    averageTopWidth,
    bottomWidth,
    averageDepth
  );
  
  // Calculate width-to-depth ratio
  const widthToDepthRatio = calculateWidthToDepthRatio(
    averageTopWidth,
    averageDepth
  );
  
  return {
    topWidths,
    bottomWidth,
    depths,
    averageTopWidth,
    averageDepth,
    crossSectionalArea,
    widthToDepthRatio
  };
};

/**
 * Helper function to round to nearest 0.1
 * @param value - The value to round
 * @returns Value rounded to the nearest 0.1
 */
const roundToTenth = (value: number): number => {
  return Math.round(value * 10) / 10;
};

/**
 * Get size from California Method table
 * @param width - Stream width
 * @param depth - Stream depth
 * @returns Recommended culvert size in mm or 'Q100' if exceeds table
 */
export const getCaliforniaMethodSize = (width: number, depth: number): number | 'Q100' => {
  // Round to the nearest table values
  const roundedWidth = roundToTenth(Math.min(Math.max(width, 0.5), 3.0));
  const roundedDepth = roundToTenth(Math.min(Math.max(depth, 0.1), 0.5));
  
  // Find the closest width in the table
  const widthKeys = Object.keys(californiaSizingTable).map(Number);
  const closestWidth = widthKeys.reduce((prev, curr) => 
    Math.abs(curr - roundedWidth) < Math.abs(prev - roundedWidth) ? curr : prev
  );
  
  // Find the closest depth in the table
  const depthKeys = Object.keys(californiaSizingTable[closestWidth]).map(Number);
  const closestDepth = depthKeys.reduce((prev, curr) => 
    Math.abs(curr - roundedDepth) < Math.abs(prev - roundedDepth) ? curr : prev
  );
  
  return californiaSizingTable[closestWidth][closestDepth];
};

/**
 * Get culvert size based on End Area Method
 * @param area - Cross-sectional area in m²
 * @returns Recommended culvert size in mm
 */
export const getEndAreaCulvertSize = (area: number): number => {
  if (area <= 0.2) return 600;
  if (area <= 0.4) return 700;
  if (area <= 0.6) return 800;
  if (area <= 0.8) return 900;
  if (area <= 1.0) return 1000;
  if (area <= 1.2) return 1200;
  if (area <= 1.5) return 1400;
  if (area <= 1.8) return 1600;
  if (area <= 2.0) return 1800;
  return 2000;
};

/**
 * Simple Q100 estimation based on regional curves for coastal BC
 * @param drainageArea - Drainage area in hectares
 * @param region - Geographic region
 * @returns Estimated Q100 flow in m³/s
 */
export const estimateQ100Flow = (
  drainageArea: number,
  region: string
): number => {
  // Convert hectares to km² for the formula
  const drainageAreaKm2 = drainageArea / 100;
  
  // Different coefficients based on region
  // These are simplified examples - real values would be based on regional curves
  let a: number;
  let b: number;
  
  if (region.includes('Vancouver Island') || region.includes('Coastal BC')) {
    // Coastal BC/Vancouver Island coefficients (wetter climate)
    a = 0.92;
    b = 0.78;
  } else if (region.includes('Interior BC')) {
    // Interior BC coefficients
    a = 0.74;
    b = 0.75;
  } else if (region.includes('Northern BC')) {
    // Northern BC coefficients
    a = 0.65;
    b = 0.72;
  } else {
    // Default to coastal coefficients
    a = 0.92;
    b = 0.78;
  }
  
  // Formula: Q = a * A^b
  // where A is drainage area in km² and Q is flow in m³/s
  return a * Math.pow(drainageAreaKm2, b);
};

/**
 * Apply climate change factors to the Q100 flow
 * @param q100Flow - Base Q100 flow in m³/s
 * @param projectedRainfall - Projected rainfall intensity in mm/hr
 * @param region - Geographic region
 * @returns Adjusted Q100 flow in m³/s
 */
export const applyClimateFactors = (
  q100Flow: number,
  projectedRainfall: number,
  region: string
): number => {
  // This is a simplified approach
  // In a real implementation, this would use more sophisticated climate models
  
  // Baseline rainfall intensity values by region (mm/hr)
  const baselineRainfall = region.includes('Coastal BC') ? 65 : 
                          region.includes('Interior BC') ? 45 : 
                          region.includes('Northern BC') ? 35 : 55;
  
  // Calculate scaling factor
  const scalingFactor = projectedRainfall / baselineRainfall;
  
  // Apply scaling factor to the Q100 flow
  // Adding a minimum adjustment of 10% to account for other climate factors
  const adjustmentFactor = Math.max(scalingFactor, 1.1);
  
  return q100Flow * adjustmentFactor;
};

/**
 * Calculate required culvert size using Manning's equation
 * @param q100Flow - Q100 flow in m³/s
 * @param culvertMaterial - Material of the culvert
 * @param streamGradient - Stream gradient in percentage
 * @returns Required culvert diameter in mm
 */
export const calculateCulvertSize = (
  q100Flow: number,
  culvertMaterial: string,
  streamGradient: number
): number => {
  // Get Manning's roughness coefficient for the culvert material
  const manningsN = CULVERT_TOOL.manningsCoefficients[culvertMaterial as keyof typeof CULVERT_TOOL.manningsCoefficients] || 0.024;
  
  // Convert gradient from percentage to decimal
  const gradientDecimal = streamGradient / 100;
  
  // Start with an initial guess of diameter in mm
  let diameter = 300; // mm
  let calculatedFlow = 0;
  
  // Iteratively find the right diameter
  while (calculatedFlow < q100Flow && diameter <= 2000) {
    // Calculate pipe area and wetted perimeter for full flow
    const area = calculatePipeArea(diameter);
    const wettedPerimeter = calculatePipeWettedPerimeter(diameter);
    const hydraulicRadius = calculateHydraulicRadius(area, wettedPerimeter);
    
    // Calculate flow using Manning's equation
    calculatedFlow = calculateManningsFlow(
      manningsN,
      area,
      hydraulicRadius,
      gradientDecimal
    );
    
    // If calculated flow is still less than Q100, try a larger diameter
    if (calculatedFlow < q100Flow) {
      diameter += 100;
    }
  }
  
  return diameter;
};

/**
 * Determine culvert size based on transportability matrix
 * @param widthToDepthRatio - Width-to-depth ratio of the stream
 * @param streamGradient - Stream gradient in percentage
 * @param standardSizes - Array of standard culvert sizes
 * @returns Recommended culvert size in mm
 */
export const determineTransportabilitySizing = (
  widthToDepthRatio: number,
  streamGradient: number,
  standardSizes: number[]
): number => {
  // Determine risk category based on gradient
  let gradientRisk: 'low' | 'moderate' | 'high' | 'veryHigh';
  
  if (streamGradient < CULVERT_TOOL.gradientRisk.low.max) {
    gradientRisk = 'low';
  } else if (streamGradient < CULVERT_TOOL.gradientRisk.moderate.max) {
    gradientRisk = 'moderate';
  } else if (streamGradient < CULVERT_TOOL.gradientRisk.high.max) {
    gradientRisk = 'high';
  } else {
    gradientRisk = 'veryHigh';
  }
  
  // Determine width-to-depth category
  let widthDepthCategory: 'low' | 'medium' | 'high';
  
  if (widthToDepthRatio < CULVERT_TOOL.widthToDepthRatio.low.max) {
    widthDepthCategory = 'low';
  } else if (widthToDepthRatio < CULVERT_TOOL.widthToDepthRatio.medium.max) {
    widthDepthCategory = 'medium';
  } else {
    widthDepthCategory = 'high';
  }
  
  // Determine minimum culvert size based on the matrix
  let minSizeIndex = 0;
  
  // Very high gradient gets largest size regardless of width-depth ratio
  if (gradientRisk === 'veryHigh') {
    minSizeIndex = 6; // 900mm minimum for debris torrent risk
  } else if (gradientRisk === 'high') {
    if (widthDepthCategory === 'low') {
      minSizeIndex = 3; // 600mm
    } else if (widthDepthCategory === 'medium') {
      minSizeIndex = 4; // 700mm
    } else {
      minSizeIndex = 5; // 800mm
    }
  } else if (gradientRisk === 'moderate') {
    if (widthDepthCategory === 'low') {
      minSizeIndex = 2; // 500mm
    } else if (widthDepthCategory === 'medium') {
      minSizeIndex = 3; // 600mm
    } else {
      minSizeIndex = 4; // 700mm
    }
  } else { // Low gradient
    if (widthDepthCategory === 'low') {
      minSizeIndex = 1; // 400mm
    } else if (widthDepthCategory === 'medium') {
      minSizeIndex = 2; // 500mm
    } else {
      minSizeIndex = 3; // 600mm
    }
  }
  
  return standardSizes[minSizeIndex];
};

/**
 * Determine controlling factor (inlet vs outlet control)
 * This is a simplified approach - real culvert hydraulics is more complex
 * @param culvertSize - Culvert diameter in mm
 * @param streamGradient - Stream gradient in percentage
 * @param culvertMaterial - Material of the culvert
 * @returns The controlling factor
 */
export const determineControllingFactor = (
  culvertSize: number,
  streamGradient: number,
  culvertMaterial: string
): 'inlet' | 'outlet' => {
  // This is a simplified model
  // In practice, this requires more detailed hydraulic calculations
  
  // Factors that tend toward inlet control:
  // - Steeper slope
  // - Shorter culvert length
  // - Unsubmerged inlet
  
  // Factors that tend toward outlet control:
  // - Milder slope
  // - Longer culvert length
  // - Higher roughness coefficient
  // - Submerged outlet
  
  // Get Manning's roughness coefficient
  const manningsN = CULVERT_TOOL.manningsCoefficients[culvertMaterial as keyof typeof CULVERT_TOOL.manningsCoefficients] || 0.024;
  
  // Simplified decision logic
  // Steep slope + smooth pipe = more likely inlet control
  // Mild slope + rough pipe = more likely outlet control
  
  if (streamGradient > 3 && manningsN < 0.015) {
    return 'inlet';
  } else if (streamGradient < 1 || manningsN > 0.02) {
    return 'outlet';
  } else {
    // When in doubt, the more conservative approach is usually outlet control
    return 'outlet';
  }
};

/**
 * Calculate safety factor based on risk assessment
 * @param streamGradient - Stream gradient in percentage
 * @param transportabilityUsed - Whether transportability matrix was used
 * @returns Safety factor value
 */
export const calculateSafetyFactor = (
  streamGradient: number,
  transportabilityUsed: boolean
): number => {
  // Higher safety factor for higher risk scenarios
  if (streamGradient > 8) {
    return CULVERT_TOOL.safetyFactors.high; // High risk - steep gradient
  } else if (streamGradient > 3 || transportabilityUsed) {
    return CULVERT_TOOL.safetyFactors.medium; // Medium risk
  } else {
    return CULVERT_TOOL.safetyFactors.low; // Low risk
  }
};

/**
 * Get the recommended culvert size using both California Method and End Area Method
 * @param avgWidth - Average stream width
 * @param avgDepth - Average stream depth
 * @param crossSectionalArea - Stream cross-sectional area
 * @returns Object with recommended size, method used, and comparison info
 */
export const getRecommendedCulvertSize = (
  avgWidth: number,
  avgDepth: number,
  crossSectionalArea: number
): { method: string; size: number; comparisonInfo: string } => {
  const endAreaSize = getEndAreaCulvertSize(crossSectionalArea);
  const californiaResult = getCaliforniaMethodSize(avgWidth, avgDepth);

  // Handle Q100 fallback
  if (californiaResult === 'Q100') {
    return {
      method: 'End Area Method',
      size: endAreaSize,
      comparisonInfo: 'California method exceeded (Q100), using end area'
    };
  }

  const californiaSize = californiaResult as number;
  const recommended = Math.max(endAreaSize, californiaSize);

  return {
    method: recommended === endAreaSize ? 'End Area Method' : 'California Method',
    size: recommended,
    comparisonInfo: `End Area: ${endAreaSize} mm vs California: ${californiaSize} mm`
  };
};

/**
 * Main function to calculate culvert sizing based on input parameters
 * @param input - Culvert sizing input parameters
 * @returns Culvert sizing results
 */
export const calculateCulvertSizing = (input: CulvertSizingInput): CulvertSizingResult => {
  // Get stream geometry values
  const { averageTopWidth, averageDepth, crossSectionalArea, widthToDepthRatio } = input.streamGeometry;

  // Calculate Q100 flow based on drainage area and region
  let q100Flow = estimateQ100Flow(input.drainageArea, input.region);
  
  // Apply climate factors if needed
  if (input.useClimateFactors && input.projectedRainfall) {
    q100Flow = applyClimateFactors(q100Flow, input.projectedRainfall, input.region);
  }
  
  // Apply safety factor
  const safetyFactor = calculateSafetyFactor(
    input.streamGradient, 
    Boolean(input.useTransportability)
  );
  q100Flow = q100Flow * safetyFactor;
  
  // Get recommended size using dual methods
  const recommendation = getRecommendedCulvertSize(
    averageTopWidth,
    averageDepth,
    crossSectionalArea
  );
  
  let recommendedSize = recommendation.size;
  let method = recommendation.method;
  let comparisonInfo = recommendation.comparisonInfo;
  
  // Determine if inlet or outlet control is the limiting factor
  const controllingFactor = determineControllingFactor(
    recommendedSize,
    input.streamGradient,
    input.culvertMaterial
  );
  
  let transportabilitySize;
  
  // If using transportability matrix, calculate size based on that as well
  if (input.useTransportability) {
    transportabilitySize = determineTransportabilitySizing(
      widthToDepthRatio,
      input.streamGradient,
      CULVERT_TOOL.minDiameters
    );
    
    // Use the larger of the two sizes
    if (transportabilitySize > recommendedSize) {
      recommendedSize = transportabilitySize;
      method = 'Stream Transportability Matrix';
      comparisonInfo = `${comparisonInfo}, Transportability: ${transportabilitySize} mm (selected)`;
    } else {
      comparisonInfo = `${comparisonInfo}, Transportability: ${transportabilitySize} mm`;
    }
  }
  
  return {
    recommendedSize,
    method,
    transportabilitySize,
    q100Flow: roundToDecimals(q100Flow, 3),
    safetyFactor,
    controllingFactor,
    comparisonInfo
  };
};