import React, { Component } from 'react';
import { View, Text, Modal, DatePickerIOS, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Item, Label, Button } from 'native-base';
import { FlexView } from '~/components/layout';
import Moment from 'react-moment';

export default class DateField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false
    };
  }

  closeModal = () => this.setState({ modalVisible: false})
  openModal = () => {
    const { name, setFieldValue } = this.props
    this.setState({ modalVisible: true})
    if (!this.value()) setFieldValue(name, new Date)
  }

  clearValue = () => {
    const {name, setFieldValue} = this.props
    setFieldValue(name, null)
    this.closeModal()
  }

  value = () => {
    const { name, values } = this.props
    return values[name]
  }

  render() {
    const {label, name, errors, setFieldValue} = this.props
    const {modalVisible} = this.state

    const value = this.value()
    const dateValue = new Date(value)

    const fieldErrors = errors[name]
    return (
        <FlexView column flex stretchItems>
          <Item stackedLabel style={style.item} error={!!fieldErrors}>
            <Label>{label}</Label>

            <TouchableOpacity style={style.value} onPress={this.openModal}>
              {value ? (<Moment format="Do MMM YYYY">{dateValue}</Moment>) : (<Text>No value</Text>)}
            </TouchableOpacity>
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={this.closeModal}
                >
                  <TouchableWithoutFeedback onPress={this.closeModal}>
                    <View style={{flex: 1}}>
                      <View style={style.overlay}>
                        <Text style={style.modalLabel}>{label}</Text>
                      </View>
                      <View style={style.buttonBg}>
                        <Button danger full onPress={this.clearValue} style={{opacity: 1}}><Text>Clear value</Text></Button>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                  <DatePickerIOS
                    style={style.datepicker}
                    date={value ? dateValue : new Date()}
                    onDateChange={(value) => setFieldValue(name, value)}
                    mode="date"
                  />
                </Modal>
          </Item>
          <Text style={style.error}>{fieldErrors}</Text>
        </FlexView>

    );
  }
}

const style = StyleSheet.create({
  value: {
    alignSelf: 'flex-start', 
    paddingTop: 15,
    paddingBottom: 10,
    borderWidth: 0,
    width: '100%'
  },

  overlay: {
    flex: 1,
    backgroundColor: '#eaeaea',
    opacity: 0.9,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  modalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    paddingBottom: 10
  },

  item: {
    flexGrow: 1
  },

  datepicker: {
    backgroundColor: 'white'
  },

  buttonBg: {
    backgroundColor: 'white'
  },

  error: {
    paddingHorizontal: 15,
    color: 'red'
  }
})