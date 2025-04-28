import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import InputScreen from '../screens/CulvertTool/InputScreen';
import ResultScreen from '../screens/CulvertTool/ResultScreen';

// Icons
import { Home, BookOpen, Settings } from 'lucide-react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../config/constants';

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
const HomeSettingsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Home color={color} size={size} />;
          } else if (route.name === 'Instructions') {
            return <BookOpen color={color} size={size} />;
          } else if (route.name === 'Settings') {
            return <Settings color={color} size={size} />;
          }
          return null;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray[500],
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: COLORS.gray[200],
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

export default HomeSettingsTabs;
