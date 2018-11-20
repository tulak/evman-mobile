import React, { Component } from 'react';
import { View, Text } from 'react-native';
import EventProperty from './EventProperty';

export default class EventProperties extends Component {
  render () {
    let {eventPropertyAssignments, ...props} = this.props
    return (
      <React.Fragment>
        {
          eventPropertyAssignments.map((p) => (
            <EventProperty {...props} key={p.label} label={p.label} behaviour={p.behaviour} values={p.values}/>
          ))
        }
      </React.Fragment>
    );
  }
}
