import React, { useEffect } from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-community/async-storage";
import GameStatus from '../components/GameStatus'
import { getUserById } from '../apis/userAPI'
const ResultScreen = ({ route, navigation }) => {
    const { code } = route.params;
    const setDevice = async () => {
        console.log("sdsa")
        let userInDevicec = await AsyncStorage.getItem("user");
        userInDevicec = JSON.parse(userInDevicec);
        let userInDb = await getUserById(userInDevicec["id"])
        console.log(userInDb)
        if ( userInDb?.id) {
            AsyncStorage.setItem("user", JSON.stringify(userInDb));
          }
    }
    useEffect(() => {
        setDevice()
    }, [])
    navigateToLobby = async () => {
        // console.log("sdsa")
        // let userInDevicec = await AsyncStorage.getItem("user");
        // userInDevicec = JSON.parse(userInDevicec);
        // let userInDb = await getUserById(userInDevicec["id"])
        // console.log(userInDb)
        // AsyncStorage.setItem("user", JSON.stringify(userInDb));
        // if ( userInDb?.id) {
        //     AsyncStorage.setItem("user", JSON.stringify(userInDb));
        //   }
        navigation.navigate("Lobby",
            {
                code,
                role: 'member'
            })
    }
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text style={{
                marginTop: "25%",
                marginBottom: "15%",
                fontWeight: "bold",
                
              }} h1>Result <Text style={{color:"red"}}>G</Text>ame</Text>
            <GameStatus code={code} />
            <Button
                onPress={navigateToLobby}
                title="Go to Lobby"
                color="#841584"
            />
        </View>
    );
};
export default ResultScreen;