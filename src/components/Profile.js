import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { View, Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab, ListItem, Item, Input, Icon, Subtitle, H3, List} from 'native-base';
import {PROFILE_QUERY} from '~/queries/profile'
import {CenteredNotice, FlexView, Hr, VSpace, DataField, TextLabel} from '~/components/layout/'
import { FlatList, Image, Alert } from 'react-native';
import { debounce } from 'lodash'
import {getStyles} from '~/globalStyles'
import Event from '~/components/events/dashboard/Event'
import AttendeeAvatar from './events/show/AttendeeAvatar';
import localState from '~/localState'

class Profile extends Component {
  logout = () => {
    Alert.alert('Logout', 'Are you sure ?', 
      [
        {text: "Yes", onPress: () => localState.logout()},
        {text: "No"}
      ]
    )
  }

  render () {
    const {loading, me} = this.props.data

    if (!me) {
      if (loading) return <CenteredNotice loading header navigation={this.props.navigation}/>
      else return (
        <CenteredNotice header navigation={this.props.navigation} text="Failed to load profile">
          <Button block danger onPress={this.logout}>
            <Text>Logout</Text>
          </Button>
        </CenteredNotice>
      )
    }

    let user = me
  
    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Profile</Title>
          </Body>
          <Right/>
        </Header>
          <Content>
            <View style={{padding: 10}}>
              <VSpace />
              <FlexView row>
                <FlexView row>
                  <AttendeeAvatar name={user.name} uri={user.avatarUrl} />
                  <FlexView itemsFlexStart>
                    <Text>{user.name}</Text>
                    <Text note>{user.jobTitle}</Text>
                  </FlexView>
                </FlexView>
              </FlexView>

              <DataField label="E-mail" value={user.email} />
              <DataField label="Organization" value={user.organization} />
              <DataField label="Phone" value={user.phone} />

              <Hr hSpace={-20} size={20} />
              <DataField label="Github" value={user.github} />
              <DataField label="Twitter" value={user.twitter} />
              
              <Hr hSpace={-20} size={20} />

              <VSpace></VSpace>
              <Button block danger onPress={this.logout}>
                <Text>Logout</Text>
              </Button>
              
            </View>
          </Content>
      </Container>
    )
  }
}

export default graphql(PROFILE_QUERY)(Profile)