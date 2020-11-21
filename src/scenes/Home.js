import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import { logInWithFaceBook } from "../components/loginWithFaceBook";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
const userApi = require("../apis/userAPI");
import AsyncStorage from "@react-native-community/async-storage";
import stylesTheme from "../styles/theme.styles";
const Home = ({ navigation }) => {
  const button = [
    "Profile",
    "LeaderBoard",
    "Offline",
    "Online",
    "Ranking Board",
    "Tutorial",
    "Logout",
    "Link FaceBook",
  ];
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
        navigation.navigate(item);
      }
    }
  };
  return (
    <View style={stylesTheme.container}>
      <FlatList
        data={button}
        ListHeaderComponent={
          <View style={[stylesTheme.innerContainer, {flex: 1, flexDirection: 'row'}]}>
            <Image style={{width: wp('10%'), height: wp('10%'), marginRight: wp('2%')}} source={require("../asset/logo.png")}/>
            <Text style={[stylesTheme.headerText]} h4>
              M<Text style={stylesTheme.innerText}>i</Text>neSweeper
            </Text>
            
          </View>
        }
        renderItem={({ item }) => (
          <Button
            buttonStyle={stylesTheme.button}
            titleStyle={stylesTheme.buttonTitle}
            title={item}
            onPress={() => {ButtonEvent(item)}}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Home;
