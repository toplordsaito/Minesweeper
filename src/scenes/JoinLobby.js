import React, { Component } from "react";
import { Button } from "react-native-elements";
import { TextInput, StyleSheet, View } from "react-native";

const MODE = ['PvP', 'Ranking', 'Battle Royal', 'Any'];

export default class JoinLobby extends Component {
  state = {
    code: '',
  }
  constructor(props) {
    super(props);
  }
  updateCode = (text) => {
    this.setState({
      code: text,
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <TextInput keyboardType='numeric' maxLength={4} style={[styles.textInput, {flex: 1}]} onChangeText={(text) => this.updateCode(text)}></TextInput>
        <Button
          style={[styles.button, {flex: 1}]}
          title={"Join"}
          onPress={() => this.props.navigation.navigate("Lobby", {code: this.state.code, role: 'member'})}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: '20%',
    backgroundColor: "#212930",
    flexDirection: 'row',
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
