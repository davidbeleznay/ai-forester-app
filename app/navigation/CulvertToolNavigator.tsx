import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import InputScreen from '../screens/CulvertTool/InputScreen';
import ResultScreen from '../screens/CulvertTool/ResultScreen';
import { CulvertFieldCard } from '../utils/storage';

// Define the param list for this navigator
export type CulvertToolParamList = {
  Input: undefined;
  CulvertResult: {
    fieldCard: CulvertFieldCard;
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
      <Stack.Screen name="CulvertResult" component={ResultScreen} />
    </Stack.Navigator>
  );
};

export default CulvertToolNavigator;