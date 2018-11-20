import React, {Component} from 'react';
import { Query } from "react-apollo";
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab, ListItem, Item, Input, Icon } from 'native-base';
import {SEARCH_EVENTS_QUERY} from '~/queries/events/search'
import {CenteredNotice, FlexView, Hr} from '~/components/layout/'
import { FlatList } from 'react-native';
import { debounce } from 'lodash'
import {getStyles} from '~/globalStyles'
import Event from '~/components/events/dashboard/Event'

export default class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: null
    };
    this.search = debounce(this.search, 500)
  }
  
  search = (term) => {
    this.setState({term: term})
  }

  render () {

    let noticeText = !this.state.term ? "Search for event ..." : "No events found"
    return (
      <Container>
        <Query 
          query={SEARCH_EVENTS_QUERY} 
          variables={{name: this.state.term}}
          skip={!this.state.term}
          >
          {({loading, error, data, refetch}) => {

            let events = (data && data.events) || []
            return (
              <React.Fragment>
                <Header searchBar rounded>
                  <Button icon transparent onPress={() => this.props.navigation.goBack()}>
                    <Icon name="arrow-back" />
                  </Button>
                  <Item>
                    <Icon name="ios-search" />
                    <Input placeholder="Search"
                      autoCorrect={false}
                      autoCapitalize="none"
                      onChangeText={this.search}/>
                  </Item>
                  <Button transparent onPress={() => refetch()}>
                    <Text style={{color: 'white'}}>Search</Text>
                  </Button>
                </Header>

                
                <FlatList 
                  contentContainerStyle={events.length == 0 && getStyles('emptyList')}
                  disableVirtualization={false}
                  data={events}
                  keyExtractor={(event) => event.id.toString()}
                  onRefresh={refetch}
                  refreshing={loading}
                  ListEmptyComponent={
                    <CenteredNotice text={noticeText} />
                  }
                  renderItem={({item}) => (
                    <Event fullDate event={item} navigation={this.props.navigation} /> 
                  )}
                  />
                </React.Fragment>
            )
          }}
         </Query> 
        
      </Container>
    )
  }
}