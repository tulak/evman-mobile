import React, { Component } from "react";
import {Card, CardItem, Text } from 'native-base'
export default class Show extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('name') }
  };

  render () {
    const name = this.props.navigation.getParam('name')
    
    return (
      <Card>
        <CardItem header>
          <Text>Showing talk {name}</Text>
        </CardItem>
      </Card>
    );
  }
}