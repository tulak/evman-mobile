import React, { Component } from "react";
import Moment from 'react-moment';
import {ScrollView, Modal} from 'react-native'
import {getStyles} from '~/globalStyles'
import {Text, Container, Content, Header, Title, Body, Left, Button, Icon, Right, View, Spinner, Grid, Col, Row, Tabs, Tab, ActionSheet } from 'native-base'
import { graphql } from "react-apollo";
import {CenteredNotice, FlexView, Hr} from '~/components/layout/'
import {SHOW_QUERY} from '~/queries/events'
import {styles} from "./show/styles"
import Info from "./show/Info";
import Talks from "./show/Talks";
import StatusButton from "./show/StatusButton"
import Notes from "./show/Notes";
import MoreButton from "./show/MoreButton";
import Edit from "./Edit";

class Show extends Component {
  static navigationOptions = ({navigation}) => {
    return {title: navigation.getParam('name') }
  };

  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  } 

  toggleEdit = () => {
    this.setState((state) => ({editing: !state.editing}) )
  }

  render () {
    const {navigation} = this.props
    const {editing} = this.state
    const {loading, events, refetch} = this.props.data

    if (!events) {
      if(loading) return <CenteredNotice header loading navigation={navigation} />
      else return <CenteredNotice header text="Failed to load the event" navigation={navigation}/>
    }
    
    event = events[0]

    return (
      <Container>
        <Header>
          <Left>
            <Button icon transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body><Title>Event</Title></Body>
          <Right>
            <MoreButton navigation={navigation} onEdit={this.toggleEdit} eventId={event.id} archived={event.archived}/>
          </Right>
        </Header>
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
                <StatusButton eventId={event.id} name="Approved" enabled={event.approved} style={styles.baseMargin} />
                <StatusButton eventId={event.id} name="Committed" enabled={event.committed} style={styles.baseMargin} />
                {event.archived && <StatusButton eventId={event.id} name="Archived" enabledStyle="warning" enabled={event.archived} style={styles.baseMargin} />}
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

          <Modal visible={editing} animationType='slide' onRequestClose={this.toggleEdit}>
            <Edit event={event} closeModal={this.toggleEdit} />
          </Modal>
      </Container>
    );
  }
}

export default graphql(SHOW_QUERY, {
  options: (props) => ({
    variables: {
      eventId: props.navigation.getParam('eventId')
    }
  })
})(Show)