import React, { Component, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useGame, userGame } from '../hooks'
import { Text } from "react-native-elements";
import stylesTheme from "../styles/theme.styles";
import { useSelector } from "react-redux";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GameStatus = ({ code }) => {
  const { isFetching, game } = useGame(code)
  const colorData = useSelector((state) => state.theme.colorData);
  const text = {color: colorData.text, fontFamily: colorData.fontFamily};
  console.log(game)
  if (!game) {
    return (<Text>Loading . . .</Text>)
  } else {
    return (
      <View style={[stylesTheme.logoContainer, {width: wp("100%"), height: hp("25%"),backgroundColor: colorData.backgroundColor}]}>
        <View style={[stylesTheme.logoContainer, {height: hp("15%")}]}>
          <Text style={[stylesTheme.headerText, text]} h2>
            S<Text style={{color: colorData.innerText}}>t</Text>atus <Text style={{color: colorData.innerText}}>G</Text>ame
          </Text>
        </View>
        <View style={{height: hp("10%")}}>
          {
            game.result.map((l, i) => {
              // console.log(l.id)
              // console.log(l?.name)
              return (
                <View>
                  <Text style={[styles.textLog, text]}>Rank : {i + 1}{"\n"}Name : {l.name} <Text style={{color: colorData.innerText}}>{l.status}</Text></Text>
                </View>
              )
            })
          }
        </View>
      </View>
    )
  }
}
export default GameStatus

const styles = StyleSheet.create({
  container: {
  flex: 0.2,
  alignContent: "center",
  marginBottom: "15%"

  },
  textLog: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
  margin: 2,
  },
  textInput: {
  height: 40,
  margin: 2,
  backgroundColor: 'white',
  textAlign: 'center',
  borderRadius: 5,
  }
})
