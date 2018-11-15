import React, {Component} from 'react'
import {StyleProvider, Text} from 'native-base'
import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';

const cache = new InMemoryCache({});

persistCache({
  cache,
  storage: AsyncStorage,
});

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'cache-and-network'
  },
  query: {
    fetchPolicy: 'cache-and-network'
  }
}

const client = new ApolloClient({
  // uri: "http://evman.test/graphql"
  uri: "http://192.168.1.12/graphql",
  defaultOptions,
  cache
});

client.defaultOptions = defaultOptions

import Home from './Home'
import Moment from 'react-moment'

Moment.globalElement = Text

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <StyleProvider  style={getTheme(platform)}>
        <ApolloProvider client={client}>
          <Home/>
        </ApolloProvider>
      </StyleProvider>
    )
  }
}