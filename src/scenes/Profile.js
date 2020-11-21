import React from "react";
import { Text } from "react-native-elements";
import { View, Image } from "react-native";

const Profile = ({ navigation, route }) => {
    const { user } = route.params;
 
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#212930",
      }}
    >
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: "white", 
                marginBottom: "15%"
              }}
              h1
            >
              P<Text style={{ color: "red" }}>r</Text>ofile
            </Text>
            <Image
              style={{ width: 200, height: 200, marginBottom: "15%", borderRadius: 100 }}
              source={{
                uri: user.avatar,
              }}
            />
            <Text style={{color: "white"}} h4>Name: {user.name}</Text>
            <Text style={{color: "white"}} h4>Rank : {user.elorank}</Text>
            <Text style={{color: "white"}} h4>Win : {user.win}</Text>
            <Text style={{color: "white"}} h4>Lose : {user.lose}</Text>
          </View>
           
    </View>
  );
};
export default Profile;