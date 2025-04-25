import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import CustomIcon from '../components/CustomIcon';

const HomeScreen = ({ navigation }) => {
  // Sample field tools data 
  const fieldTools = [
    { id: 'tree-health', name: 'Tree Health', icon: 'tree', color: '#059669', route: 'TreeHealth' },
    { id: 'culvert-sizing', name: 'Culvert Sizing', icon: 'culvert', color: '#e11d48', route: 'CulvertSizing' },
    { id: 'pebble-count', name: 'Pebble Count', icon: 'Camera', color: '#8b5cf6', route: 'PebbleCount' },
    { id: 'restoration', name: 'Restoration', icon: 'Leaf', color: '#f59e0b', route: 'Restoration' },
    { id: 'road-inspection', name: 'Road Inspection', icon: 'Road', color: '#3b82f6', route: 'RoadInspection' },
    { id: 'landslide', name: 'Landslide Risk', icon: 'landslide', color: '#f43f5e', route: 'Landslide' }
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Forester</Text>
        <Text style={styles.headerSubtitle}>Field Companion</Text>
      </View>

      {/* Field Tools Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Field Tools</Text>
        
        <ScrollView contentContainerStyle={styles.toolsGrid}>
          {fieldTools.map((tool) => (
            <TouchableOpacity 
              key={tool.id} 
              style={styles.toolCard}
              onPress={() => navigation.navigate(tool.route)}
            >
              <View style={[styles.iconContainer, { backgroundColor: `${tool.color}20` }]}>
                <CustomIcon name={tool.icon} size={24} color={tool.color} />
              </View>
              <Text style={styles.toolName}>{tool.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    backgroundColor: '#047857',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  section: {
    padding: 16,
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#111827',
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  toolCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  toolName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default HomeScreen;
