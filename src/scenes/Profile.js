import React from "react";
import { Text } from "react-native-elements";
import { View, Image } from "react-native";
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Profile = ({ navigation, route }) => {
  const { user } = route.params;
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  return (
    <View style={[stylesTheme.container, {backgroundColor: colorData.backgroundColor}]}>
      <View style={[stylesTheme.headerContainer, {height: hp("15%")}]}>
        <Text style={[stylesTheme.headerText, text]} h1>
          P<Text style={{color: colorData.innerText}}>R</Text>OFILE
        </Text>
      </View>
      <View style={[stylesTheme.headerContainer, {height: hp("45%")}]} >
        <Image
          style={{ width: hp("40%"), height: hp("40%"), borderRadius: "200%"}}
          source={{uri: user.avatar}}
        />
      </View>
      <View style={[stylesTheme.headerContainer, {height: hp("10%"), flexDirection: "row"}]}>
        <Text style={[text, {textAlign: "center"}]} h3>{user.name}</Text>
      </View>
      <View style={[stylesTheme.headerContainer, {height: hp("20%"), flexDirection: "row"}]}>
        <Text style={[text, {textAlign: "center", flex: 1}]} h4>Rank:{"\n"}{user.elorank}</Text>
        <Text style={[text, {textAlign: "center", flex: 1}]} h4>Win:{"\n"}{user.win}</Text>
        <Text style={[text, {textAlign: "center", flex: 1}]} h4>Lose:{"\n"}{user.lose}</Text>
      </View>
    </View>
  );
};
export default Profile;