/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import configureStore from './src/redux';
import {Provider} from 'react-redux';
import Route from './src/navigation/Route';

const store = configureStore();
const App = () => {
  return (
    <Provider store={store}>
      <Route />
    </Provider>
  );
};

export default App;
