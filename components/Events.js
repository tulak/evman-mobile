import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab } from 'native-base';

export default class Events extends Component {
  render () {
    return (
      <Container>
        <Header searchBar={true} style={{backgroundColor: '#999999'}} hasSubtitle={false}>
          <Left></Left>
          <Body>
            <Title>EvMan - Events</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content />
        {/* <Footer>
          <FooterTab>
            <Button vertical badge active>
              <Badge><Text>51</Text></Badge>
              <Icon name="train" size={24} />
              <Text>Events</Text>
            </Button>
            <Button vertical badge>
              <Badge><Text>51</Text></Badge>
              <Icon name="file-text" size={24} />
              <Text>Talks</Text>
            </Button>
          </FooterTab>
        </Footer> */}
      </Container>
    )
  }
}