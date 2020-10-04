import React from "react";
import { Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
const Tutorial = ({ navigation }) => {
  const layer = [
    {
      head: (
        <Text
          style={{
            marginTop: "10%",
            marginBottom: "10%",
            fontWeight: "bold",
            color: "white",
          }}
          h2
        >
          Go<Text style={{ color: "red" }}>a</Text>l
        </Text>
      ),
      img: (
        <Image
        style={{ 
            width: '100%',
            aspectRatio: 1,
            height: undefined,
            resizeMode: 'contain', marginBottom: "2%" }}
          source={require("../asset/goal.png")}
        />
      ),
      text:
        "1. ถ้าคุณจะชนะเกมนี้คุณต้องค้นหาระเบิดภายในเกมให้ได้ทั้ง\n2. จากนั้นก็ทำการล็อคระเบิดไม่ให้มันทำงานได้แล้วคุณก็ชนะเกมนี้",
    },
    {
      head: (
        <Text
          style={{
            marginBottom: "10%",
            fontWeight: "bold",
            color: "white",
          }}
          h2
        >
          How To <Text style={{ color: "red" }}>P</Text>lay
        </Text>
      ),
      img: (
        <Image
          style={{ 
            width: '100%',
            aspectRatio: 1,
            height: undefined,
            resizeMode: 'contain', marginBottom: "2%" }}
          source={require("../asset/howToPlay.png")}
        />
      ),
      text:
        "1. การค้นหาระเบิดนั้นง่ายมากแค่คุณกดช่องที่ปิดอยู่เพื่อค้นหาระเบิด\n2. ตัวเลขที่ระบุบบนช่องคือจำนวนระเบิดในระยะรอบๆ ของระเบิดที่ติดกับช่องนั้น",
    },
  ];
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
        data={layer}
        ListHeaderComponent={
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text
              style={{
                marginTop: "10%",
                fontWeight: "bold",
                color: "white",
              }}
              h1
            >
              Tu<Text style={{ color: "red" }}>t</Text>orial
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            {item.head}
            {item.img}
            <Text
              style={{
                marginHorizontal: "5%",
                marginTop: "2%",
                marginBottom: "15%",
                color: "white",
                fontSize: 18,
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
export default Tutorial;
