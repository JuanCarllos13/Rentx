import React from 'react';
import { ThemeProvider } from 'styled-components'
import { ActivityIndicator } from 'react-native'
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter'
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo'
import theme from './src/styles/theme';
import { Routes } from './src/routes'
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
    'ViewPropTypes will be removed from React Native. Migrate to ViewPropTypes exported from \'deprecated-react-native-prop-types\'.'
])
export default function App() {

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  })
  if (!fontsLoaded) {
    return <ActivityIndicator color={'#FFF'} />;
  }


  return (
    <ThemeProvider theme={theme}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Routes />
      </GestureHandlerRootView>

    </ThemeProvider>

  );
}