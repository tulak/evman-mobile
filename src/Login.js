import React, { Component } from 'react';
import { View, Text, Button, Icon, Container, Content, Input, Item, Spinner } from 'native-base';
import {StyleSheet, AsyncStorage} from 'react-native';
import Home from './Home'
import {FlexView, VSpace, CenteredNotice} from './components/layout';
import localState from './localState'
import { authenticate } from './authentication'
import { createClient } from './graphql'
import { ApolloProvider } from 'react-apollo'
import { PROFILE_QUERY } from '~/queries/profile'
import to from 'await-to-js'

const DEFAULT_SERVER_URL = 'evman.io'

export default class Login extends Component {
  constructor(props) {
    super(props);

    // localState.serverURL = '10.211.55.10'
    this.state = {
      initialised: false,
      loggedIn: false,
      focused: false,
      error: null,
      serverUrl: DEFAULT_SERVER_URL,
      client: null,
      loading: false,
    };

    this.init()
    localState.onLogout = this.logout
    localState.onTeamChange = this.teamChange
  }

  logout = () => {
    const {client} = this.state
    if (client) client.resetStore()
    this.init()
  }

  teamChange = () => {
    const {client} = this.state
    if (client) client.resetStore()
  }

  async init () {
    await localState.preload()
    let loggedIn = !!localState.userToken
    let client = loggedIn ? createClient(this.graphqlEndPoint) : null
    
    if (client) {
      let [_, res] = await to(client.query({
        query: PROFILE_QUERY,
        fetchPolicy: 'network-only'
      }))

      if (res) {
        const {data} = res
        const user = data.me
        localState.teamID = user.teams[0].id
      }
    }

    this.setState({
      initialised: true,
      serverUrl: localState.serverURL || DEFAULT_SERVER_URL,
      loggedIn,
      client
    })
  }

  setError = (error) => this.setState({error})

  graphqlBaseURL = () => {
    const {serverUrl} = this.state
    const protocol = process.env.NODE_ENV == 'development' ? 'http' : 'https'
    return `${protocol}://${serverUrl}`
  }

  graphqlEndPoint = () => `${this.graphqlBaseURL()}/graphql`
  graphqlAuthUrl = (provider) => `${this.graphqlBaseURL()}/graphql/authenticate/${provider}`

  authenticate = async (provider) => {
    localState.serverURL = this.state.serverUrl

    let authFunc = authenticate[provider]
    let [_, accessToken] = await to(authFunc())
    if (!accessToken) return
    console.log('Access Token: ', accessToken)
    
    let options = {
      method: 'POST',
      body: JSON.stringify({ access_token: accessToken}),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    
    this.setState({loading: true})
    let [netErr, response] = await to(fetch(this.graphqlAuthUrl(provider), options))
    this.setState({loading: false})
    
    if (netErr) return this.setError("Network Error occured.")

    let [intErr, data] = await to(response.json())
    if (intErr) return this.setError("Internal Error occured.")
    
    if (response.status != 200) {
      if (data.error == 'unsupported_strategy') return this.setError(`Authentication provider '${provider}' not supported.`)
      if (data.error == 'unauthorized') return this.setError('Unable to authenticate user.')
      if (data.error == 'unregistered') return this.setError('Please create your profile by logging in through the web interface first.')
    }

    localState.userID = data.user_id
    localState.userToken = data.token

    this.init()
  }

  render() {
    const {client, loggedIn, error, initialised, loading} = this.state

    if (!initialised) return (<CenteredNotice text="Initializing"><Spinner /></CenteredNotice>)

    if (loggedIn) return (
        <ApolloProvider client={client}>
          <Home />
        </ApolloProvider>
      )
    if (error) return (
      <CenteredNotice text={error}>
        <Button light onPress={() => this.setError(null) }>
          <Text>Back</Text>
        </Button>
      </CenteredNotice>
    )

    if (loading) return <CenteredNotice text="Logging in ..." loading={true} />

    return (
      <Container>
        <Content contentContainerStyle={styles.container} scrollEnabled={false}>
          <FlexView style={styles.innerFrame}>
            <Text style={styles.logo}>EvMan</Text>
            <VSpace />
            <Text style={styles.slogan}>Manage your spectacular team</Text>
            <VSpace />

            <Text>Connecting to: {process.env.NODE_ENV}</Text>

            <VSpace size={5} />
            
            { this.state.focused && (
              <FlexView style={styles.urlInfo}>
                <Text style={styles.urlInfoText}>
                  Connet to your own EvMan instance. Type the URL of your server without protocol (https://)
                </Text>
                <Text style={styles.urlInfoText}>
                  For example: evman.io
                </Text>
              </FlexView>
            )}

            <Item regular>
              <Input style={styles.urlInput} sty
                onFocus={() => this.setState({focused: true})}
                onBlur={() => this.setState({focused: false})}
                onChangeText={(serverUrl) => this.setState({serverUrl})}
                autoCapitalize="none" 
                autoCorrect={false}
                keyboardType="url"
                value={this.state.serverUrl}
                placeholder="EvMan URL"/>
            </Item>

            <VSpace />

            <Button onPress={() => this.authenticate('google')} iconLeft block disabled={this.state.focused}>
              <Icon name="logo-google"/>
              <Text>Log in with Google</Text>
            </Button>
          </FlexView>

          <VSpace size={200}/>
        </Content>
      </Container>
    )
  }
}


export const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E4E5E6",
    justifyContent: 'center',
    flex: 1
  },

  logo: {
    fontSize: 40
  },

  slogan: {
    color: '#555',
    // fontSize: 20
  },

  innerFrame: {
    marginHorizontal: 50,
  },

  urlInput: {
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
    color: '#007AFF'
  }, 

  urlInfo: {
    position: 'absolute',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#555'
  },

  urlInfoText: {
    fontSize: 14,
    color: '#eaeaea',
    textAlign: 'center'
  }
})