import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import InputScreen from '../screens/CulvertTool/InputScreen';
import ResultScreen from '../screens/CulvertTool/ResultScreen';

// Define the param list for this navigator
export type CulvertToolParamList = {
  Input: undefined;
  Result: {
    culvertResults: {
      recommendedSize: number;
      method: string;
      transportabilitySize?: number;
      q100Flow?: number;
      safetyFactor: number;
      controllingFactor: 'inlet' | 'outlet';
      comparisonInfo?: string;
    };
  };
};

const Stack = createStackNavigator<CulvertToolParamList>();

const CulvertToolNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="Input"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Input" component={InputScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default CulvertToolNavigator;
