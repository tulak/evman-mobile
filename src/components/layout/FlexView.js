import React, {Component} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { yellow } from 'ansi-colors';

let styles = StyleSheet.create({
  default: {
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

  wrap: {
    flexWrap: 'wrap',
  },

  spaceBetween: { justifyContent: 'space-between' },
  spaceAround: { justifyContent: 'space-around' },
  spaceEvenly: { justifyContent: "space-evenly"},
  stretchItems: { alignItems: 'stretch', backgroundColor: '#eaeaea' }
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
    // style={usedStyles}
    return (
      <View style={usedStyles}>
        {this.props.children }
        {/* <Text>{JSON.stringify(usedStyles)}</Text> */}
      </View>
    )
  }
}