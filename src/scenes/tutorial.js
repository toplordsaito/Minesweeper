import React from "react";
import { Text } from "react-native-elements";
import { View, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";
import stylesTheme from "../styles/theme.styles";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

const Tutorial = ({ navigation }) => {
  const colorData = useSelector((state) => state.theme.colorData);
  const layer = [
    {
      id: 1,
      head: (
        <View style={[stylesTheme.container, {height: hp('10%')}]}>
          <Text style={[stylesTheme.headerText, {margin: 0, color: colorData.text, fontFamily:colorData.fontFamily}]} h3>
            Go<Text style={{color: colorData.innerText}}>a</Text>l
          </Text>
        </View>
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
      id: 2,
      head: (
        <View style={[stylesTheme.container, {height: hp('10%')}]}>
          <Text style={[stylesTheme.headerText, {margin: 0, color: colorData.text, fontFamily:colorData.fontFamily}]} h3>
            How To <Text style={{color: colorData.innerText}}>P</Text>lay
          </Text>
        </View>
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
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <FlatList
        data={layer}
        ListHeaderComponent={
          <View style={[stylesTheme.container, {height: hp('15%')}]}>
            <Text style={[stylesTheme.headerText, {color: colorData.text, fontFamily:colorData.fontFamily}]} h1>
              Tu<Text style={{color: colorData.innerText}}>t</Text>orial
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View style={stylesTheme.container}>
            {item.head}
            {item.img}
            <Text
              style={{
                marginHorizontal: "5%",
                marginTop: "2%",
                marginBottom: "15%",
                color: colorData.text,
                fontSize: 18,
              }}
            >
              {item.text}
            </Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};
export default Tutorial;
