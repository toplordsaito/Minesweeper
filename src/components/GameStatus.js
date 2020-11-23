import React, { Component, useState } from "react";
import { TextInput, StyleSheet, View } from "react-native";
import { useGame, userGame } from '../hooks'
import { Text } from "react-native-elements";
const GameStatus = ({ code }) => {
    const { isFetching, game } = useGame(code)
    console.log(game)
    if (!game) {
        return (<Text>Loading . . .</Text>)
    } else {
        return (
            <View style={styles.container}>
                <Text style={{
                    fontWeight: "bold",
                }} h4>S<Text style={{ color: "red" }}>t</Text>atus <Text style={{ color: "red" }}>G</Text>ame</Text>
                {
                    game.result.map((l, i) => {
                        console.log(l.id)
                        console.log(l?.name)
                        return (
                            <Text style={styles.textlog}>Rank : {i + 1} Name : {l.name} {l.status}</Text>
                        )
                    }
                    )
                }
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
    textlog: {
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
