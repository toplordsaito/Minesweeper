import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text, Image } from "react-native";
import imagesList from '../assets/image'
class SwitchFlag extends Component {
    state = {
        isFocusMode: false //default = *
    }

    toggleSwitch = () => {
        this.setState({
            isFocusMode: !this.state.isFocusMode,
        }, () => {
            this.props.changeFocus(this.state.isFocusMode)
        })
    };

    render() {
        let content = null
        if (this.state.isFocusMode) {
            content = (
                <Image source={imagesList.flag} style={styles.toggleImage} resizeMode="contain" />
            )
        } else {
            content = (
                <Image source={imagesList.mine} style={styles.toggleImage} resizeMode="contain" />
            )
        }
        return (
            <TouchableHighlight onPress={this.toggleSwitch}>
                <View style={styles.toggle}>
                    {content}
                </View>
            </TouchableHighlight>
        )
    };
}

const styles = StyleSheet.create({
    toggle: {
        borderRadius: 30,
        alignItems: "center",
        backgroundColor: "#CAF0F8",
        padding: 10,
    },
    toggleImage: {
        width: 50,
        height: 50,
    }
});

export default SwitchFlag;