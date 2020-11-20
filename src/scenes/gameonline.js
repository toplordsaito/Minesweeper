import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainGame from '../../components/MainGame'
import { useRoom } from '../hooks'
const OnlineGame = ({ route, navigation }) => {
  const { mode, code, room, mine } = route.params;
  console.log("code", code)
  // const { isFetching, room } = useRoom(code)
  const button = ["Offline", "Online", "Ranking Board", "Tutorial"];
  console.log("rroom" + room)
  Game = () => {
    console.log("*************")
    console.log(room.size)
    console.log(room.mineSize)
    console.log(mine)
    return (<MainGame size={room.size} mine={room.bomb} mineSet={room.mine} />)
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>{size}</Text>
      <Text>{bomb}</Text>
      <Text>{mode}</Text> */
        Game()}


    </View>
  );
};
export default OnlineGame;