import React, { useCallback } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import stylesTheme from "../styles/theme.styles";
import { switchTheme } from "../store/actions/switchTheme";
import AsyncStorage from "@react-native-community/async-storage";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Theme = ({ navigation }) => {
  const buttons = [
    "Default",
    "Metal",
    "Candy",
  ];
  const colorData = useSelector((state) => state.theme.colorData);
  const dispatch = useDispatch()
  const switchThemeHandler = useCallback(async (theme) => {
    dispatch(switchTheme(theme));
    AsyncStorage.setItem("theme", theme);
    let asyncTheme = await AsyncStorage.getItem("theme");
  }, [dispatch, colorData]);
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={buttons}
        ListHeaderComponent={
          <View style={[stylesTheme.container, {height: hp('15%')}]}>
            <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily:colorData.fontFamily}]} h1>
              T<Text style={{color: colorData.innerText}}>h</Text>eme
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Button
            buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button, }]}
            titleStyle={{color: colorData.text, fontFamily:colorData.fontFamily}}
            title={item}
            onPress={() => {switchThemeHandler(item)}}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Theme;