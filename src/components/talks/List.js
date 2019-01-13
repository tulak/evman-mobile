import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import {FlatList} from 'react-native'
import {View, Button, Text, Container, Header, Left, Body, Right, Title} from 'native-base'
import CenteredNotice from '~/components/layout/CenteredNotice'
import {getStyles} from '~/globalStyles'
import { LIST_QUERY } from '~/queries/talks';
import Talk from './list/Talk';
import localState from '../../localState';

class List extends Component {
  render () {
    const {loading, talks, refetch} = this.props.data

    if (!talks) {
      if (loading) return <CenteredNotice loading header/>
      else return <CenteredNotice header text="Failed to load talks" onRefresh={() => refetch()}/>
    }

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Talks</Title>
          </Body>
          <Right/>
        </Header>
        <FlatList
                data={talks}
                contentContainerStyle={talks.length == 0 && getStyles('emptyList')}
                renderItem={({item}) => (
                  <Talk talk={item} navigation={this.props.navigation} /> 
                )}
                keyExtractor={(talk) => talk.id.toString() }
                onRefresh={refetch}
                refreshing={loading}
                ListEmptyComponent={
                  <CenteredNotice text="No Talks" />
                }
              />
        </Container>
    )
  }
}
export default graphql(LIST_QUERY,{
  options: () => {
    return {
      variables: { userId: parseInt(localState.userID) }
    }
  }
})(List)