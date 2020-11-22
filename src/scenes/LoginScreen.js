import React, { useState } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image, Alert } from "react-native";
import { CommonActions } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import  {logInWithFaceBook}  from '../components/loginWithFaceBook'
import AsyncStorage from "@react-native-community/async-storage";
import stylesTheme from "../styles/theme.styles";
import { useSelector, useDispatch } from "react-redux";

const userApi = require('../apis/userAPI');

const Login = ({ navigation }) => {
  const button = ["Play now!!!", "Login with Facebook"];
  const colorData = {
    backgroundColor: useSelector((state) => state.theme.colorData.backgroundColor),
    text: useSelector((state) => state.theme.colorData.text),
    innerText: useSelector((state) => state.theme.colorData.innerText),
    button: useSelector((state) => state.theme.colorData.button),
  };
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={button}
        ListHeaderComponent={
          <View style={stylesTheme.container}>
            <Text style={[stylesTheme.headerText, {color: colorData.text}]} h1>
              M<Text style={{color: colorData.innerText}}>i</Text>neSweeper
            </Text>
            <Image style={stylesTheme.image} source={require("../asset/logo.png")}/>
          </View>
        }
        renderItem={({ item }) => (
          <Button
          buttonStyle={[stylesTheme.button, {backgroundColor: colorData.button}]}
          titleStyle={{color: colorData.text}}
            title={item}
            onPress={async () => {
              AsyncStorage.setItem("login", "true");
              let user = await AsyncStorage.getItem("user");
              user = JSON.parse(user);
              let data;
              var result = "";
              var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
              var charactersLength = characters.length;
              for (var i = 0; i < 5; i++) {
                result += characters.charAt(
                  Math.floor(Math.random() * charactersLength)
                );
              }

              if (item == "Play now!!!") {
                if (!user) {
                  console.log("new Player");
                  data = {
                    id: null,
                    name: "Guest#"+result,
                    avatar:
                      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
                    facebookId: null,
                    win: 0,
                    lose: 0,
                    elorank: 0,
                  };
                }
                AsyncStorage.setItem("user", JSON.stringify(data));
              } else {
                console.log("logIn with FaceBook");
                const dataFaceBook = await logInWithFaceBook();
                data = {
                  name: dataFaceBook.name,
                  avatar: dataFaceBook.picture.data.url,
                  facebookId: dataFaceBook.id,
                };
                const userInDb = await userApi.findOrCreateFaceBook(data);
                if (userInDb) {
                  AsyncStorage.setItem("user", JSON.stringify(userInDb));
                }
                console.log(userInDb);
              }
              const user1 = await AsyncStorage.getItem("user");
              console.log(user1);
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

// if (!user) {
//   console.log("new Player");
//   if (item == "Play now!!!") {
//     data = {
//       id: null,
//       name: "Guest",
//       avatar:
//         "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
//       facebookId: null,
//       elorank: 0,
//     };
//   } else {
//     const dataFaceBook = await logInWithFaceBook();
//     data = {
//       id: null,
//       name: dataFaceBook.name,
//       avatar: dataFaceBook.picture.data.url,
//       facebookId: dataFaceBook.id,
//       elorank: 0,
//     };
//   }
// } else {
//   console.log("Old Player" + user);
//   if (item != "Play now!!!") {
//     const dataFaceBook = await logInWithFaceBook();
//     console.log(dataFaceBook);
//     data = {
//       id: null,
//       name: dataFaceBook.name,
//       avatar: dataFaceBook.picture.data.url,
//       facebookId: dataFaceBook.id,
//       elorank: user.elorank,
//     };
//   }
// }
