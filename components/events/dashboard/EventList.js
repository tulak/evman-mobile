import React, {Component} from 'react';
import { Query } from "react-apollo";
import {FlatList} from 'react-native'
import {View, Button, Text} from 'native-base'
import Event from './Event'
import NetworkError from '~/components/errors/NetworkError'
import CenteredNotice from '~/components/layout/CenteredNotice'
import {isNetworkError} from '~/utils/apolloIsNetworkError'



export default class EventList extends Component {
  render () {
    const {query, extractEvents} = this.props

    return (
      <Query query={query} 
        notifyOnNetworkStatusChange
        partialRefetch>
        {({loading, data, refetch}) => {
          let events;
          if (data) {
            events = extractEvents(data)
          } else {
            events = []
          }

          if (!loading && events.length == 0) 
            return (<CenteredNotice refreshing={loading} onRefresh={() => refetch()} text="No events to show" />)

          return (
            <View>
              <FlatList
                contentContainerStyle={{height: '100%'}}
                data={events}
                renderItem={({item}) => (
                  <Event event={item} navigation={this.props.navigation} /> 
                )}
                keyExtractor={(event) => event.id.toString() }
                onRefresh={refetch}
                refreshing={loading}
              />
            </View>
          )
        }}
      </Query>
    )
  }
}