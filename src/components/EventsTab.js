import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";

import Show from './events/Show'
import Dashboard from './events/Dashboard'
import {Icon} from 'native-base'
import mainNavigationOptions from './mainNavigationOptions'
import Search from './events/Search'
import Profile from './Profile'

const EventsTab = createStackNavigator({
  Show: Show,
  Dashboard: Dashboard,
  Search: Search,
  Profile: Profile
}, {
  initialRouteName: 'Dashboard',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    return {
      ...mainNavigationOptions
    }
  }
});

export default EventsTab

