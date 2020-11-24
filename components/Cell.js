import React, { Component } from "react";
import { StyleSheet, View, TouchableOpacity, Image, Text } from "react-native";
import imagesList from "../assets/image";
import { playFlagSound, playOpenSound } from "../assets/sound/audio";

export default class Cell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      revealed: false,
      neighbors: null,
      isFlag: false,
    }
    this.colorData = this.props.colorData;
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
    if (this.state.isFlag) return;
    if (this.state.revealed) return;
    if (!userInitiated && this.isMine()) return;


    this.setState({
      revealed: true
    }, () => {
      if (this.isMine()) {
        this.props.onDie();
      } else {
        if (userInitiated) playOpenSound()
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
    this.onReveal(true)
  }

  flag = () => {
    playFlagSound()
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
          // <Image source={imagesList.mine} style={{ width: this.props.width, height: this.props.height }} resizeMode="contain" />
          <Image source={this.colorData.image} style={{ width: this.props.width, height: this.props.height }} resizeMode="contain" />
        )
      } else if (this.state.neighbors) {
        content = (
          <Text style={[styles.neighborsText, { fontFamily: this.colorData.fontFamily, color: this.colorData.text }]}>
            {this.props.mode == "bind" ? "" : this.state.neighbors}
          </Text>
        )
      }

      return (
        <View style={[
          styles.cellRevealed,
          {
            backgroundColor: this.colorData.button,
            borderColor: this.colorData.borderTop,
            width: this.props.width,
            height: this.props.height
          }]}
        >
          {content}
        </View>
      )
    }

    else {
      let content = ""
      if (this.state.isFlag) {
        content = (
          <Image source={imagesList.flag} style={{ width: this.props.width / 2, height: this.props.height / 2 }} resizeMode="center" />
        )
      } else {
        // content = (<Text></Text>)
      }
      return (
        <TouchableOpacity onPress={() => { this.handlePress() }} onLongPress={() => { this.handleLongPress() }}>
          <View style={[
            styles.cell,
            {
              backgroundColor: this.colorData.borderTop,
              borderTopColor: this.colorData.button,
              borderLeftColor: this.colorData.button,
              borderRightColor: this.colorData.borderBottom,
              borderBottomColor: this.colorData.borderBottom,
              width: this.props.width,
              height: this.props.height,
            }]}
          >
            <Text>{content}</Text>
          </View>
        </TouchableOpacity>
      )
    }

  }
}

const styles = StyleSheet.create({
  cell: {
    // backgroundColor: '#023E8A',
    // borderTopColor: '#48CAE4',
    // borderLeftColor: '#48CAE4',
    // borderRightColor: '#00B4D8',
    // borderBottomColor: '#00B4D8',
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellRevealed: {
    // backgroundColor: '#48CAE4',
    // borderColor: '#00B4D8',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  neighborsText: {
    color: "white"
  }
})
