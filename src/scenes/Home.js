import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import { logInWithFaceBook } from "../components/loginWithFaceBook";
const userApi = require("../apis/userAPI");
import AsyncStorage from "@react-native-community/async-storage";
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
        if(item != "Logout"){
        navigation.navigate(item);}
      }
    }
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#212930",
      }}
    >
      <FlatList
        data={button}
        ListHeaderComponent={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                marginTop: "25%",
                marginBottom: "15%",
                fontWeight: "bold",
                color: "white",
              }}
              h1
            >
              M<Text style={{ color: "red" }}>i</Text>neSweeper
            </Text>
            <Image
              style={{ width: 300, height: 300, marginBottom: "15%" }}
              source={require("../asset/logo.png")}
            />
          </View>
        }
        renderItem={({ item }) => (
          <Button
            style={{ margin: "1%" }}
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
