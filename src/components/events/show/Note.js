import React, { Component } from 'react';
import { ListItem, Left, Body, Text, H1, Container, Header, Button, Icon, Title, Subtitle, Right, Content } from 'native-base';
import AttendeeAvatar from './AttendeeAvatar'
import { getStyles } from '../../../globalStyles';
import { Modal } from 'react-native';
import { styles } from './styles';
import Markdown from 'react-native-markdown-renderer';
import {Hr, FlexView, CenteredNotice} from '~/components/layout/'
import Moment from 'react-moment';

class TextNote extends Component {
  render () {
    return (<Text note {...this.props}>{this.props.children}</Text>)
  }
}

export default class Note extends Component {
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
    const {eventNote, eventName} = this.props
    return (
      <React.Fragment>
        <ListItem avatar onPress={this.toggleDetail}>
          <Left>
            <AttendeeAvatar small name={eventNote.user.name} uri={eventNote.user.avatarUrl} />
          </Left>
          <Body>
            <Text>{eventNote.content}</Text>
            <Moment fromNow element={1}>{eventNote.createdAt}</Moment>
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
                <Subtitle>Note</Subtitle>
              </Body>
              <Right />
            </Header>
            <Content style={styles.basePadding}>
              <FlexView row style={styles.dataItemContainer}>
                <Icon style={[styles.textBox, styles.icon]} name="clock-o" type="FontAwesome" />
                <Moment fromNow style={[styles.textBox, styles.basePadding]}>{eventNote.createdAt}</Moment>
                <Text style={styles.basePadding}>by</Text>
                <Text style={styles.basePadding}>{eventNote.user.name}</Text>
                <AttendeeAvatar small name={eventNote.user.name} uri={eventNote.user.avatarUrl} />
              </FlexView>

              <Text>{eventNote.content}</Text>
            </Content>
          </Container>
        </Modal>
      </React.Fragment>
    );
  }
}