import React, {Component} from 'react';
import { Query, graphql } from "react-apollo";
import { View, Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab, ListItem, Item, Input, Icon, Subtitle, H3, List} from 'native-base';
import {CALENDAR_QUERY} from '~/queries/calendar'
import {CenteredNotice, FlexView, Hr, VSpace, DataField, TextLabel} from '~/components/layout/'
import { FlatList } from 'react-native';
import {getStyles} from '~/globalStyles'
import localState from '../../localState';
import { Calendar as RNCalendar, CalendarList, Agenda } from 'react-native-calendars'
import moment from 'moment'
import Event from '~/components/events/dashboard/Event';

const FORMAT = 'YYYY-MM-DD'

class Calendar extends Component {
  constructor (props) {
    super(props)

    this.state = {
      selectedDate: moment().format(FORMAT),
      filterRange: [],
      eventsIndex: {}
    }
  }

  componentWillReceiveProps(newProps) {
    console.log('New Props:', newProps.data.loading, newProps.data.events)
  }

  createEventIndex(events) {
    let index = {}
    
    events.forEach((e) => {
      let from = moment(e.beginsAt)
      let to = moment(e.endsAt)

      while (from.isSameOrBefore(to)) {
        let key = from.format(FORMAT)
        index[key] = index[key] || []
        index[key].push(e)

        from.add(1, 'days')
      }
    })

    return index 
  }

  selectDay = (day) => {
    this.setState({selectedDate: day.dateString})
  }

  selectMonth = (month) => {
    const from = moment(month.dateString).startOf('month').format('YYYY-MM-DD')
    const to = moment(month.dateString).endOf('month').format('YYYY-MM-DD')
    const range = `${from} to ${to}`
    this.setState({selectedDate: null})
    console.log(range)
    this.props.data.refetch({range}).catch((e) => {})
  }

  render () {
    
    const {loading, events, refetch} = this.props.data
    const {selectedDate} = this.state
    
    if (!events) {
      if (loading) return <CenteredNotice loading header/>
      else return <CenteredNotice header text="Failed to load teams"/>
    }

    let eventsIndex = this.createEventIndex(events)

    let markedDates = {}

    for (let day of Object.keys(eventsIndex)) {
      markedDates[day] = { selected: true, selectedColor: '#a9a9a9' }
    }
    if (selectedDate) markedDates[selectedDate] = { selected: true, selectedColor: '#157EFB' }

    let fileredEvents = eventsIndex[selectedDate]
    console.log('Rendering Calendar', eventsIndex)

    return (
      <Container>
        <Header>
          <Left/>
          <Body>
            <Title>Calendar</Title>
          </Body>
          <Right/>
        </Header>
        <RNCalendar
                displayLoadingIndicator={loading}
                // current={selectedDate}
                markedDates={markedDates}
                // Date marking style [simple/period/multi-dot/custom]. Default = 'simple'
                // markingType='simple'

                onDayPress={this.selectDay}
                onMonthChange={this.selectMonth}
                />
        <FlatList
              contentContainerStyle={{flex: 1}}
              data={fileredEvents}
              
              renderItem={({item}) => (
                <Event event={item} navigation={this.props.navigation} /> 
              )}
              keyExtractor={(event) => event.id.toString() }
              onRefresh={refetch}
              refreshing={loading}
              ListEmptyComponent={
                <CenteredNotice text="No events" />
              }
            />
        
        {/* <Content>
                {fileredEvents && fileredEvents.map((event) => (
                    <Event event={event} key={event.id} navigation={this.props.navigation} />
                  ))
                }
                { !fileredEvents && (
                  <React.Fragment>
                    <VSpace size={40} />
                    <CenteredNotice text="No events" />
                  </React.Fragment>
                )}
        </Content> */}
      </Container>
    )
  }
}

export default graphql(CALENDAR_QUERY, {
  options: () => {
    const from = moment().startOf('month').format('YYYY-MM-DD')
    const to = moment().endOf('month').format('YYYY-MM-DD')
    const range = `${from} to ${to}`

    return {
      variables: { range }
    }
  }
})(Calendar)