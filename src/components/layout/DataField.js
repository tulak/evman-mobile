import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Text } from 'native-base';
import {FlexView, TextLabel} from './index';
import {getStyles} from '~/globalStyles';

export default class DataField extends Component {
  render () {
    const {customLabel, customValue, label, value, hideIf, style, ...otherProps} = this.props

    if (hideIf) return null

    let labelComp = <TextLabel>{label}</TextLabel>;
    let valueComp = <Text numberOfLines={1} style={styles.textValue} ellipsizeMode="tail">{value}</Text>;

    if (!value && this.props.children) valueComp = this.props.children
    
    if (customLabel) labelComp = <FlexView row flexStart>{label}</FlexView>;


    return (
      <FlexView style={[styles.container, style]} spaceBetween itemsFlexStart {...otherProps}>
        {labelComp}
        {valueComp}
      </FlexView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },

  textValue: {
    flex: 1, 
    textAlign: 'left', 
  }
})