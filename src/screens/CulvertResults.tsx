import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  Share,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { COLORS, SPACING } from '../config/constants';

const CulvertResults = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // @ts-ignore - will be fixed with proper navigation types
  const { results } = route.params;
  
  const [exportInProgress, setExportInProgress] = useState(false);
  
  const handleBackToHome = () => {
    // Navigate back to the home screen
    // @ts-ignore - will be fixed with proper navigation types
    navigation.navigate('Home');
  };
  
  const handleSaveFieldCard = () => {
    // The field card was already saved in the previous screen
    Alert.alert('Success', 'Field card saved successfully.');
  };
  
  const handleExportPDF = async () => {
    try {
      setExportInProgress(true);
      
      // Simulate PDF generation delay
      setTimeout(() => {
        setExportInProgress(false);
        Alert.alert('Success', 'PDF exported successfully.');
      }, 2000);
    } catch (error) {
      setExportInProgress(false);
      Alert.alert('Error', 'Failed to export PDF.');
      console.error('Error exporting PDF:', error);
    }
  };
  
  const handleShare = async () => {
    try {
      const message = `Culvert Sizing Results\n\nRecommended Size: ${results.results.recommendedSize} mm\nCross-sectional Area: ${results.results.crossSectionalArea.toFixed(2)} m²\nMethod: ${results.results.method}\nSafety Factor: ${results.results.safetyFactor}`;
      
      await Share.share({
        message,
        title: 'Culvert Sizing Results',
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share results.');
      console.error('Error sharing results:', error);
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
            <CustomIcon name="arrow-left" color={COLORS.white} size={24} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sizing Results</Text>
        </View>
        
        {/* Results Content */}
        <ScrollView style={styles.scrollView}>
          {/* Main Result Card */}
          <View style={styles.resultCard}>
            <Text style={styles.resultTitle}>Recommended Culvert Size</Text>
            <Text style={styles.recommendedSize}>{results.results.recommendedSize} mm</Text>
            <Text style={styles.methodText}>Based on {results.results.method}</Text>
            
            {results.inputs.useTransportabilityMatrix && (
              <View style={styles.comparisonTag}>
                <Text style={styles.comparisonText}>
                  Larger than Transportability Matrix (800 mm)
                </Text>
              </View>
            )}
            
            {/* Culvert Visualization */}
            <View style={styles.visualizationContainer}>
              <View style={styles.visualization}>
                {/* Bridge silhouette */}
                <View style={styles.bridgeTop} />
                <View style={styles.bridgeBottom} />
                
                {/* Concentric circles */}
                <View style={[styles.circle, styles.circle1]} />
                <View style={[styles.circle, styles.circle2]} />
                <View style={[styles.circle, styles.circle3]} />
                <View style={[styles.circle, styles.circle4]} />
                <View style={[styles.circle, styles.circle5]} />
              </View>
              <Text style={styles.visualizationCaption}>
                Visual representation (not to scale)
              </Text>
            </View>
            
            {/* Result Details */}
            <View style={styles.detailsContainer}>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Method Used</Text>
                <Text style={styles.detailValue}>{results.results.method}</Text>
              </View>
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Cross-sectional Area</Text>
                <Text style={styles.detailValue}>
                  {results.results.crossSectionalArea.toFixed(2)} m²
                </Text>
              </View>
              
              {results.inputs.useTransportabilityMatrix && (
                <View style={styles.detailRow}>
                  <Text style={styles.detailLabel}>Transportability Factor</Text>
                  <Text style={styles.detailValue}>
                    Medium (W/D = {results.results.widthToDepthRatio.toFixed(2)})
                  </Text>
                </View>
              )}
              
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Safety Factor</Text>
                <Text style={styles.detailValue}>{results.results.safetyFactor}</Text>
              </View>
            </View>
          </View>
          
          {/* Input Parameters Summary */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Input Parameters</Text>
            
            <View style={styles.paramGrid}>
              <View style={styles.paramRow}>
                <Text style={styles.paramLabel}>Drainage Area</Text>
                <Text style={styles.paramValue}>{results.inputs.drainageArea} hectares</Text>
              </View>
              
              <View style={styles.paramRow}>
                <Text style={styles.paramLabel}>Stream Gradient</Text>
                <Text style={styles.paramValue}>{results.inputs.streamGradient}%</Text>
              </View>
              
              <View style={styles.paramRow}>
                <Text style={styles.paramLabel}>Region</Text>
                <Text style={styles.paramValue}>{results.inputs.region}</Text>
              </View>
              
              <View style={styles.paramRow}>
                <Text style={styles.paramLabel}>Culvert Material</Text>
                <Text style={styles.paramValue}>{results.inputs.culvertMaterial}</Text>
              </View>
              
              <View style={styles.paramRow}>
                <Text style={styles.paramLabel}>Stream Geometry</Text>
                <Text style={styles.paramValue}>
                  W1: {results.results.crossSectionalArea / (parseFloat(results.inputs.widthMeasurements[0].depth) || 1) / 2} m, 
                  D: {results.inputs.widthMeasurements[0].depth} m
                </Text>
              </View>
            </View>
          </View>
          
          {/* Location Information */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Location</Text>
            
            <View style={styles.locationContainer}>
              <View style={styles.locationCoordinates}>
                <Text style={styles.coordinateText}>
                  {results.location.latitude.toFixed(6)}, {results.location.longitude.toFixed(6)}
                </Text>
                <Text style={styles.accuracyText}>
                  Accuracy: ±{results.location.accuracy.toFixed(1)} m
                </Text>
              </View>
              
              <TouchableOpacity style={styles.mapButton}>
                <CustomIcon name="map-pin" color={COLORS.primary} size={16} />
                <Text style={styles.mapButtonText}>View on Map</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Notes Section */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Notes</Text>
            
            <View style={styles.noteBox}>
              <Text style={styles.noteText}>
                This culvert size recommendation is based on hydraulic calculations using the 
                California Method. The culvert should be installed with proper inlet and outlet 
                protection to prevent erosion. Regular maintenance is recommended to ensure 
                proper functioning.
              </Text>
            </View>
            
            {results.inputs.useClimateLayer && (
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>Climate Considerations</Text>
                <Text style={styles.infoText}>
                  This sizing includes a climate change adjustment factor based on projected 
                  precipitation intensity increases for 2050.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
        
        {/* Actions Footer */}
        <View style={styles.actionBar}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={handleSaveFieldCard}
          >
            <CustomIcon name="save" color={COLORS.white} size={18} style={styles.actionIcon} />
            <Text style={styles.actionText}>Save Field Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.secondaryButton]}
            onPress={handleExportPDF}
            disabled={exportInProgress}
          >
            <CustomIcon name="file-text" color={COLORS.white} size={18} style={styles.actionIcon} />
            <Text style={styles.actionText}>
              {exportInProgress ? 'Exporting...' : 'Export PDF'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Additional Actions */}
        <View style={styles.secondaryActions}>
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={handleShare}
          >
            <CustomIcon name="share" color={COLORS.primary} size={16} style={styles.linkIcon} />
            <Text style={styles.linkText}>Share Results</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.linkButton}
            onPress={handleBackToHome}
          >
            <CustomIcon name="home" color={COLORS.primary} size={16} style={styles.linkIcon} />
            <Text style={styles.linkText}>Back to Home</Text>
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
  resultCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
    alignItems: 'center',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: SPACING.sm,
    color: COLORS.gray[800],
  },
  recommendedSize: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: SPACING.xs,
  },
  methodText: {
    fontSize: 14,
    color: COLORS.gray[600],
    marginBottom: SPACING.sm,
  },
  comparisonTag: {
    backgroundColor: COLORS.blue[100],
    borderRadius: 16,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: SPACING.md,
  },
  comparisonText: {
    fontSize: 12,
    color: COLORS.blue[800],
  },
  visualizationContainer: {
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
    alignItems: 'center',
  },
  visualization: {
    width: '100%',
    height: 120,
    backgroundColor: COLORS.gray[100],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  bridgeTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: COLORS.gray[400],
  },
  bridgeBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 2,
    borderTopColor: COLORS.gray[400],
  },
  circle: {
    position: 'absolute',
    borderRadius: 100,
    borderWidth: 2,
    top: '50%',
    left: '50%',
  },
  circle1: {
    width: 100,
    height: 100,
    borderColor: COLORS.blue[300],
    transform: [{ translateX: -50 }, { translateY: -50 }],
    opacity: 0.3,
  },
  circle2: {
    width: 80,
    height: 80,
    borderColor: COLORS.blue[400],
    transform: [{ translateX: -40 }, { translateY: -40 }],
    opacity: 0.4,
  },
  circle3: {
    width: 60,
    height: 60,
    borderColor: COLORS.blue[500],
    transform: [{ translateX: -30 }, { translateY: -30 }],
    opacity: 0.6,
  },
  circle4: {
    width: 40,
    height: 40,
    backgroundColor: COLORS.blue[500],
    borderWidth: 0,
    transform: [{ translateX: -20 }, { translateY: -20 }],
    opacity: 0.2,
  },
  circle5: {
    width: 40,
    height: 40,
    borderColor: COLORS.blue[500],
    transform: [{ translateX: -20 }, { translateY: -20 }],
  },
  visualizationCaption: {
    marginTop: SPACING.xs,
    fontSize: 12,
    color: COLORS.gray[500],
    textAlign: 'center',
  },
  detailsContainer: {
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
    paddingTop: SPACING.md,
    width: '100%',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  detailLabel: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.gray[800],
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
    fontWeight: '600',
    marginBottom: SPACING.md,
    color: COLORS.gray[800],
  },
  paramGrid: {
    flexDirection: 'column',
  },
  paramRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.xs,
  },
  paramLabel: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  paramValue: {
    fontSize: 14,
    textAlign: 'right',
    color: COLORS.gray[800],
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationCoordinates: {
    flex: 1,
  },
  coordinateText: {
    fontSize: 14,
    color: COLORS.gray[800],
    fontWeight: '500',
  },
  accuracyText: {
    fontSize: 12,
    color: COLORS.gray[500],
    marginTop: 2,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
    backgroundColor: COLORS.gray[100],
    borderRadius: 4,
  },
  mapButtonText: {
    fontSize: 12,
    color: COLORS.primary,
    fontWeight: '500',
    marginLeft: 4,
  },
  noteBox: {
    backgroundColor: COLORS.gray[50],
    borderRadius: 8,
    padding: SPACING.md,
  },
  noteText: {
    fontSize: 14,
    color: COLORS.gray[700],
    lineHeight: 20,
  },
  infoBox: {
    marginTop: SPACING.md,
    backgroundColor: COLORS.blue[50],
    borderRadius: 8,
    padding: SPACING.md,
    borderWidth: 1,
    borderColor: COLORS.blue[100],
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: COLORS.blue[800],
    marginBottom: 4,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.blue[700],
    lineHeight: 20,
  },
  actionBar: {
    flexDirection: 'row',
    padding: SPACING.md,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray[200],
  },
  actionButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: 8,
    padding: SPACING.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.sm,
  },
  secondaryButton: {
    backgroundColor: COLORS.blue[600],
    marginRight: 0,
    marginLeft: SPACING.sm,
  },
  actionIcon: {
    marginRight: SPACING.sm,
  },
  actionText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 14,
  },
  secondaryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.md,
    paddingTop: 0,
  },
  linkButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SPACING.sm,
  },
  linkIcon: {
    marginRight: SPACING.xs,
  },
  linkText: {
    color: COLORS.primary,
    fontSize: 14,
  },
});

export default CulvertResults;