import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';

import * as Font from 'expo-font';
import { AppLoading } from 'expo';

import DashboardNavigator from './src/navigation/DashboardNavigator';

enableScreens();

const fecthFonts = () => {
  return Font.loadAsync({
    'Quicksand': require('./assets/fonts/Quicksand-VariableFont_wght.ttf'),
    'Ruda': require('./assets/fonts/Ruda-VariableFont_wght.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if(!fontLoaded){
    return <AppLoading startAsync={fecthFonts} onFinish={() => setFontLoaded(true)} />;
  }

  return <DashboardNavigator styles={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
