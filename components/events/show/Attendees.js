import React, {Component} from 'react';
import {ScrollView, Modal, TouchableOpacity} from 'react-native'
import {View, Text, Thumbnail, Icon, List, ListItem, Left, Body, Right} from 'native-base'
import AttendeeAvatar from './AttendeeAvatar'
import AttendeeList from './AttendeeList';
import FlexView from '../../layout/FlexView';

export default class Attendees extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showList: false
    }
  } 

  toggleList = () => {
    this.setState({
      showList: !this.state.showList
    })
  }

  render () {
    const {attendees, eventName, refetch, refreshing} = this.props

    let body;

    if (attendees.length > 0) {
      body = (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={{flex: 1}} onPress={this.toggleList}>
            <FlexView row>
              {
                attendees.map((attendee) => (
                  <AttendeeAvatar key={attendee.id} name={attendee.user.name} uri={attendee.user.avatarUrl}/>
                ))
              }
            </FlexView>
          </TouchableOpacity>
        </ScrollView>
      )
    } else {
      body = (
        <TouchableOpacity style={{flex: 1}} onPress={this.toggleList}>
          <FlexView row spaceEvenly>
            <Icon name="people"/>
            <Text>No one is attending this event</Text>
          </FlexView>
        </TouchableOpacity>
      )
    }

    
    return (
      <View style={{flex: 1}}>
        {body}
        
        <Modal visible={this.state.showList} animationType='fade' u>
          <AttendeeList 
            eventName={eventName} 
            attendees={attendees} 
            refetch={refetch} 
            refreshing={refreshing}
            onBack={this.toggleList} />
        </Modal>
      </View>
    )
  }
}