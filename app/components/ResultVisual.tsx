import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, SPACING } from '../config/constants';

interface ResultVisualProps {
  size: number;
  method: string;
  transportabilitySize?: number;
}

const ResultVisual: React.FC<ResultVisualProps> = ({ 
  size,
  method,
  transportabilitySize
}) => {
  // Calculate a scaled size for visual representation (not to actual scale)
  const visualSize = Math.min(150, Math.max(60, size / 10));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recommended Culvert Size</Text>
      
      <View style={styles.sizeContainer}>
        <Text style={styles.sizeValue}>{size} mm</Text>
        <Text style={styles.sizeMethod}>Based on {method}</Text>
      </View>
      
      {transportabilitySize && transportabilitySize !== size && (
        <View style={styles.comparisonChip}>
          <Text style={styles.comparisonText}>
            {size > transportabilitySize 
              ? `Larger than Transportability Matrix (${transportabilitySize} mm)`
              : `Smaller than Transportability Matrix (${transportabilitySize} mm)`}
          </Text>
        </View>
      )}
      
      <View style={styles.visualContainer}>
        <View style={styles.roadLine} />
        <View 
          style={[
            styles.culvertCircle,
            { width: visualSize, height: visualSize }
          ]} 
        />
        <View style={styles.roadLine} />
        <Text style={styles.visualNote}>Visual representation (not to scale)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.md,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
  },
  sizeContainer: {
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sizeValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  sizeMethod: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  comparisonChip: {
    backgroundColor: COLORS.blue[50],
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    borderRadius: 16,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.blue[100],
  },
  comparisonText: {
    fontSize: 12,
    color: COLORS.blue[800],
  },
  visualContainer: {
    alignItems: 'center',
    marginVertical: SPACING.md,
    width: '80%',
  },
  roadLine: {
    height: 8,
    backgroundColor: COLORS.gray[400],
    width: '100%',
    borderRadius: 4,
  },
  culvertCircle: {
    backgroundColor: COLORS.blue[100],
    borderWidth: 2,
    borderColor: COLORS.blue[400],
    borderRadius: 75, // Half of max size to ensure it stays circular
    marginVertical: SPACING.xs,
  },
  visualNote: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: SPACING.sm,
  },
});

export default ResultVisual;