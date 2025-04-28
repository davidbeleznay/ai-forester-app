import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { View } from 'react-native';

// Import screens
import HomeScreen from './screens/HomeScreen';
import InstructionsScreen from './screens/InstructionsScreen';
import SettingsScreen from './screens/SettingsScreen';

// Simple icon component
const SimpleIcon = ({ color }: { color: string }) => (
  <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
);

// Create the tab navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Main app component
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color }) => {
            return <SimpleIcon color={color} />;
          },
          tabBarActiveTintColor: '#2F855A',
          tabBarInactiveTintColor: '#718096',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Instructions" component={InstructionsScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
      <StatusBar style="light" />
    </NavigationContainer>
  );
}
