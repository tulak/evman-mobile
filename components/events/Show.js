import React, { Component } from "react";
import {StyleSheet, ScrollView} from 'react-native';
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'
import {Card, CardItem, Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner, Grid, Col, Row, List, ListItem, Badge } from 'native-base'
import { Query } from "react-apollo";
import gql from "graphql-tag";
import AttendeeAvatar from './show/AttendeeAvatar'
import {CenteredNotice, Hr} from '~/components/layout/'
import {SHOW_QUERY} from '~/queries/events/show'
import Attendees from './show/Attendees'
import StatusButton from "./show/StatusButton";
import FlexView from "../layout/FlexView";

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
          {({loading, error, data, refetch}) => {
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
                  <Grid>
                    <Row style={style.header}>
                      <Col style={style.date} size={1}>
                        <Moment format="MMM" style={[getStyles('redText')]} filter={(s) => s.toUpperCase()}>{event.beginsAt}</Moment>       
                        <Moment format="DD" style={[getStyles()]}>{event.beginsAt}</Moment>
                      </Col>
                      <Col style={style.nameWrapper} size={4}>
                        <Text style={style.name}>{event.name}</Text>
                        <Text>{event.eventType.name}</Text>
                      </Col>
                    </Row>
                  </Grid>

                      <View style={[style.row, style.basePadding]}>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                          <StatusButton name="Approved" enabled={event.approved} style={style.baseMargin} />
                          <StatusButton name="Committed" enabled={event.committed} style={style.baseMargin} />
                          {event.archived && <StatusButton name="Archived" enabledStyle="warning" enabled={event.archived} style={style.baseMargin} />}
                        </ScrollView>
                      </View>

                      <Hr hSpace={15} />

                      <FlexView row style={style.basePadding}>
                        <Icon style={[style.textBox, style.icon]} name="time" />
                        <Text style={style.textBox}>from</Text>
                        <Moment format="DD MMM Y" style={[style.textBox, getStyles('bold')]}>{event.beginsAt}</Moment>
                        <Text style={style.textBox}>to</Text>
                        <Moment format="DD MMM Y" style={[style.textBox, getStyles('bold')]}>{event.endsAt}</Moment>
                      </FlexView>

                      <FlexView row style={style.basePadding}>
                        <Icon style={[style.textBox, style.icon]} name="pin" />
                        <Text style={style.textBox}>{event.fullLocation}</Text>
                      </FlexView>

                      <Hr hSpace={15} />

                      <Attendees 
                          eventName={event.name} 
                          attendees={event.attendees} 
                          navigation={this.props.navigation} 
                          refetch={refetch}
                          refreshing={loading} />

                </View>
              </Content>
            )
          }}
        </Query>
      </Container>
    );
  }
}

const style = StyleSheet.create({
  nameWrapper: {
    textAlign: 'left',
    alignItems: 'flex-start',
  },

  name: {
    fontSize: 25,
    fontWeight: 'bold'
  },

  date: {
    padding: 10,
    alignItems: 'center'
  },

  basePadding: {
    paddingHorizontal: 10,
    paddingVertical: 3
  },

  baseMargin: {
    marginHorizontal: 2,
  },

  textBox: {
    paddingRight: 5,
    fontSize: 15,
    // borderWidth: 1
  },

  icon: {
    width:35,
    fontSize: 22,
    // borderWidth: 1,
    textAlign: 'center'
  },

  row: {
    flexDirection: 'row',
    alignItems:'center', 
    justifyContent: 'flex-start',
  },

  header: {
    paddingTop: 15
    // borderBottomColor: '#d1d1d1',
    // borderBottomWidth: 1
  }
})