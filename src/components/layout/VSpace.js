import React, { Component } from 'react';
import { View, Text } from 'native-base';

export default class VSpace extends Component {
  static defaultProps = {
    size: 15
  }
  render() {
    const {size} = this.props

    return (
      <View style={{height: size}}/>
    );
  }
}
