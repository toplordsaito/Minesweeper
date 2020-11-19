import React, { useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import styles from '../styles/splash.styles';
import stylesTheme from '../styles/theme.styles';
import { Text } from "react-native-elements";
const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const checkStorage = async () => {
    const user = await AsyncStorage.getItem('login');
      if (user){
        setTimeout(function () {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: 'Home' }],
            }),
          );
        }, 2500);
      }
      else{
        setTimeout(function () {
          navigation.dispatch(
            CommonActions.reset({
              routes: [{ name: 'Login' }],
            }),
          );
        }, 2500);
      }
  }
  checkStorage()
  }, []);


  return (
    <View style={stylesTheme.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../asset/logo.png')} style={styles.logo} />
        <Text style={stylesTheme.text} h1>M<Text style={{ color: "red" }}>i</Text>neSweeper</Text>
      </View>
    </View>
  );
};
export default SplashScreen;