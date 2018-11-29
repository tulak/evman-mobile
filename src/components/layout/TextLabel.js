import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class TextLabel extends Component {
  render () {

    const style = {
      fontSize: 11,
      fontWeight: "bold",
      color: "#999",
      marginBottom: 3,
    };

    return <Text style={style}>{this.props.children}</Text>;
  }
}
