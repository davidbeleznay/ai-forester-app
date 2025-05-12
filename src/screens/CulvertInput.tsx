import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, SPACING, CULVERT_TOOL } from '../config/constants';
import FieldInput from '../components/FieldInput';
import GPSCapture from '../components/GPSCapture';
import { generateUUID } from '../utils/helpers';
import { saveFieldCard } from '../utils/storage';

interface StreamMeasurement {
  width: string;
  depth: string;
}

const CulvertInput = () => {
  const navigation = useNavigation();
  const [location, setLocation] = useState({
    latitude: 0,
    longitude: 0,
    accuracy: 0,
  });
  const [calculationInProgress, setCalculationInProgress] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Form state
  const [drainageArea, setDrainageArea] = useState('');
  const [streamGradient, setStreamGradient] = useState('');
  const [region, setRegion] = useState('Coastal BC - Vancouver Island');
  const [culvertMaterial, setCulvertMaterial] = useState('CSP (Corrugated Steel Pipe)');
  const [streamName, setStreamName] = useState('');
  
  // Stream geometry measurements
  const [topWidths, setTopWidths] = useState<StreamMeasurement[]>([{ width: '', depth: '' }]);
  const [bottomWidth, setBottomWidth] = useState('');
  
  // Advanced feature toggles
  const [useClimateLayer, setUseClimateLayer] = useState(false);
  const [useTransportabilityMatrix, setUseTransportabilityMatrix] = useState(false);
  
  // Climate layer data
  const [projectedRainfall, setProjectedRainfall] = useState('');
  
  useEffect(() => {
    // Optional: Load saved draft if exists
  }, []);
  
  const addStreamMeasurement = () => {
    if (topWidths.length < 5) {
      setTopWidths([...topWidths, { width: '', depth: '' }]);
    }
  };
  
  const removeStreamMeasurement = () => {
    if (topWidths.length > 1) {
      setTopWidths(topWidths.slice(0, -1));
    }
  };
  
  const updateStreamMeasurement = (index: number, field: 'width' | 'depth', value: string) => {
    const newMeasurements = [...topWidths];
    newMeasurements[index][field] = value;
    setTopWidths(newMeasurements);
  };
  
  // Calculate average width and depth
  const calculateAverages = () => {
    let totalWidth = 0;
    let totalDepth = 0;
    let validMeasurements = 0;
    
    topWidths.forEach(measurement => {
      if (measurement.width && !isNaN(parseFloat(measurement.width))) {
        totalWidth += parseFloat(measurement.width);
        validMeasurements++;
      }
      
      if (measurement.depth && !isNaN(parseFloat(measurement.depth))) {
        totalDepth += parseFloat(measurement.depth);
      }
    });
    
    const averageWidth = validMeasurements > 0 ? totalWidth / validMeasurements : 0;
    const averageDepth = validMeasurements > 0 ? totalDepth / validMeasurements : 0;
    
    return { averageWidth, averageDepth };
  };
  
  // Calculate cross-sectional area
  const calculateCrossSectionalArea = () => {
    const { averageWidth } = calculateAverages();
    const bottom = parseFloat(bottomWidth) || 0;
    const depth = parseFloat(topWidths[0]?.depth) || 0;
    
    // Trapezoidal area: (top width + bottom width) / 2 * depth
    return ((averageWidth + bottom) / 2) * depth;
  };
  
  // Calculate width-to-depth ratio
  const calculateWidthToDepthRatio = () => {
    const { averageWidth, averageDepth } = calculateAverages();
    
    if (averageDepth === 0) return 0;
    return averageWidth / averageDepth;
  };
  
  const validateForm = () => {
    // Check required fields
    if (!drainageArea || parseFloat(drainageArea) <= 0) {
      setFormError('Please enter a valid drainage area');
      return false;
    }
    
    if (!streamGradient || parseFloat(streamGradient) <= 0) {
      setFormError('Please enter a valid stream gradient');
      return false;
    }
    
    // Check if at least one width measurement is provided
    const hasValidWidth = topWidths.some(
      measurement => measurement.width && parseFloat(measurement.width) > 0
    );
    
    if (!hasValidWidth) {
      setFormError('Please enter at least one valid width measurement');
      return false;
    }
    
    // Check if at least one depth measurement is provided
    const hasValidDepth = topWidths.some(
      measurement => measurement.depth && parseFloat(measurement.depth) > 0
    );
    
    if (!hasValidDepth) {
      setFormError('Please enter at least one valid depth measurement');
      return false;
    }
    
    setFormError('');
    return true;
  };
  
  const handleCalculate = () => {
    if (!validateForm()) {
      return;
    }
    
    setCalculationInProgress(true);
    
    // Simulate calculation delay
    setTimeout(() => {
      // Prepare results data
      const results = {
        id: generateUUID(),
        type: 'culvert-sizing',
        name: streamName || `Culvert Sizing - ${new Date().toLocaleDateString()}`,
        createdAt: Date.now(),
        location: {
          latitude: location.latitude,
          longitude: location.longitude,
          accuracy: location.accuracy,
        },
        inputs: {
          drainageArea: parseFloat(drainageArea),
          streamGradient: parseFloat(streamGradient),
          region,
          culvertMaterial,
          streamName,
          widthMeasurements: topWidths,
          bottomWidth: parseFloat(bottomWidth) || 0,
          useClimateLayer,
          useTransportabilityMatrix,
          projectedRainfall: projectedRainfall ? parseFloat(projectedRainfall) : null,
        },
        results: {
          recommendedSize: 900, // This would be calculated based on inputs
          crossSectionalArea: calculateCrossSectionalArea(),
          widthToDepthRatio: calculateWidthToDepthRatio(),
          method: 'California Method', // This would be determined by the calculation
          safetyFactor: 1.2, // This would be calculated based on inputs
        }
      };
      
      // Save field card
      saveFieldCard(results)
        .then(() => {
          setCalculationInProgress(false);
          // @ts-ignore - will be fixed with proper navigation types
          navigation.navigate('CulvertResults', { results });
        })
        .catch(error => {
          setCalculationInProgress(false);
          Alert.alert('Error', 'Failed to save calculation results.');
          console.error('Error saving field card:', error);
        });
    }, 1000);
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <CustomIcon name="arrow-left" color={COLORS.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Culvert Sizing Tool</Text>
        </View>
        
        {/* Main Form */}
        <ScrollView style={styles.scrollView}>
          {/* Basic Parameters Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Basic Parameters</Text>
            
            <FieldInput
              label="Drainage Area"
              value={drainageArea}
              onChangeText={setDrainageArea}
              keyboardType="numeric"
              suffix="hectares"
              placeholder="0.0"
            />
            
            <FieldInput
              label="Stream Gradient"
              value={streamGradient}
              onChangeText={setStreamGradient}
              keyboardType="numeric"
              suffix="%"
              placeholder="0.0"
            />
            
            <FieldInput
              label="Region"
              value={region}
              onChangeText={setRegion}
              type="select"
              options={[
                'Coastal BC - Vancouver Island',
                'Interior BC',
                'Northern BC',
              ]}
            />
            
            <FieldInput
              label="Culvert Material"
              value={culvertMaterial}
              onChangeText={setCulvertMaterial}
              type="select"
              options={[
                'CSP (Corrugated Steel Pipe)',
                'HDPE (Plastic)',
                'Concrete',
              ]}
            />
          </View>
          
          {/* Stream Geometry Card */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Stream Geometry (End Area Method)</Text>
            
            <FieldInput
              label="Stream Name (optional)"
              value={streamName}
              onChangeText={setStreamName}
              placeholder="Enter stream name"
            />
            
            {/* Width Measurements */}
            <View style={styles.measurementSection}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Top Width (W1)</Text>
                <View style={styles.measurementControls}>
                  <TouchableOpacity
                    style={styles.iconButton}
                    onPress={addStreamMeasurement}
                  >
                    <CustomIcon name="plus" color={COLORS.primary} size={16} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.iconButton,
                      topWidths.length <= 1 && styles.disabledButton,
                    ]}
                    onPress={removeStreamMeasurement}
                    disabled={topWidths.length <= 1}
                  >
                    <CustomIcon 
                      name="minus" 
                      color={topWidths.length <= 1 ? COLORS.gray[400] : COLORS.danger} 
                      size={16} 
                    />
                  </TouchableOpacity>
                </View>
              </View>
              
              {topWidths.map((measurement, index) => (
                <View key={`width-${index}`} style={styles.measurementRow}>
                  <FieldInput
                    label={index === 0 ? undefined : `Measurement ${index + 1}`}
                    value={measurement.width}
                    onChangeText={(value) => updateStreamMeasurement(index, 'width', value)}
                    keyboardType="numeric"
                    suffix="m"
                    placeholder="0.0"
                    error={
                      formError &&
                      !measurement.width &&
                      index === 0 &&
                      'Please enter a width measurement'
                    }
                  />
                </View>
              ))}
              
              {topWidths.length > 0 && topWidths.some(m => m.width && !isNaN(parseFloat(m.width))) && (
                <Text style={styles.averageText}>
                  Average width: {calculateAverages().averageWidth.toFixed(2)} m
                </Text>
              )}
            </View>
            
            {/* Bottom Width */}
            <FieldInput
              label="Bottom Width (W2)"
              value={bottomWidth}
              onChangeText={setBottomWidth}
              keyboardType="numeric"
              suffix="m"
              placeholder="0.0"
            />
            
            {/* Depth Measurements */}
            <View style={styles.measurementSection}>
              <Text style={styles.sectionTitle}>Depth (D)</Text>
              
              {topWidths.map((measurement, index) => (
                <View key={`depth-${index}`} style={styles.measurementRow}>
                  <FieldInput
                    label={index === 0 ? undefined : `Measurement ${index + 1}`}
                    value={measurement.depth}
                    onChangeText={(value) => updateStreamMeasurement(index, 'depth', value)}
                    keyboardType="numeric"
                    suffix="m"
                    placeholder="0.0"
                    error={
                      formError &&
                      !measurement.depth &&
                      index === 0 &&
                      'Please enter a depth measurement'
                    }
                  />
                </View>
              ))}
              
              {topWidths.length > 0 && topWidths.some(m => m.depth && !isNaN(parseFloat(m.depth))) && (
                <Text style={styles.averageText}>
                  Average depth: {calculateAverages().averageDepth.toFixed(2)} m
                </Text>
              )}
            </View>
            
            {/* Cross-sectional Area */}
            {calculateCrossSectionalArea() > 0 && (
              <View style={styles.resultBox}>
                <View style={styles.resultHeader}>
                  <Text style={styles.resultLabel}>Cross-sectional Area:</Text>
                  <Text style={styles.resultValue}>
                    {calculateCrossSectionalArea().toFixed(2)} m²
                  </Text>
                </View>
                <Text style={styles.resultFormula}>
                  (Average W1 + W2) / 2 × Average Depth
                </Text>
              </View>
            )}
          </View>
          
          {/* Climate Layer Toggle */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.toggleHeader}
              onPress={() => setUseClimateLayer(!useClimateLayer)}
            >
              <View style={styles.toggleLabel}>
                <CustomIcon 
                  name="toggle-right" 
                  color={COLORS.primary} 
                  size={20} 
                />
                <Text style={styles.toggleText}>Add Climate Layer</Text>
              </View>
              <CustomIcon 
                name="chevron-down" 
                color={COLORS.gray[400]} 
                size={16} 
                style={[
                  styles.chevron,
                  useClimateLayer && styles.chevronExpanded,
                ]}
              />
            </TouchableOpacity>
            
            {useClimateLayer && (
              <View style={styles.toggleContent}>
                <FieldInput
                  label="Projected Rainfall Intensity (2050)"
                  value={projectedRainfall}
                  onChangeText={setProjectedRainfall}
                  keyboardType="numeric"
                  suffix="mm/hr"
                  placeholder="0.0"
                />
                <Text style={styles.helperText}>
                  Currently using current climate data
                </Text>
              </View>
            )}
          </View>
          
          {/* Transportability Matrix Toggle */}
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.toggleHeader}
              onPress={() => setUseTransportabilityMatrix(!useTransportabilityMatrix)}
            >
              <View style={styles.toggleLabel}>
                <CustomIcon 
                  name="toggle-right" 
                  color={COLORS.primary} 
                  size={20} 
                />
                <Text style={styles.toggleText}>
                  Use Stream Transportability Matrix
                </Text>
              </View>
              <CustomIcon 
                name="chevron-down" 
                color={COLORS.gray[400]} 
                size={16} 
                style={[
                  styles.chevron,
                  useTransportabilityMatrix && styles.chevronExpanded,
                ]}
              />
            </TouchableOpacity>
            
            {useTransportabilityMatrix && (
              <View style={styles.toggleContent}>
                {calculateWidthToDepthRatio() > 0 && (
                  <View style={styles.resultBox}>
                    <View style={styles.resultHeader}>
                      <Text style={styles.resultLabel}>Width-to-Depth Ratio:</Text>
                      <Text style={styles.resultValue}>
                        {calculateWidthToDepthRatio().toFixed(2)}
                      </Text>
                    </View>
                    <Text style={styles.resultFormula}>
                      Average W1 / Average Depth
                    </Text>
                  </View>
                )}
                
                <View style={styles.warningBox}>
                  <Text style={styles.warningText}>
                    <Text style={styles.boldText}>Note:</Text> The transportability 
                    matrix will be used to determine minimum culvert size. If the Q100 
                    method yields a larger size, that will be used instead.
                  </Text>
                </View>
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoTitle}>Matrix Selection Criteria:</Text>
                  <View style={styles.infoList}>
                    <Text style={styles.infoItem}>• Width/Depth &lt; 3: Small culvert size</Text>
                    <Text style={styles.infoItem}>• Width/Depth 3-6: Medium culvert size</Text>
                    <Text style={styles.infoItem}>• Width/Depth &gt; 6: Large culvert size</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
          
          {/* Location Capture */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Location</Text>
            <GPSCapture onLocationChange={setLocation} />
          </View>
          
          {/* Error message */}
          {formError !== '' && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{formError}</Text>
            </View>
          )}
        </ScrollView>
        
        {/* Footer with Calculate button */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.calculateButton}
            onPress={handleCalculate}
            disabled={calculationInProgress}
          >
            {calculationInProgress ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <>
                <CustomIcon name="calculator" color={COLORS.white} size={20} style={styles.buttonIcon} />
                <Text style={styles.calculateButtonText}>Calculate</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Calculating Overlay */}
      {calculationInProgress && (
        <View style={styles.calculatingOverlay}>
          <View style={styles.calculatingCard}>
            <ActivityIndicator color={COLORS.primary} size="large" style={styles.calculatingIndicator} />
            <Text style={styles.calculatingText}>Calculating culvert size...</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.gray[100],
  },
  header: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: SPACING.md,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
    padding: SPACING.md,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: SPACING.md,
    color: COLORS.gray[800],
  },
  measurementSection: {
    marginBottom: SPACING.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.sm,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[700],
  },
  measurementControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.gray[100],
    marginLeft: SPACING.xs,
  },
  disabledButton: {
    opacity: 0.5,
  },
  measurementRow: {
    marginBottom: SPACING.xs,
  },
  averageText: {
    fontSize: 12,
    fontStyle: 'italic',
    color: COLORS.gray[500],
    marginTop: 2,
  },
  resultBox: {
    backgroundColor: COLORS.blue[50],
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.blue[200],
    marginBottom: SPACING.md,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.blue[800],
  },
  resultValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.blue[800],
  },
  resultFormula: {
    fontSize: 12,
    color: COLORS.blue[600],
    marginTop: 4,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleText: {
    marginLeft: SPACING.sm,
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
  chevron: {
    transition: '0.3s',
  },
  chevronExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  toggleContent: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  helperText: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  warningBox: {
    backgroundColor: COLORS.yellow[50],
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.yellow[200],
    marginBottom: SPACING.md,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.yellow[800],
  },
  infoBox: {
    backgroundColor: COLORS.gray[50],
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
    marginBottom: 4,
  },
  infoList: {
    marginTop: 4,
  },
  infoItem: {
    fontSize: 12,
    color: COLORS.gray[600],
    marginBottom: 2,
  },
  errorContainer: {
    backgroundColor: COLORS.danger + '20',
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.danger,
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 14,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  calculateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    marginRight: SPACING.sm,
  },
  calculateButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  calculatingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  calculatingCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.lg,
    alignItems: 'center',
    width: '80%',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  calculatingIndicator: {
    marginBottom: SPACING.md,
  },
  calculatingText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray[700],
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default CulvertInput;