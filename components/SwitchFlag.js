import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
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
        let content = "*"
        if (this.state.isFocusMode) {
            content = "flag"
        } else {
            content = "*"
        }
        return (
            <TouchableHighlight onPress={this.toggleSwitch}>
                <View style={styles.toggle}>
                    <Text>{content}</Text>
                </View>
            </TouchableHighlight>
        )
    };
}

const styles = StyleSheet.create({
    toggle: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
    }
});

export default SwitchFlag;