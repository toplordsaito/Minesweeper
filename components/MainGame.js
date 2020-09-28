import React, { Component, useState } from "react";
import { StyleSheet, TouchableOpacity, Image, Alert, View, Button, TouchableHighlight, Text } from "react-native";
import { Dimensions } from 'react-native';
import Cell from './Cell'
import SwitchFlag from './SwitchFlag'
class MainGame extends Component {
    state = {
        mine: this.props.mine,
        boardWidth: 0,
        CELL_SIZE: Dimensions.get('screen').width / (this.props.size * 1.2), //min = 20      x/(y*1.2) > 20
        BOARD_SIZE: this.props.size,
        mineSet: new Set(),
        flagSet: new Set(),
        focusMode: false,
    };
    constructor(props) {
        super(props);
        this.boardWidth = this.state.CELL_SIZE * this.state.BOARD_SIZE;
        this.grid = Array.apply(null, Array(this.state.BOARD_SIZE)).map((el, idx) => {
            return Array.apply(null, Array(this.state.BOARD_SIZE)).map((el, idx) => {
                return null;
            });
        });
        this.generateMine()
    }


    generateMine() {
        this.state.mineSet = new Set()
        while (this.state.mine != this.state.mineSet.size) {
            let row = Math.floor(Math.random() * this.state.BOARD_SIZE);
            let col = Math.floor(Math.random() * this.state.BOARD_SIZE);
            this.state.mineSet.add(this.posToString(col, row))
        }
        console.log(this.state.mineSet)
    }

    posToString = (x, y) => {
        return x.toString() + "," + y.toString()
    }

    onDie = () => {
        Alert.alert("Game Over!");
        for (let i = 0; i < this.state.BOARD_SIZE; i++) {
            for (let j = 0; j < this.state.BOARD_SIZE; j++) {
                this.grid[i][j].revealWithoutCallback();
            }
        }
    }

    revealNeighbors = (x, y) => {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i != 0 || j != 0) && x + i >= 0 && x + i <= this.state.BOARD_SIZE - 1 && y + j >= 0 && y + j <= this.state.BOARD_SIZE - 1) {
                    this.grid[x + i][y + j].onReveal(false);
                }
            }
        }
    }

    onReveal = (x, y) => {
        let neighbors = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (x + i >= 0 && x + i <= this.state.BOARD_SIZE - 1 && y + j >= 0 && y + j <= this.state.BOARD_SIZE - 1) {
                    if (this.isMine(x + i, y + j)) {
                        neighbors++;
                    }
                }
            }
        }

        if (neighbors) {
            this.grid[x][y].setState({
                neighbors: neighbors
            })
        } else {
            this.revealNeighbors(x, y);
        }
    }

    isMine = (x, y) => {
        return this.state.mineSet.has(this.posToString(x, y))
    }

    renderBoard = () => {
        return Array.apply(null, Array(this.state.BOARD_SIZE)).map((el, rowIdx) => {
            let cellList = Array.apply(null, Array(this.state.BOARD_SIZE)).map((el, colIdx) => {
                return <Cell
                    onReveal={this.onReveal}
                    onDie={this.onDie}
                    key={colIdx}
                    width={this.state.CELL_SIZE}
                    height={this.state.CELL_SIZE}
                    x={colIdx}
                    y={rowIdx}
                    ref={(ref) => { this.grid[colIdx][rowIdx] = ref }}
                    isMine={this.isMine}
                    handlePress={this.handlePress}
                    handleLongPress={this.handleLongPress}
                />
            });

            return (
                <View key={rowIdx} style={{ width: this.boardWidth, height: this.state.CELL_SIZE, flexDirection: 'row' }}>
                    {cellList}
                </View>
            )
        });


    }

    resetGame = () => {
        this.generateMine()
        for (let i = 0; i < this.state.BOARD_SIZE; i++) {
            for (let j = 0; j < this.state.BOARD_SIZE; j++) {
                this.grid[i][j].reset();
            }
        }
    }

    changeFocus = (val) => {
        this.setState({
            focusMode: val
        })
        console.log(val)
    }

    render() {

        return (
            <View style={styles.container}>
                <SwitchFlag changeFocus={this.changeFocus} />
                <View style={{ width: this.boardWidth, height: this.boardWidth, backgroundColor: '#888888', flexDirection: 'column' }}>
                    {this.renderBoard()}
                </View>
                <Button title="New Game" onPress={this.resetGame} />
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggle: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    }
});

export default MainGame;