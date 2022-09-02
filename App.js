import React from 'react';
import {SafeAreaView, Appearance, StyleSheet, Text} from 'react-native';
import Calculator from './src/calculator.js';

const App = () => {
  const colorScheme = Appearance.getColorScheme();
  if (colorScheme==='light'){
    style = styles.light;
  } else {
    style = styles.dark;
  }

  return (
    <SafeAreaView style={style}>
      {/* <Text> {colorScheme} </Text> */}
      <Calculator />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dark: {
    flex: 1,
    backgroundColor: '#f00',
    width: '100%',
    height: '100%',
  },

  light: {
    flex: 1,
    backgroundColor: '#00f',
    width: '100%',
    height: '100%',
  },
});

export default App;
