import React, { useEffect, useRef } from "react";
import { View, Image, Animated } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { CommonActions } from "@react-navigation/native";
import styles from "../styles/splash.styles";
import stylesTheme from "../styles/theme.styles";
import { Text } from "react-native-elements";
const SplashScreen = ({ navigation }) => {
  const springVal = useRef(new Animated.Value(0.5)).current;
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
    };
    checkStorage();
  }, []);

  return (
    <View style={stylesTheme.container}>
      <View style={styles.logoContainer}>
        <Animated.Image source={require("../asset/logo.png")} style={[styles.logo, { transform: [{scale: springVal}]}]} />
        <Text style={stylesTheme.text} h1>
          M<Text style={{ color: "red" }}>i</Text>neSweeper
        </Text>
      </View>
    </View>
  );
};
export default SplashScreen;
