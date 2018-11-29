import React, { Component } from 'react';
import { Text } from 'native-base';

export default class SubHeader extends Component {
  render () {
    const style = {
      fontWeight: 'bold',
      fontSize: 13,
      color: '#555'
    };

    return <Text style={style}>{this.props.children}</Text>;
  }
}
