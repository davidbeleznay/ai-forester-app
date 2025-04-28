import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';

// Define types for navigation if needed
import { ParamListBase } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../config/constants';

type HomeScreenProps = NativeStackScreenProps<ParamListBase, 'Home'>;

/**
 * HomeScreen with functional navigation to Culvert Sizing Tool
 */
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const navigateToCulvertTool = () => {
    navigation.navigate('CulvertTool');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>AI Forester Field Companion</Text>
          <Text style={styles.headerVersion}>v1.0</Text>
        </View>
        
        {/* Main Content */}
        <View style={styles.contentContainer}>
          <View style={styles.card}>
            <Text style={styles.title}>Welcome to AI Forester!</Text>
            <Text style={styles.text}>
              Use the tools below to perform field calculations and assessments for forestry applications.
              Select the Culvert Sizing tool to get started with your culvert design.
            </Text>
          </View>
          
          {/* Field Tools */}
          <Text style={styles.sectionTitle}>Field Tools</Text>
          <View style={styles.toolGrid}>
            <TouchableOpacity 
              style={styles.toolButton}
              onPress={navigateToCulvertTool}
            >
              <View style={[styles.iconPlaceholder, { backgroundColor: COLORS.error }]} />
              <Text style={styles.toolText}>Culvert Sizing</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: COLORS.success }]} />
              <Text style={styles.toolText}>Tree Health</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: COLORS.info }]} />
              <Text style={styles.toolText}>Road Assessment</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolButton}>
              <View style={[styles.iconPlaceholder, { backgroundColor: COLORS.warning }]} />
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
    backgroundColor: COLORS.primary,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    backgroundColor: COLORS.primary,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerVersion: {
    color: COLORS.white,
    fontSize: 12,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    color: COLORS.textLight,
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  toolGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolButton: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 16,
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: COLORS.black,
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
    color: COLORS.text,
    textAlign: 'center',
  },
});

export default HomeScreen;