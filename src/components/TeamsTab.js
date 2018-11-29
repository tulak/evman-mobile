import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";
import mainNavigationOptions from './mainNavigationOptions'

import Teams from './teams/Teams'

const TeamsTab = createStackNavigator({
  Teams: Teams
}, {
  initialRouteName: 'Teams',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    return {
      ...mainNavigationOptions
    }
  }
});

export default TeamsTab

