import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, FlatList, TouchableOpacity } from 'react-native';
import { ListItem, Left, Right, Badge, Container, Header, Button, Icon, Body, Title, Subtitle } from 'native-base';
import {FlexView, Hr, CenteredNotice} from '~/components/layout';
import {getStyles} from '~/globalStyles'

export default class EventProperty extends Component {
  constructor (props) {
    super(props)
    this.state = {
      listOpened: false
    }
  }

  toggleList = () => {
    this.setState({
      listOpened: !this.state.listOpened
    })
  }

  render () {
    let {label, values, behaviour, eventName} = this.props

    if (values.length == 0) return null

    let value = null
    switch (behaviour) {
      case 'multiple_choice':
        value = values.join(', ')
        break;
      case 'select':
        value = values[0]
        break;
      case 'text':
        value = values[0]
        break;
    
      default:
        break;
    }

    return (
      <React.Fragment>
        <TouchableOpacity onPress={this.toggleList}>
          <FlexView row style={styles.container} spaceBetween>
            <Text style={getStyles('bold')}>{label}</Text>
            <Text numberOfLines={1} style={styles.value} ellipsizeMode="tail">{value}</Text>
          </FlexView>
        </TouchableOpacity>
        <Hr />

        <Modal visible={this.state.listOpened} animationType='fade' onRequestClose={this.toggleList}>
          <Container>
            <Header>
              <Left>
                <Button icon transparent onPress={this.toggleList}>
                  <Icon name="close" active/>
                </Button>
              </Left>
              <Body>
                <Title>{eventName}</Title>
                <Subtitle>{label}</Subtitle>
              </Body>
              <Right></Right>
            </Header>
            <FlatList 
              contentContainerStyle={[values.length == 0 && styles.emptyList]}
              data={values}
              keyExtractor={(value) => value}
              ListEmptyComponent={
                <CenteredNotice text="No data" />
              }
              renderItem={({item}) => (
                <ListItem key={item}>
                  <Text>{item}</Text>
                </ListItem>
              )}
              />
          </Container>
        </Modal>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: "#eaeaea",
  },

  value: {
    flex: 1, 
    textAlign: 'right', 
    paddingLeft: 20
  },

  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  }
})