import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Line, Rect } from 'react-native-svg';
import { COLORS, SPACING } from '../config/constants';

interface ResultVisualProps {
  size: number; // culvert size in mm
  method: string;
  transportabilitySize?: number;
}

const ResultVisual: React.FC<ResultVisualProps> = ({ 
  size, 
  method,
  transportabilitySize 
}) => {
  // Normalize size for visualization (larger culverts would be too big otherwise)
  const normalizedSize = Math.min(size / 20, 30); // cap at 30 for UI display
  
  // If we have both sizes, calculate which is larger for comparison
  const showComparison = transportabilitySize && transportabilitySize !== size;
  const transportabilityNormalizedSize = transportabilitySize 
    ? Math.min(transportabilitySize / 20, 30) 
    : 0;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Culvert Size</Text>
      <Text style={styles.sizeText}>{size} mm</Text>
      <Text style={styles.methodText}>Based on {method}</Text>
      
      {showComparison && (
        <View style={styles.comparisonBadge}>
          <Text style={styles.comparisonText}>
            {size > transportabilitySize 
              ? `Larger than Transportability Matrix (${transportabilitySize} mm)`
              : `Smaller than Transportability Matrix (${transportabilitySize} mm)`
            }
          </Text>
        </View>
      )}
      
      <View style={styles.visualContainer}>
        <Svg height="150" width="100%">
          {/* Top road line */}
          <Line 
            x1="0" 
            y1="30" 
            x2="100%" 
            y2="30" 
            stroke={COLORS.gray[400]} 
            strokeWidth="2" 
          />
          
          {/* Bottom road line */}
          <Line 
            x1="0" 
            y1="120" 
            x2="100%" 
            y2="120" 
            stroke={COLORS.gray[400]} 
            strokeWidth="2" 
          />
          
          {/* Road fill */}
          <Rect
            x="0"
            y="30"
            width="100%"
            height="90"
            fill={COLORS.gray[200]}
            opacity={0.5}
          />
          
          {/* If we're showing comparison, draw both culverts */}
          {showComparison ? (
            <>
              {/* Transportability sizing (outline) */}
              <Circle
                cx="50%"
                cy="75"
                r={transportabilityNormalizedSize}
                stroke={COLORS.secondary}
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,2"
              />
              
              {/* Actual recommended size (filled) */}
              <Circle
                cx="50%"
                cy="75"
                r={normalizedSize}
                fill={COLORS.primary}
                opacity={0.3}
                stroke={COLORS.primary}
                strokeWidth="2"
              />
            </>
          ) : (
            // Just the recommended size
            <Circle
              cx="50%"
              cy="75"
              r={normalizedSize}
              fill={COLORS.primary}
              opacity={0.3}
              stroke={COLORS.primary}
              strokeWidth="2"
            />
          )}
        </Svg>
        
        <Text style={styles.visualNote}>Visual representation (not to scale)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    marginBottom: SPACING.xl,
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  sizeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  methodText: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: SPACING.sm,
  },
  comparisonBadge: {
    backgroundColor: COLORS.info + '20', // 20% opacity
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 15,
    marginBottom: SPACING.md,
  },
  comparisonText: {
    fontSize: 12,
    color: COLORS.info,
  },
  visualContainer: {
    width: '100%',
    marginTop: SPACING.md,
    marginBottom: SPACING.xs,
  },
  visualNote: {
    fontSize: 12,
    color: COLORS.gray[500],
    textAlign: 'center',
    marginTop: SPACING.xs,
  },
});

export default ResultVisual;