import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView
} from 'react-native';

/**
 * Extremely simplified HomeScreen with no external dependencies
 */
const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Forester Field Companion</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        <ScrollView style={styles.scrollView}>
          {/* Simplified content */}
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to AI Forester!</Text>
            <Text style={styles.text}>
              This is a simplified version of the app to resolve rendering issues.
              Once this version loads successfully, we can gradually add back features.
            </Text>
          </View>
          
          {/* Tool buttons */}
          <Text style={styles.sectionTitle}>Field Tools</Text>
          <View style={styles.toolGrid}>
            {["Culvert Sizing", "Tree Health", "Road Assessment", "Stream Analysis"].map((tool, index) => (
              <TouchableOpacity key={index} style={styles.toolButton}>
                <View style={[styles.iconPlaceholder, { backgroundColor: getColor(index) }]} />
                <Text style={styles.toolText}>{tool}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

// Simple function to get colors for the icons
const getColor = (index: number): string => {
  const colors = ['#E53E3E', '#38A169', '#3182CE', '#DD6B20'];
  return colors[index % colors.length];
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A202C',
    marginBottom: 8,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
  },
  toolText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A202C',
    textAlign: 'center',
  },
});

export default HomeScreen;