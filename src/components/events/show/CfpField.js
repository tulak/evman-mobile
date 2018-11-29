import React, { Component } from 'react';
import { Linking } from 'react-native';
import Moment from 'react-moment';
import { Text, Button, Icon } from 'native-base';
import FlexView from '../../layout/FlexView';
import {styles} from "./styles"
import {getStyles} from '~/globalStyles'

export default class CfpField extends Component {
  render () {
    const {cfpDate, cfpUrl} = this.props

    let date = null, url = null

    if (cfpDate) date = (
      <React.Fragment>
        <Text style={styles.textBox}>CFP by</Text>
        <Moment format="DD MMM Y" style={[styles.textBox, getStyles('bold')]}>{cfpDate}</Moment>
      </React.Fragment>
    )
    if (cfpUrl) url = (
      <React.Fragment>
        {!date && (
          <Text style={styles.textBox}>CFP link</Text>
        )}
        <Button small transparent
          onPress={() => Linking.canOpenURL(cfpUrl) && Linking.openURL(cfpUrl)} >
          <Icon name="open" />
        </Button>
      </React.Fragment>
    )

    if (!date && !url) return null

    return (
      <FlexView row style={styles.basePadding}>
        <Icon style={[styles.textBox, styles.icon]} name="calendar-check-o" type="FontAwesome" />
        {date}
        {url}
      </FlexView>
    );
  }
}
