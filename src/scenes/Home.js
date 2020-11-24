import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import { logInWithFaceBook } from "../components/loginWithFaceBook";
import { getUserById } from '../apis/userAPI'
const userApi = require("../apis/userAPI");
import AsyncStorage from "@react-native-community/async-storage";
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { CommonActions } from "@react-navigation/native";

const Home = ({ navigation }) => {
  const button = [
    "Offline",
    "Online",
    "Profile",
    "Leaderboard",
    "Tutorial",
    "Setting",
    "Link Facebook",
    "Logout",
  ];
  const colorData = useSelector((state) => state.theme.colorData);
  const ButtonEvent = async (item) => {
    let user = await AsyncStorage.getItem("user");
    
    user = JSON.parse(user);
    if (item == "Online") {
      if (!(user?.id)){
      const userInDb = await userApi.CreateOrUpdate(user)
      if (userInDb != "อัพเดพสำเร็จ" && userInDb) {
        AsyncStorage.setItem("user", JSON.stringify(userInDb));
      }
      console.log(userInDb);
    }
    else{
      console.log('not update')
    }

    }
    if (item == "Logout") {
      AsyncStorage.removeItem("login");
      AsyncStorage.removeItem("user");
      if (user?.facebookId) {
        AsyncStorage.removeItem("user");
      }
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ name: "SplashScreen" }],
        })
      );
    }
    if (item == "Link Facebook") {
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
        // console.log(userProfile)
        // let userInDb = await getUserById(userProfile.id)
        // console.log(userInDb)
        // if (userInDb?.id){
        // AsyncStorage.setItem("user", JSON.stringify(userInDb));}
        // console.log("user in room :" + JSON.stringify(userInDb));
        console.log("user in room :" + JSON.stringify(userProfile));
        navigation.navigate(item, { user: userProfile  });
        // navigation.navigate(item, { user: userInDb  });
      } else {
        if(item != "Logout") {
          navigation.navigate(item);
        }
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
