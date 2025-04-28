import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

// Import screens directly
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Define a simple icon component to avoid external dependencies
const SimpleIcon = ({ color }: { color: string }) => {
  return (
    <View
      style={{
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: color,
      }}
    />
  );
};

const Tab = createBottomTabNavigator();

// Extremely simplified tab navigator with no external dependencies
const HomeSettingsTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color }) => <SimpleIcon color={color} />,
        tabBarActiveTintColor: '#2F855A', // Green
        tabBarInactiveTintColor: '#718096', // Gray
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

export default HomeSettingsTabs;