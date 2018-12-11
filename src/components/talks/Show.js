import React, { Component } from "react";
import Moment from 'react-moment';
import {ScrollView, StyleSheet} from 'react-native'
import {getStyles} from '~/globalStyles'
import {Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner, Grid, Col, Row, Tabs, Tab, H1 } from 'native-base'
import { Query, graphql } from "react-apollo";
import {Hr, FlexView, CenteredNotice, DataField} from '~/components/layout/'
import {SHOW_QUERY} from '~/queries/talks'
import Markdown from 'react-native-markdown-renderer';

class Show extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('name') }
  };

  render () {
    const {navigation} = this.props
    const {loading, talks, refetch} = this.props.data

    if (!talks) {
      if(loading) return <CenteredNotice header loading navigation={navigation} />
      else return <CenteredNotice header text="Failed to load the event" navigation={navigation}/>
    }
    
    let talk = talks[0]

    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>Talk</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.basePadding}>
          <H1>{talk.name}</H1>
          <DataField label="Event Type" value={talk.eventType.name}/>
          <DataField label="Created at">
            <Moment format="DD MMM YYYY">{talk.createdAt}</Moment>       
          </DataField>

          <DataField label="Abstract">
            <Markdown>{talk.abstract}</Markdown>
          </DataField>
        </Content>
      </Container>
    );
  }
}

export default graphql(SHOW_QUERY, {
  options: (props) => ({
    variables: {
      id: props.navigation.getParam('id')
    }
  })
})(Show)

export const styles = StyleSheet.create({
  basePadding: {
    padding: 10
  }
})