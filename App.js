/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {MainScreen} from './src/MainScreen';

const data = [
  {label: 'one', value: 1},
  {label: 'two', value: 2},
  {label: 'three', value: 3},
];

const App = () => {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
};

export default App;
