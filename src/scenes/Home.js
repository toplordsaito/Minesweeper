import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
const Home = ({ navigation }) => {
  const button = ["Offline", "Online", "Ranking Board", "Tutorial"];
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#212930" }}>
      <FlatList
        data={button}
        ListHeaderComponent={<Text style={{ marginVertical: 75, fontWeight: "bold", color: "white" }} h1>MineSweeper</Text>}
        renderItem={({ item }) => (
          <Button style={{ margin: "1%" }} title={item} onPress={() => { navigation.navigate(item) }} />
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
export default Home;
