import React, { useState, useEffect } from "react";
import { Avatar, Button, ListItem, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";
import { useRoom, useLeaveRoom, useInitailGame } from '../hooks'

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


  if (!isFetching && room.state == "playing") {
    navigation.navigate("OnlineGame", { mode: "Online", code, room, mine: room.mine });
  }
  display = () => {
    if (isFetching) {
      return (<Text>Loading Room...</Text>)
    }
    else {
      return room.players.map((l, i) => (
        <ListItem key={i} bottomDivider>
          <Avatar source={{ uri: list[0].avatar_url }} />
          <ListItem.Content>
            <ListItem.Title>{l.id}</ListItem.Title>
            <ListItem.Subtitle>{list[0].subtitle}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      ))
    }
  }
  useEffect(() => {
    return async () => {
      console.log("leaving")
      await leaveRoom()
    }
  }, [])

  startGame = async () => {
    console.log("initButton")
    let mine = await initialGame()
    // console.log(mine)
    // console.log("WTFFFFFFFFFFFFFFFFFF")
    // navigation.navigate("OnlineGame", { mode: "Online", code, room, mine });
  }


  return (
    <View style={{ flex: 1, backgroundColor: "#212930" }}>
      {/* Looby Code */}
      <View style={styles.container}>
        <Text h3 style={{ color: "white" }}>COD<Text style={{ color: "red" }}>E</Text> : {code}</Text>
        <Text h4 style={{ color: "white" }}>M<Text style={{ color: "red" }}>O</Text>DE : {MODE[value]}</Text>
      </View>
      {
        display()
      }
      <View style={{ position: 'absolute', bottom: 10, marginHorizontal: '10%', width: '80%' }}>
        <Button
          style={styles.button}
          title={"Start!!"}
          onPress={startGame}
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