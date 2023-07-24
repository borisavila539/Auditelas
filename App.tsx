import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './src/navigator/StackNavigator';
import { TelasProvider } from './src/context/telasContext';

export const App = () => {
  return (
    <NavigationContainer>
      <AppState>
        <StackNavigator />
      </AppState>
    </NavigationContainer>
  )
}
const AppState = ({ children }: any) => {
  return (
    <TelasProvider>
      {children}
    </TelasProvider>
  )
}
export default App; 
