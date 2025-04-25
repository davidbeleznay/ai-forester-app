import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import CustomIcon from '../components/CustomIcon';
import { IconName } from '../components/CustomIcon';

const PlaceholderScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Determine which tool is being displayed
  const getToolInfo = () => {
    const routeName = route.name;
    let icon: IconName = 'Tool';
    let description = 'This tool is coming soon.';
    
    switch (routeName) {
      case 'CulvertSizing':
        icon = 'culvert';
        description = 'Calculate the appropriate culvert size based on drainage area, stream characteristics, and regional factors.';
        break;
      case 'TreeHealth':
        icon = 'tree';
        description = 'Analyze tree health using AI-powered image recognition and symptom assessment.';
        break;
      case 'PebbleCount':
        icon = 'Camera';
        description = 'Conduct automated Wolman pebble counts using computer vision to assess streambed composition.';
        break;
      case 'RestorationMonitoring':
        icon = 'Gauge';
        description = 'Track and evaluate ecological restoration progress using AI-assisted monitoring.';
        break;
      case 'RoadInspection':
        icon = 'Road';
        description = 'Assess forestry road conditions and identify maintenance needs through AI analysis.';
        break;
      case 'GullyAssessment':
        icon = 'Layers';
        description = 'Evaluate gully erosion risk and recommend stabilization measures.';
        break;
      case 'FirePredictor':
        icon = 'Flame';
        description = 'Predict fire risk based on environmental conditions, fuel load, and historical data.';
        break;
      case 'LandslidePredictor':
        icon = 'landslide';
        description = 'Assess landslide risk by analyzing terrain, precipitation, and soil characteristics.';
        break;
      default:
        icon = 'Tool';
        description = 'This tool is coming soon.';
    }
    
    return { icon, description };
  };
  
  const { icon, description } = getToolInfo();
  
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <CustomIcon name={icon} size={64} color="#047857" />
      </View>
      
      <Text style={styles.title}>{route.name}</Text>
      
      <Text style={styles.description}>{description}</Text>
      
      <View style={styles.comingSoonContainer}>
        <Text style={styles.comingSoonText}>
          Development in Progress
        </Text>
        <Text style={styles.detailText}>
          This feature is currently being implemented as part of the AI Forester app development roadmap.
        </Text>
      </View>
      
      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
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
    backgroundColor: '#ecfdf5',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1f2937',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#4b5563',
    lineHeight: 24,
  },
  comingSoonContainer: {
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    padding: 16,
    marginBottom: 30,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#10b981',
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#047857',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#4b5563',
    lineHeight: 20,
  },
  button: {
    backgroundColor: '#047857',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PlaceholderScreen;
