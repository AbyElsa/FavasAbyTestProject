import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from '../../Screens/Home/HomePage';
import PreviewScreen from '../../Screens/Home/preview';

const Stack = createNativeStackNavigator<any>();


export function HomeStackNavigator({ navigation }: any) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomePage" component={HomePage} />
      <Stack.Screen name="Preview" component={PreviewScreen} />
    </Stack.Navigator>
  );
}
