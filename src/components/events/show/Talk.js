import React, { Component } from 'react';
import { ListItem, Left, Body, Text, H1, Container, Header, Button, Icon, Title, Subtitle, Right, Content } from 'native-base';
import AttendeeAvatar from './AttendeeAvatar'
import { getStyles } from '../../../globalStyles';
import { Modal } from 'react-native';
import { styles } from './styles';
import Markdown from 'react-native-markdown-renderer';
import {Hr, FlexView, CenteredNotice} from '~/components/layout/'

export default class Talk extends Component {
  constructor (props) {
    super(props)
    this.state = {
      detail: false
    }
  }

  toggleDetail = () => {
    this.setState({
      detail: !this.state.detail
    })
  }

  render() {
    const {eventTalk, eventName} = this.props

    let status = "Undecided"
    if(eventTalk.state === true) status = "Approved"
    if(eventTalk.state === false) status = "Rejected"

    return (
      <React.Fragment>
        <ListItem avatar onPress={this.toggleDetail}>
          <Left>
            <AttendeeAvatar small name={eventTalk.user.name} uri={eventTalk.user.avatarUrl} />
          </Left>
          <Body>
            <Text>{eventTalk.talk.name}</Text>
            <Text note>{status}</Text>
          </Body>
        </ListItem>

        <Modal visible={this.state.detail} animationType='fade' onRequestClose={this.toggleDetail}>
          <Container>
            <Header>
              <Left>
                <Button icon transparent onPress={this.toggleDetail}>
                  <Icon name="close" active/>
                </Button>
              </Left>
              <Body>
                <Title>{eventName}</Title>
                <Subtitle>Talk</Subtitle>
              </Body>
              <Right />
            </Header>
            <Content style={styles.basePadding}>
              <H1>{eventTalk.talk.name}</H1>

              <Markdown>{eventTalk.talk.abstract}</Markdown>


              <Hr />

              <FlexView row spaceBetween style={styles.dataItemContainer}>
                <Text style={getStyles('bold')}>Given by</Text>
                <FlexView row flexEnd>
                  <Text style={styles.basePadding}>{eventTalk.user.name}</Text>
                  <AttendeeAvatar small name={eventTalk.user.name} uri={eventTalk.user.avatarUrl} />
                </FlexView>
              </FlexView>

              <FlexView row spaceBetween style={styles.dataItemContainer}>
                <Text style={getStyles('bold')}>Status</Text>
                <Text>{status}</Text>
              </FlexView>

              <FlexView row spaceBetween style={styles.dataItemContainer}>
                <Text style={getStyles('bold')}>Event type</Text>
                <Text>{eventTalk.talk.eventType.name}</Text>
              </FlexView>
            </Content>
          </Container>
        </Modal>
      </React.Fragment>
    );
  }
}
