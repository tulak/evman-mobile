import React, { Component } from "react";
import {Text, ListItem, View, Left, Right, Body, Row, Grid, Button, Icon, Switch} from 'native-base'
import FlexView from "~/components/layout/FlexView";

export default class Talk extends Component {
  render () {
    let {talk} = this.props

    let archivedLabel = talk.archived && <Text note>Archived</Text>

    return (
      <ListItem onPress={() => this.props.navigation.navigate('TalkShow', {id: talk.id})}>
        <FlexView itemsFlexStart>
          <FlexView>
            <Text>{talk.name}</Text>
          </FlexView>

          <FlexView>
            {archivedLabel}
          </FlexView>
        </FlexView>
        
      </ListItem>
    );
  }
}