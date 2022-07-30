import React from 'react';
import { Home } from './src/pages/Home';
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
import { CardDetails } from './src/pages/CardDetails';
import { Scheduling } from './src/pages/Scheduling';

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
      {/* <CardDetails /> */}
      <Scheduling/>
    </ThemeProvider>

  );
}