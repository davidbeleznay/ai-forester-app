import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Slider,
  ActivityIndicator
} from 'react-native';
import { COLORS, SPACING, CULVERT_TOOL } from '../../config/constants';
import { StackNavigationProp } from '@react-navigation/stack';
import { CulvertToolParamList } from '../../navigation/CulvertToolNavigator';
import { calculateStreamGeometry, calculateCulvertSizing, CulvertSizingInput } from './culvertLogic';

type InputScreenNavigationProp = StackNavigationProp<CulvertToolParamList, 'Input'>;

type Props = {
  navigation: InputScreenNavigationProp;
};

const InputScreen: React.FC<Props> = ({ navigation }) => {
  // Form state with numeric values
  const [drainageAreaValue, setDrainageAreaValue] = useState<number>(5);
  const [streamGradientValue, setStreamGradientValue] = useState<number>(2);
  const [drainageArea, setDrainageArea] = useState<string>('5');
  const [streamGradient, setStreamGradient] = useState<string>('2');
  const [region, setRegion] = useState<string>('Coastal BC');
  const [culvertMaterial, setCulvertMaterial] = useState<string>('CSP (Corrugated Steel Pipe)');
  
  // Stream geometry measurements
  const [topWidth1, setTopWidth1] = useState<string>('');
  const [topWidth2, setTopWidth2] = useState<string>('');
  const [topWidth3, setTopWidth3] = useState<string>('');
  const [bottomWidth, setBottomWidth] = useState<string>('');
  const [depth1, setDepth1] = useState<string>('');
  const [depth2, setDepth2] = useState<string>('');
  const [depth3, setDepth3] = useState<string>('');
  
  // Advanced options
  const [useClimateFactors, setUseClimateFactors] = useState<boolean>(false);
  const [projectedRainfall, setProjectedRainfall] = useState<string>('');
  const [useTransportability, setUseTransportability] = useState<boolean>(false);

  // UI state
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const [advancedOptionsVisible, setAdvancedOptionsVisible] = useState<boolean>(false);
  const [crossSectionalArea, setCrossSectionalArea] = useState<number | null>(null);

  // Update text fields when sliders change
  useEffect(() => {
    setDrainageArea(drainageAreaValue.toString());
  }, [drainageAreaValue]);

  useEffect(() => {
    setStreamGradient(streamGradientValue.toString());
  }, [streamGradientValue]);

  // Calculate cross-sectional area when stream geometry values change
  useEffect(() => {
    try {
      if (topWidth1 && bottomWidth && depth1) {
        const topWidths = [
          Number(topWidth1),
          topWidth2 ? Number(topWidth2) : Number(topWidth1),
          topWidth3 ? Number(topWidth3) : Number(topWidth1)
        ];
        
        const depths = [
          Number(depth1),
          depth2 ? Number(depth2) : Number(depth1),
          depth3 ? Number(depth3) : Number(depth1)
        ];
        
        const streamGeometry = calculateStreamGeometry(
          topWidths,
          Number(bottomWidth),
          depths
        );
        
        setCrossSectionalArea(streamGeometry.crossSectionalArea);
      }
    } catch (error) {
      console.error('Error calculating area:', error);
    }
  }, [topWidth1, topWidth2, topWidth3, bottomWidth, depth1, depth2, depth3]);

  // Handle text input changes and update slider for numeric values
  const handleDrainageAreaChange = (text: string) => {
    setDrainageArea(text);
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      setDrainageAreaValue(numValue);
    }
  };

  const handleStreamGradientChange = (text: string) => {
    setStreamGradient(text);
    const numValue = parseFloat(text);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 30) {
      setStreamGradientValue(numValue);
    }
  };

  // Available regions and materials
  const regions = ['Coastal BC', 'Interior BC', 'Northern BC'];
  const materials = Object.keys(CULVERT_TOOL.manningsCoefficients);

  const validateForm = (): boolean => {
    if (!drainageArea || isNaN(Number(drainageArea)) || Number(drainageArea) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid drainage area.');
      return false;
    }
    
    if (!streamGradient || isNaN(Number(streamGradient)) || Number(streamGradient) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid stream gradient.');
      return false;
    }
    
    if (!topWidth1 || isNaN(Number(topWidth1)) || Number(topWidth1) <= 0) {
      Alert.alert('Validation Error', 'Please enter at least one valid top width measurement.');
      return false;
    }
    
    if (!bottomWidth || isNaN(Number(bottomWidth)) || Number(bottomWidth) < 0) {
      Alert.alert('Validation Error', 'Please enter a valid bottom width measurement.');
      return false;
    }
    
    if (!depth1 || isNaN(Number(depth1)) || Number(depth1) <= 0) {
      Alert.alert('Validation Error', 'Please enter at least one valid depth measurement.');
      return false;
    }
    
    if (useClimateFactors && (!projectedRainfall || isNaN(Number(projectedRainfall)))) {
      Alert.alert('Validation Error', 'Please enter a valid projected rainfall value.');
      return false;
    }
    
    return true;
  };

  const handleCalculate = () => {
    if (!validateForm()) return;
    
    setIsCalculating(true);
    
    setTimeout(() => {
      try {
        // Process stream geometry
        const topWidths = [
          Number(topWidth1),
          topWidth2 ? Number(topWidth2) : Number(topWidth1),
          topWidth3 ? Number(topWidth3) : Number(topWidth1)
        ];
        
        const depths = [
          Number(depth1),
          depth2 ? Number(depth2) : Number(depth1),
          depth3 ? Number(depth3) : Number(depth1)
        ];
        
        const streamGeometry = calculateStreamGeometry(
          topWidths,
          Number(bottomWidth),
          depths
        );
        
        // Prepare input for culvert sizing calculation
        const culvertInput: CulvertSizingInput = {
          drainageArea: Number(drainageArea),
          streamGradient: Number(streamGradient),
          region,
          culvertMaterial,
          streamGeometry,
          useClimateFactors,
          projectedRainfall: useClimateFactors ? Number(projectedRainfall) : undefined,
          useTransportability
        };
        
        // Calculate culvert sizing
        const results = calculateCulvertSizing(culvertInput);
        
        // Navigate to results screen with calculation results
        navigation.navigate('Result', { culvertResults: results });
      } catch (error) {
        console.error('Calculation error:', error);
        Alert.alert('Calculation Error', 'An error occurred during the calculation. Please check your inputs and try again.');
      } finally {
        setIsCalculating(false);
      }
    }, 1000); // Simulate a short delay for calculation
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Culvert Sizing Tool</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <View style={styles.introCard}>
              <Text style={styles.title}>Hydraulic Requirements Calculator</Text>
              <Text style={styles.description}>
                Calculate hydraulic requirements for culvert installations based on field measurements and watershed characteristics.
              </Text>
            </View>
            
            {/* Basic Parameters Section with Sliders */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Watershed Characteristics</Text>
              
              <View style={styles.sliderContainer}>
                <Text style={styles.label}>Watershed Area (km²)</Text>
                <View style={styles.sliderRow}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={100}
                    step={0.1}
                    value={drainageAreaValue}
                    onValueChange={setDrainageAreaValue}
                    minimumTrackTintColor={COLORS.primary}
                    maximumTrackTintColor={COLORS.gray[300]}
                    thumbTintColor={COLORS.primary}
                  />
                  <TextInput
                    style={styles.sliderInput}
                    keyboardType="numeric"
                    value={drainageArea}
                    onChangeText={handleDrainageAreaChange}
                  />
                </View>
                <Text style={styles.sliderDescription}>
                  Total drainage area upstream of culvert
                </Text>
              </View>
              
              <View style={styles.sliderContainer}>
                <Text style={styles.label}>Channel Slope (%)</Text>
                <View style={styles.sliderRow}>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={30}
                    step={0.1}
                    value={streamGradientValue}
                    onValueChange={setStreamGradientValue}
                    minimumTrackTintColor={COLORS.primary}
                    maximumTrackTintColor={COLORS.gray[300]}
                    thumbTintColor={COLORS.primary}
                  />
                  <TextInput
                    style={styles.sliderInput}
                    keyboardType="numeric"
                    value={streamGradient}
                    onChangeText={handleStreamGradientChange}
                  />
                </View>
                <Text style={styles.sliderDescription}>
                  Average slope of the channel at installation point
                </Text>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Region</Text>
                <View style={styles.radioGroup}>
                  {regions.map((reg) => (
                    <TouchableOpacity
                      key={reg}
                      style={[
                        styles.radioButton,
                        region === reg && styles.radioButtonSelected
                      ]}
                      onPress={() => setRegion(reg)}
                    >
                      <Text
                        style={[
                          styles.radioButtonText,
                          region === reg && styles.radioButtonTextSelected
                        ]}
                      >
                        {reg}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Culvert Material</Text>
                <View style={styles.radioGroup}>
                  {materials.map((mat) => (
                    <TouchableOpacity
                      key={mat}
                      style={[
                        styles.radioButton,
                        culvertMaterial === mat && styles.radioButtonSelected
                      ]}
                      onPress={() => setCulvertMaterial(mat)}
                    >
                      <Text
                        style={[
                          styles.radioButtonText,
                          culvertMaterial === mat && styles.radioButtonTextSelected
                        ]}
                      >
                        {mat}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
            
            {/* Stream Geometry */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>Stream Geometry</Text>
              
              <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Top Width (m)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={topWidth1}
                    onChangeText={setTopWidth1}
                    placeholder="0.0"
                  />
                </View>
                
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Width 2 (optional)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={topWidth2}
                    onChangeText={setTopWidth2}
                    placeholder="0.0"
                  />
                </View>
                
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Width 3 (optional)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={topWidth3}
                    onChangeText={setTopWidth3}
                    placeholder="0.0"
                  />
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bottom Width (m)</Text>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={bottomWidth}
                  onChangeText={setBottomWidth}
                  placeholder="0.0"
                />
              </View>
              
              <View style={styles.inputRow}>
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Depth (m)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={depth1}
                    onChangeText={setDepth1}
                    placeholder="0.0"
                  />
                </View>
                
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Depth 2 (optional)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={depth2}
                    onChangeText={setDepth2}
                    placeholder="0.0"
                  />
                </View>
                
                <View style={styles.inputColumn}>
                  <Text style={styles.label}>Depth 3 (optional)</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={depth3}
                    onChangeText={setDepth3}
                    placeholder="0.0"
                  />
                </View>
              </View>
              
              {crossSectionalArea !== null && (
                <View style={styles.resultBox}>
                  <Text style={styles.resultTitle}>Cross-sectional Area:</Text>
                  <Text style={styles.resultValue}>{crossSectionalArea.toFixed(2)} m²</Text>
                </View>
              )}
            </View>
            
            {/* Advanced Options Toggle */}
            <TouchableOpacity 
              style={styles.card}
              onPress={() => setAdvancedOptionsVisible(!advancedOptionsVisible)}
            >
              <View style={styles.toggleHeader}>
                <Text style={styles.sectionTitle}>Advanced Options</Text>
                <Text style={styles.toggleText}>{advancedOptionsVisible ? 'Hide' : 'Show'}</Text>
              </View>
            </TouchableOpacity>
            
            {/* Advanced Options Content */}
            {advancedOptionsVisible && (
              <View style={styles.card}>
                <View style={styles.switchGroup}>
                  <Text style={styles.label}>Include Climate Change Projections</Text>
                  <Switch
                    value={useClimateFactors}
                    onValueChange={setUseClimateFactors}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.primaryLight }}
                    thumbColor={useClimateFactors ? COLORS.primary : COLORS.white}
                  />
                </View>
                
                {useClimateFactors && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Projected Rainfall Intensity (mm/hr)</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={projectedRainfall}
                      onChangeText={setProjectedRainfall}
                      placeholder="0.0"
                    />
                  </View>
                )}
                
                <View style={styles.switchGroup}>
                  <Text style={styles.label}>Consider Stream Transportability</Text>
                  <Switch
                    value={useTransportability}
                    onValueChange={setUseTransportability}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.primaryLight }}
                    thumbColor={useTransportability ? COLORS.primary : COLORS.white}
                  />
                </View>
                
                {useTransportability && (
                  <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                      Stream transportability factors in width-to-depth ratio and gradient 
                      to ensure the culvert can handle debris and maintain flow during high-water events.
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        </ScrollView>
        
        {/* Calculate Button */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.calculateButton} 
            onPress={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <ActivityIndicator color={COLORS.white} size="small" />
            ) : (
              <Text style={styles.calculateButtonText}>Calculate Culvert Size</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
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
    padding: SPACING.md,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: SPACING.md,
  },
  introCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primary,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    lineHeight: 20,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
  },
  sliderContainer: {
    marginBottom: SPACING.md,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  slider: {
    flex: 1,
    height: 40,
    marginRight: SPACING.sm,
  },
  sliderInput: {
    width: 70,
    height: 40,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 4,
    textAlign: 'center',
    fontSize: 16,
  },
  sliderDescription: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  inputGroup: {
    marginBottom: SPACING.md,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 4,
    padding: SPACING.sm,
    fontSize: 16,
    color: COLORS.gray[800],
  },
  radioGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -SPACING.xs,
  },
  radioButton: {
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 4,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    marginRight: SPACING.xs,
    marginBottom: SPACING.xs,
  },
  radioButtonSelected: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  radioButtonText: {
    color: COLORS.gray[700],
    fontSize: 14,
  },
  radioButtonTextSelected: {
    color: COLORS.white,
    fontWeight: '500',
  },
  inputRow: {
    flexDirection: 'row',
    marginHorizontal: -SPACING.xs,
    marginBottom: SPACING.md,
  },
  inputColumn: {
    flex: 1,
    paddingHorizontal: SPACING.xs,
  },
  switchGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleText: {
    color: COLORS.primary,
    fontWeight: '500',
  },
  infoBox: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 4,
    padding: SPACING.sm,
    marginTop: SPACING.xs,
  },
  infoText: {
    fontSize: 12,
    color: COLORS.gray[600],
    lineHeight: 18,
  },
  resultBox: {
    backgroundColor: COLORS.blue[50],
    borderRadius: 4,
    padding: SPACING.sm,
    marginTop: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.blue[200],
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  resultTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.blue[800],
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.blue[800],
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  calculateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 4,
    padding: SPACING.md,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default InputScreen;