import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useCreateRoom, useQuickJoinRoom } from '../hooks'
import Slider from "@react-native-community/slider";
import { useSelector } from "react-redux";
import stylesTheme from "../styles/theme.styles";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

const CreateRoomButton = ({ buttonStyle, titleStyle, navigateToLobby, mode, size, bomb }) => {
  const { createRoom, isCreatingRoom } = useCreateRoom()
  const handleCreateRoom = async () => {
    const roomId = await createRoom(mode, size, bomb)
    console.log(mode)
    console.log("roomId", roomId)
    navigateToLobby(roomId, true)
  }
  return <Button
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
    title={"Create"}
    onPress={handleCreateRoom}
  />
}

const QuickRoomButton = ({ buttonStyle, titleStyle, navigateToLobby, mode }) => {
  const { isQuickJoining, QuickjoinRoom } = useQuickJoinRoom()
  const handleQuickJoinRoom = async () => {
    const { isFound, code } = await QuickjoinRoom(mode)
    console.log("roomIdQuickJoin", code)
    console.log(isFound)
    if (isFound) {
      navigateToLobby(code, false)
    } else {
      alert("No room Found")
    }
  }
  return <Button
    buttonStyle={buttonStyle}
    titleStyle={titleStyle}
    title={"Quick Start"}
    onPress={handleQuickJoinRoom}
  />
}

const Online = ({navigation}) => {
  const modes = ['Ranking', 'Battle Royal'];
  const [mode, setMode] = useState("Ranking");
  const [size, setSize] = useState(10);
  const [bomb, setBomb] = useState(10);
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  const navigateToLobby = async (roomId, isOwner) => {
    console.log(roomId)
    navigation.navigate("Lobby", {
      value: modes.indexOf(mode),
      role: isOwner?"owner":"member",
      code: roomId,
    })
  }
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
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
          <Picker.Item label="Ranking" value="Ranking"/>
          <Picker.Item label="Battle Royal" value="Battle Royal"/>
        </Picker>
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
            if ((item * item - 1) <= bomb) {
              setBomb(Math.max(item * item - 1, 1))
            }
          }}
          style={stylesTheme.sliderStyle}
          minimumValue={1}
          step={1}
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
      {/* Button */}
      <View style={[stylesTheme.innerContainer, {height: hp("40%")}]}>
        <CreateRoomButton
          buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
          titleStyle={text}
          navigateToLobby={navigateToLobby}
          mode={mode}
          size={size}
          bomb={bomb}
        />
        <Button
          buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
          titleStyle={text}
          title={"Join"}
          onPress={() => {navigation.navigate("Join Lobby")}}
        />
        <QuickRoomButton
          buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
          titleStyle={text}
          navigateToLobby={navigateToLobby}
          mode={mode}
        />
      </View>
    </View>
  )
}

export default Online;