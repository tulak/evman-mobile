import React, {Component} from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab, Item, Input, Icon } from 'native-base';

export default class Dashboard extends Component {
  static navigationOptions = {
    title: 'Search',
    // header: { visible: false }
  };

  render () {
    return (
      <Container>
        <Header searchBar rounded>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" />
          </Item>
          <Button transparent>
            <Text style={{color: 'white'}}>Search</Text>
          </Button>
        </Header>

        <Content>
          <Text onPress={() => this.props.navigation.navigate('Show', { name: 'Test'})}>Test</Text>
          <Text onPress={() => this.props.navigation.navigate('Show', { name: 'JavaHome'})}>JavaHome</Text>
        </Content>
      </Container>
    )
  }
}