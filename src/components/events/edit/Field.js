import React, { Component } from 'react';
import { Item, Label, Input, Textarea, Text, View } from 'native-base';
import { FlexView } from '~/components/layout';
import { StyleSheet } from 'react-native';

export default class Field extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {label, name, values, setFieldValue, textarea, errors = {}} = this.props

    const fieldErrors = errors[name]
    const textField = <Input value={values[name]} error={fieldErrors && true} onChangeText={(value) => setFieldValue(name, value)} />
    const textareaField =  <Input multiline numberOfLines={4} error={fieldErrors && true} autoCorrect={false} value={values[name]} onChangeText={(value) => setFieldValue(name, value)} />
    
    return (
      <React.Fragment>
        <Item floatingLabel error={fieldErrors && true}>
          <Label>{label}</Label>
          {textarea ? textareaField : textField}
        </Item>
        <Text style={style.error}>{fieldErrors}</Text>
      </React.Fragment>
    );
  }
}

const style = StyleSheet.create({
  error: {
    paddingHorizontal: 15,
    color: 'red'
  },

  error: {
    paddingHorizontal: 15,
    color: 'red'
  }
})
