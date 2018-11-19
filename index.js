/** @format */

import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

//########
// import React, {Component} from 'react'
// import {Text} from 'react-native'


// import ApolloClient from "apollo-boost";
// import { ApolloProvider } from "react-apollo";

// const client = new ApolloClient();

// class App extends Component {
//   render () {
//     return (
//       <ApolloProvider client={client}>
//           <Text>TEst</Text>
//       </ApolloProvider>
//     )
//   }
// } 
//########


AppRegistry.registerComponent(appName, () => App);
