import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import our navigators and screens
import HomeSettingsTabs from '../components/HomeSettingsTabs';
import CulvertToolNavigator from './CulvertToolNavigator';

// Define the param list for the main app navigator
export type MainAppParamList = {
  Main: undefined;
  CulvertTool: undefined;
};

const Stack = createStackNavigator<MainAppParamList>();

/**
 * Main application navigator that combines the tab navigation
 * with tool-specific navigation stacks
 */
const MainAppNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Main"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Main" component={HomeSettingsTabs} />
      <Stack.Screen name="CulvertTool" component={CulvertToolNavigator} />
    </Stack.Navigator>
  );
};

export default MainAppNavigator;