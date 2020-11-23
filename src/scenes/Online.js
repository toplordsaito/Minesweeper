import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useCreateRoom, useQuickJoinRoom } from '../hooks'
const MODE = ['Ranking', 'Battle Royal'];

const CreateRoomButton = ({ navigateToLobby, mode }) => {
  const { createRoom, isCreatingRoom } = useCreateRoom()
  const handleCreateRoom = async () => {
    const roomId = await createRoom(mode)
    // console.log(mode)
    // console.log("roomId", roomId)
    navigateToLobby(roomId, true)
  }
  return <Button
    style={styles.button}
    title={"Create"}
    onPress={handleCreateRoom}
  />
}

const QuickRoomButton = ({ navigateToLobby, mode }) => {
  const { isQuickJoining, QuickjoinRoom } = useQuickJoinRoom()
  const handleQuickJoinRoom = async () => {
    const { isFound, code } = await QuickjoinRoom(mode)
    // console.log("roomIdQuickJoin", code)
    // console.log(isFound)
    if (isFound) {
      navigateToLobby(code, false)
    } else {
      alert("No room Found")
    }

  }
  return <Button
    style={styles.button}
    title={"Quick Start"}
    onPress={handleQuickJoinRoom}
  />
}

export default class Online extends Component {
  state = {
    currentValue: 0,
    currentMode: "Ranking",
  };
  constructor(props) {
    super(props);
  }
  changeMode = (currentMode) => {
    let currentValue = MODE.findIndex((mode) => mode === currentMode);
    this.setState({
      currentValue: currentValue,
      currentMode: currentMode,
    })
    // console.log(currentMode)
    // console.log(this.state.currentValue);
    // console.log(this.state.currentMode);
  };

  navigateToLobby = async (roomid, isOwner) => {
    // console.log(roomid)
    this.props.navigation.navigate("Lobby", {
      value: this.state.currentValue,
      role: isOwner ? 'owner' : "member",
      code: roomid,
    })

  }
  renderMode = () => {
    return (
      <View style={styles.container}>
        <Text h3 style={{ color: "white" }}>
          MOD<Text style={{ color: "red" }}>E</Text> :
        </Text>
        <View style={Platform.OS === "android" ? styles.pickerAndriod : null}>
          <Picker
            dropdownIconColor="red"
            style={styles.picker}
            itemStyle={{ height: 100, color: "white" }}
            selectedValue={this.state.currentMode}
            onValueChange={(mode) => this.changeMode(mode)}
          >
            <Picker.Item label="Ranking" value="Ranking" />
            <Picker.Item label="Battle Royal" value="Battle Royal" />
          </Picker>
        </View>
      </View>
    );
  };


  render() {
    return (
      <View style={[styles.container, { backgroundColor: "#212930" }]}>
        {this.renderMode()}
        <View style={{ flex: 1, width: "80%" }}>
          {/* <Button
            style={styles.button}
            title={"Create"}
            onPress={this.handleCreateRoom}
          /> */}
          <CreateRoomButton navigateToLobby={this.navigateToLobby} mode={this.state.currentMode} />
          <Button
            style={styles.button}
            title={"Join"}
            onPress={() => this.props.navigation.navigate("Join Lobby")}
          />
          <QuickRoomButton navigateToLobby={this.navigateToLobby} mode={this.state.currentMode} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
  },
  pickerAndriod: {
    marginTop: "10%",
    borderWidth: 2,
    borderColor: "#c2c2c1",
    borderRadius: 5,
    backgroundColor: "white",
  },
  picker: {
    height: 50,
    width: 200,
    alignSelf: "center",
  },
});
