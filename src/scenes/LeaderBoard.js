import React, { useEffect, useState } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
const userApi = require("../apis/userAPI");
import AsyncStorage from "@react-native-community/async-storage";
const LeaderBoard = ({ navigation }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const getLeaderBoard = async () => {
    console.log("in funtion");
    const userArray = await userApi.getLeaderboard();
    console.log(userArray);
    setLeaderBoard(userArray);
  };
  useEffect(() => {
    getLeaderBoard();
  }, []);
  const viewProfile = async(id) =>{
    const userProfile = await userApi.getUserById(id);
    navigation.navigate("Profile", { user: userProfile  });
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
        data={leaderBoard}
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
              h3
            >
              L<Text style={{ color: "red" }}>e</Text>aderBoard
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
          style={{ borderBottomWidth: 1, borderBottomColor: 'transparent' }}
          onPress={() => viewProfile(item.id)}
        >
          <View style={{ flex: 1, flexDirection: "row", marginBottom: 50 }}>
            <Image
              source={{
                uri: item.avatar,
              }}
              style={{ width: 75, height: 75, borderRadius: 75 / 2 }}
            />

            <Text style={{ fontSize: 15, color: "white", marginTop:20, marginLeft:10 }}>
              EloRank : {item.elorank} Name: {item.name}
            </Text>
          </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default LeaderBoard;
