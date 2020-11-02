import React, {useState} from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import * as Facebook from "expo-facebook";
import AsyncStorage from "@react-native-community/async-storage";
const Login = ({ navigation }) => {
  const button = ["Play now!!!", "Login with Facebook"];
  const logInWithFaceBook = async () => {
    Facebook.initializeAsync("1003067720174444");
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions,
      } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile"],
      });

      if (type === "success") {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}&fields=id,name,email,picture.height(500)`
        )
          .then((response) => {return response.json()})
        return response
      } else {
        alert(`Facebook Login Error: Cancelled`);
        return null
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
      return null
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
            onPress={async () => {
              AsyncStorage.setItem("login", "true");
              let user = await AsyncStorage.getItem("user");
              user = JSON.parse(user)
              let data;
              if (!user) {
                console.log("new Player");
                if (item == "Play now!!!") {
                  data = {
                    id: null,
                    name: "Guest",
                    avatar:
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                      facebookId: null,
                    elorank: 0,
                  };
                } else {
                  const dataFaceBook =  await logInWithFaceBook();
                  data = {
                    id: null,
                    name: dataFaceBook.name,
                    avatar: dataFaceBook.picture.data.url,
                    facebookId: dataFaceBook.id,
                    elorank: 0,
                  };
                }
              } else {
                console.log("Old Player"+ user);
                if (item != "Play now!!!") {
                  const dataFaceBook =  await logInWithFaceBook();
                  console.log(dataFaceBook)
                  data = {
                    id: user.id,
                    name: dataFaceBook.name,
                    avatar: dataFaceBook.picture.data.url,
                    facebookId: dataFaceBook.id,
                    elorank: user.elorank,
                  };
                }
              }
              AsyncStorage.setItem("user", JSON.stringify(data));
              const user1 = await AsyncStorage.getItem("user");
              console.log(user1)
              navigation.dispatch(
                CommonActions.reset({
                  routes: [{ name: "Home" }],
                })
              );
            }}
          />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Login;
