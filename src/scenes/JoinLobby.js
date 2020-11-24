import React, { Component, useState } from "react";
import { Button } from "react-native-elements";
import { TextInput, StyleSheet, View } from "react-native";
import { useJoinRoom } from '../hooks'
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MODE = ['PvP', 'Ranking', 'Battle Royal', 'Any'];

const JoinRoomButton = ({ navigation }) => {
  const { joinRoom, isJoining } = useJoinRoom()
  const [code, setCode] = useState();
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  const joinRoomHanler = async () => {
    const isFound = await joinRoom(code)
    if (isFound) {
      navigateRoom()
    }
    else{
      alert("error")
    }
  }
  const navigateRoom = () => {
    console.log("code", code)
    navigation.navigate("Lobby",
      {
        code,
        role: 'member'
      })
  }
  return (
    <View style={[styles.container, {flexDirection: "column", backgroundColor: colorData.backgroundColor}]}>
      <TextInput
        keyboardType="number-pad"
        returnKeyType='done'
        maxLength={4}
        style={[styles.textInput, {width: wp("96%"), margin: wp("2%"), fontFamily: colorData.fontFamily}]}
        onChangeText={setCode}>
      </TextInput>
      <Button
        buttonStyle={[stylesTheme.longButton, {backgroundColor: colorData.button}]}
        titleStyle={text}
        onPress={joinRoomHanler}
        title="Join"
      />
    </View>
  )
}
export default JoinRoomButton
// export default class JoinLobby extends Component {
//   state = {
//     code: '',
//   }
//   constructor(props) {
//     super(props);
//   }
//   updateCode = (text) => {
//     this.setState({
//       code: text,
//     })
//   }
//   joinRoomHanler = async (roomid) => {
//     this.props.navigation.navigate("Lobby",
//       {
//         code: this.state.code,
//         role: 'member'
//       })
//   }
//   render() {
//     return (
//       <View style={styles.container}>
//         <TextInput keyboardType='numeric' maxLength={4} style={[styles.textInput, { flex: 1 }]} onChangeText={(text) => this.updateCode(text)}></TextInput>
//         <Button
//           style={[styles.button, { flex: 1 }]}
//           title={"Join"}
//           onPress={this.joinRoomHanler}
//         />
//         <JoinRoomButton />
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: "#212930",
    flexDirection: 'row',
  },
  button: {
    margin: 2,
  },
  textInput: {
    height: 40,
    margin: 2,
    backgroundColor: 'white',
    textAlign: 'center',
    borderRadius: 5,
  }
})
