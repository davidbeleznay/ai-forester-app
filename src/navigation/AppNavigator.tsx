import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StyleSheet, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import CustomIcon from '../components/CustomIcon';
import { IconName } from '../components/CustomIcon';

// Create the stack and tab navigators
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Define the tab navigator for the main screens
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName = 'Home';
          
          if (route.name === 'Home') {
            iconName = 'Home';
          } else if (route.name === 'Instructions') {
            iconName = 'Book';
          } else if (route.name === 'Settings') {
            iconName = 'Settings';
          }
          
          return <CustomIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#047857',
        tabBarInactiveTintColor: 'gray',
        headerStyle: {
          backgroundColor: '#047857',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'AI Forester' }} />
      <Tab.Screen name="Instructions" component={InstructionsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

// Main app navigator with all screens
const AppNavigator = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack.Navigator
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
        <Stack.Screen 
          name="Main" 
          component={TabNavigator} 
          options={{ headerShown: false }} 
        />
        
        {/* Tool screens */}
        <Stack.Screen 
          name="CulvertSizing" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Culvert Sizing',
            headerBackTitle: 'Back'
          }} 
        />
        <Stack.Screen 
          name="TreeHealth" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Tree Health Analysis',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="PebbleCount" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Wolman Pebble Count',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="RestorationMonitoring" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Restoration Monitoring',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="RoadInspection" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Road Inspection',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="GullyAssessment" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Gully Assessment',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="FirePredictor" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Fire Predictor',
            headerBackTitle: 'Back' 
          }} 
        />
        <Stack.Screen 
          name="LandslidePredictor" 
          component={PlaceholderScreen} 
          options={{ 
            title: 'Landslide Predictor', 
            headerBackTitle: 'Back' 
          }} 
        />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});

export default AppNavigator;
