import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from 'react-native';

// Define types for navigation if needed
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<ParamListBase, 'Home'>;

/**
 * Even more simplified HomeScreen with no external dependencies
 * Lines 132 and 137 were causing issues, so we've completely removed any complex UI
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Forester Field Companion</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        {/* SIMPLIFIED CONTENT: Removed complex ScrollView that was causing issues */}
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to AI Forester!</Text>
            <Text style={styles.text}>
              This is a simplified version of the app to resolve rendering issues.
              Once this version loads successfully, we can gradually add back features.
            </Text>
          </View>
          
          {/* Simple static buttons instead of a map function */}
          <Text style={styles.sectionTitle}>Field Tools</Text>
          <View style={styles.toolGrid}>
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: '#E53E3E' }]} />
              <Text style={styles.toolText}>Culvert Sizing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: '#38A169' }]} />
              <Text style={styles.toolText}>Tree Health</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: '#3182CE' }]} />
              <Text style={styles.toolText}>Road Assessment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: '#DD6B20' }]} />
              <Text style={styles.toolText}>Stream Analysis</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  contentContainer: {
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
