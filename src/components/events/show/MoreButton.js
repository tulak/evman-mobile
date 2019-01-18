import React, { Component } from 'react';
import {ActivityIndicator } from 'react-native';
import {Button, Icon, ActionSheet, View} from 'native-base'
import {Mutation} from 'react-apollo'
import {UPDATE_EVENT_MUTATION} from '~/queries/events'

export default class MoreButton extends Component {
  render() {
    const {navigation, archived, eventId, onEdit} = this.props

    const buttons = ['Archive', 'Edit', 'Cancel']
    if (archived) buttons[0] = 'Unarchive'
    const actionSheetOptions = {
      options: buttons,
      cancelButtonIndex: 2,
      destructiveButtonIndex: 0
    }

    const performAction = (archiveMutation) => { 
      return (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            // Archive
            archiveMutation({ variables: { eventId, attributes: { archived: !archived }}})
            break;
          case 1:
            // Edit
            onEdit()
            break;
          default:
            break;
        }
      }
    }

    const icon = <Icon name='ellipsis-h' type='FontAwesome'/>
    const spinner = (<ActivityIndicator
      animating={true}
      size='small'
      // style={styles.spinner}
      color='white'
    />)

    return (
      <Mutation mutation={UPDATE_EVENT_MUTATION}>
        {(archiveMutation, { loading }) => {
          return (
            <Button icon transparent onPress={() => ActionSheet.show(actionSheetOptions, performAction(archiveMutation))}>
              {loading ? spinner : icon}
            </Button>
          )
        }}
      </Mutation>
    );
  }
}
