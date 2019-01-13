import ApolloClient from "apollo-boost";
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { AsyncStorage } from 'react-native';
import localState from './localState'
import to from 'await-to-js'

export async function createClient(uri) {

  const cache = new InMemoryCache({});

  let [_, __] = await to(persistCache({
    cache,
    storage: AsyncStorage,
  }));

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
    uri,
    cache,
    onError: ({networkError}) => {
      if(!networkError) return
      if (networkError.statusCode == 401 || networkError.statusCode == 403) {
        localState.logout()
      }
    },
    request: ({setContext}) => {
      setContext({
        headers: {
          'X-TEAM-ID': localState.teamID,
          'X-USER-TOKEN': localState.userToken
        }
      })
    }
  });

  client.defaultOptions = defaultOptions
  return client
}