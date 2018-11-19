import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";

import Show from './talks/Show'
import List from './talks/List'
import Icon from 'react-native-vector-icons/FontAwesome';

import mainNavigationOptions from './mainNavigationOptions'

const TalksTab = createStackNavigator({
  Show: Show,
  List: List
}, {
  initialRouteName: 'List',
  navigationOptions: {
    ...mainNavigationOptions,
    headerRight: <Icon name="user" size={24} style={{color: '#fff', marginRight: 15}}/>
  },
});

export default TalksTab

