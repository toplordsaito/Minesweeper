import React, { Component } from "react";
import { Button, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { Picker } from "@react-native-community/picker";
import { useCreateRoom, useQuickJoinRoom } from '../hooks'
import Slider from "@react-native-community/slider";
const MODE = ['Ranking', 'Battle Royal'];

const CreateRoomButton = ({ navigateToLobby, mode, size, bomb }) => {
  const { createRoom, isCreatingRoom } = useCreateRoom()
  const handleCreateRoom = async () => {
    const roomId = await createRoom(mode, size, bomb)
    console.log(mode)
    console.log("roomId", roomId)
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
    console.log("roomIdQuickJoin", code)
    console.log(isFound)
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
    bomb: 10,
    size: 10
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
    console.log(currentMode)
    // console.log(this.state.currentValue);
    // console.log(this.state.currentMode);
  };

  navigateToLobby = async (roomid, isOwner) => {
    console.log(roomid)
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

        {
          <View>
            <Text
              h3
              style={{
                marginTop: 10,
                marginBottom: 5,
                fontWeight: "bold",
                color: "white",
              }}
            >
              B<Text style={{ color: "red" }}>L</Text>OCK :</Text>
            <View
              style={{
                flex: 0.2,
                flexDirection: "row",
              }}
            >
              <Slider
                value={this.state.size}
                onValueChange={(item) => {
                  let bomb = this.state.bomb
                  if ((item * item - 1) <= bomb) {
                    bomb = Math.max(item * item - 1, 1)
                  }
                  this.setState({
                    size: item,
                    bomb
                  })


                }}
                style={{ width: 100, height: 30, marginRight: 50 }}
                minimumValue={1}
                step={1}
                maximumValue={20}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#4285F4"
                thumbTintColor="white"
              />

              <Slider
                value={this.state.bomb}
                onValueChange={(item) => {
                  this.setState({
                    bomb: item
                  })
                }}
                style={{ width: 100, height: 30 }}
                minimumValue={1}
                maximumValue={Math.max(this.state.size * this.state.size - 1, 1)}
                step={1}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#4285F4"
                thumbTintColor="white"
              />
            </View>
            <View
              style={{
                flex: 0.2,
                flexDirection: "row",
                marginTop: 16,
              }}
            >
              <Text style={{ color: "white" }}>
                Block Size : {this.state.size} x {this.state.size}
              </Text>
              <Text style={{ color: "white", marginLeft: 40 }}>
                Bomb in Area: {this.state.bomb}
              </Text>
            </View></View>
        }
        <View style={{ flex: 1, width: "80%" }}>
          {/* <Button
            style={styles.button}
            title={"Create"}
            onPress={this.handleCreateRoom}
          /> */}
          <CreateRoomButton navigateToLobby={this.navigateToLobby}
            mode={this.state.currentMode}
            size={this.state.size}
            bomb={this.state.bomb}
          />
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
