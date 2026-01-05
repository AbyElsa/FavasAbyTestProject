import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabParamList } from './Tab.typeDefs';
import { HomeStackNavigator } from '../stack/Stack';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';

export default function TabNavigator() {

  const Tab = createBottomTabNavigator<TabParamList>();
  const [page, setPage] = useState<string>("");
  const { isLoading }: any = useSelector(state => state);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, }}
      keyboardVerticalOffset={Platform.OS === "ios" ? -70 : -120}
    >
      <Tab.Navigator
        initialRouteName="HomeTab"
        backBehavior='history'
        screenListeners={({ navigation, route }: any) => ({ state: () => { setPage(route.name); } })}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: { display: 'none' },
        })}
      >
        <Tab.Screen
          name="HomeTab"
          component={HomeStackNavigator}
          options={{
            title: '',
            tabBarIcon: () => null
          }}
        />
      </Tab.Navigator>
    </KeyboardAvoidingView>
  );
}
