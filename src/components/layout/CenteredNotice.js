import React, {Component} from 'react';
import {View, Content, Text, Button, Spinner, Header, Right, Icon, Left} from 'native-base'
import {StyleSheet, RefreshControl} from 'react-native'

export default class CenteredNotice extends Component {
  render () {
    const {text, onRefresh, loading, navigation, header} = this.props
    const spinner = loading ? <Spinner /> : null

    let headerComp = (<Header>
      <Left>
        {navigation && (
          <Button icon transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        )}
      </Left>
    </Header>)

    return (
      <React.Fragment>
        {header && headerComp}
        <Content contentContainerStyle={style.content}>
          <Text style={style.message}>{text}</Text>
          {onRefresh && (
            <View style={style.refreshButtonWrapper}>
              <Button onPress={onRefresh} info bordered small>
                <Text>Refresh</Text>
              </Button>
            </View>
          )}
          {this.props.children && (
            <View style={style.refreshButtonWrapper}>
              {this.props.children}
            </View>
          )}
          {spinner}
        </Content>
      </React.Fragment>
    )
  }
}

export const style = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    backgroundColor: 'white',
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