import React, { Component } from 'react';
import { FlatList, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { Item, Text, Label, Button, Title, Subtitle, Container, Header, Left, Right, Body, Icon, ListItem, Radio } from 'native-base';
import { Chip, FlexView } from '~/components/layout';

export default class SelectField extends Component {
  static defaultProps = {
    optionIdField: 'id', // the field of Option object which holds the unique value of that option
    optionLabelField: 'label' // the field of Option object which holds descriptive label
  }

  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false
    };
  }

  closeModal = () => this.setState({ modalVisible: false})
  openModal = () => this.setState({ modalVisible: true})

  clearValue = () => {
    const {multiple, name, setFieldValue} = this.props
    const emptyValue = multiple ? [] : null
    setFieldValue(name, emptyValue)
    this.closeModal()
  }

  isSelected = (value) => this.selectedValues().indexOf(value) != -1

  selectOption = (value) => {
    const {multiple, name, setFieldValue} = this.props

    if (multiple) {
      let currentValues = Array.from(this.selectedValues())
      if (this.isSelected(value)) {
        const valueIndex = currentValues.indexOf(value)
        currentValues.splice(valueIndex, 1)
      } else {
        currentValues.push(value)
      }
      
      setFieldValue(name, currentValues)
    } else {
      setFieldValue(name, value)
      this.closeModal();
    }
  }

  renderItem = ({item}) => {
    const {optionIdField, optionLabelField} = this.props
    return (
      <ListItem
        button
        selected={this.isSelected(item[optionIdField])}
        onPress={() => this.selectOption(item[optionIdField])}
      >
        <Left>
          <Text>
            {item[optionLabelField]}
          </Text>
        </Left>
        <Right>
          <Radio selected={this.isSelected(item[optionIdField])} />
        </Right>
      </ListItem>
    )
  }

  selectedValues = () => {
    const {values, name, multiple} = this.props
    return multiple ? values[name] : [values[name]]
  }

  selectedOptions = () => {
    const {options, optionIdField} = this.props
    return options.filter((option) => this.isSelected(option[optionIdField]))
  }

  renderValue = () => {
    const {multiple, optionIdField, optionLabelField} = this.props
    if(multiple) {
      return (
        <FlexView row wrap>
          {this.selectedOptions().map((o) => (
            <Chip key={o[optionIdField]}>{o[optionLabelField]}</Chip>
          ))}
        </FlexView>
      )
    } else {
      return <Text>{this.selectedOptions().map((o) => o[optionLabelField]).join(', ')}</Text>
    }
  }

  render() {
    const { modalVisible } = this.state
    const {multiple, label, optionIdField, optionLabelField, options, errors, name} = this.props
    const note = multiple ? 'Select more' : 'Select one'
    const fieldErrors = errors[name]
    console.log('Fe: ', fieldErrors, errors, name)

    return (
      <FlexView column flex stretchItems>
        <Item stackedLabel>
          <Label>{label}</Label>
          <TouchableOpacity style={style.value} onPress={this.openModal}>
            {this.renderValue()}
          </TouchableOpacity>

          <Modal
            supportedOrientations={null}
            animationType="slide"
            transparent={false}
            visible={modalVisible}
            onRequestClose={this.closeModal}
          >
            <Container>
              <Header>
                <Left>
                  <Button icon transparent onPress={this.closeModal}>
                    <Icon name="close" active/>
                  </Button>
                </Left>
                <Body>
                  <Title>{label}</Title>
                  <Subtitle>{note}</Subtitle>
                </Body>
                <Right></Right>
              </Header>
              <FlatList
                data={options}
                keyExtractor={(item) => String(item[optionIdField])}
                renderItem={this.renderItem}
                extraData={this.selectedValues()}
              />
              <Button block danger onPress={this.clearValue}><Text>Clear value</Text></Button>
            </Container>
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

  error: {
    paddingHorizontal: 15,
    color: 'red'
  }
})
