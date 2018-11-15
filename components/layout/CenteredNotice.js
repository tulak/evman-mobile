import React, {Component} from 'react';
import {View, Content, Text, Button} from 'native-base'
import {StyleSheet, RefreshControl} from 'react-native'

export default class CenteredNotice extends Component {
  render () {
    const {text, onRefresh} = this.props
    
    return (
      <Content contentContainerStyle={style.content}>
        <Text style={style.message}>{text}</Text>
        {onRefresh && (
          <View style={style.refreshButtonWrapper}>
            <Button onPress={onRefresh} info bordered small>
              <Text>Refresh</Text>
            </Button>
          </View>
        )}
      </Content>
    )
  }
}

export const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
    // borderWidth: 1,
    // borderColor: 'green'
  },

  message: {
    color: '#999'
  },

  slot: {
    marginTop: 10,
  },

  refreshButtonWrapper: {
    marginTop: 10
  }
});