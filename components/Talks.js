
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab } from 'native-base';

export default class Talks extends Component {
  render () {
    return (
      <Container>
        <Header searchBar={true} style={{backgroundColor: '#999999'}} hasSubtitle={false}>
          <Left></Left>
          <Body>
            <Title>EvMan - Talks</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content />
       
      </Container>
    )
  }
}