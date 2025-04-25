/**
 * Culvert Sizing Calculation Utilities
 * 
 * This service implements the technical calculations for culvert sizing based on:
 * 1. Q100 table-based sizing for coastal BC watersheds
 * 2. Manning's equation for hydraulic calculations
 * 3. Inlet/outlet control analysis
 * 4. Transportability assessment
 */

import { CULVERT_TOOL } from '../config/constants';

// Types
export interface CulvertInputs {
  drainageArea: number;
  streamGradient: number;
  region: string;
  culvertMaterial: string;
  streamName?: string;
  crossSectionalArea: number;
  widthToDepthRatio: number;
  useClimateLayer: boolean;
  useTransportabilityMatrix: boolean;
  projectedRainfall?: number;
}

export interface CulvertResults {
  recommendedSize: number;
  method: string;
  safetyFactor: number;
  transportabilitySize?: number;
  controlType: 'inlet' | 'outlet';
  flowCapacity: number;
  riskFactors?: string[];
}

// Q100 Discharge Table for Coastal BC (m³/s)
// Values represent discharge based on drainage area
const Q100_COASTAL_BC = [
  { area: 1, flow: 0.3 },
  { area: 5, flow: 1.1 },
  { area: 10, flow: 1.8 },
  { area: 20, flow: 3.1 },
  { area: 50, flow: 6.1 },
  { area: 100, flow: 10.3 },
  { area: 200, flow: 17.6 },
  { area: 500, flow: 34.7 },
  { area: 1000, flow: 59.6 },
];

// Q100 Discharge Table for Interior BC (m³/s)
const Q100_INTERIOR_BC = [
  { area: 1, flow: 0.2 },
  { area: 5, flow: 0.7 },
  { area: 10, flow: 1.3 },
  { area: 20, flow: 2.3 },
  { area: 50, flow: 4.5 },
  { area: 100, flow: 7.4 },
  { area: 200, flow: 12.6 },
  { area: 500, flow: 24.7 },
  { area: 1000, flow: 41.9 },
];

// Q100 Discharge Table for Northern BC (m³/s)
const Q100_NORTHERN_BC = [
  { area: 1, flow: 0.25 },
  { area: 5, flow: 0.9 },
  { area: 10, flow: 1.5 },
  { area: 20, flow: 2.5 },
  { area: 50, flow: 5.0 },
  { area: 100, flow: 8.5 },
  { area: 200, flow: 14.5 },
  { area: 500, flow: 28.6 },
  { area: 1000, flow: 48.2 },
];

/**
 * Calculate Q100 discharge based on drainage area and region
 * 
 * @param drainageArea - Watershed drainage area in hectares
 * @param region - Geographic region (Coastal, Interior, Northern BC)
 * @returns Estimated Q100 discharge in m³/s
 */
export function calculateQ100Discharge(drainageArea: number, region: string): number {
  // Select the appropriate discharge table based on region
  let dischargeTable;
  
  if (region.includes('Coastal') || region.includes('Vancouver Island')) {
    dischargeTable = Q100_COASTAL_BC;
  } else if (region.includes('Interior')) {
    dischargeTable = Q100_INTERIOR_BC;
  } else if (region.includes('Northern')) {
    dischargeTable = Q100_NORTHERN_BC;
  } else {
    // Default to Coastal BC if region not specified
    dischargeTable = Q100_COASTAL_BC;
  }
  
  // Convert drainage area from hectares to km² (1 hectare = 0.01 km²)
  const areaInKm2 = drainageArea * 0.01;
  
  // Find the closest area values in the table for interpolation
  let lowerIndex = 0;
  let upperIndex = dischargeTable.length - 1;
  
  // Find the appropriate indices for interpolation
  for (let i = 0; i < dischargeTable.length; i++) {
    if (dischargeTable[i].area <= areaInKm2) {
      lowerIndex = i;
    }
    if (dischargeTable[i].area >= areaInKm2 && i < upperIndex) {
      upperIndex = i;
    }
  }
  
  // Simple linear interpolation
  const lowerArea = dischargeTable[lowerIndex].area;
  const upperArea = dischargeTable[upperIndex].area;
  const lowerFlow = dischargeTable[lowerIndex].flow;
  const upperFlow = dischargeTable[upperIndex].flow;
  
  // If the area is outside the bounds of the table, use the closest value
  if (areaInKm2 <= lowerArea) {
    return lowerFlow;
  }
  if (areaInKm2 >= upperArea) {
    return upperFlow;
  }
  
  // Linear interpolation: y = y1 + (x - x1) * (y2 - y1) / (x2 - x1)
  const interpolatedFlow = lowerFlow + 
    (areaInKm2 - lowerArea) * (upperFlow - lowerFlow) / (upperArea - lowerArea);
  
  return interpolatedFlow;
}

