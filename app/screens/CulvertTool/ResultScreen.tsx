import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { COLORS, SPACING } from '../../config/constants';

const ResultScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Culvert Sizing Results</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.content}>
            <Text style={styles.title}>Recommended Culvert Size</Text>
            
            <View style={styles.resultCard}>
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Recommended Diameter:</Text>
                <Text style={styles.resultValue}>800 mm</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Flow Capacity:</Text>
                <Text style={styles.resultValue}>1.2 m³/s</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Design Storm:</Text>
                <Text style={styles.resultValue}>Q100</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Safety Factor:</Text>
                <Text style={styles.resultValue}>1.2</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Controlling Factor:</Text>
                <Text style={styles.resultValue}>Inlet Control</Text>
              </View>
              
              <View style={styles.divider} />
              
              <Text style={styles.notesTitle}>Notes & Recommendations</Text>
              <Text style={styles.notesText}>
                This culvert size is recommended based on the hydraulic analysis 
                of the provided watershed characteristics. A debris rack is recommended 
                to prevent blockage. Regular maintenance inspections should be scheduled
                especially after major storm events.
              </Text>
            </View>
            
            <View style={styles.buttonRow}>
              <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                <Text style={styles.secondaryButtonText}>Edit Inputs</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Save Report</Text>
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
    marginBottom: SPACING.md,
  },
  resultCard: {
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
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: SPACING.sm,
  },
  resultLabel: {
    fontSize: 14,
    color: COLORS.gray[600],
  },
  resultValue: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.gray[800],
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.gray[200],
    marginVertical: SPACING.md,
  },
  notesTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  notesText: {
    fontSize: 14,
    color: COLORS.gray[600],
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SPACING.md,
  },
  button: {
    flex: 1,
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.sm,
    paddingHorizontal: SPACING.md,
    borderRadius: 4,
    alignItems: 'center',
    marginHorizontal: SPACING.xs,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: '600',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
  },
  secondaryButtonText: {
    color: COLORS.primary,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ResultScreen;