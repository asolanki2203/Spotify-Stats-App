import React from 'react';
import Navigator from './navigation/homeNavigator';
import Store from './store/configureStore';
import { Provider } from 'react-redux';
 
export default function App() {
  return (
    <Provider store={Store}>
      <Navigator /> 
    </Provider>
  ); 
}

