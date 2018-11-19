import React, {Component} from 'react';
import {View, Text, Button, Icon} from 'native-base'

export default class StatusButton extends Component {
  static defaultProps = {
    enabledStyle:'success',
    disabledStyle: 'light'
  }

  render () {
    const {name, enabled, enabledStyle, disabledStyle, ...props} = this.props
    
    let klass = enabled ? enabledStyle : disabledStyle
    klass = {[klass]: true}
    const icon = enabled ? 'checkmark-circle' : 'close-circle'
    return (
      <View {...props}>
        <Button small iconLeft {...klass}>
          <Icon name={icon} />
          <Text>{name}</Text>
        </Button>
      </View>
    )
  }
}