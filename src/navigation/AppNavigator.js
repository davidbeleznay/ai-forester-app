import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

// Create stack navigator
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#047857',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* Home Screen */}
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'AI Forester' }} 
      />
      
      {/* Tool Screens */}
      <Stack.Screen 
        name="TreeHealth" 
        component={PlaceholderScreen} 
        options={{ title: 'Tree Health' }} 
      />
      
      <Stack.Screen 
        name="CulvertSizing" 
        component={PlaceholderScreen} 
        options={{ title: 'Culvert Sizing' }} 
      />
      
      <Stack.Screen 
        name="PebbleCount" 
        component={PlaceholderScreen} 
        options={{ title: 'Pebble Count' }} 
      />
      
      <Stack.Screen 
        name="Restoration" 
        component={PlaceholderScreen} 
        options={{ title: 'Restoration' }} 
      />
      
      <Stack.Screen 
        name="RoadInspection" 
        component={PlaceholderScreen} 
        options={{ title: 'Road Inspection' }} 
      />
      
      <Stack.Screen 
        name="Landslide" 
        component={PlaceholderScreen} 
        options={{ title: 'Landslide Risk' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
