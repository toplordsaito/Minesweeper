import React, { useState } from "react";
import { Button, Text, ButtonGroup, Divider } from "react-native-elements";
import { View, FlatList } from "react-native";
import { Picker } from "@react-native-community/picker";
import { CommonActions } from "@react-navigation/native";
import Slider from "@react-native-community/slider";
// import Icon from "react-native-vector-icons/AntDesign";
const Offline = ({ navigation }) => {
  const buttons = ["Easy", "Medium", "Hard", "Custom"];
  const [mode, setMode] = useState("Normal");
  const [selectedIndex, setIndex] = useState(1);
  const [size, setSize] = useState(10);
  const [bomb, setBomb] = useState(10);
  const [disabled, setDisabled] = useState(true);
  return (
    <View style={{ flex: 1, alignItems: "center", backgroundColor: "#212930" }}>
      <Text
        h3
        style={{
          marginTop: 25,
          marginBottom: 10,
          fontWeight: "bold",
          color: "white",
        }}
      >
        LEV<Text style={{ color: "red" }}>E</Text>L :{" "}
      </Text>
      <ButtonGroup
        onPress={(i) => {
          setIndex(i);
          if (i == 0) {
            setDisabled(true);
            setSize(3);
            setBomb(1);
          }
          if (i == 1) {
            setDisabled(true);
            setSize(10);
            setBomb(10);
          }
          if (i == 2) {
            setDisabled(true);
            setSize(20);
            setBomb(40);
          }
          if (i == 3) {
            setDisabled(false);
          }
        }}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{
          flexDirection: "column",
          height: "25%",
          width: "45%",
          borderRadius: 10,
          backgroundColor: "#fff",
        }}
      />

      <Text
        h3
        style={{
          marginTop: 10,
          marginBottom: 5,
          fontWeight: "bold",
          color: "white",
        }}
      >
        B<Text style={{ color: "red" }}>L</Text>OCK :
      </Text>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
        }}
      >
        <Slider
          value={size}
          onValueChange={(item) => {
            setSize(item);
            if ((item * item - 1) <= bomb) {
              setBomb(Math.max(item * item - 1, 1))
            }

          }}
          style={{ width: 100, height: 30, marginRight: 50 }}
          minimumValue={1}
          step={1}
          disabled={disabled}
          maximumValue={20}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#4285F4"
          thumbTintColor="white"
        />

        <Slider
          value={bomb}
          onValueChange={(item) => {
            setBomb(item);
          }}
          style={{ width: 100, height: 30 }}
          minimumValue={1}
          maximumValue={Math.max(size * size - 1, 1)}
          step={1}
          disabled={disabled}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#4285F4"
          thumbTintColor="white"
        />
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          marginTop: 16,
        }}
      >
        <Text style={{ color: "white" }}>
          Block Size : {size} x {size}
        </Text>
        <Text style={{ color: "white", marginLeft: 40 }}>
          Bomb in Area: {bomb}
        </Text>
      </View>
      <Text
        h3
        style={{
          marginTop: 10,
          marginBottom: 10,
          fontWeight: "bold",
          color: "white",
        }}
      >
        MOD<Text style={{ color: "red" }}>E</Text> :
      </Text>

      <Picker
        itemStyle={{ height: 100, color: "white" }}
        selectedValue={mode}
        style={{
          height: 50,
          width: 200,
          marginTop: "2.5%",
          alignSelf: "center",
          marginBottom: "20%"
        }}
        onValueChange={(itemValue) => setMode(itemValue)}
      >
        <Picker.Item label="Normal" value="Normal" />
        <Picker.Item label="Endless" value="Endless" />
      </Picker>
      <Button
        style={{ width: 120 }}
        title="Play Game!"
        onPress={() => {
          navigation.navigate("OfflineGame", { size: size, bomb: bomb, mode: mode });
         
        }}
      />
    </View>
  );
};
export default Offline;
