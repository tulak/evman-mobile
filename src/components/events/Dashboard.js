import React, {Component} from 'react';
import gql from "graphql-tag";
import { View, Container, Header, Content, Button, Title, Item, Input, Text, Tabs, Tab, ScrollableTab, Body, Right, Left, Icon, List} from 'native-base';
import EventList from './dashboard/EventList'

import {TRACKED_EVENTS_QUERY, COMMITTED_EVENTS_QUERY, CFP_DEADLINE_EVENTS_QUERY} from '~/queries/events'


export default class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = { refreshing: false }
  }

  render () {
    const {navigation} = this.props

    return (
      <Container>
        <Header hasTabs>
          <Left>
            <Button transparent>
              <Icon name='contact' onPress={() => this.props.navigation.navigate('Profile')}/>
            </Button>
          </Left>
          <Body>
            <Title>Events</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' onPress={() => this.props.navigation.navigate('Search')}/>
            </Button>
          </Right>
        </Header>
        <Tabs renderTabBar={()=> <ScrollableTab style={{ backgroundColor: "#555" }}/>}>
          <Tab heading="Tracked">
            <EventList query={TRACKED_EVENTS_QUERY} navigation={navigation} extractEvents={(d) => d.tracked_events} />
          </Tab>

          <Tab heading="Committed">
            <EventList query={COMMITTED_EVENTS_QUERY} navigation={navigation} extractEvents={(d) => d.committed_events} />
          </Tab>

          <Tab heading="CFP Deadlines">
            <EventList query={CFP_DEADLINE_EVENTS_QUERY} navigation={navigation} extractEvents={(d) => d.cfp_deadline_events} />
          </Tab>
        </Tabs>
      </Container>
    )
  }
}