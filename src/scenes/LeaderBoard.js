import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
const userApi = require("../apis/userAPI");
import stylesTheme from "../styles/theme.styles";
import AsyncStorage from "@react-native-community/async-storage";
import { Avatar, Button, ListItem, Text } from "react-native-elements";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const LeaderBoard = ({ navigation }) => {
  const [leaderBoard, setLeaderBoard] = useState([]);
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
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
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={leaderBoard}
        ListHeaderComponent={
          <View style={[stylesTheme.container, {height: hp('15%')}]}>
            <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily:colorData.fontFamily}]} h1>
              Le<Text style={{color: colorData.innerText}}>a</Text>aderboard
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderBottomColor: 'transparent' }}
            onPress={() => viewProfile(item.id)}
          >
            <ListItem key={item} style={{width: wp("100%")}} bottomDivider>
            <Avatar avatarStyle={{borderRadius: 100}} source={{uri: item.avatar}} />
            <ListItem.Content>
              <ListItem.Title style={{fontFamily: colorData.fontFamily}}>{item.name}</ListItem.Title>
              <ListItem.Subtitle style={{fontFamily: colorData.fontFamily}}>Elo: {item.elorank}</ListItem.Subtitle>
            </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default LeaderBoard;
