import React, { Component } from 'react';
import {ScrollView, FlatList} from 'react-native';
import { Text,  Icon, View, ListItem, Left, Body } from 'native-base'
import {Hr, FlexView, CenteredNotice} from '~/components/layout/'
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'


import {styles} from "./styles"
import Talk from './Talk';

export default class Talks extends Component {
  render () {
    const {event, loading, refetch} = this.props
    const {eventTalks} = event
    return (
      <React.Fragment>
        <FlatList 
          contentContainerStyle={eventTalks.length == 0 && getStyles('emptyList')}
          disableVirtualization={false}
          data={eventTalks}
          keyExtractor={(eventTalk) => eventTalk.id.toString()}
          onRefresh={refetch}
          refreshing={loading}
          ListEmptyComponent={
            <CenteredNotice text="No talks assigned" onRefresh={() => refetch()} />
          }
          renderItem={({item}) => (
            <Talk eventTalk={item} eventName={event.name} />
          )}
          />
      </React.Fragment>
    );
  }
}
