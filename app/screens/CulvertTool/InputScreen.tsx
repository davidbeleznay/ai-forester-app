import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS, SPACING } from '../../config/constants';
import { 
  PRECIPITATION_REGIONS, 
  ROAD_TYPES, 
  STREAM_TYPES,
  performCulvertSizing 
} from '../../utils/CulvertCalculator';
import FieldInput from '../../components/FieldInput';
import GPSCapture from '../../components/GPSCapture';
import ConnectivityStatus from '../../components/ConnectivityStatus';

const InputScreen = () => {
  const navigation = useNavigation();
  
  // Input values state
  const [basinArea, setBasinArea] = useState('');
  const [precipitationRegion, setPrecipitationRegion] = useState('Moderate (800-1200mm/yr)');
  const [roadType, setRoadType] = useState('Main Access');
  const [streamType, setStreamType] = useState('Perennial');
  const [gradient, setGradient] = useState('');
  const [roadWidth, setRoadWidth] = useState('');
  
  // Stream measurements - can have multiple width/depth pairs
  const [measurements, setMeasurements] = useState<{ width: string; depth: string; }[]>([]);
  
  // Climate projection percentage adjustment
  const [climateProjection, setClimateProjection] = useState('');
  
  // Additional fields
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{ latitude: number; longitude: number; accuracy: number } | null>(null);

  // UI state
  const [calculating, setCalculating] = useState(false);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Validation function
  const validateInputs = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!basinArea) {
      newErrors.basinArea = 'Watershed area is required';
    } else if (isNaN(parseFloat(basinArea)) || parseFloat(basinArea) <= 0) {
      newErrors.basinArea = 'Enter a valid watershed area';
    }
    
    if (!gradient) {
      newErrors.gradient = 'Stream gradient is required';
    } else if (isNaN(parseFloat(gradient)) || parseFloat(gradient) < 0) {
      newErrors.gradient = 'Enter a valid gradient percentage';
    }
    
    if (!roadWidth) {
      newErrors.roadWidth = 'Road width is required';
    } else if (isNaN(parseFloat(roadWidth)) || parseFloat(roadWidth) <= 0) {
      newErrors.roadWidth = 'Enter a valid road width';
    }
    
    // Validate all measurements if any exist
    measurements.forEach((measurement, index) => {
      if (measurement.width && !measurement.depth) {
        newErrors[`depth${index}`] = 'Depth is required';
      }
      if (!measurement.width && measurement.depth) {
        newErrors[`width${index}`] = 'Width is required';
      }
      if (measurement.width && isNaN(parseFloat(measurement.width)) || parseFloat(measurement.width) <= 0) {
        newErrors[`width${index}`] = 'Enter a valid width';
      }
      if (measurement.depth && isNaN(parseFloat(measurement.depth)) || parseFloat(measurement.depth) <= 0) {
        newErrors[`depth${index}`] = 'Enter a valid depth';
      }
    });
    
    // Validate climate projection if provided
    if (climateProjection && (isNaN(parseFloat(climateProjection)) || parseFloat(climateProjection) < 0)) {
      newErrors.climateProjection = 'Enter a valid percentage';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle adding a new measurement
  const addMeasurement = () => {
    setMeasurements([...measurements, { width: '', depth: '' }]);
  };
  
  // Handle removing a measurement
  const removeMeasurement = (index: number) => {
    const newMeasurements = [...measurements];
    newMeasurements.splice(index, 1);
    setMeasurements(newMeasurements);
  };
  
  // Handle updating a measurement
  const updateMeasurement = (index: number, field: 'width' | 'depth', value: string) => {
    const newMeasurements = [...measurements];
    newMeasurements[index][field] = value;
    setMeasurements(newMeasurements);
  };
  
  // Handle calculating culvert sizing
  const handleCalculate = () => {
    if (!validateInputs()) {
      Alert.alert('Validation Error', 'Please correct the errors in the form');
      return;
    }
    
    setCalculating(true);
    
    try {
      // Convert input values to appropriate types
      const inputValues = {
        basinArea: parseFloat(basinArea),
        precipitationRegion,
        roadType,
        streamType,
        gradient: parseFloat(gradient),
        roadWidth: parseFloat(roadWidth),
        measurements: measurements
          .filter(m => m.width && m.depth) // Only use complete measurements
          .map(m => ({
            width: parseFloat(m.width),
            depth: parseFloat(m.depth),
          })),
      };
      
      // Get climate projection as a number if provided
      const projectionValue = climateProjection ? parseFloat(climateProjection) : undefined;
      
      // Perform the culvert sizing calculation
      const result = performCulvertSizing(inputValues, projectionValue);
      
      // Add location and notes if provided
      if (location) {
        result.location = location;
      }
      
      if (notes) {
        result.notes = notes;
      }
      
      // Navigate to results screen with the field card
      navigation.navigate('CulvertResult', {
        fieldCard: result,
      });
    } catch (error) {
      console.error('Error calculating culvert size:', error);
      Alert.alert('Calculation Error', 'An error occurred during the calculation. Please check your inputs and try again.');
    } finally {
      setCalculating(false);
    }
  };
  
  // Render select options for dropdown fields
  const renderSelectOptions = (
    options: string[], 
    selectedValue: string, 
    onSelect: (value: string) => void
  ) => {
    return (
      <View style={styles.selectContainer}>
        {options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.selectOption,
              selectedValue === option && styles.selectedOption,
            ]}
            onPress={() => onSelect(option)}
          >
            <Text 
              style={[
                styles.selectText,
                selectedValue === option && styles.selectedText,
              ]}
            >
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ConnectivityStatus />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
      >
        <Text style={styles.title}>Culvert Sizing Tool</Text>
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <FieldInput
            label="Watershed Area"
            value={basinArea}
            onChangeText={setBasinArea}
            placeholder="Enter watershed area"
            keyboardType="decimal-pad"
            unit="km²"
            required
            info="The area of the watershed draining to the culvert location"
            error={errors.basinArea}
            clearable
          />
          
          <Text style={styles.fieldLabel}>Precipitation Region</Text>
          {renderSelectOptions(
            Object.keys(PRECIPITATION_REGIONS),
            precipitationRegion,
            setPrecipitationRegion
          )}
          
          <Text style={styles.fieldLabel}>Road Type</Text>
          {renderSelectOptions(
            Object.keys(ROAD_TYPES),
            roadType,
            setRoadType
          )}
          
          <Text style={styles.fieldLabel}>Stream Type</Text>
          {renderSelectOptions(
            Object.keys(STREAM_TYPES),
            streamType,
            setStreamType
          )}
          
          <FieldInput
            label="Stream Gradient"
            value={gradient}
            onChangeText={setGradient}
            placeholder="Enter stream gradient"
            keyboardType="decimal-pad"
            unit="%"
            required
            info="The slope of the stream at the crossing point"
            error={errors.gradient}
            clearable
          />
          
          <FieldInput
            label="Road Width"
            value={roadWidth}
            onChangeText={setRoadWidth}
            placeholder="Enter road width"
            keyboardType="decimal-pad"
            unit="m"
            required
            info="The width of the road at the crossing point"
            error={errors.roadWidth}
            clearable
          />
        </View>
        
        <TouchableOpacity
          style={styles.advancedToggle}
          onPress={() => setShowAdvancedOptions(!showAdvancedOptions)}
        >
          <Text style={styles.advancedToggleText}>
            {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
          </Text>
          <Ionicons
            name={showAdvancedOptions ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={COLORS.primary}
          />
        </TouchableOpacity>
        
        {showAdvancedOptions && (
          <>
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Stream Measurements</Text>
              <Text style={styles.infoText}>
                Adding multiple width/depth measurements can improve sizing accuracy
              </Text>
              
              {measurements.map((measurement, index) => (
                <View key={index} style={styles.measurementRow}>
                  <View style={styles.measurementField}>
                    <FieldInput
                      label={`Width ${index + 1}`}
                      value={measurement.width}
                      onChangeText={(value) => updateMeasurement(index, 'width', value)}
                      placeholder="Width"
                      keyboardType="decimal-pad"
                      unit="m"
                      error={errors[`width${index}`]}
                    />
                  </View>
                  
                  <View style={styles.measurementField}>
                    <FieldInput
                      label={`Depth ${index + 1}`}
                      value={measurement.depth}
                      onChangeText={(value) => updateMeasurement(index, 'depth', value)}
                      placeholder="Depth"
                      keyboardType="decimal-pad"
                      unit="m"
                      error={errors[`depth${index}`]}
                    />
                  </View>
                  
                  <TouchableOpacity
                    style={styles.removeMeasurementButton}
                    onPress={() => removeMeasurement(index)}
                  >
                    <Ionicons name="close-circle" size={24} color={COLORS.error} />
                  </TouchableOpacity>
                </View>
              ))}
              
              <TouchableOpacity
                style={styles.addButton}
                onPress={addMeasurement}
              >
                <Ionicons name="add-circle-outline" size={18} color={COLORS.white} />
                <Text style={styles.addButtonText}>Add Measurement</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Climate Projections</Text>
              
              <FieldInput
                label="Climate Change Adjustment"
                value={climateProjection}
                onChangeText={setClimateProjection}
                placeholder="Enter percentage increase"
                keyboardType="decimal-pad"
                unit="%"
                info="Projected increase in precipitation intensity due to climate change"
                error={errors.climateProjection}
                clearable
              />
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Field Notes</Text>
              
              <FieldInput
                label="Notes"
                value={notes}
                onChangeText={setNotes}
                placeholder="Enter any additional notes about the site"
                multiline
              />
            </View>
            
            <View style={styles.formSection}>
              <Text style={styles.sectionTitle}>Location</Text>
              
              <GPSCapture
                onLocationCaptured={setLocation}
                initialLocation={location}
              />
            </View>
          </>
        )}
        
        <TouchableOpacity
          style={styles.calculateButton}
          onPress={handleCalculate}
          disabled={calculating}
        >
          {calculating ? (
            <ActivityIndicator size="small" color={COLORS.white} />
          ) : (
            <>
              <Ionicons name="calculator-outline" size={20} color={COLORS.white} />
              <Text style={styles.calculateButtonText}>Calculate Culvert Size</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.medium,
    paddingBottom: SPACING.large,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  formSection: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.medium,
    marginBottom: SPACING.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  fieldLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: COLORS.text,
    marginBottom: SPACING.tiny,
    marginTop: SPACING.small,
  },
  selectContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: SPACING.small,
  },
  selectOption: {
    backgroundColor: COLORS.lightBackground,
    borderRadius: 20,
    paddingVertical: SPACING.tiny,
    paddingHorizontal: SPACING.small,
    margin: 4,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  selectedOption: {
    backgroundColor: COLORS.primaryLight,
    borderColor: COLORS.primary,
  },
  selectText: {
    color: COLORS.text,
    fontSize: 14,
  },
  selectedText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  advancedToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.small,
    backgroundColor: COLORS.lightBackground,
    borderRadius: 8,
    marginBottom: SPACING.medium,
  },
  advancedToggleText: {
    color: COLORS.primary,
    fontWeight: '600',
    marginRight: SPACING.small,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontStyle: 'italic',
    marginBottom: SPACING.small,
  },
  measurementRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: SPACING.small,
  },
  measurementField: {
    flex: 1,
    marginRight: SPACING.small,
  },
  removeMeasurementButton: {
    paddingBottom: SPACING.medium,
    paddingLeft: SPACING.tiny,
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.primary,
    borderRadius: 6,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: SPACING.small,
  },
  addButtonText: {
    color: COLORS.white,
    fontWeight: '600',
    marginLeft: SPACING.tiny,
  },
  calculateButton: {
    flexDirection: 'row',
    backgroundColor: COLORS.success,
    borderRadius: 8,
    paddingVertical: SPACING.medium,
    paddingHorizontal: SPACING.medium,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: SPACING.small,
  },
  calculateButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: SPACING.small,
  },
});

export default InputScreen;