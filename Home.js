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
import EventsTab from './components/EventsTab'
import TalksTab from './components/TalksTab'

const routes = [
  {name: 'Events', label: 'Events', icon: 'train', screen: EventsTab },
  {name: 'Talks', label: 'Talks', icon: 'file-text', screen: TalksTab },
  {name: 'Calendar', label: 'Calendar', icon: 'calendar', screen: TalksTab },
  {name: 'Teams', label: 'Teams', icon: 'group', screen: TalksTab },
  {name: 'Settings', label: 'Settings', icon: 'cogs', screen: EventsTab },
]

const bottomBarRoutes = routes.map((route) => (
  {
    screen: route.screen,
    navigationOptions: {
      tabBarLabel: route.label,
      tabBarIcon: ({tintColor}) => (
        <Icon name={route.icon} size={28} color={tintColor} />
      )
    }
  }
))

const BottomTabNavigator = createBottomTabNavigator(bottomBarRoutes, {
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#555',
      tabStyle: {
        paddingTop: 15,
        paddingBottom: 5,
        height: 70,
        borderColor: 'green',
        borderWidth: 0
      },
      labelStyle: {
        marginTop: 5
      },
      style: {
        height: 70,
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