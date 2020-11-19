import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import  ContainerNavigation  from './src/navigator/ContainerNavigation'
import { LogBox } from 'react-native';
export default function App() {
  LogBox.ignoreLogs(['Setting a timer']);
  return (
    <ContainerNavigation/>
  );
}

