import React, {Component} from 'react'
import {StyleProvider, Text} from 'native-base'
import getTheme from './native-base-theme/components'
import platform from './native-base-theme/variables/platform'

// import {client} from './graphql'
// import { ApolloProvider } from "react-apollo";
// import 'moment/locale/fr'



import Login from './Login'
import Moment from 'react-moment'

Moment.globalElement = Text
// Moment.globalLocale = 'fr'

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <StyleProvider style={getTheme(platform)}>
        <Login/>
      </StyleProvider>
    )
  }
}