/**
 * Calculate required culvert diameter based on Q100 discharge
 * 
 * @param q100Flow - Design flow in m³/s
 * @param culvertMaterial - Culvert material (affects Manning's roughness)
 * @param streamGradient - Stream gradient in percent
 * @returns Minimum required culvert diameter in mm
 */
export function calculateRequiredDiameter(q100Flow: number, culvertMaterial: string, streamGradient: number): number {
  // Get Manning's roughness coefficient for the selected material
  const manningsN = CULVERT_TOOL.manningsCoefficients[culvertMaterial] || 0.024; // Default to CSP
  
  // Convert stream gradient from percent to decimal
  const slope = streamGradient / 100;
  
  // Start with the minimum diameter
  let selectedDiameter = CULVERT_TOOL.minDiameters[0];
  
  // Test each diameter until we find one that can handle the flow
  for (const diameter of CULVERT_TOOL.minDiameters) {
    // Convert diameter from mm to m
    const d = diameter / 1000;
    
    // Calculate cross-sectional area (m²)
    const area = Math.PI * Math.pow(d / 2, 2);
    
    // Calculate wetted perimeter (m)
    const wettedPerimeter = Math.PI * d;
    
    // Calculate hydraulic radius (m)
    const hydraulicRadius = area / wettedPerimeter;
    
    // Manning's equation: Q = (1/n) * A * R^(2/3) * S^(1/2)
    const capacity = (1 / manningsN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope, 1/2);
    
    // If the capacity is sufficient, use this diameter
    if (capacity >= q100Flow) {
      selectedDiameter = diameter;
      break;
    }
  }
  
  return selectedDiameter;
}

/**
 * Determine the controlling factor in culvert design (inlet vs. outlet control)
 * 
 * @param diameter - Culvert diameter in mm
 * @param culvertMaterial - Culvert material
 * @param streamGradient - Stream gradient in percent
 * @returns Control type ('inlet' or 'outlet')
 */
export function determineControlType(diameter: number, culvertMaterial: string, streamGradient: number): 'inlet' | 'outlet' {
  // For typical culverts, inlet control generally governs when:
  // - Culvert slope is steep (greater than about 2%)
  // - Culvert is relatively short
  // - Downstream water level is low
  
  // Simplified determination based on stream gradient (slope)
  if (streamGradient > 2) {
    return 'inlet';
  } else {
    return 'outlet';
  }
}

/**
 * Calculate culvert flow capacity 
 * 
 * @param diameter - Culvert diameter in mm
 * @param culvertMaterial - Culvert material 
 * @param streamGradient - Stream gradient in percent
 * @returns Flow capacity in m³/s
 */
export function calculateFlowCapacity(diameter: number, culvertMaterial: string, streamGradient: number): number {
  // Get Manning's roughness coefficient for the selected material
  const manningsN = CULVERT_TOOL.manningsCoefficients[culvertMaterial] || 0.024; // Default to CSP
  
  // Convert diameter from mm to m
  const d = diameter / 1000;
  
  // Convert stream gradient from percent to decimal
  const slope = streamGradient / 100;
  
  // Calculate cross-sectional area (m²)
  const area = Math.PI * Math.pow(d / 2, 2);
  
  // Calculate wetted perimeter (m)
  const wettedPerimeter = Math.PI * d;
  
  // Calculate hydraulic radius (m)
  const hydraulicRadius = area / wettedPerimeter;
  
  // Manning's equation: Q = (1/n) * A * R^(2/3) * S^(1/2)
  const capacity = (1 / manningsN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slope, 1/2);
  
  return capacity;
}

/**
 * Determine appropriate culvert size based on transportability matrix
 * 
 * @param widthToDepthRatio - Stream width-to-depth ratio
 * @param streamGradient - Stream gradient in percent
 * @returns Recommended culvert diameter from transportability matrix
 */
