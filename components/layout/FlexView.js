import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { yellow } from 'ansi-colors';

let styles = StyleSheet.create({
  default: {
    flex: 1,
    alignItems: 'center',
  },

  debug: {
    borderColor: 'green',
    borderWidth: 1
  },

  column: {
    flexDirection: 'column'
  },

  row: {
    flexDirection: 'row'
  },

  'space-between': { justifyContent: 'space-between' },
  'space-around': { justifyContent: 'space-around' },
  'space-evenly': { justifyContent: "space-evenly"},
  'stretch-items': { alignItems: 'stretch', backgroundColor: '#eaeaea' }
})

export default class FlexView extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    let usedStyles = []
    for (let prop of Object.keys(this.props)) {
      if (styles[prop] && this.props[prop] === true) usedStyles.push(styles[prop])
    }
    
    usedStyles.push(styles.default)
    let inlineStyles = this.props.style
    if(inlineStyles) usedStyles.push(inlineStyles)
    return (<View style={usedStyles}>{this.props.children}</View>)
  }
}