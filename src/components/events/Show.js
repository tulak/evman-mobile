import React, { Component } from "react";
import Moment from 'react-moment';
import {ScrollView} from 'react-native'
import {getStyles} from '~/globalStyles'
import {Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner, Grid, Col, Row, Tabs, Tab } from 'native-base'
import { Query } from "react-apollo";
import {CenteredNotice, FlexView, Hr} from '~/components/layout/'
import {SHOW_QUERY} from '~/queries/events/show'
import {styles} from "./show/styles"
import Info from "./show/Info";
import Talks from "./show/Talks";
import StatusButton from "./show/StatusButton"
import Notes from "./show/Notes";

export default class Show extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('name') }
  };

  render () {
    const eventId = this.props.navigation.getParam('eventId')

    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body><Title>Event</Title></Body>
          <Right></Right>
        </Header>
        <Query query={SHOW_QUERY} variables={{eventId}}>
          {({loading, error, data, refetch}) => {
            if (loading && !data.event) return <Content><Spinner inverse style={{ borderWidth: 0 }} /></Content>;
            
            let event
            if (!data) {
              return <CenteredNotice text="Failed to load the event" />
            } else {
              event = data.event[0]
            }

            return (
              <React.Fragment>
                <View style={styles.header}>
                  <FlexView row>
                    <FlexView style={styles.date}>
                      <Moment format="MMM" style={[getStyles('redText')]} filter={(s) => s.toUpperCase()}>{event.beginsAt}</Moment>       
                      <Moment format="DD" style={[getStyles()]}>{event.beginsAt}</Moment>
                    </FlexView>
                    <FlexView style={[styles.nameWrapper]}>
                      <Text style={styles.name}>{event.name}</Text>
                      <Text>{event.eventType.name}</Text>
                    </FlexView>
                  </FlexView>

                  <View style={[styles.row, styles.basePadding]}>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                      <StatusButton name="Approved" enabled={event.approved} style={styles.baseMargin} />
                      <StatusButton name="Committed" enabled={event.committed} style={styles.baseMargin} />
                      {event.archived && <StatusButton name="Archived" enabledStyle="warning" enabled={event.archived} style={styles.baseMargin} />}
                    </ScrollView>
                  </View>
                </View>
                <Tabs tabContainerStyle={styles.tabsContainer}>
                  <Tab heading="Details">
                    <ScrollView>
                      <Info event={event} loading={loading} refetch={refetch}/>
                    </ScrollView>
                  </Tab>

                  <Tab heading="Talks">
                    <Talks event={event} loading={loading} refetch={refetch}/>
                  </Tab>

                  <Tab heading="Notes">
                    <Notes event={event} loading={loading} refetch={refetch}/>
                  </Tab>
                </Tabs>
              </React.Fragment>
            )
          }}
        </Query>
      </Container>
    );
  }
}