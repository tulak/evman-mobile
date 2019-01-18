import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class GlobalError extends Component {
  render() {
    return (
      <View style={style.container}>
        <Text style={style.text}>{this.props.children}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container: {
    padding: 15
  },
  text: {
    color: 'red'
  }
})
