import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import GameStatus from '../components/GameStatus'
const ResultScreen = ({ route, navigation }) => {
    const { code } = route.params;
    navigateToLobby = () => {
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