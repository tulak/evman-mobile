import React, { Component } from "react";
import {StatusBar} from 'react-native';
import {Card, CardItem, Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner } from 'native-base'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import CenteredNotice from '~/components/layout/CenteredNotice'
import {SHOW_QUERY} from '~/queries/events/show'

export default class Show extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('name') }
  };

  render () {
    const eventId = this.props.navigation.getParam('eventId')
    
    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body><Title>Event</Title></Body>
          <Right></Right>
        </Header>
        <Query query={SHOW_QUERY} variables={{eventId}}>
          {({loading, error, data}) => {
            if (loading && !data.event) return <Content><Spinner inverse style={{ borderWidth: 0 }} /></Content>;

            let event
            if (!data) {
              return <CenteredNotice text="Failed to load the event"/>
            } else {
              event = data.event[0]
            }
            

            return (
              <Content>
                <View>
                  <Text>{event.name}</Text>
                  <Text>{event.eventType.name} </Text>
                </View>
              </Content>
            )
          }}
        </Query>
      </Container>
    );
  }
}