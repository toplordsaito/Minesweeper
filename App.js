import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ContainerNavigation  from './src/navigator/ContainerNavigation'
import { LogBox } from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from "react-redux"
import { createStore, combineReducers } from "redux";
import themeReducer from "./src/store/reducers/themeReducer"
import * as Font from "expo-font";

const loadFonts = () => {
  return Font.loadAsync({
    "metal": require("./assets/fonts/TheFirst.ttf"),
    "candy": require("./assets/fonts/Funtasia.ttf"),
  })
}
const rootReducer = combineReducers({
  theme: themeReducer,
});
const store = createStore(rootReducer);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);
  // LogBox.ignoreLogs(['Setting a timer']);
  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={loadFonts}
        onFinish={() => setFontLoaded(true)}
        onError={(err) => console.error(err)}
      />
    )
  }
  return (
    <Provider store={store}>
      <ContainerNavigation/>
    </Provider> 
  );
}
