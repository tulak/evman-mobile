import React, { Component } from "react";
import {StatusBar, StyleSheet, Animated, FlatList} from 'react-native';
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'
import {Card, CardItem, Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner, Grid, Col, Row, List, ListItem, Subtitle } from 'native-base'
import {CenteredNotice, Hr} from '~/components/layout/'
import AttendeeAvatar from './AttendeeAvatar'
import FlexView from "../../layout/FlexView";

export default class Show extends Component {
  render () {
    let {eventName, attendees, refetch, refreshing} = this.props

    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={this.props.onBack}>
              <Icon name="close" active/>
            </Button>
          </Left>
          <Body>
            <Title>{eventName}</Title>
            <Subtitle>Attendees</Subtitle>
          </Body>
          <Right></Right>
        </Header>
        <FlatList 
          contentContainerStyle={[style.list, attendees.length == 0 && style.emptyList]}
          disableVirtualization={false}
          data={attendees}
          keyExtractor={(attendee) => attendee.id.toString()}
          onRefresh={refetch}
          refreshing={refreshing}
          ListEmptyComponent={
            <CenteredNotice text="No one is attending this event" onRefresh={() => refetch()} />
          }
          renderItem={({item}) => (
            <ListItem key={item.id} avatar>
              <Left>
                <AttendeeAvatar name={item.user.name} uri={item.user.avatarUrl} />
              </Left>
              <Body>
                <Text>{item.user.name}</Text>
                <Text note>{item.attendeeType.name}</Text>
              </Body>
            </ListItem>
          )}
          />
      </Container>
    );
  }
}

const style = StyleSheet.create({
  emptyList: {
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1
  }
})