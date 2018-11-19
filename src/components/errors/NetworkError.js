import React, {Component} from 'react';
import {View, Content, Text} from 'native-base'
import {StyleSheet} from 'react-native'

export default class NetworkError extends Component {
  render () {
    return (
      <Content contentContainerStyle={style.content}>
        <Text style={style.message}>Error occured while loading the data</Text>
        <View style={style.slot}>{this.props.children}</View>
      </Content>
    )
  }
}

export const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },

  message: {
    color: '#999'
  },

  slot: {
    marginTop: 10,
  }
});