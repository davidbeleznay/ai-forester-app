import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InputScreen from '../screens/CulvertTool/InputScreen';
import ResultScreen from '../screens/CulvertTool/ResultScreen';

// Icons
import { Home, Book, Settings } from 'react-native-feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Culvert Tool Stack Navigator
const CulvertToolStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CulvertInput" component={InputScreen} />
      <Stack.Screen name="CulvertResult" component={ResultScreen} />
    </Stack.Navigator>
  );
};

// Main Tab Navigator
const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home stroke={color} width={size} height={size} />;
          } else if (route.name === 'Instructions') {
            return <Book stroke={color} width={size} height={size} />;
          } else if (route.name === 'Settings') {
            return <Settings stroke={color} width={size} height={size} />;
          }
          return null;
        },
        tabBarActiveTintColor: '#2F855A',
        tabBarInactiveTintColor: '#718096',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E2E8F0',
          paddingTop: 5,
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Instructions" component={InstructionsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;