import React, { useCallback, useEffect } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import stylesTheme from "../styles/theme.styles";
import { switchTheme } from "../store/actions/switchTheme";

const Theme = ({ navigation }) => {
  const buttons = [
    "Default",
    "Light",
    "Candy",
  ];
  const colorData = useSelector((state) => state.theme.colorData);
  const dispatch = useDispatch()
  const switchThemeHandler = useCallback((theme) => {
    dispatch(switchTheme(theme));
  }, [dispatch, colorData]);
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={buttons}
        ListHeaderComponent={
          <View style={stylesTheme.container}>
            <Text style={[stylesTheme.headerText, {color: colorData.text}]} h1>
              T<Text style={{color: colorData.innerText}}>h</Text>eme
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <Button
            buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
            titleStyle={{color: colorData.text}}
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