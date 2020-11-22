import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainGame from '../../components/MainGame'
import { useRoom } from '../hooks'
const OnlineGame = ({ route, navigation }) => {
  const { mode, code, room, mine } = route.params;
  console.log("code", code)
  // const { isFetching, room } = useRoom(code)
  const button = ["Offline", "Online", "Ranking Board", "Tutorial"];

  navigateToResult = () => {
    console.log("navigateToResult")
    navigation.navigate("Result",
      {
        code,
      })
  }

  onVictory = (text) => Alert.alert(
    text,
    "you are win",
    [
      {
        text: "go to result", onPress: navigateToResult
      }
    ],
    { cancelable: false }
  );

  onEndgame = (isVictory) => {
    onVictory("you are 1st")
  }

  Game = () => {
    console.log("*************")
    console.log(room.size)
    console.log(room.mineSize)
    console.log(mine)
    return (
      // <Text>5555</Text>
      <MainGame size={room.size} mine={room.mineSize} mode="Online" mineSet={mine} onEndgame={onEndgame} />
    )
  }

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {
        /* <Text>{size}</Text>
        <Text>{bomb}</Text>
        <Text>{mode}</Text> */
        Game()
      }


    </View>
  );
};
export default OnlineGame;