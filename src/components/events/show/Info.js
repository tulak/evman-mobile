import React, { Component } from 'react';
import {ScrollView} from 'react-native';
import { Text,  Icon, View } from 'native-base'
import {Hr, FlexView, DataField} from '~/components/layout/'
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'
import Markdown from 'react-native-markdown-renderer';

import Attendees from './Attendees'
import StatusButton from "./StatusButton"
import CfpField from "./CfpField";
import {styles} from "./styles"
import EventProperties from './EventProperties'

export default class Info extends Component {
  render () {
    const {event, loading, refetch} = this.props
    return (
      <React.Fragment>
        <FlexView row style={styles.basePadding}>
          <Icon style={[styles.textBox, styles.icon]} name="clock-o" type="FontAwesome" />
          <Text style={styles.textBox}>from</Text>
          <Moment format="DD MMM Y" style={[styles.textBox, getStyles('bold')]}>{event.beginsAt}</Moment>
          <Text style={styles.textBox}>to</Text>
          <Moment format="DD MMM Y" style={[styles.textBox, getStyles('bold')]}>{event.endsAt}</Moment>
        </FlexView>

        <FlexView row style={styles.basePadding}>
          <Icon style={[styles.textBox, styles.icon]} name="map-marker" type="FontAwesome" />
          <Text style={styles.textBox}>{event.fullLocation}</Text>
        </FlexView>

        <CfpField cfpDate={event.cfpDate} cfpUrl={event.cfpUrl} />
        <Hr />
        <Attendees
          eventName={event.name}
          attendees={event.attendees}
          navigation={this.props.navigation}
          refetch={refetch}
          refreshing={loading} />
        
        <Hr />


        

        <View style={styles.basePadding}>
          <DataField label="Description">
            <Markdown>{event.description} </Markdown>
          </DataField>
        </View>

        <EventProperties eventName={event.name} eventPropertyAssignments={event.eventPropertyAssignments} />
      </React.Fragment>
    );
  }
}
