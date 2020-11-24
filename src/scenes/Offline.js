import React, { useState } from "react";
import { Button, Text, ButtonGroup, Divider } from "react-native-elements";
import { View, FlatList } from "react-native";
import { Picker } from "@react-native-community/picker";
import { CommonActions } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import stylesTheme from "../styles/theme.styles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const Offline = ({navigation}) => {
  const buttons = ["Easy", "Medium", "Hard", "Custom"];
  const [mode, setMode] = useState("Normal");
  const [selectedIndex, setIndex] = useState(1);
  const [size, setSize] = useState(10);
  const [bomb, setBomb] = useState(10);
  const [disabled, setDisabled] = useState(true);
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      {/* Level */}
      <View style={stylesTheme.headerContainer}>
        <Text style={[stylesTheme.headerText, text]} h3>
          LEV<Text style={{color: colorData.innerText}}>E</Text>L
        </Text>
      </View>
      <View style={[stylesTheme.innerContainer, {height: hp("24%")}]}>
        <ButtonGroup
          onPress={(i) => {
            setIndex(i);
            if (i == 0) {
              setDisabled(true);
              setSize(3);
              setBomb(1);
            }
            if (i == 1) {
              setDisabled(true);
              setSize(10);
              setBomb(10);
            }
            if (i == 2) {
              setDisabled(true);
              setSize(20);
              setBomb(40);
            }
            if (i == 3) {
              setDisabled(false);
            }
          }}
          selectedIndex={selectedIndex}
          selectedButtonStyle={{backgroundColor: colorData.button}}
          selectedTextStyle={{color: colorData.text}}
          buttons={buttons}
          containerStyle={{
            flexDirection: "column",
            height: hp("22%"),
            width: wp("60%"),
            borderRadius: 10,
          }}
          textStyle={{color: colorData.buttonGroupText, fontFamily: colorData.fontFamily}}
        />
      </View>
      {/* Block */}
      <View style={stylesTheme.headerContainer}>
        <Text style={[stylesTheme.headerText, text]} h3>
          B<Text style={{color: colorData.innerText}}>L</Text>OCK
        </Text>
      </View>
      <View style={{height: hp("6%"), flexDirection: "row"}}>
        <Slider
          value={size}
          onValueChange={(item) => {
            setSize(item);
            if (item * item - 1 <= bomb) {
              setBomb(Math.max(item * item - 1, 1));
            }
          }}
          style={stylesTheme.sliderStyle}
          minimumValue={1}
          step={1}
          disabled={disabled}
          maximumValue={20}
          minimumTrackTintColor={colorData.minimumTrackTint}
          maximumTrackTintColor="#ffffff"
          thumbTintColor="white"
        />
        <Slider
          value={bomb}
          onValueChange={(item) => {
            setBomb(item);
          }}
          style={stylesTheme.sliderStyle}
          minimumValue={1}
          maximumValue={Math.max(size * size - 1, 1)}
          step={1}
          disabled={disabled}
          minimumTrackTintColor={colorData.minimumTrackTint}
          maximumTrackTintColor="#ffffff"
          thumbTintColor="white"
        />
      </View>
      <View style={{height: hp("4%"), flexDirection: "row"}}>
        <View style={[stylesTheme.innerContainer, stylesTheme.sliderStyle]}>
          <Text style={text}>
            Block Size : {size} x {size}
          </Text>
        </View>
        <View style={[stylesTheme.innerContainer, stylesTheme.sliderStyle]}>
          <Text style={text}>
            Bomb in Area: {bomb}
          </Text>
        </View>
      </View>
      {/* Mode */}
      <View style={stylesTheme.headerContainer}>
        <Text style={[stylesTheme.headerText, text]} h3>
          MOD<Text style={{color: colorData.innerText}}>E</Text>
        </Text>
      </View>
      <View style={stylesTheme.innerContainer}>
        <Picker
          itemStyle={[stylesTheme.pickerItemStyle, text]}
          selectedValue={mode}
          style={stylesTheme.pickerStyle}
          onValueChange={(itemValue) => setMode(itemValue)}
        >
          <Picker.Item label="Normal" value="Normal"/>
          <Picker.Item label="Blind" value="blind"/>
        </Picker>
      </View>
      {/* Button */}
      <Button
        buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
        titleStyle={text}
        title="Play Game!"
        onPress={() => {
          navigation.navigate("OfflineGame", {
            size: size,
            bomb: bomb,
            mode: mode,
          });
        }}
      />
    </View>
  );
};
export default Offline;

