import React, { useState, useEffect } from "react";
import { Avatar, Button, ListItem, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { useRoom, useLeaveRoom, useInitailGame, useCurrentUser } from '../hooks'
import stylesTheme from "../styles/theme.styles";
import { switchTheme } from "../store/actions/switchTheme";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const MODE = ['PvP', 'Ranking', 'Battle Royal', 'Any'];

const list = [
  {
    name: 'Superman',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '2027'
  },
]


const Lobby = ({ route, navigation }) => {
  const [code, setCode] = useState(!route.params.code ? 'emty' : route.params.code);
  const [value, setValue] = useState(route.params.role === 'owner' ? route.params.value : 1);
  const [role, setRole] = useState(route.params.role);
  const { isFetching, room } = useRoom(code)
  const { isLeaving, leaveRoom } = useLeaveRoom(code)
  const { isInitialing, initialGame } = useInitailGame(code)
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};

  const user = useCurrentUser()
  const isOwner = !isFetching && user.id == room.owner
  if (!isFetching && room.state == "playing") {
    navigation.navigate("OnlineGame", { mode: "Online", code, room, mine: room.mine });
  }
  display = () => {
    if (isFetching) {
      return (<Text>Loading Room...</Text>)
    }
    else {
      return room.players.map((l, i) => (
        <ListItem key={i} style={{width: wp("100%")}} bottomDivider>
          <Avatar source={{ uri: l.avatar }} />
          <ListItem.Content>
            <ListItem.Title style={{fontFamily: colorData.fontFamily}}>{l.name}</ListItem.Title>
            <ListItem.Subtitle style={{fontFamily: colorData.fontFamily}}>Elo: {l.elorank}{"\t\t\t"}Role: {l.id==room.owner ? "Owner" : "Member"}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
    }
  }
  useEffect(() => {
    return () => {
      console.log("leaving")
      leaveRoom()
    }
  }, [])

  startGame = async () => {
    console.log("initButton")
    let isComplete = await initialGame()
  }


  return (
    <View style={[stylesTheme.logoContainer, {height: "100%", backgroundColor: colorData.backgroundColor}]}>
      {/* Mode */}
      <View style={[stylesTheme.logoContainer, {height: hp('12%')}]}>
        <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily:colorData.fontFamily}]} h1>
          {room?room.mode:""}
        </Text>
      </View>
      {/* Code */}
      <View style={[stylesTheme.logoContainer, {height: hp('15%')}]}>
        <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily:colorData.fontFamily}]} h3>
          C<Text style={{color: colorData.innerText}}>o</Text>de: {code}
        </Text>
      </View>
      
      {
        display()
      }
      <View style={{ position: 'absolute', bottom: 0}}>
        <Button
          buttonStyle={[stylesTheme.longButton, {backgroundColor: colorData.button}]}
          titleStyle={text}
          title={"Start !!!"}
          onPress={startGame}
          disabled={!isOwner}
        />
      </View>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
  },
})

export default Lobby;