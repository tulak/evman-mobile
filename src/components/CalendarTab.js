import React, {Component} from 'react';
import { createStackNavigator } from "react-navigation";
import mainNavigationOptions from './mainNavigationOptions'

import Calendar from './calendar/Calendar'
import EventShow from './events/Show'

const CalendarTab = createStackNavigator({
  Calendar: Calendar,
  EventShow: EventShow
}, {
  initialRouteName: 'Calendar',
  headerMode: 'none',
  navigationOptions: ({navigation}) => {
    return {
      ...mainNavigationOptions
    }
  }
});

export default CalendarTab

