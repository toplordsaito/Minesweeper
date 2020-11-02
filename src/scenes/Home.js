import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
const userApi = require('../apis/userAPI');
import AsyncStorage from "@react-native-community/async-storage";
const Home = ({ navigation }) => {
  const button = [
    "Offline",
    "Online",
    "Ranking Board",
    "Tutorial",
    "Logout",
    "Clear",
  ];
  const ButtonEvent = async (item) =>{
    if (item == 'Online'){
      let user = await AsyncStorage.getItem('user');
      user = JSON.parse(user)
      // console.log("wtf: ", user)
      const userInDb = await userApi.CreateOrUpdate(user);
      if (userInDb != "อัพเดพสำเร็จ" && userInDb){
      AsyncStorage.setItem("user", JSON.stringify(userInDb));}
      console.log(userInDb)
    }
    if (item == "Logout") {
      AsyncStorage.removeItem("login");
      navigation.navigate("SplashScreen");
    }
    if (item == "Clear") {
      AsyncStorage.removeItem("login");

      AsyncStorage.removeItem("user");
      navigation.navigate("SplashScreen");
    } else {
      navigation.navigate(item);
    }
  }
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
              ButtonEvent(item)
            }}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Home;
