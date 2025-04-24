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
import { ArrowLeft, Save, FileText } from 'react-native-feather';
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
    } catch (error) {
      console.error('Error exporting PDF:', error);
      Alert.alert('Error', 'Failed to export PDF');
    } finally {
      setExporting(false);
    }
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
            <ArrowLeft size={24} color={COLORS.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sizing Results</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <ConnectivityStatus />
          
          {/* Results Card */}
          <View style={styles.resultsCard}>
            {/* Visual Result */}
            <ResultVisual 
              size={fieldCard.results.recommendedSize}
              method={fieldCard.results.method}
              transportabilitySize={fieldCard.results.transportabilitySize}
            />
            
            {/* Results Details */}
            <View style={styles.resultsDetails}>
              <Text style={styles.detailsTitle}>Calculation Details</Text>
              
              <View style={styles.detailsGrid}>
                <Text style={styles.detailLabel}>Method Used</Text>
                <Text style={styles.detailValue}>{fieldCard.results.method}</Text>
                
                <Text style={styles.detailLabel}>Cross-sectional Area</Text>
                <Text style={styles.detailValue}>
                  {fieldCard.streamGeometry.crossSectionalArea.toFixed(2)} m²
                </Text>
                
                <Text style={styles.detailLabel}>Transportability Factor</Text>
                <Text style={styles.detailValue}>
                  {fieldCard.streamGeometry.widthToDepthRatio < 3 ? 'Low' : 
                   fieldCard.streamGeometry.widthToDepthRatio < 6 ? 'Medium' : 'High'}
                  {` (W/D = ${fieldCard.streamGeometry.widthToDepthRatio.toFixed(2)})`}
                </Text>
                
                <Text style={styles.detailLabel}>Safety Factor</Text>
                <Text style={styles.detailValue}>{fieldCard.results.safetyFactor}</Text>
                
                <Text style={styles.detailLabel}>Controlling Factor</Text>
                <Text style={styles.detailValue}>
                  {fieldCard.results.controllingFactor === 'inlet' ? 'Inlet Control' : 'Outlet Control'}
                </Text>
              </View>
            </View>
          </View>
          
          {/* Input Parameters */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Input Parameters</Text>
            
            <View style={styles.parametersGrid}>
              <Text style={styles.paramLabel}>Drainage Area</Text>
              <Text style={styles.paramValue}>{fieldCard.drainageArea} hectares</Text>
              
              <Text style={styles.paramLabel}>Stream Gradient</Text>
              <Text style={styles.paramValue}>{fieldCard.streamGradient}%</Text>
              
              <Text style={styles.paramLabel}>Region</Text>
              <Text style={styles.paramValue}>{fieldCard.region}</Text>
              
              <Text style={styles.paramLabel}>Culvert Material</Text>
              <Text style={styles.paramValue}>{fieldCard.culvertMaterial}</Text>
              
              <Text style={styles.paramLabel}>Stream Geometry</Text>
              <Text style={styles.paramValue}>
                W1: {fieldCard.streamGeometry.averageTopWidth.toFixed(2)}m, 
                W2: {fieldCard.streamGeometry.bottomWidth.toFixed(2)}m, 
                D: {fieldCard.streamGeometry.averageDepth.toFixed(2)}m
              </Text>
              
              {fieldCard.climateFactors && (
                <>
                  <Text style={styles.paramLabel}>Projected Rainfall</Text>
                  <Text style={styles.paramValue}>
                    {fieldCard.climateFactors.projectedRainfall} mm/hr ({fieldCard.climateFactors.year})
                  </Text>
                </>
              )}
              
              {fieldCard.location && (
                <>
                  <Text style={styles.paramLabel}>Location</Text>
                  <Text style={styles.paramValue}>
                    {fieldCard.location.latitude.toFixed(5)}, {fieldCard.location.longitude.toFixed(5)}
                  </Text>
                </>
              )}
            </View>
          </View>
          
          {/* Notes Section (Optional) */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Field Notes</Text>
            <Text style={styles.notesText}>
              No field notes have been added yet. You can add notes when saving this field card.
            </Text>
          </View>
        </ScrollView>
        
        {/* Action Buttons */}
        <View style={styles.actions}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.saveButton]}
            onPress={handleSaveFieldCard}
            disabled={saving}
          >
            {saving ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <>
                <Save size={18} color={COLORS.white} style={styles.actionIcon} />
                <Text style={styles.actionText}>Save Field Card</Text>
              </>
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.exportButton]}
            onPress={handleExportPdf}
            disabled={exporting}
          >
            {exporting ? (
              <ActivityIndicator size="small" color={COLORS.white} />
            ) : (
              <>
                <FileText size={18} color={COLORS.white} style={styles.actionIcon} />
                <Text style={styles.actionText}>Export PDF</Text>
              </>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.md,
  },
  backButton: {
    marginRight: SPACING.sm,
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
  resultsCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: SPACING.md,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultsDetails: {
    padding: SPACING.md,
    paddingTop: 0,
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginVertical: SPACING.sm,
    paddingTop: SPACING.sm,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  detailLabel: {
    width: '50%',
    fontSize: 14,
    color: COLORS.gray[600],
    paddingVertical: SPACING.xs,
  },
  detailValue: {
    width: '50%',
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
    textAlign: 'right',
    paddingVertical: SPACING.xs,
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
    fontSize: 15,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  parametersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  paramLabel: {
    width: '40%',
    fontSize: 13,
    color: COLORS.gray[600],
    paddingVertical: SPACING.xs,
  },
  paramValue: {
    width: '60%',
    fontSize: 13,
    color: COLORS.gray[800],
    paddingVertical: SPACING.xs,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.gray[500],
    fontStyle: 'italic',
    textAlign: 'center',
    padding: SPACING.md,
  },
  actions: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  actionButton: {
    flex: 1,
    height: 48,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
  },
  exportButton: {
    backgroundColor: COLORS.info,
  },
  actionIcon: {
    marginRight: SPACING.xs,
  },
  actionText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '600',
  },
});

export default ResultScreen;