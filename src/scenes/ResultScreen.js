import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
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
            {
                /* <Text>{size}</Text>
          <Text>{bomb}</Text>
          <Text>{mode}</Text> */
            }
            <Text>Result Page</Text>
            <Button
                onPress={navigateToLobby}
                title="Go to Lobby"
                color="#841584"
            />
        </View>
    );
};
export default ResultScreen;