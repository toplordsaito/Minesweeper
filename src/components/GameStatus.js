import React, { Component, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useGame, userGame } from '../hooks'
import { Avatar, Button, ListItem, Text } from "react-native-elements";

const list = [
    {
        name: 'Superman',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: '2027'
    },
]
const GameStatus = ({ code }) => {
    const { isFetching, game } = useGame(code)
    console.log(game)
    if (isFetching) return <Text>Loading . . .</Text>
    return (
        <View style={styles.container}>
            {
                game.result.map((l, i) => {
                    console.log(l.id)
                    return (
                        <Text>Rank:{i + 1} Name:{l.id} {l.status}</Text>
                    )
                }
                )
            }
        </View>
    )


}
export default GameStatus

const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',

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
