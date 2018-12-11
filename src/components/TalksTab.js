import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";

import Show from './talks/Show'
import List from './talks/List'

import mainNavigationOptions from './mainNavigationOptions'

const TalksTab = createStackNavigator({
  TalkShow: Show,
  List: List
}, {
  initialRouteName: 'List',
  headerMode: 'none',
  navigationOptions: {
    ...mainNavigationOptions
  },
});

export default TalksTab

