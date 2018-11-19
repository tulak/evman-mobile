import React, {Component} from 'react';
import {View, Text} from 'native-base'

export default class Hr extends Component {
  static defaultProps = {
    color: '#d1d1d1',
    hSpace: 10,
    vSpace: 5,
    size: 1
  }

  render () {
    const {color, hSpace, vSpace, size} = this.props
    
    const style = {
      borderBottomWidth: size,
      borderBottomColor: color, 
      marginHorizontal: hSpace, 
      marginVertical: vSpace
    }
    
    return (
      <View style={style}></View>
    )
  }
}