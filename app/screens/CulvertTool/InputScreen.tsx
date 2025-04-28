import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert
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
  // Form state
  const [drainageArea, setDrainageArea] = useState<string>('');
  const [streamGradient, setStreamGradient] = useState<string>('');
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
    
    if (!topWidth1 || !topWidth2 || !topWidth3 || 
        isNaN(Number(topWidth1)) || isNaN(Number(topWidth2)) || isNaN(Number(topWidth3))) {
      Alert.alert('Validation Error', 'Please enter valid top width measurements.');
      return false;
    }
    
    if (!bottomWidth || isNaN(Number(bottomWidth)) || Number(bottomWidth) < 0) {
      Alert.alert('Validation Error', 'Please enter a valid bottom width measurement.');
      return false;
    }
    
    if (!depth1 || !depth2 || !depth3 || 
        isNaN(Number(depth1)) || isNaN(Number(depth2)) || isNaN(Number(depth3))) {
      Alert.alert('Validation Error', 'Please enter valid depth measurements.');
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
    
    try {
      // Process stream geometry
      const topWidths = [Number(topWidth1), Number(topWidth2), Number(topWidth3)];
      const depths = [Number(depth1), Number(depth2), Number(depth3)];
      
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
    }
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
            <Text style={styles.title}>Culvert Input Form</Text>
            <Text style={styles.description}>
              Enter the following information to calculate the recommended culvert size for your site.
            </Text>
            
            <View style={styles.form}>
              {/* Watershed Characteristics */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Watershed Characteristics</Text>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Drainage Area (hectares):</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={drainageArea}
                    onChangeText={setDrainageArea}
                    placeholder="Enter drainage area"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Stream Gradient (%):</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={streamGradient}
                    onChangeText={setStreamGradient}
                    placeholder="Enter stream gradient"
                  />
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Region:</Text>
                  <View style={styles.buttonGroup}>
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
                  <Text style={styles.label}>Culvert Material:</Text>
                  <View style={styles.buttonGroup}>
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
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Stream Geometry</Text>
                
                <View style={styles.inputRow}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Top Width 1 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={topWidth1}
                      onChangeText={setTopWidth1}
                      placeholder="Width 1"
                    />
                  </View>
                  
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Top Width 2 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={topWidth2}
                      onChangeText={setTopWidth2}
                      placeholder="Width 2"
                    />
                  </View>
                  
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Top Width 3 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={topWidth3}
                      onChangeText={setTopWidth3}
                      placeholder="Width 3"
                    />
                  </View>
                </View>
                
                <View style={styles.inputGroup}>
                  <Text style={styles.label}>Bottom Width (m):</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="numeric"
                    value={bottomWidth}
                    onChangeText={setBottomWidth}
                    placeholder="Enter bottom width"
                  />
                </View>
                
                <View style={styles.inputRow}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Depth 1 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={depth1}
                      onChangeText={setDepth1}
                      placeholder="Depth 1"
                    />
                  </View>
                  
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Depth 2 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={depth2}
                      onChangeText={setDepth2}
                      placeholder="Depth 2"
                    />
                  </View>
                  
                  <View style={styles.inputColumn}>
                    <Text style={styles.label}>Depth 3 (m):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={depth3}
                      onChangeText={setDepth3}
                      placeholder="Depth 3"
                    />
                  </View>
                </View>
              </View>
              
              {/* Climate and Transportability Options */}
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Advanced Options</Text>
                
                <View style={styles.switchGroup}>
                  <Text style={styles.label}>Include Climate Change Projections:</Text>
                  <Switch
                    value={useClimateFactors}
                    onValueChange={setUseClimateFactors}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.primaryLight }}
                    thumbColor={useClimateFactors ? COLORS.primary : COLORS.gray[100]}
                  />
                </View>
                
                {useClimateFactors && (
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Projected Rainfall Intensity (mm/hr):</Text>
                    <TextInput
                      style={styles.input}
                      keyboardType="numeric"
                      value={projectedRainfall}
                      onChangeText={setProjectedRainfall}
                      placeholder="Enter projected rainfall"
                    />
                  </View>
                )}
                
                <View style={styles.switchGroup}>
                  <Text style={styles.label}>Consider Stream Transportability:</Text>
                  <Switch
                    value={useTransportability}
                    onValueChange={setUseTransportability}
                    trackColor={{ false: COLORS.gray[300], true: COLORS.primaryLight }}
                    thumbColor={useTransportability ? COLORS.primary : COLORS.gray[100]}
                  />
                </View>
              </View>
              
              <TouchableOpacity style={styles.button} onPress={handleCalculate}>
                <Text style={styles.buttonText}>Calculate</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  description: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: SPACING.lg,
  },
  form: {
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
  formSection: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.md,
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
  buttonGroup: {
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
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: SPACING.md,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default InputScreen;