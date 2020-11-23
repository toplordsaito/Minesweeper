import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import { logInWithFaceBook } from "../components/loginWithFaceBook";
const userApi = require("../apis/userAPI");
import AsyncStorage from "@react-native-community/async-storage";
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Home = ({ navigation }) => {
  const button = [
    "Offline",
    "Online",
    "Profile",
    "LeaderBoard",
    "Tutorial",
    "Theme",
    "Link FaceBook",
    "Logout",
  ];
  const colorData = useSelector((state) => state.theme.colorData);
  const ButtonEvent = async (item) => {
    let user = await AsyncStorage.getItem("user");
    user = JSON.parse(user);
    if (item == "Online") {
      const userInDb = await userApi.CreateOrUpdate(user);
      if (userInDb != "อัพเดพสำเร็จ" && userInDb) {
        AsyncStorage.setItem("user", JSON.stringify(userInDb));
      }
      console.log(userInDb);
    }
    if (item == "Logout") {
      AsyncStorage.removeItem("login");
      if (user.facebookId) {
        AsyncStorage.removeItem("user");
      }
      navigation.navigate("SplashScreen");
    }
    if (item == "Link FaceBook") {
      const dataFaceBook = await logInWithFaceBook();
      const data = {
        id: user.id,
        name: dataFaceBook.name,
        avatar: dataFaceBook.picture.data.url,
        facebookId: dataFaceBook.id,
        elorank: user.elorank,
      };
      const userInDb = await userApi.linkFaceBook(data);
      if (userInDb) {
        AsyncStorage.setItem("user", JSON.stringify(userInDb));
      }
      console.log(userInDb);
    } else {
      if (item == "Profile") {
        const userProfile = JSON.parse(await AsyncStorage.getItem("user"))
        console.log("user in room :" + JSON.stringify(userProfile));
        navigation.navigate(item, { user: userProfile  });
      } else {
        if(item != "Logout"){
        navigation.navigate(item);}
      }
    }
  };
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={button}
        numColumns={2}
        ListHeaderComponent={
          <View style={[stylesTheme.container, {height: hp('50%')}]}>
            <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily: colorData.fontFamily}]} h1>
              M<Text style={{color: colorData.innerText}}>i</Text>neSweeper
            </Text>
            <Image style={stylesTheme.image} source={colorData.image}/>
          </View>
        }
        renderItem={({ item }) => (
          <Button
            buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
            titleStyle={{color: colorData.text, fontFamily: colorData.fontFamily}}
            title={item}
            onPress={() => {
              ButtonEvent(item);
            }}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Home;
