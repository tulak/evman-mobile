import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet, Alert} from 'react-native'
import {View, Text, Button, Icon, Spinner} from 'native-base'
import { graphql, Mutation } from "react-apollo";
import { UPDATE_EVENT_MUTATION, TRACKED_EVENTS_QUERY, COMMITTED_EVENTS_QUERY, CFP_DEADLINE_EVENTS_QUERY } from '~/queries/events'

export default class StatusButton extends Component {
  static defaultProps = {
    enabledStyle:'success',
    disabledStyle: 'light'
  }

  render () {
    const {name, eventId, enabled, enabledStyle, disabledStyle, mutate, ...props} = this.props
    
    let klass = enabled ? enabledStyle : disabledStyle
    klass = {[klass]: true}

    const spinner = (<ActivityIndicator
      animating={true}
      size='small'
      style={styles.spinner}
      color='black'
    />)
    const icon_name = enabled ? 'checkmark-circle' : 'close-circle'
    let icon = <Icon name={icon_name} />

    return (
      <View {...props}>
        <Mutation mutation={UPDATE_EVENT_MUTATION}>
          {(mutate, { loading }) => {

            const toggleStatus = () => {
              mutate({
                variables: {
                  eventId, 
                  attributes: {
                    [name.toLowerCase()]: !enabled
                  }
                },
                refetchQueries: [
                  { query: TRACKED_EVENTS_QUERY },
                  { query: COMMITTED_EVENTS_QUERY },
                  { query: CFP_DEADLINE_EVENTS_QUERY },
                ]
              })
            }

            const confirm = () => {
              Alert.alert(`Toggle ${name}`, 'Are you sure ?', 
                [
                  {text: "Yes", onPress: toggleStatus },
                  {text: "No"}
                ]
              )
            }
            return (
              <Button small iconLeft {...klass} onPress={confirm}>
                {loading ? spinner : icon}
                <Text>{name}</Text>
              </Button>
            )
          }}
        </Mutation>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  spinner: {
    paddingLeft: 13
  }
});
