import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';

/**
 * Ultra-simplified InstructionsScreen with no external dependencies
 */
const InstructionsScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Instructions</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to AI Forester!</Text>
            <Text style={styles.text}>
              This is a simplified version of the Instructions screen to resolve 
              rendering issues. Once this version loads successfully, we can gradually 
              add back features and detailed instructions.
            </Text>
          </View>
          
          <View style={styles.card}>
            <Text style={styles.title}>App Features</Text>
            <View style={styles.featureItem}>
              <View style={[styles.dot, { backgroundColor: '#E53E3E' }]} />
              <Text style={styles.featureText}>Culvert Sizing Tool</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.dot, { backgroundColor: '#38A169' }]} />
              <Text style={styles.featureText}>Tree Health Assessment</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.dot, { backgroundColor: '#3182CE' }]} />
              <Text style={styles.featureText}>Offline Data Collection</Text>
            </View>
            <View style={styles.featureItem}>
              <View style={[styles.dot, { backgroundColor: '#DD6B20' }]} />
              <Text style={styles.featureText}>PDF Export Capability</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Download User Manual</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2F855A', // Green primary color
  },
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC', // Light background
  },
  header: {
    backgroundColor: '#2F855A',
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerVersion: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  scrollView: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: '#4A5568',
    lineHeight: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  featureText: {
    fontSize: 14,
    color: '#4A5568',
  },
  button: {
    backgroundColor: '#2F855A',
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default InstructionsScreen;