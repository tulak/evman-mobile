import React, { Component } from "react";
import {Text, ListItem, Left, Right, Body, Row, Grid, Button, Icon, Switch} from 'native-base'
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'
import {StyleSheet} from 'react-native'
import {truncate} from 'lodash'

export const style = StyleSheet.create({
  container: {
    alignItems: 'flex-start'
  },

  date: {
    paddingRight: 10,
    flexDirection: 'column',
    maxWidth: 50
  },

  label: {
    textAlign: 'left',
    alignItems: 'flex-start'
  }
});

const LOCATION_TRUNCATE = 30

export default class Event extends Component {
  render () {
    let {event} = this.props

    return (
      <ListItem onPress={() => this.props.navigation.navigate('Show', {eventId: event.id})} style={style.container}>
        <Left style={[style.date]}>
          <Moment format="DD" style={[getStyles('bold', 'redText')]}>{event.beginsAt}</Moment>
          <Moment format="MMM" filter={(s) => s.toUpperCase()}>{event.beginsAt}</Moment>       
        </Left>
        <Right style={[getStyles('verticalAlignCenter'), style.label]}>
          <Text style={[getStyles('bold')]}>{event.name}</Text>
          <Text>{truncate(event.fullLocation, {length: LOCATION_TRUNCATE})}</Text>
        </Right>
      </ListItem>
    );
  }
}