import React, { Component } from 'react';
import {ScrollView, FlatList} from 'react-native';
import { Text,  Icon, View, ListItem, Left, Body } from 'native-base'
import {Hr, FlexView, CenteredNotice} from '~/components/layout/'
import Moment from 'react-moment';
import {getStyles} from '~/globalStyles'


import {styles} from "./styles"
import Note from './Note';

export default class Notes extends Component {
  render () {
    const {event, loading, refetch} = this.props
    const {eventNotes} = event
    return (
      <React.Fragment>
        <FlatList 
          contentContainerStyle={eventNotes.length == 0 && getStyles('emptyList')}
          disableVirtualization={false}
          data={eventNotes}
          keyExtractor={(eventNote) => eventNote.id.toString()}
          onRefresh={refetch}
          refreshing={loading}
          ListEmptyComponent={
            <CenteredNotice text="No notes" onRefresh={() => refetch()} />
          }
          renderItem={({item}) => (
            <Note eventNote={item} eventName={event.name} />
          )}
          />
      </React.Fragment>
    );
  }
}
