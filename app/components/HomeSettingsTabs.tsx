import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

// Import screens with explicit named imports
import HomeScreen from '../screens/HomeScreen';
import InstructionsScreen from '../screens/InstructionsScreen';
import SettingsScreen from '../screens/SettingsScreen';

// Define navigation types
type TabParamList = {
  Home: undefined;
  Instructions: undefined;
  Settings: undefined;
};

// Define a simple icon component to avoid external dependencies
const SimpleIcon = ({ color }: { color: string }): React.ReactElement => {
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

const Tab = createBottomTabNavigator<TabParamList>();

// Tab navigator with explicit React.FC typing and return type annotation
const HomeSettingsTabs: React.FC = (): React.ReactElement => {
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
