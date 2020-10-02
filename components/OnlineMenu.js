import React, { Component } from "react";
import { Button, StyleSheet, Text, View } from "react-native";

class OnlineMode extends Component {
    state = {
        currentValue: 0,
        currentName: 'PvP',
    }
    constructor(props) {
        super(props);
    }
    changeMode = (val) => {
        let value = (4+this.state.currentValue+(val==='-'?-1:1))%4;
        console.log(value);
        let name = {0: 'PvP', 1: 'Ranking', 2: 'Battle Royal', 3: 'Any'};
        this.setState({
            currentValue: value,
            currentName: name[value],
        });
    }
    render() {
        return (
            <View style={styles.mode}>
                <Button style={styles.button} title="<" onPress={() => this.changeMode('-')}/>
                <Text style={{flex: 2}}>{this.state.currentName}</Text>
                <Button style={styles.button} title=">" onPress={() => this.changeMode('+')}/>
            </View>
        )
    }
}

class OnlineMenu extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container}>
                <OnlineMode></OnlineMode>
                <Button style={styles.button} title="Create"/>
                <Button style={styles.button} title="Join"/>
                <Button style={styles.button} title="Quick Start"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    button: {
        flex: 1,
    },
    mode: {
        flexDirection: 'row',
    }
});

export default OnlineMenu;