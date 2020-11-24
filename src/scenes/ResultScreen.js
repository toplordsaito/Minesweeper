import React, { useEffect } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import GameStatus from '../components/GameStatus'
import { getUserById } from '../apis/userAPI'
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ResultScreen = ({ route, navigation }) => {
  const { code } = route.params;
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  const setDevice = async () => {
    let userInDevicec = await AsyncStorage.getItem("user");
    userInDevicec = JSON.parse(userInDevicec);
    let userInDb = await getUserById(userInDevicec["id"])
    console.log(userInDb)
    if ( userInDb?.id) {
      AsyncStorage.setItem("user", JSON.stringify(userInDb));
    }
  }
  useEffect(() => {
    setDevice()
  }, [])
  navigateToLobby = async () => {
    // console.log("sdsa")
    // let userInDevicec = await AsyncStorage.getItem("user");
    // userInDevicec = JSON.parse(userInDevicec);
    // let userInDb = await getUserById(userInDevicec["id"])
    // console.log(userInDb)
    // AsyncStorage.setItem("user", JSON.stringify(userInDb));
    // if ( userInDb?.id) {
    //   AsyncStorage.setItem("user", JSON.stringify(userInDb));
    //   }
    navigation.navigate("Lobby",
      {
        code,
        role: 'member'
      }
    )
  }
  return (
    <View style={[stylesTheme.logoContainer, {height: "100%", backgroundColor: colorData.backgroundColor}]}>
      <View style={[stylesTheme.logoContainer, {marginTop: hp('10%'), height: hp('20%')}]}>
        <Text style={[stylesTheme.headerText, text]} h2>
          Game <Text style={{color: colorData.innerText}}>R</Text>esult
        </Text>
      </View>
      <GameStatus code={code} />
      <Button
        buttonStyle={[stylesTheme.longButton, {marginTop: wp("60%"), backgroundColor: colorData.button}]}
        titleStyle={text}
        onPress={navigateToLobby}
        title="Go to Lobby"
      />
    </View>
  );
};
export default ResultScreen;