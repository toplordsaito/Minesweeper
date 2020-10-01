import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainGame from './components/MainGame'
import { Dimensions } from 'react-native';

export default function App() {
  let boardWidth = Dimensions.get('screen').width
  let max_height = Dimensions.get('screen').height
  let BOARD_SIZE = 10
  let CELL_SIZE = 30
  return (
    <View style={styles.container}>
      
      <MainGame size={10} mine={10}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
