import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import InputScreen from '../screens/CulvertTool/InputScreen';
import ResultScreen from '../screens/CulvertTool/ResultScreen';
import HistoryScreen from '../screens/CulvertTool/HistoryScreen';
import { CulvertFieldCard } from '../utils/storage';

// Define the param list for this navigator
export type CulvertToolParamList = {
  CulvertInput: undefined;
  CulvertResult: {
    fieldCard: CulvertFieldCard;
  };
  CulvertHistory: undefined;
};

const Stack = createStackNavigator<CulvertToolParamList>();

const CulvertToolNavigator: React.FC = () => {
  return (
    <Stack.Navigator 
      initialRouteName="CulvertInput"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="CulvertInput" component={InputScreen} />
      <Stack.Screen name="CulvertResult" component={ResultScreen} />
      <Stack.Screen name="CulvertHistory" component={HistoryScreen} />
    </Stack.Navigator>
  );
};

export default CulvertToolNavigator;