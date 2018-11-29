import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { View, Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab, ListItem, Item, Input, Icon, Subtitle, H3, List} from 'native-base';
import {PROFILE_QUERY} from '~/queries/profile'
import {CenteredNotice, FlexView, Hr, VSpace, DataField, TextLabel} from '~/components/layout/'
import { FlatList } from 'react-native';
import {getStyles} from '~/globalStyles'
import localState from '../../localState';

class Teams extends Component {
  constructor (props) {
    super(props)
    this.state = {
      currentTeamID: localState.teamID
    }
  }

  selectTeam = (id) => { 
    localState.teamID = id
    this.setState({currentTeamID: id})
  }

  renderTeam = (team) => {
    const membersLabel = team.usersCount > 1 ? 'members' : 'member'
    const selectedSign = (team.id == localState.teamID) ? <Icon name="checkmark-circle" /> : null
    return (
      <ListItem iconRight key={team.id} onPress={() => this.selectTeam(team.id)}>
        <Body>
          <Text>{team.name}</Text>
          <Text note>
            {team.description}
            {!!team.description && ", "}
            {team.usersCount} {membersLabel}
          </Text>
        </Body>
        <Right>
          <Text style={{color: "#333"}}>
            {selectedSign}
          </Text>
        </Right>
      </ListItem>
    )
  }

  render () {
    const {loading, me, refetch} = this.props.data
    
    if (!me) {
      if (loading) return <CenteredNotice loading header/>
      else return <CenteredNotice header text="Failed to load teams"/>
    }

    const user = me
    const teams = user.teams

    

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Teams</Title>
          </Body>
          <Right/>
        </Header>
        <Content>
          <View style={{padding: 10}}>
            <FlatList 
              contentContainerStyle={teams.length == 0 && getStyles('emptyList')}
              disableVirtualization={false}
              data={teams}
              keyExtractor={(team) => team.id.toString()}
              onRefresh={refetch}
              refreshing={loading}
              ListEmptyComponent={
                <CenteredNotice text="No teams found" onRefresh={() => refetch()} />
              }
              renderItem={({item}) => this.renderTeam(item)}
              />
          </View>
        </Content>
      </Container>
    )
  }
}

export default graphql(PROFILE_QUERY)(Teams)