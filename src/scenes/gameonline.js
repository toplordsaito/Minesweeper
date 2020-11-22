import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Alert } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainGame from '../../components/MainGame'
import GameStatus from '../components/GameStatus'
import { useEndgame } from '../hooks'
const OnlineGame = ({ route, navigation }) => {
  const { mode, code, room, mine } = route.params;

  console.log("code", code)
  const { isFetching, endGame } = useEndgame(code)
  const button = ["Offline", "Online", "Ranking Board", "Tutorial"];

  navigateToResult = () => {
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

  onEndgame = async (isVictory) => {
    await endGame(code)
    if (isVictory) {
      onVictory("you are 1st")
    } else {
      onVictory("you are 2st")
    }

  }


  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <MainGame size={room.size} mine={room.mineSize} mode="Online" mineSet={mine} onEndgame={onEndgame} />
      <GameStatus code={code} onEndGame={onEndgame} />
    </View>
  );
};
export default OnlineGame;