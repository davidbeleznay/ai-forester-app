import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import CustomIcon from '../components/CustomIcon';

const PlaceholderScreen = ({ route, navigation }) => {
  // Get the route name to customize the content
  const routeName = route.name;
  
  // Function to get icon and description based on the route
  const getToolDetails = () => {
    switch (routeName) {
      case 'TreeHealth':
        return { 
          icon: 'tree', 
          color: '#059669',
          description: 'Analyze tree health using AI-powered image recognition and symptom assessment.' 
        };
      case 'CulvertSizing':
        return { 
          icon: 'culvert', 
          color: '#e11d48',
          description: 'Calculate the appropriate culvert size based on drainage area, stream characteristics, and regional factors.' 
        };
      case 'PebbleCount':
        return { 
          icon: 'Camera', 
          color: '#8b5cf6',
          description: 'Conduct automated Wolman pebble counts using computer vision to assess streambed composition.' 
        };
      case 'Restoration':
        return { 
          icon: 'Leaf', 
          color: '#f59e0b',
          description: 'Track and evaluate ecological restoration progress using AI-assisted monitoring.' 
        };
      case 'RoadInspection':
        return { 
          icon: 'Road', 
          color: '#3b82f6',
          description: 'Assess forestry road conditions and identify maintenance needs through AI analysis.' 
        };
      case 'Landslide':
        return { 
          icon: 'landslide', 
          color: '#f43f5e',
          description: 'Assess landslide risk by analyzing terrain, precipitation, and soil characteristics.' 
        };
      default:
        return { 
          icon: 'AlertCircle', 
          color: '#6b7280',
          description: 'This tool is coming soon.' 
        };
    }
  };
  
  const { icon, color, description } = getToolDetails();
  
  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { backgroundColor: `${color}20` }]}>
        <CustomIcon name={icon} size={64} color={color} />
      </View>
      
      <Text style={styles.title}>{routeName}</Text>
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Coming Soon</Text>
        <Text style={styles.infoText}>
          This feature is currently in development. It will be available in a future update.
        </Text>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Return to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#4b5563',
    marginBottom: 30,
    lineHeight: 24,
  },
  infoBox: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#047857',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PlaceholderScreen;
