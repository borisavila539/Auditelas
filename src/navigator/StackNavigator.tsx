import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuditoriaScreen } from '../screens/AuditoriaScreen';
import { BienvenidaScreen } from '../screens/BienvenidaScreen';
import { HistorialScreen } from '../screens/HistorialScreen';
import { AuditoriaProcess } from '../screens/AuditoriaProcess';
import LoginScreen from '../screens/LoginScreen';
import { beige } from '../components/colores';

export type RootStackParams = {
  LoginScreen: undefined,
  AuditoriaScreen: undefined,
  BienvenidaScreen: undefined,
  HistorialScreen: undefined,
  AuditoriaProcess: undefined
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: beige,
        }
      }} >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="BienvenidaScreen" component={BienvenidaScreen} />
      <Stack.Screen name="AuditoriaScreen" component={AuditoriaScreen} />
      <Stack.Screen name="HistorialScreen" component={HistorialScreen} />
      <Stack.Screen name="AuditoriaProcess" component={AuditoriaProcess} />
    </Stack.Navigator>
    //options={{ title: 'AuditoriaScreen' }}
  );
}

