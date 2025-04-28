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

const InputScreen = () => {
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
              This is a placeholder for the culvert sizing tool input form. 
              The form will include fields for watershed characteristics, 
              regional factors, and optional climate projections.
            </Text>
            
            <View style={styles.placeholderForm}>
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Watershed Characteristics</Text>
                {/* Form fields would go here */}
                <View style={styles.placeholder} />
                <View style={styles.placeholder} />
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Stream Geometry</Text>
                {/* Form fields would go here */}
                <View style={styles.placeholder} />
                <View style={styles.placeholder} />
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.sectionTitle}>Regional Factors</Text>
                {/* Form fields would go here */}
                <View style={styles.placeholder} />
              </View>
              
              <TouchableOpacity style={styles.button}>
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
  placeholderForm: {
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
    marginBottom: SPACING.md,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.gray[800],
    marginBottom: SPACING.sm,
  },
  placeholder: {
    height: 48,
    backgroundColor: COLORS.gray[200],
    borderRadius: 4,
    marginBottom: SPACING.sm,
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