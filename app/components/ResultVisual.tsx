import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, Rect, Line, Text as SvgText } from 'react-native-svg';
import { COLORS, SPACING } from '../config/constants';

interface RecommendedSizeProps {
  diameter: number; // in mm
  height?: number; // in mm (for box culverts)
  width?: number; // in mm (for box culverts)
  type: 'round' | 'box';
  transportable: boolean;
}

interface ResultVisualProps {
  recommendedSize: RecommendedSizeProps;
}

const ResultVisual: React.FC<ResultVisualProps> = ({ recommendedSize }) => {
  const screenWidth = Dimensions.get('window').width - (SPACING.medium * 4); // Account for padding
  const maxSvgWidth = screenWidth;
  const maxSvgHeight = 200;
  
  // Set scale for visualization (mm to svg pixels)
  const scaleFactor = recommendedSize.type === 'round' 
    ? (maxSvgWidth * 0.8) / recommendedSize.diameter
    : (maxSvgWidth * 0.8) / Math.max(recommendedSize.width || 0, recommendedSize.height || 0);
  
  // Scale the sizes for the SVG
  const scaledDiameter = recommendedSize.diameter * scaleFactor;
  const scaledWidth = recommendedSize.width ? recommendedSize.width * scaleFactor : 0;
  const scaledHeight = recommendedSize.height ? recommendedSize.height * scaleFactor : 0;
  
  // Center positions
  const centerX = maxSvgWidth / 2;
  const centerY = maxSvgHeight / 2;

  // Human figure for scale (average height ~1.75m = 1750mm)
  const humanHeight = 1750 * scaleFactor;
  const humanWidth = humanHeight / 3.5;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Visual Representation</Text>
      <View style={styles.svgContainer}>
        <Svg width={maxSvgWidth} height={maxSvgHeight}>
          {/* Draw reference grid */}
          <Line
            x1={0}
            y1={centerY}
            x2={maxSvgWidth}
            y2={centerY}
            stroke={COLORS.lightGray}
            strokeWidth={1}
            strokeDasharray="3,3"
          />
          
          {/* Draw the culvert */}
          {recommendedSize.type === 'round' ? (
            // Round culvert
            <Circle
              cx={centerX}
              cy={centerY}
              r={scaledDiameter / 2}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={2}
            />
          ) : (
            // Box culvert
            <Rect
              x={centerX - scaledWidth / 2}
              y={centerY - scaledHeight / 2}
              width={scaledWidth}
              height={scaledHeight}
              fill="none"
              stroke={COLORS.primary}
              strokeWidth={2}
            />
          )}
          
          {/* Add dimension labels */}
          {recommendedSize.type === 'round' ? (
            // Label for round culvert
            <>
              <Line
                x1={centerX}
                y1={centerY - scaledDiameter / 2}
                x2={centerX}
                y2={centerY + scaledDiameter / 2}
                stroke={COLORS.textLight}
                strokeWidth={1}
                strokeDasharray="3,2"
              />
              <SvgText
                x={centerX + 5}
                y={centerY}
                fill={COLORS.text}
                fontSize="12"
                textAnchor="start"
              >
                {`Ø ${recommendedSize.diameter} mm`}
              </SvgText>
            </>
          ) : (
            // Labels for box culvert
            <>
              <Line
                x1={centerX - scaledWidth / 2}
                y1={centerY - scaledHeight / 2 - 10}
                x2={centerX + scaledWidth / 2}
                y2={centerY - scaledHeight / 2 - 10}
                stroke={COLORS.textLight}
                strokeWidth={1}
              />
              <SvgText
                x={centerX}
                y={centerY - scaledHeight / 2 - 15}
                fill={COLORS.text}
                fontSize="12"
                textAnchor="middle"
              >
                {`${recommendedSize.width} mm`}
              </SvgText>
              
              <Line
                x1={centerX - scaledWidth / 2 - 10}
                y1={centerY - scaledHeight / 2}
                x2={centerX - scaledWidth / 2 - 10}
                y2={centerY + scaledHeight / 2}
                stroke={COLORS.textLight}
                strokeWidth={1}
              />
              <SvgText
                x={centerX - scaledWidth / 2 - 15}
                y={centerY}
                fill={COLORS.text}
                fontSize="12"
                textAnchor="end"
                rotation="-90"
                originX={centerX - scaledWidth / 2 - 15}
                originY={centerY}
              >
                {`${recommendedSize.height} mm`}
              </SvgText>
            </>
          )}
          
          {/* Draw human figure for scale */}
          <Rect
            x={centerX + (recommendedSize.type === 'round' ? scaledDiameter / 2 : scaledWidth / 2) + 20}
            y={centerY - humanHeight / 2}
            width={humanWidth}
            height={humanHeight}
            fill={COLORS.textLight}
            opacity={0.5}
          />
          <Circle
            cx={centerX + (recommendedSize.type === 'round' ? scaledDiameter / 2 : scaledWidth / 2) + 20 + humanWidth / 2}
            cy={centerY - humanHeight / 2 + humanWidth / 2}
            r={humanWidth / 2}
            fill={COLORS.textLight}
            opacity={0.5}
          />
          <SvgText
            x={centerX + (recommendedSize.type === 'round' ? scaledDiameter / 2 : scaledWidth / 2) + 20 + humanWidth + 5}
            y={centerY}
            fill={COLORS.textLight}
            fontSize="12"
            textAnchor="start"
          >
            Human (1.75m)
          </SvgText>
        </Svg>
      </View>
      
      <Text style={styles.note}>
        The diagram above shows the recommended culvert size with a human figure for scale.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: SPACING.medium,
    padding: SPACING.small,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
    textAlign: 'center',
  },
  svgContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: SPACING.small,
  },
  note: {
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: SPACING.small,
  },
});

export default ResultVisual;