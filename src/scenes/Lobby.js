import React, { Component } from "react";
import { Avatar, Button, ListItem, Text } from "react-native-elements";
import { StyleSheet, View } from "react-native";

const MODE = ['PvP', 'Ranking', 'Battle Royal', 'Any'];

const list = [
  {
    name: 'Superman',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
    subtitle: '2027'
  },
  {
    name: 'Batman',
    avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
    subtitle: '2054'
  },
]

export default class Lobby extends Component {
  state = {
    code: (this.props.route.params.role === 'owner'?'1234':this.props.route.params.code),
    value: (this.props.route.params.role === 'owner'?this.props.route.params.value:1),
    role: this.props.route.params.role,
  }
  constructor(props) {
    super(props);
  }
  generateCode = () => {
    return '1234';
  }
  render() {
    return (
      <View style={{flex: 1, backgroundColor: "#212930"}}>
        {/* Looby Code */}
        <View style={styles.container}>
          <Text h3 style={{color:"white"}}>COD<Text style={{color:"red"}}>E</Text> : {this.state.code}</Text>
          <Text h4 style={{color:"white"}}>M<Text style={{color:"red"}}>O</Text>DE : {MODE[this.state.value]}</Text>
        </View>
        {
          list.map((l, i) => (
            <ListItem key={i} bottomDivider>
            <Avatar source={{uri: l.avatar_url}} />
              <ListItem.Content>
                <ListItem.Title>{l.name}</ListItem.Title>
                <ListItem.Subtitle>{l.subtitle}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))
        }
        <View style={{position: 'absolute', bottom: 10, marginHorizontal: '10%', width: '80%'}}>
          <Button
            style={styles.button}
            title={"Start!!"}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginVertical: '2%',
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: 2,
  },
})
