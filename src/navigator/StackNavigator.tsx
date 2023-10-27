import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuditoriaScreen } from '../screens/AuditoriaScreen';
import { BienvenidaScreen } from '../screens/BienvenidaScreen';
import { HistorialScreen } from '../screens/HistorialScreen';
import { AuditoriaProcess } from '../screens/AuditoriaProcess';
import LoginScreen from '../screens/LoginScreen';
import { beige } from '../components/colores';
import { DetalleHistorialScreen } from '../screens/DetalleHistorialScreen';
import { AuditoriaEnProceso } from '../screens/AuditoriaEnProceso';
import { SeleccionAuditoria } from '../screens/SeleccionAuditoria';
import { PruebaCalikdad } from '../screens/PruebaCalikdad';

export type RootStackParams = {
  LoginScreen: undefined,
  AuditoriaScreen: undefined,
  BienvenidaScreen: undefined,
  HistorialScreen: undefined,
  AuditoriaProcess: undefined,
  DetalleHistorialScreen: undefined,
  AuditoriaEnProceso: undefined,
  SeleccionAuditoria:undefined,
  PruebaCalidad:undefined
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
      <Stack.Screen name="DetalleHistorialScreen" component={DetalleHistorialScreen} />
      <Stack.Screen name="AuditoriaEnProceso" component={AuditoriaEnProceso} />
      <Stack.Screen name='SeleccionAuditoria' component={SeleccionAuditoria}/>
      <Stack.Screen name='PruebaCalidad' component={PruebaCalikdad}/>


    </Stack.Navigator>
    //options={{ title: 'AuditoriaScreen' }}
  );
}

