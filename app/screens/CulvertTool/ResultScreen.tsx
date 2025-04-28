import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Alert,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { COLORS, SPACING } from '../../config/constants';
import { CulvertFieldCard, saveFieldCard } from '../../utils/storage';
import { generateCulvertPdfReport } from '../../utils/pdfExporter';
import ResultVisual from '../../components/ResultVisual';
import ConnectivityStatus from '../../components/ConnectivityStatus';
// Define the route params type
type ResultScreenRouteProp = RouteProp<
  {
    CulvertResult: {
      fieldCard: CulvertFieldCard;
    };
  },
  'CulvertResult'
>;
const ResultScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ResultScreenRouteProp>();
  const { fieldCard } = route.params;
  
  const [saving, setSaving] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  // Handle save field card
  const handleSaveFieldCard = async () => {
    setSaving(true);
    
    try {
      await saveFieldCard(fieldCard);
      Alert.alert('Success', 'Field card saved successfully');
    } catch (error) {
      console.error('Error saving field card:', error);
      Alert.alert('Error', 'Failed to save field card');
    } finally {
      setSaving(false);
    }
  };
  
  // Handle export PDF
  const handleExportPdf = async () => {
    setExporting(true);
    
    try {
      await generateCulvertPdfReport(fieldCard);
      Alert.alert('Success', 'Report exported successfully');
    } catch (error) {
      console.error('Error exporting PDF:', error);
      Alert.alert('Error', 'Failed to export report');
    } finally {
      setExporting(false);
    }
  };
  
  // Format the results for display
  const formatCulvertResults = () => {
    const { recommendedSize, drainage, capacity, inputValues } = fieldCard;
    
    return {
      recommended: `${recommendedSize.diameter} mm (${(recommendedSize.diameter / 1000).toFixed(1)} m)`,
      estimatedFlow: `${drainage.peakFlow.toFixed(2)} m³/s`,
      capacity: `${capacity.maxFlow.toFixed(2)} m³/s`,
      basinArea: `${inputValues.basinArea.toFixed(2)} km²`,
      transportability: recommendedSize.transportable ? "Yes" : "Limited Access - Consider Multiple Smaller Culverts"
    };
  };
  
  const results = formatCulvertResults();
  
  return (
    <SafeAreaView style={styles.container}>
      <ConnectivityStatus />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.title}>Culvert Sizing Results</Text>
          
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Recommended Culvert</Text>
            <Text style={styles.resultText}>{results.recommended}</Text>
            {!fieldCard.recommendedSize.transportable && (
              <Text style={styles.warningText}>
                Access limitations may require multiple smaller culverts
              </Text>
            )}
          </View>
          
          <View style={styles.resultSection}>
            <Text style={styles.sectionTitle}>Calculation Details</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Watershed Area:</Text>
              <Text style={styles.resultValue}>{results.basinArea} km²</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Q100 Flow Rate:</Text>
              <Text style={styles.resultValue}>{results.estimatedFlow} m³/s</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Culvert Capacity:</Text>
              <Text style={styles.resultValue}>{results.capacity} m³/s</Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Transportation:</Text>
              <Text style={styles.resultValue}>{results.transportability}</Text>
            </View>
          </View>
          
          {/* Visual representation of the culvert size */}
          <ResultVisual recommendedSize={fieldCard.recommendedSize} />
          
          <View style={styles.locationSection}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Coordinates:</Text>
              <Text style={styles.resultValue}>
                {fieldCard.location?.latitude.toFixed(6)}, {fieldCard.location?.longitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Recorded:</Text>
              <Text style={styles.resultValue}>
                {new Date(fieldCard.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleSaveFieldCard}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Save Field Card</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.button} 
              onPress={handleExportPdf}
              disabled={exporting}
            >
              {exporting ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.buttonText}>Export PDF</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: SPACING.medium,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: SPACING.medium,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.medium,
    textAlign: 'center',
  },
  resultSection: {
    marginBottom: SPACING.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
    paddingBottom: SPACING.medium,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: SPACING.small,
  },
  resultText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.success,
    textAlign: 'center',
    marginVertical: SPACING.small,
  },
  warningText: {
    fontSize: 14,
    color: COLORS.warning,
    textAlign: 'center',
    marginTop: SPACING.small,
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.tiny,
  },
  resultLabel: {
    fontSize: 16,
    color: COLORS.textLight,
    flex: 1,
  },
  resultValue: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  locationSection: {
    marginBottom: SPACING.medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.small,
  },
  button: {
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.small,
    paddingHorizontal: SPACING.medium,
    borderRadius: 8,
    flex: 0.48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultScreen;