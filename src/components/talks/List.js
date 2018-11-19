import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab } from 'native-base';

export default class List extends Component {
  static navigationOptions = {
    title: 'List'
  };

  render () {
    return (
      <Container>
        <Content>
          {
            ['Getting started with Kubernetes', 'React in general'].map((name) => {
              return <Text key={name} onPress={() => this.props.navigation.navigate('Show', { name })}>{name}</Text>
            })
          }
        </Content>
      </Container>
    )
  }
}