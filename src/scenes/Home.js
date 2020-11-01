import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
            }}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Home;
