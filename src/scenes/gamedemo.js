import React from "react";
import { Button, Text } from "react-native-elements";
import { View, FlatList } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MainGame from '../../components/MainGame'
import { useSelector } from "react-redux";
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
const test = ({route, navigation}) => {
const { size, bomb, mode } = route.params;
  const button = ["Offline", "Online", "Ranking Board", "Tutorial"];
  return (
    <ReactNativeZoomableView
   maxZoom={1.5}
   minZoom={1}
   zoomStep={0.5}
   initialZoom={1}
   bindToBorders={true}
>
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {/* <Text>{size}</Text>
      <Text>{bomb}</Text>
      <Text>{mode}</Text> */}
      <MainGame size={size} mine={bomb} colorData={useSelector((state) => state.theme.colorData)}/>
    </View>
    </ReactNativeZoomableView>
  );
};
export default test;