import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Chip extends Component {
  render() {
    return (
      <View style={style.chip}>
        <Text style={style.text}>{this.props.children}</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#eaeaea',
    borderRadius: 15,
    padding: 5,
    paddingHorizontal: 10,
    margin: 2,
  },

  text: {
    
  }
})
