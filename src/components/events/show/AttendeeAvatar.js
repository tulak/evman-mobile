import React, {Component} from 'react';
import {StyleSheet} from 'react-native'
import {View, Text, Thumbnail, Icon} from 'native-base'

export default class AttendeeAvatar extends Component {
  extractInitials (name) {
    let letters = name.split(' ').map((x) => x[0])
    let first = letters.shift()
    let second = letters.shift()
    return [first, second].join('').toUpperCase()
  }

  render () {
    const {uri, name} = this.props

    let image
    if (uri.startsWith('http')) {
      image = <Thumbnail source={{uri: uri}} style={{marginBottom: 6, marginRight: 5}}/>
    } else {
      image = (<View style={style.noAvatarContainer}>
                <Text style={style.noAvatar}>{this.extractInitials(name)}</Text>
              </View>)
    }
    
    return (
      <View style={{padding: 2}}>
        {image}
      </View>
    )
  }
}

let color = "#555"
let bgColor = "#eaeaea"
let size = 60

const style = StyleSheet.create({
  noAvatar: {
    fontSize: 30,
    color: color
  },

  noAvatarContainer: {
    borderWidth: 3,
    borderColor: color,
    backgroundColor: bgColor,
    width: size,
    height: size,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50
  }
})