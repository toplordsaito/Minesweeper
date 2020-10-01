import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    Text
} from 'react-native';

export default class Cell extends Component {
    constructor(props) {
        super(props);

        this.state = {
            revealed: false,
            neighbors: null,
            isFlag: false,
        }
    }

    revealWithoutCallback = () => {
        if (this.state.revealed) {
            return;
        }

        this.setState({
            revealed: true
        })
    }

    isMine = () => {
        return this.props.isMine(this.props.x, this.props.y)
    }

    onReveal = (userInitiated) => {
        if (this.state.revealed) {
            return;
        }

        if (!userInitiated && this.isMine()) {
            return;
        }

        this.setState({
            revealed: true
        }, () => {
            if (this.isMine()) {
                this.props.onDie();
            } else {
                this.props.onReveal(this.props.x, this.props.y);
            }
        });
    }

    reset = () => {
        this.setState({
            revealed: false,
            neighbors: null,
            isFlag: false,
        })
    }
    mine = () => {
        if (this.state.isFlag) return
        this.onReveal(true)
    }

    flag = () => {
        this.setState({
            isFlag: !this.state.isFlag
        }, () => {
            this.props.ChangeFlag(this.state.isFlag, this.props.x, this.props.y)
        })
    }

    handlePress = () => {
        if (!this.props.focusMode) {
            this.mine()
        } else {
            this.flag()
        }
        console.log(this.props.focusMode)
    }

    handleLongPress = () => {
        if (this.props.focusMode) {
            this.mine()
        } else {
            this.flag()
        }
    }
    render() {
        if (this.state.revealed) {
            let content = null;
            if (this.isMine()) {
                content = (
                    <Image source={require('../assets/mine.png')} style={{ width: this.props.width / 2, height: this.props.height / 2 }} resizeMode="contain" />
                )
            } else if (this.state.neighbors) {
                content = (
                    <Text>{this.state.neighbors}</Text>
                )
            }

            return (
                <View style={[styles.cellRevealed, { width: this.props.width, height: this.props.height }]}>
                    {content}
                </View>
            )
        }

        else {
            let content = ""
            if (this.state.isFlag) {
                content = "F"
            } else {

            }
            return (
                <TouchableOpacity onPress={() => { this.handlePress() }} onLongPress={() => { this.handleLongPress() }}>
                    <View style={[styles.cell, { width: this.props.width, height: this.props.height }]}>
                        <Text>{content}</Text>
                    </View>
                </TouchableOpacity>
            )
        }

    }
}

const styles = StyleSheet.create({
    cell: {
        backgroundColor: '#bdbdbd',
        borderWidth: 3,
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#7d7d7d',
        borderBottomColor: '#7d7d7d'
    },
    cellRevealed: {
        backgroundColor: '#bdbdbd',
        borderWidth: 1,
        borderColor: '#7d7d7d',
        alignItems: 'center',
        justifyContent: 'center'
    }

})