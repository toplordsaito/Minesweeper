import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ContainerNavigation  from './src/navigator/ContainerNavigation'
import { LogBox } from 'react-native';

import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux";
import themeReducer from "./src/store/reducers/themeReducer"
import { useSelector, useDispatch } from "react-redux";

const rootReducer = combineReducers({
  theme: themeReducer,
});
const store = createStore(rootReducer);

export default function App() {
  // LogBox.ignoreLogs(['Setting a timer']);
  return (
    <Provider store={store}>
      <ContainerNavigation/>
    </Provider> 
  );
}
