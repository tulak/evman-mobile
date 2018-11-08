/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab } from 'native-base';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import Events from './components/Events'
import Talks from './components/Talks'

const routes = [
  {name: 'Events', label: 'Events', icon: 'train', screen: Events },
  {name: 'Talks', label: 'Talks', icon: 'file-text', screen: Talks },
  {name: 'Calendar', label: 'Calendar', icon: 'calendar', screen: Talks },
  {name: 'Teams', label: 'Teams', icon: 'group', screen: Talks },
  {name: 'Settings', label: 'Settings', icon: 'cogs', screen: Events },
]

const bottomBarRoutes = routes.map((route) => (
  {
    screen: route.screen,
    navigationOptions: {
      tabBarLabel: route.label,
      tabBarIcon: ({tintColor}) => (
        <Icon name={route.icon} size={24} color={tintColor} />
      )
    }
  }
))

const BottomTabNavigator = createBottomTabNavigator(bottomBarRoutes, {
    tabBarOptions: {
      tabStyle: {
        paddingTop: 15,
        paddingBottom: 15,
        height: 80,
        borderColor: 'green',
        borderWidth: 0
      },
      labelStyle: {
        marginTop: 10
      },
      style: {
        height: 70,
        // borderWidth: 1,
        // borderColor: 'red'
      }
    }
  }

)

type Props = {};
export default class Home extends Component<Props> {
  render() {
    return (<BottomTabNavigator/>)
  }
}