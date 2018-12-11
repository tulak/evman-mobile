import React, { Component } from "react";
import {Text, ListItem, View, Left, Right, Body, Row, Grid, Button, Icon, Switch} from 'native-base'
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'
import {StyleSheet} from 'react-native'
import {FlexView} from '~/components/layout'
import { styles } from "../show/styles";

export default class Event extends Component {
  render () {
    let {event, fullDate} = this.props
    let {beginsAt} = event

    let date = (<FlexView style={styles.basePadding}>
      <Text style={getStyles('redText')}>Invalid</Text>
      <Text style={getStyles('redText')}>Date</Text>
    </FlexView>)

    if (beginsAt) {
      date = (
        <FlexView style={styles.eventListDate}>
          <Moment format="MMM" style={[getStyles('redText'), styles.basePadding]} filter={(s) => s.toUpperCase()}>{event.beginsAt}</Moment>       
          <Moment format="DD" style={[getStyles()]}>{event.beginsAt}</Moment>
          <Moment format="YYYY" style={styles.verticalYear}>{event.beginsAt}</Moment>
        </FlexView>
      )
    }

    return (
      <ListItem onPress={() => this.props.navigation.navigate('EventShow', {eventId: event.id})}>
        <FlexView row>
          {date}
          
          <FlexView flex>
            <FlexView row style={{alignSelf: 'flex-start'}}>
              <Text style={[styles.eventListName]}>{event.name}</Text>
            </FlexView>
            <Text style={[styles.location]} numberOfLines={1}>{event.fullLocation}</Text>
          </FlexView>
        </FlexView>
      </ListItem>
    );
  }
}