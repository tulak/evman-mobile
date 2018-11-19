import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";

import Show from './events/Show'
import Dashboard from './events/Dashboard'
import Icon from 'react-native-vector-icons/FontAwesome';
import mainNavigationOptions from './mainNavigationOptions'
import Search from './events/Search'

const EventsTab = createStackNavigator({
  Show: Show,
  Dashboard: Dashboard,
  Search: Search
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    return {
      ...mainNavigationOptions,
      headerRight: <Icon name="search" onPress={() => navigation.navigate('Search')} size={20} style={{color: '#fff', marginRight: 15}}/>
    }
  }
});

export default EventsTab

