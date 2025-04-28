import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { COLORS, SPACING } from '../../config/constants';
import FieldInput from '../../components/FieldInput';
import GPSCapture from '../../components/GPSCapture';
import ConnectivityStatus from '../../components/ConnectivityStatus';
import { calculateStreamGeometry, calculateCulvertSizing } from './culvertLogic';
import { calculateAverage, roundToDecimals } from '../../utils/mathHelpers';

const InputScreen: React.FC = () => {
  const navigation = useNavigation();
  const [isCalculating, setIsCalculating] = useState(false);
  const [climateLayerExpanded, setClimateLayerExpanded] = useState(false);
  const [transportabilityExpanded, setTransportabilityExpanded] = useState(false);
  
  // Location data
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);

  // Form data
  const [formState, setFormState] = useState({
    streamName: '',
    drainageArea: '',
    streamGradient: '',
    region: 'Coastal BC',
    culvertMaterial: 'CSP (Corrugated Steel Pipe)',
    topWidths: [''],
    bottomWidth: '',
    depths: [''],
    projectedRainfall: '65',
  });
  
  // Validation state
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  
  // Computed values
  const [computedValues, setComputedValues] = useState({
    averageTopWidth: 0,
    averageDepth: 0,
    crossSectionalArea: 0,
    widthToDepthRatio: 0,
  });
  
  // Add/remove measurement fields
  const addTopWidth = () => {
    if (formState.topWidths.length < 5) {
      setFormState({
        ...formState,
        topWidths: [...formState.topWidths, '']
      });
    }
  };
  
  const removeTopWidth = () => {
    if (formState.topWidths.length > 1) {
      const newWidths = [...formState.topWidths];
      newWidths.pop();
      setFormState({
        ...formState,
        topWidths: newWidths
      });
    }
  };
  
  const addDepth = () => {
    if (formState.depths.length < 5) {
      setFormState({
        ...formState,
        depths: [...formState.depths, '']
      });
    }
  };
  
  const removeDepth = () => {
    if (formState.depths.length > 1) {
      const newDepths = [...formState.depths];
      newDepths.pop();
      setFormState({
        ...formState,
        depths: newDepths
      });
    }
  };
  
  // Update form values
  const updateFormValue = (field: string, value: string) => {
    setFormState(prevState => ({
      ...prevState,
      [field]: value
    }));
    
    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Update array form values (topWidths, depths)
  const updateArrayValue = (field: 'topWidths' | 'depths', index: number, value: string) => {
    setFormState(prevState => {
      const newArray = [...prevState[field]];
      newArray[index] = value;
      return {
        ...prevState,
        [field]: newArray
      };
    });
    
    // Clear error for this field if it exists
    const errorKey = `${field}[${index}]`;
    if (errors[errorKey]) {
      setErrors(prevErrors => {
        const newErrors = { ...prevErrors };
        delete newErrors[errorKey];
        return newErrors;
      });
    }
  };
  
  // Calculate cross-sectional area when measurements change
  useEffect(() => {
    calculateStreamValues();
  }, [formState.topWidths, formState.bottomWidth, formState.depths]);
  
  const calculateStreamValues = () => {
    // Convert string values to numbers and filter out empty values
    const topWidthValues = formState.topWidths
      .map(w => parseFloat(w))
      .filter(w => !isNaN(w));
    
    const depthValues = formState.depths
      .map(d => parseFloat(d))
      .filter(d => !isNaN(d));
    
    const bottomWidthValue = parseFloat(formState.bottomWidth);
    
    // Only calculate if we have at least one width and one depth
    if (topWidthValues.length > 0 && depthValues.length > 0 && !isNaN(bottomWidthValue)) {
      const avgTopWidth = calculateAverage(topWidthValues);
      const avgDepth = calculateAverage(depthValues);
      
      // Calculate cross-sectional area using trapezoidal formula
      const area = ((avgTopWidth + bottomWidthValue) / 2) * avgDepth;
      
      // Calculate width-to-depth ratio
      const widthToDepthRatio = avgTopWidth / avgDepth;
      
      setComputedValues({
        averageTopWidth: roundToDecimals(avgTopWidth, 2),
        averageDepth: roundToDecimals(avgDepth, 2),
        crossSectionalArea: roundToDecimals(area, 2),
        widthToDepthRatio: roundToDecimals(widthToDepthRatio, 2)
      });
    }
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    // Required fields
    if (!formState.drainageArea) {
      newErrors.drainageArea = 'Drainage area is required';
    }
    
    if (!formState.streamGradient) {
      newErrors.streamGradient = 'Stream gradient is required';
    }
    
    if (!formState.bottomWidth) {
      newErrors.bottomWidth = 'Bottom width is required';
    }
    
    // Check top widths
    let hasValidTopWidth = false;
    formState.topWidths.forEach((width, index) => {
      if (!width) {
        newErrors[`topWidths[${index}]`] = 'Please enter a value';
      } else {
        hasValidTopWidth = true;
      }
    });
    
    if (!hasValidTopWidth) {
      newErrors.topWidths = 'At least one top width measurement is required';
    }
    
    // Check depths
    let hasValidDepth = false;
    formState.depths.forEach((depth, index) => {
      if (!depth) {
        newErrors[`depths[${index}]`] = 'Please enter a value';
      } else {
        hasValidDepth = true;
      }
    });
    
    if (!hasValidDepth) {
      newErrors.depths = 'At least one depth measurement is required';
    }
    
    // Climate factors validation
    if (climateLayerExpanded && !formState.projectedRainfall) {
      newErrors.projectedRainfall = 'Projected rainfall is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle calculate button press
  const handleCalculate = () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors in the form before calculating.');
      return;
    }
    
    setIsCalculating(true);
    
    // Simulate a calculation delay for better user experience
    setTimeout(() => {
      try {
        // Convert string values to numbers
        const drainageArea = parseFloat(formState.drainageArea);
        const streamGradient = parseFloat(formState.streamGradient);
        const topWidths = formState.topWidths
          .map(w => parseFloat(w))
          .filter(w => !isNaN(w));
        const bottomWidth = parseFloat(formState.bottomWidth);
        const depths = formState.depths
          .map(d => parseFloat(d))
          .filter(d => !isNaN(d));
        
        // Calculate stream geometry
        const streamGeometry = calculateStreamGeometry(
          topWidths,
          bottomWidth,
          depths
        );
        
        // Prepare input for culvert sizing calculation
        const culvertInput = {
          drainageArea,
          streamGradient,
          region: formState.region,
          culvertMaterial: formState.culvertMaterial,
          streamGeometry,
          useClimateFactors: climateLayerExpanded,
          projectedRainfall: climateLayerExpanded ? parseFloat(formState.projectedRainfall) : undefined,
          useTransportability: transportabilityExpanded
        };
        
        // Calculate culvert sizing
        const result = calculateCulvertSizing(culvertInput);
        
        // Create field card data
        const fieldCard = {
          id: Date.now().toString(),
          type: 'culvert-sizing' as const,
          name: formState.streamName || `Culvert Sizing ${new Date().toLocaleDateString()}`,
          date: new Date().toISOString(),
          location: location ? {
            latitude: location.latitude,
            longitude: location.longitude
          } : undefined,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          drainageArea,
          streamGradient,
          region: formState.region,
          culvertMaterial: formState.culvertMaterial,
          streamGeometry: {
            ...streamGeometry,
            topWidths,
            bottomWidth,
            depths
          },
          climateFactors: climateLayerExpanded ? {
            projectedRainfall: parseFloat(formState.projectedRainfall),
            year: 2050
          } : undefined,
          transportabilityUsed: transportabilityExpanded,
          results: {
            recommendedSize: result.recommendedSize,
            method: result.method,
            transportabilitySize: result.transportabilitySize,
            safetyFactor: result.safetyFactor,
            controllingFactor: result.controllingFactor
          }
        };
        
        // Navigate to results screen with the field card data
        navigation.navigate('CulvertResult' as never, { fieldCard } as never);
      } catch (error) {
        console.error('Error calculating culvert size:', error);
        Alert.alert('Calculation Error', 'An error occurred while calculating the culvert size.');
      } finally {
        setIsCalculating(false);
      }
    }, 1000);
  };
  
  // Handle region selection
  const handleRegionSelect = () => {
    Alert.alert(
      'Select Region',
      'Choose the region for this culvert',
      [
        { 
          text: 'Coastal BC', 
          onPress: () => updateFormValue('region', 'Coastal BC')
        },
        { 
          text: 'Interior BC', 
          onPress: () => updateFormValue('region', 'Interior BC')
        },
        { 
          text: 'Northern BC', 
          onPress: () => updateFormValue('region', 'Northern BC')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };
  
  // Handle material selection
  const handleMaterialSelect = () => {
    Alert.alert(
      'Select Culvert Material',
      'Choose the material for this culvert',
      [
        { 
          text: 'CSP (Corrugated Steel Pipe)', 
          onPress: () => updateFormValue('culvertMaterial', 'CSP (Corrugated Steel Pipe)')
        },
        { 
          text: 'HDPE (Plastic)', 
          onPress: () => updateFormValue('culvertMaterial', 'HDPE (Plastic)')
        },
        { 
          text: 'Concrete', 
          onPress: () => updateFormValue('culvertMaterial', 'Concrete')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Culvert Sizing Tool</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <ConnectivityStatus />
          
          {/* Basic Parameters Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Basic Parameters</Text>
            
            <FieldInput
              label="Stream Name (optional)"
              value={formState.streamName}
              onChangeText={(value) => updateFormValue('streamName', value)}
              placeholder="Enter stream name"
            />
            
            <FieldInput
              label="Drainage Area"
              value={formState.drainageArea}
              onChangeText={(value) => updateFormValue('drainageArea', value)}
              keyboardType="decimal-pad"
              unit="hectares"
              error={errors.drainageArea}
            />
            
            <FieldInput
              label="Stream Gradient"
              value={formState.streamGradient}
              onChangeText={(value) => updateFormValue('streamGradient', value)}
              keyboardType="decimal-pad"
              unit="%"
              error={errors.streamGradient}
            />
            
            {/* Region Selector */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Region</Text>
              <TouchableOpacity 
                style={styles.selector}
                onPress={handleRegionSelect}
              >
                <Text style={styles.selectorText}>{formState.region}</Text>
                <Text style={styles.selectorIcon}>▼</Text>
              </TouchableOpacity>
            </View>
            
            {/* Culvert Material Selector */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Culvert Material</Text>
              <TouchableOpacity 
                style={styles.selector}
                onPress={handleMaterialSelect}
              >
                <Text style={styles.selectorText}>{formState.culvertMaterial}</Text>
                <Text style={styles.selectorIcon}>▼</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Stream Geometry Section */}
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>
              Stream Geometry (End Area Method)
            </Text>
            
            {/* Top Width Inputs */}
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Text style={styles.label}>Top Width (W1)</Text>
                <View style={styles.inputControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={addTopWidth}
                  >
                    <Text style={styles.controlButtonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.controlButton,
                      formState.topWidths.length <= 1 && styles.controlButtonDisabled
                    ]}
                    onPress={removeTopWidth}
                    disabled={formState.topWidths.length <= 1}
                  >
                    <Text 
                      style={[
                        styles.controlButtonText,
                        formState.topWidths.length <= 1 && styles.controlButtonTextDisabled
                      ]}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {formState.topWidths.map((width, index) => (
                <FieldInput
                  key={`width-${index}`}
                  label={index === 0 ? '' : `Width ${index + 1}`}
                  value={width}
                  onChangeText={(value) => updateArrayValue('topWidths', index, value)}
                  keyboardType="decimal-pad"
                  unit="m"
                  error={errors[`topWidths[${index}]`]}
                />
              ))}
              
              {errors.topWidths && (
                <Text style={styles.errorText}>{errors.topWidths}</Text>
              )}
              
              {computedValues.averageTopWidth > 0 && (
                <Text style={styles.calculatedValue}>
                  Average W1: {computedValues.averageTopWidth} m
                </Text>
              )}
            </View>
            
            {/* Bottom Width Input */}
            <FieldInput
              label="Bottom Width (W2)"
              value={formState.bottomWidth}
              onChangeText={(value) => updateFormValue('bottomWidth', value)}
              keyboardType="decimal-pad"
              unit="m"
              error={errors.bottomWidth}
            />
            
            {/* Depth Inputs */}
            <View style={styles.inputContainer}>
              <View style={styles.inputHeader}>
                <Text style={styles.label}>Depth (D)</Text>
                <View style={styles.inputControls}>
                  <TouchableOpacity 
                    style={styles.controlButton}
                    onPress={addDepth}
                  >
                    <Text style={styles.controlButtonText}>+</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[
                      styles.controlButton,
                      formState.depths.length <= 1 && styles.controlButtonDisabled
                    ]}
                    onPress={removeDepth}
                    disabled={formState.depths.length <= 1}
                  >
                    <Text 
                      style={[
                        styles.controlButtonText,
                        formState.depths.length <= 1 && styles.controlButtonTextDisabled
                      ]}
                    >
                      -
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              {formState.depths.map((depth, index) => (
                <FieldInput
                  key={`depth-${index}`}
                  label={index === 0 ? '' : `Depth ${index + 1}`}
                  value={depth}
                  onChangeText={(value) => updateArrayValue('depths', index, value)}
                  keyboardType="decimal-pad"
                  unit="m"
                  error={errors[`depths[${index}]`]}
                />
              ))}
              
              {errors.depths && (
                <Text style={styles.errorText}>{errors.depths}</Text>
              )}
              
              {computedValues.averageDepth > 0 && (
                <Text style={styles.calculatedValue}>
                  Average Depth: {computedValues.averageDepth} m
                </Text>
              )}
            </View>
            
            {/* Cross-sectional Area */}
            {computedValues.crossSectionalArea > 0 && (
              <View style={styles.calculatedBox}>
                <View style={styles.calculatedHeader}>
                  <Text style={styles.calculatedTitle}>Cross-sectional Area:</Text>
                  <Text style={styles.calculatedValue}>
                    {computedValues.crossSectionalArea} m²
                  </Text>
                </View>
                <Text style={styles.calculatedFormula}>
                  (Average W1 + W2) / 2 × Average Depth
                </Text>
              </View>
            )}
          </View>
          
          {/* Location Capture */}
          <GPSCapture onLocationCaptured={setLocation} />
          
          {/* Climate Layer Toggle */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.toggleHeader}
              onPress={() => setClimateLayerExpanded(!climateLayerExpanded)}
            >
              <View style={styles.toggleTitleContainer}>
                <Text style={styles.toggleTitle}>Add Climate Layer</Text>
              </View>
              <Text 
                style={[
                  styles.toggleArrow,
                  climateLayerExpanded && styles.toggleArrowExpanded
                ]}
              >
                ▼
              </Text>
            </TouchableOpacity>
            
            {climateLayerExpanded && (
              <View style={styles.toggleContent}>
                <FieldInput
                  label="Projected Rainfall Intensity (2050)"
                  value={formState.projectedRainfall}
                  onChangeText={(value) => updateFormValue('projectedRainfall', value)}
                  keyboardType="decimal-pad"
                  unit="mm/hr"
                  error={errors.projectedRainfall}
                  info="Currently using current climate data"
                />
              </View>
            )}
          </View>
          
          {/* Transportability Matrix Toggle */}
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.toggleHeader}
              onPress={() => setTransportabilityExpanded(!transportabilityExpanded)}
            >
              <View style={styles.toggleTitleContainer}>
                <Text style={styles.toggleTitle}>Use Stream Transportability Matrix</Text>
              </View>
              <Text 
                style={[
                  styles.toggleArrow,
                  transportabilityExpanded && styles.toggleArrowExpanded
                ]}
              >
                ▼
              </Text>
            </TouchableOpacity>
            
            {transportabilityExpanded && (
              <View style={styles.toggleContent}>
                {computedValues.widthToDepthRatio > 0 && (
                  <View style={styles.calculatedBox}>
                    <View style={styles.calculatedHeader}>
                      <Text style={styles.calculatedTitle}>Width-to-Depth Ratio:</Text>
                      <Text style={styles.calculatedValue}>
                        {computedValues.widthToDepthRatio}
                      </Text>
                    </View>
                    <Text style={styles.calculatedFormula}>
                      Average W1 / Average Depth
                    </Text>
                  </View>
                )}
                
                <View style={styles.infoBox}>
                  <Text style={styles.infoText}>
                    <Text style={styles.infoTextBold}>Note:</Text> The transportability matrix will be used to determine minimum culvert size. If the Q100 method yields a larger size, that will be used instead.
                  </Text>
                </View>
                
                <View style={styles.matrixBox}>
                  <Text style={styles.matrixTitle}>Matrix Selection Criteria:</Text>
                  <View style={styles.matrixList}>
                    <Text style={styles.matrixItem}>• Width/Depth &lt; 3: Small culvert size</Text>
                    <Text style={styles.matrixItem}>• Width/Depth 3-6: Medium culvert size</Text>
                    <Text style={styles.matrixItem}>• Width/Depth &gt; 6: Large culvert size</Text>
                  </View>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
        
        {/* Footer */}
        <View style={styles.footer}>
          <TouchableOpacity 
            style={styles.calculateButton} 
            onPress={handleCalculate}
            disabled={isCalculating}
          >
            {isCalculating ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <Text style={styles.calculateText}>Calculate Culvert Size</Text>
            )}
          </TouchableOpacity>
        </View>
        
        {/* Calculating Overlay */}
        {isCalculating && (
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color={COLORS.primary} />
            <Text style={styles.overlayText}>Calculating culvert size...</Text>
          </View>
        )}
      </KeyboardAvoidingView>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  backButton: {
    marginRight: SPACING.sm,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
  },
  inputContainer: {
    marginBottom: SPACING.md,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.xs,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[700],
    marginBottom: SPACING.xs,
  },
  inputControls: {
    flexDirection: 'row',
    gap: SPACING.xs,
  },
  controlButton: {
    backgroundColor: COLORS.gray[100],
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonDisabled: {
    backgroundColor: COLORS.gray[200],
  },
  controlButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    lineHeight: 20,
  },
  controlButtonTextDisabled: {
    color: COLORS.gray[400],
  },
  selector: {
    height: 48,
    borderWidth: 1,
    borderColor: COLORS.gray[300],
    borderRadius: 6,
    paddingHorizontal: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectorText: {
    fontSize: 16,
    color: COLORS.gray[800],
  },
  selectorIcon: {
    fontSize: 12,
    color: COLORS.gray[500],
  },
  errorText: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: SPACING.xs,
  },
  calculatedValue: {
    fontSize: 13,
    color: COLORS.gray[600],
    marginTop: SPACING.xs,
    fontStyle: 'italic',
  },
  calculatedBox: {
    backgroundColor: COLORS.blue[50],
    borderRadius: 6,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.blue[200],
  },
  calculatedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  calculatedTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.blue[800],
  },
  calculatedFormula: {
    fontSize: 12,
    color: COLORS.blue[600],
    marginTop: SPACING.xs,
  },
  toggleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  toggleTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  toggleTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
  },
  toggleArrow: {
    fontSize: 12,
    color: COLORS.gray[500],
  },
  toggleArrowExpanded: {
    transform: [{ rotate: '180deg' }],
  },
  toggleContent: {
    marginTop: SPACING.md,
    paddingTop: SPACING.md,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  infoBox: {
    backgroundColor: COLORS.warning + '15',
    borderRadius: 6,
    padding: SPACING.md,
    marginBottom: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.warning + '30',
  },
  infoText: {
    fontSize: 13,
    color: COLORS.warning,
  },
  infoTextBold: {
    fontWeight: '600',
  },
  matrixBox: {
    backgroundColor: COLORS.gray[100],
    borderRadius: 6,
    padding: SPACING.md,
    marginBottom: SPACING.xs,
    borderWidth: 1,
    borderColor: COLORS.gray[200],
  },
  matrixTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
    marginBottom: SPACING.xs,
  },
  matrixList: {
    marginTop: SPACING.xs,
  },
  matrixItem: {
    fontSize: 12,
    color: COLORS.gray[600],
    marginBottom: 2,
  },
  footer: {
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  calculateButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    height: 48,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calculateText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.gray[100] + 'E6',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  overlayText: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.gray[700],
    marginTop: SPACING.md,
  },
});

export default InputScreen;