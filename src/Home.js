import React, {Component} from 'react';
import {Platform, StyleSheet, View, StatusBar, SafeAreaView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Container, Header, Content, Button, Title, Text, Right, Left, Body, Badge, Footer, FooterTab } from 'native-base';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import EventsTab from './components/EventsTab'
import TalksTab from './components/TalksTab'
import TeamsTab from './components/TeamsTab'
import CalendarTab from './components/CalendarTab'

const routes = [
  {name: 'Events', label: 'Events', icon: 'train', screen: EventsTab },
  {name: 'Talks', label: 'Talks', icon: 'file-text', screen: TalksTab },
  {name: 'Calendar', label: 'Calendar', icon: 'calendar', screen: CalendarTab },
  {name: 'Teams', label: 'Teams', icon: 'group', screen: TeamsTab },
  // {name: 'Settings', label: 'Settings', icon: 'cogs', screen: EventsTab },
]

const bottomBarRoutes = routes.map((route) => (
  {
    screen: route.screen,
    navigationOptions: {
      tabBarLabel: route.label,
      tabBarIcon: ({tintColor}) => (
        <Icon name={route.icon} type="FontAwesome" size={22} color={tintColor} />
      )
    }
  }
))

const BottomTabNavigator = createBottomTabNavigator(bottomBarRoutes, {
    tabBarOptions: {
      activeTintColor: '#fff',
      activeBackgroundColor: '#555',
      inactiveBackgroundColor: '#F8F8F8',
      showLabel: true,
      tabStyle: {
        paddingTop: 10,
        paddingBottom: 5,
        height: 55,
        borderColor: 'green',
        // borderWidth: 1
      },
      labelStyle: {
        marginTop: 3,
        fontSize: 10,
      },
      style: {
        height: 50,
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