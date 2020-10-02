import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Text } from "react-native";
class Timer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            min: 0,
            sec: 0,
        }

        this.interval = null;
    }
    handleToggle = () => {
        this.setState(
            {
                start: !this.state.start
            },
            () => this.handleStart()
        );
    };
    handleReset = () => {
        this.setState({
            min: 0,
            sec: 0,

            start: false
        });
        clearInterval(this.interval);
    };

    componentDidMount() {
        this.setState({
            start: true
        }, () => {
            this.handleStart()
        })

    }
    handleStart = () => {
        if (this.state.start) {
            this.interval = setInterval(() => {
                if (this.state.sec !== 59) {
                    this.setState({
                        msec: 0,
                        sec: this.state.sec += 1
                    });
                } else {
                    this.setState({
                        msec: 0,
                        sec: 0,
                        min: this.state.min += 1
                    });
                }
            }, 1000);

        } else {
            clearInterval(this.interval);
        }
    };

    render() {
        let content = `${this.state.min}:${this.state.sec}`
        return (
            <Text>{content}</Text>
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

export default Timer;