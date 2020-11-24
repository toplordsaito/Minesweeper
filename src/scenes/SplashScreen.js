import React, { useEffect, useRef, useCallback } from "react";
import { View, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from "@react-navigation/native";
import styles from "../styles/splash.styles";
import stylesTheme from "../styles/theme.styles";
import { Text } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { switchTheme } from "../store/actions/switchTheme";
import { playMinesweeper } from "../../assets/sound/audio";

const SplashScreen = ({ navigation }) => {
  const springVal = useRef(new Animated.Value(0.5)).current;
  const colorData = useSelector((state) => state.theme.colorData);
  const dispatch = useDispatch()
  const switchThemeHandler = useCallback((theme) => {
    dispatch(switchTheme(theme));
  }, [dispatch, colorData]);
  const loadTheme = async () => {
    let theme = await AsyncStorage.getItem("theme");
    if (theme) {
      switchThemeHandler(theme);
    }
  }
  loadTheme();
  const spring = () => {
    Animated.spring(springVal, {
      toValue: 1,
      friction: 1,
    }).start(() => {
      springVal.setValue(1);
    });
  };
  useEffect(() => {
    spring()
    const checkStorage = async () => {
      playMinesweeper();
      const user = await AsyncStorage.getItem("login");
        if (user) {
          setTimeout(function () {
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Home" }],
              })
            );
          }, 3000);
        } else {
          setTimeout(function () {
            navigation.dispatch(
              CommonActions.reset({
                routes: [{ name: "Login" }],
              })
            );
          }, 3000);
        }
    }
    checkStorage()
  }, []);
  
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <View style={styles.logoContainer}>
        <Animated.Image source={colorData.image} style={[styles.logo, { transform: [{scale: springVal}]}]} />
        <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily: colorData.fontFamily}]} h1>M<Text style={{color: colorData.innerText}}>i</Text>neSweeper</Text>
      </View>
    </View>
  );
};
export default SplashScreen;
