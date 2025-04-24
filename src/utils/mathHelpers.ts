/**
 * Utility functions for mathematical calculations in the AI Forester App
 */

/**
 * Calculate the average of an array of numbers
 * @param values - Array of numbers to average
 * @returns number - The calculated average
 */
export const calculateAverage = (values: number[]): number => {
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return sum / values.length;
};

/**
 * Calculate the cross-sectional area of a trapezoidal channel
 * @param topWidth - The top width of the channel (m)
 * @param bottomWidth - The bottom width of the channel (m)
 * @param depth - The depth of the channel (m)
 * @returns number - The calculated area in square meters
 */
export const calculateTrapezoidalArea = (
  topWidth: number,
  bottomWidth: number,
  depth: number
): number => {
  return ((topWidth + bottomWidth) / 2) * depth;
};

/**
 * Calculate the wetted perimeter of a trapezoidal channel
 * @param bottomWidth - The bottom width of the channel (m)
 * @param depth - The depth of the channel (m)
 * @param sideSlope - The side slope (horizontal:vertical)
 * @returns number - The calculated wetted perimeter in meters
 */
export const calculateWettedPerimeter = (
  bottomWidth: number,
  depth: number,
  sideSlope: number
): number => {
  const sideLength = Math.sqrt(Math.pow(depth, 2) + Math.pow(depth * sideSlope, 2));
  return bottomWidth + (2 * sideLength);
};

/**
 * Calculate the hydraulic radius of a channel
 * @param area - The cross-sectional area (m²)
 * @param wettedPerimeter - The wetted perimeter (m)
 * @returns number - The calculated hydraulic radius in meters
 */
export const calculateHydraulicRadius = (
  area: number,
  wettedPerimeter: number
): number => {
  return area / wettedPerimeter;
};

/**
 * Calculate flow using Manning's equation
 * @param manningsN - Manning's roughness coefficient
 * @param area - Cross-sectional area of flow (m²)
 * @param hydraulicRadius - Hydraulic radius (m)
 * @param slope - Channel slope (m/m)
 * @returns number - Calculated flow in cubic meters per second (m³/s)
 */
export const calculateManningsFlow = (
  manningsN: number,
  area: number,
  hydraulicRadius: number,
  slope: number
): number => {
  // Convert slope from percentage to decimal if needed
  const slopeDecimal = slope > 1 ? slope / 100 : slope;
  
  // Q = (1/n) * A * R^(2/3) * S^(1/2)
  return (1 / manningsN) * area * Math.pow(hydraulicRadius, 2/3) * Math.pow(slopeDecimal, 1/2);
};

/**
 * Calculate the circular pipe area given a diameter
 * @param diameter - Pipe diameter in millimeters
 * @returns number - Area in square meters
 */
export const calculatePipeArea = (diameter: number): number => {
  const radius = (diameter / 1000) / 2; // Convert mm to m and get radius
  return Math.PI * Math.pow(radius, 2);
};

/**
 * Calculate the circular pipe wetted perimeter for full flow
 * @param diameter - Pipe diameter in millimeters
 * @returns number - Wetted perimeter in meters
 */
export const calculatePipeWettedPerimeter = (diameter: number): number => {
  return Math.PI * (diameter / 1000); // Convert mm to m
};

/**
 * Calculate the width-to-depth ratio of a stream
 * @param avgWidth - Average top width of the stream (m)
 * @param avgDepth - Average depth of the stream (m)
 * @returns number - The width-to-depth ratio
 */
export const calculateWidthToDepthRatio = (
  avgWidth: number,
  avgDepth: number
): number => {
  if (avgDepth === 0) return 0;
  return avgWidth / avgDepth;
};

/**
 * Convert a slope from degrees to percentage
 * @param degrees - Slope in degrees
 * @returns number - Slope as a percentage
 */
export const degreesToPercent = (degrees: number): number => {
  return Math.tan(degrees * Math.PI / 180) * 100;
};

/**
 * Convert a slope from percentage to degrees
 * @param percent - Slope as a percentage
 * @returns number - Slope in degrees
 */
export const percentToDegrees = (percent: number): number => {
  return Math.atan(percent / 100) * (180 / Math.PI);
};

/**
 * Round a number to a specified number of decimal places
 * @param value - The number to round
 * @param decimals - The number of decimal places
 * @returns number - The rounded number
 */
export const roundToDecimals = (value: number, decimals: number = 2): number => {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
};

/**
 * Find the next largest standard culvert size
 * @param requiredDiameter - The calculated required diameter in mm
 * @param standardSizes - Array of standard culvert diameters in mm
 * @returns number - The next largest standard size
 */
export const findNextLargestCulvertSize = (
  requiredDiameter: number, 
  standardSizes: number[]
): number => {
  // Sort sizes in ascending order to ensure proper comparison
  const sortedSizes = [...standardSizes].sort((a, b) => a - b);
  
  // Find the first size that is greater than or equal to the required diameter
  const nextSize = sortedSizes.find(size => size >= requiredDiameter);
  
  // Return the found size or the largest available if nothing is larger
  return nextSize || sortedSizes[sortedSizes.length - 1];
};