export function calculateTransportabilitySize(widthToDepthRatio: number, streamGradient: number): number {
  // Determine the transportability category based on width-to-depth ratio
  let transportCategory: 'low' | 'medium' | 'high' = 'medium'; // Default to medium
  
  if (widthToDepthRatio < 3) {
    transportCategory = 'low';
  } else if (widthToDepthRatio > 6) {
    transportCategory = 'high';
  }
  
  // Base size based on category (simplified approach)
  let baseSize = 800; // Default medium size
  
  if (transportCategory === 'low') {
    baseSize = 600;
  } else if (transportCategory === 'high') {
    baseSize = 1000;
  }
  
  // Adjust based on gradient risk
  let gradientAdjustment = 0;
  
  // Apply gradient risk adjustments
  if (streamGradient < 1) {
    // Low gradient - no adjustment
    gradientAdjustment = 0;
  } else if (streamGradient >= 1 && streamGradient < 3) {
    // Moderate gradient - small upsize
    gradientAdjustment = 100;
  } else if (streamGradient >= 3 && streamGradient < 8) {
    // High gradient - medium upsize
    gradientAdjustment = 200;
  } else {
    // Very high gradient - significant upsize
    gradientAdjustment = 300;
  }
  
  return baseSize + gradientAdjustment;
}

/**
 * Identify risk factors based on stream characteristics
 * 
 * @param streamGradient - Stream gradient in percent
 * @param widthToDepthRatio - Stream width-to-depth ratio
 * @returns Array of risk factor descriptions
 */
export function identifyRiskFactors(streamGradient: number, widthToDepthRatio: number): string[] {
  const riskFactors: string[] = [];
  
  // Gradient-based risk factors
  if (streamGradient >= 8) {
    riskFactors.push("Very high gradient (>8%) - high debris torrent risk");
  } else if (streamGradient >= 3) {
    riskFactors.push("High gradient (3-8%) - increased sediment transport");
  }
  
  // Width-to-depth ratio risk factors
  if (widthToDepthRatio < 3) {
    riskFactors.push("Low width-to-depth ratio (<3) - may indicate incised channel");
  } else if (widthToDepthRatio > 10) {
    riskFactors.push("Very high width-to-depth ratio (>10) - may indicate braided channel");
  }
  
  return riskFactors;
}

/**
 * Main calculation function to determine culvert size
 * 
 * @param inputs - Culvert sizing input parameters
 * @returns Complete culvert sizing results
 */
export function calculateCulvertSize(inputs: CulvertInputs): CulvertResults {
  // Calculate Q100 discharge based on drainage area and region
  let q100Flow = calculateQ100Discharge(inputs.drainageArea, inputs.region);
  
  // Apply climate adjustment factor if enabled
  if (inputs.useClimateLayer && inputs.projectedRainfall) {
    // Simple climate change adjustment based on projected rainfall
    // In a real implementation, this would be more sophisticated
    const currentRainfall = 100; // Placeholder for current rainfall intensity
    const climateFactor = inputs.projectedRainfall / currentRainfall;
    q100Flow = q100Flow * climateFactor;
  }
  
  // Calculate required culvert diameter based on Q100 discharge
  const q100Diameter = calculateRequiredDiameter(q100Flow, inputs.culvertMaterial, inputs.streamGradient);
  
  // Determine safety factor based on risk level
  let safetyFactor = CULVERT_TOOL.safetyFactors.medium; // Default to medium
  
  if (inputs.streamGradient < 2) {
    safetyFactor = CULVERT_TOOL.safetyFactors.low;
  } else if (inputs.streamGradient > 5) {
    safetyFactor = CULVERT_TOOL.safetyFactors.high;
  }
  
  // Initialize results with Q100 method by default
  let results: CulvertResults = {
    recommendedSize: q100Diameter,
    method: 'California Method',
    safetyFactor: safetyFactor,
    controlType: determineControlType(q100Diameter, inputs.culvertMaterial, inputs.streamGradient),
    flowCapacity: calculateFlowCapacity(q100Diameter, inputs.culvertMaterial, inputs.streamGradient),
    riskFactors: identifyRiskFactors(inputs.streamGradient, inputs.widthToDepthRatio)
  };
  
  // If transportability matrix is enabled, compare with that size
  if (inputs.useTransportabilityMatrix) {
    const transportSize = calculateTransportabilitySize(inputs.widthToDepthRatio, inputs.streamGradient);
    results.transportabilitySize = transportSize;
    
    // Use the larger of Q100 and transportability-based sizes
    if (transportSize > q100Diameter) {
      results.recommendedSize = transportSize;
      results.method = 'Transportability Matrix';
    }
  }
  
  // Round up to next standard diameter if needed
  const standardDiameters = CULVERT_TOOL.minDiameters;
  for (const diameter of standardDiameters) {
    if (diameter >= results.recommendedSize) {
      results.recommendedSize = diameter;
      break;
    }
  }
  
  return results;
}

export default {
  calculateQ100Discharge,
  calculateRequiredDiameter,
  determineControlType,
  calculateFlowCapacity,
  calculateTransportabilitySize,
  identifyRiskFactors,
  calculateCulvertSize
};